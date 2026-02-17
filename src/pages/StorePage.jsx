import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, CheckCircle2, ImageOff, Shirt, Briefcase } from 'lucide-react';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

// --- SERVICE ICON COMPONENT ---
const ServiceIcon = ({ category }) => {
  const cat = category ? category.toLowerCase() : "";

  const getIconContent = () => {
    // 1. Tech / Development / Data Science
    if (cat.includes("dev") || cat.includes("data") || cat.includes("tech") || cat.includes("software")) {
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <rect x="20" y="25" width="60" height="45" rx="3" stroke="#DC2626" />
          <path d="M35 70 L65 70 M50 70 L50 80 M40 80 L60 80" stroke="#94A3B8" />
          <path d="M42 40 L47 45 L42 50 M58 40 L53 45 L58 50" className="animate-pulse text-red-600" />
        </g>
      );
    }

    // 2. Graphic Design / Creative / Branding
    if (cat.includes("design") || cat.includes("brand") || cat.includes("creative")) {
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="50" cy="50" r="30" stroke="#CBD5E1" strokeDasharray="6 6" className="animate-[spin_12s_linear_infinite]" />
          <path d="M35 35 L65 65 M65 35 L35 65" stroke="#DC2626" opacity="0.6" />
          <rect x="42" y="42" width="16" height="16" fill="#DC2626" rx="2" className="animate-bounce" />
        </g>
      );
    }

    // 3. Marketing / SEO / Social
    if (cat.includes("market") || cat.includes("seo") || cat.includes("social")) {
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 75 L40 45 L60 55 L85 15" stroke="#DC2626" className="animate-pulse" />
          <circle cx="85" cy="15" r="5" fill="#DC2626" className="animate-ping" />
          <path d="M20 85 H85" stroke="#CBD5E1" />
        </g>
      );
    }

    // 4. Email / Envelopes
    if (cat.includes("email") || cat.includes("mail") || cat.includes("news")) {
      return (
        <g fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="25" y="40" width="50" height="35" rx="2" />
          <path d="M25 40 L50 60 L75 40" />
          <g className="animate-[bounce_2s_infinite]">
            <rect x="60" y="20" width="20" height="14" rx="1" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M60 20 L70 28 L80 20" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        </g>
      );
    }

    // 5. Hosting / Server
    if (cat.includes("host") || cat.includes("server") || cat.includes("cloud")) {
      return (
        <g fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round">
          <rect x="25" y="20" width="50" height="60" rx="3" stroke="#94A3B8" />
          <line x1="30" y1="35" x2="70" y2="35" stroke="#CBD5E1" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="#CBD5E1" />
          <circle cx="35" cy="35" r="2" fill="#DC2626" className="animate-pulse" />
          <circle cx="35" cy="50" r="2" fill="#DC2626" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        </g>
      );
    }

    // Default Fallback
    return (
      <g fill="none" stroke="#DC2626" strokeWidth="2.5">
        <path d="M30 50 Q50 15 70 50 Q50 85 30 50" className="animate-pulse" />
        <circle cx="50" cy="50" r="12" stroke="#CBD5E1" strokeDasharray="4 4" className="animate-spin" />
      </g>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden border-b border-gray-100">
      {/* Grid Pattern Background for that "Engineer" feel */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
      
      <svg viewBox="0 0 100 100" className="w-24 h-24 z-10 relative drop-shadow-sm">
        {getIconContent()}
      </svg>
      
      {/* Background decoration in Light Mode */}
      <div className="absolute text-[120px] font-black text-gray-900/[0.03] select-none uppercase italic pointer-events-none">
        {cat.charAt(0) || 'S'}
      </div>
    </div>
  );
};
// --- MAIN STORE COMPONENT ---
const Store = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem } = useShoppingCart();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (servicesError) throw servicesError;

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      const getFullImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const { data } = supabase.storage.from('store-images').getPublicUrl(path);
        return data.publicUrl;
      };

      const formattedServices = (servicesData || []).map(s => ({ 
        ...s, 
        type: 'service', 
        uniqueId: `s_${s.id}`,
        resolved_image: getFullImageUrl(s.image_url)
      }));

      const formattedProducts = (productsData || []).map(p => ({ 
          ...p, 
          type: 'product', 
          title: p.name, 
          uniqueId: `p_${p.id}`,
          resolved_image: getFullImageUrl(p.image_url)
      }));

      setItems([...formattedServices, ...formattedProducts]);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  const categories = ['All', ...new Set(items.map(i => i.category).filter(Boolean))];
  
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(i => i.category === selectedCategory);

  const cardClass = "bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 flex flex-col h-full group";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      <Navbar />

      <div className="relative pt-32 pb-12 text-center px-4">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Store.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Explore our premium clothing and professional digital services.
            </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4 sticky top-20 z-30 pointer-events-none">
        <div className="pointer-events-auto bg-white/70 backdrop-blur-md border border-white/40 p-2 rounded-2xl shadow-sm flex flex-wrap gap-2 justify-center md:justify-start max-w-fit mx-auto md:mx-0">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                        selectedCategory === cat 
                        ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                        : 'bg-transparent text-gray-500 hover:bg-white hover:text-gray-900'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 mt-8">
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white/50 h-[500px] rounded-3xl animate-pulse border border-white/50"></div>
             ))}
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <motion.div 
                    key={item.uniqueId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cardClass}
                >
                    {/* Media Section: Image or SVG Animation */}
                    <div className="h-64 overflow-hidden bg-gray-100 relative border-b border-gray-100">
                        {item.resolved_image ? (
                            <img 
                                src={item.resolved_image} 
                                alt={item.title} 
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                        ) : (
                            item.type === 'service' ? (
                                <ServiceIcon category={item.category} />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                    <ImageOff size={48} className="mb-2 opacity-20" />
                                    <span className="text-sm font-medium">Coming Soon</span>
                                </div>
                            )
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4">
                             {item.category && (
                                <span className="bg-white/90 backdrop-blur text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm border border-gray-100 flex items-center gap-1.5">
                                    {item.type === 'product' ? <Shirt size={10} /> : <Briefcase size={10} />}
                                    {item.category}
                                </span>
                             )}
                        </div>

                        {item.type === 'product' ? (
                            !item.in_stock && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                    Sold Out
                                </div>
                            )
                        ) : (
                            item.recommended && (
                                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    Recommended
                                </div>
                            )
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>

                        <div className="mb-4 flex items-baseline gap-1">
                            {item.price ? (
                                <>
                                    <span className="text-2xl font-black text-gray-900">
                                        {formatPrice(item.price, item.currency || 'USD')}
                                    </span>
                                    {item.type === 'service' && item.billing_cycle && (
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter">
                                            {item.billing_cycle.startsWith('/') ? item.billing_cycle : `/${item.billing_cycle}`}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Quote Based</span>
                            )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>

                        {/* Features List for Services */}
                        {item.type === 'service' && item.features && (
                            <div className="mb-6 flex-grow">
                                <ul className="space-y-2">
                                    {item.features.slice(0, 3).map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs font-medium text-gray-600">
                                            <CheckCircle2 size={14} className="text-red-500 shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {item.type === 'product' && <div className="flex-grow"></div>}

                        <button 
                            onClick={() => addItem(item)} 
                            disabled={item.type === 'product' && !item.in_stock}
                            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold uppercase text-xs tracking-widest shadow-lg ${
                                (item.type === 'product' && !item.in_stock)
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1 active:scale-95'
                            }`}
                        >
                            <ShoppingCart size={16} />
                            {item.type === 'service' ? 'Request Service' : (item.in_stock ? 'Add to Cart' : 'Sold Out')}
                        </button>
                    </div>
                </motion.div>
              ))}
           </div>
        )}

        {!loading && filteredItems.length === 0 && (
            <div className="text-center py-32 bg-white/30 backdrop-blur-sm rounded-[40px] border border-white/50">
                <Search size={64} className="mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Inventory Empty</h3>
                <p className="text-gray-500 font-medium">We couldn't find any items in the <span className="text-red-600">"{selectedCategory}"</span> category.</p>
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;