import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, CheckCircle2, ImageOff, Shirt, Briefcase } from 'lucide-react';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

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

      // 1. Fetch Services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (servicesError) throw servicesError;

      // 2. Fetch Products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // 3. Helper to resolve Storage URLs
      // If the URL in DB is just a path, this converts it to a full URL
      const getFullImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path; // Already a full URL
        const { data } = supabase.storage.from('store-images').getPublicUrl(path);
        return data.publicUrl;
      };

      // 4. Normalize and Combine Data
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

  const cardClass = "bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300 flex flex-col h-full group";
  
  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-200 font-sans">
      <Navbar />

      <div className="relative pt-32 pb-12 text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Store.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our latest clothing drops and professional services.
            </p>
        </div>
      </div>

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
                    <div className="h-64 overflow-hidden bg-gray-100 relative border-b border-gray-100">
                        {/* Use resolved_image here */}
                        {item.resolved_image ? (
                            <img 
                                src={item.resolved_image} 
                                alt={item.title} 
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                        ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                <ImageOff size={48} className="mb-2 opacity-20" />
                                <span className="text-sm font-medium">No Image Available</span>
                            </div>
                        )}
                        
                        <div className="absolute top-4 left-4">
                             {item.category && (
                                <span className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-gray-100 flex items-center gap-1">
                                    {item.type === 'product' ? <Shirt size={10} /> : <Briefcase size={10} />}
                                    {item.category}
                                </span>
                             )}
                        </div>

                        {item.type === 'product' ? (
                            !item.in_stock && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    Sold Out
                                </div>
                            )
                        ) : (
                            item.recommended && (
                                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    Recommended
                                </div>
                            )
                        )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow relative">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                        </div>

                        <div className="mb-4 flex items-baseline gap-1">
                            {item.price !== null && item.price !== undefined ? (
                                <>
                                    <span className="text-2xl font-bold text-red-600 font-mono">
                                        {formatPrice(item.price, item.currency || 'USD')}
                                    </span>
                                    
                                    {item.type === 'service' && item.billing_cycle && (
                                        <span className="text-sm text-gray-500 font-medium">
                                            {item.billing_cycle.startsWith('/') ? item.billing_cycle : `/${item.billing_cycle}`}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span className="text-lg font-bold text-blue-600">Custom Pricing</span>
                            )}
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>

                        {item.type === 'service' && item.features && item.features.length > 0 && (
                            <div className="mb-6 flex-grow">
                                <ul className="space-y-1">
                                    {item.features.slice(0, 3).map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                            <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">{feature}</span>
                                        </li>
                                    ))}
                                    {item.features.length > 3 && (
                                        <li className="text-xs text-blue-500 font-medium pl-6">
                                            + {item.features.length - 3} more features
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                        
                        {item.type === 'product' && <div className="flex-grow"></div>}

                        <button 
                            onClick={() => addItem(item)} 
                            disabled={item.type === 'product' && !item.in_stock}
                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold shadow-md active:scale-95 ${
                                (item.type === 'product' && !item.in_stock)
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-black'
                            }`}
                        >
                            <ShoppingCart size={18} />
                            {item.type === 'service' ? 'Order Service' : (item.in_stock ? 'Add to Cart' : 'Out of Stock')}
                        </button>
                    </div>
                </motion.div>
              ))}
           </div>
        )}

        {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/50">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No items found</h3>
                <p className="text-gray-500">Try selecting a different category.</p>
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;