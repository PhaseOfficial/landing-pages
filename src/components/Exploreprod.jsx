import React from "react";
import { motion } from "framer-motion";
import { 
  Shirt, 
  Palette, 
  BrainCircuit, 
  Terminal, 
  ArrowUpRight, 
  ShoppingBag,
  Layers,
  Sparkles
} from "lucide-react";
import BeholdWidget from './BeholdWidget';

// --- 1. ANIMATION: FASHION (Light Theme) ---
const FashionIllustration = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-red-50 to-rose-100 rounded-t-2xl flex items-center justify-center overflow-hidden border-b border-red-100">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <motion.div 
        className="absolute w-32 h-32 bg-red-200/50 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute z-10 bg-white/60 border border-rose-200 p-4 rounded-xl shadow-sm backdrop-blur-sm"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
         <Shirt size={48} className="text-red-800" />
      </motion.div>
    </div>
  );
};

// --- 2. ANIMATION: DESIGN (Light Theme) ---
const DesignIllustration = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-orange-50 to-amber-100 rounded-t-2xl flex items-center justify-center overflow-hidden border-b border-orange-100">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
       <motion.div
        className="absolute w-24 h-24 border-2 border-orange-300 bg-orange-100/50"
        animate={{ borderRadius: ["20%", "50%", "20%"], rotate: [0, 90, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="relative z-10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
        <Palette size={56} className="text-orange-600 drop-shadow-md" />
      </motion.div>
    </div>
  );
};

// --- 3. ANIMATION: AI (Light Theme) ---
const AIIllustration = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-indigo-50 to-violet-100 rounded-t-2xl flex items-center justify-center overflow-hidden border-b border-indigo-100">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_76%,transparent_77%,transparent)] bg-[size:30px_30px]" />
      <motion.div className="relative z-10" animate={{ filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }} transition={{ duration: 2, repeat: Infinity }}>
         <BrainCircuit size={56} className="text-indigo-600" />
      </motion.div>
      {[0, 1, 2].map((i) => (
        <motion.div
            key={i}
            className="absolute w-3 h-3 bg-violet-500 rounded-full"
            animate={{ rotate: 360 }}
            style={{ originX: "40px", originY: "40px" }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
        />
      ))}
    </div>
  );
};

// --- 4. ANIMATION: SOFTWARE (Light Theme) ---
const DevIllustration = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-t-2xl flex items-center justify-center overflow-hidden border-b border-emerald-100">
       <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.8)_50%,transparent_100%)] bg-[size:100%_4px]" />
       <motion.div 
         className="relative w-40 h-28 bg-gray-800 border border-gray-600 rounded-lg shadow-xl flex flex-col overflow-hidden"
         animate={{ y: [0, -5, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       >
         <div className="h-6 bg-gray-700 flex items-center px-2 gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
         </div>
         <div className="p-3 space-y-2">
            <motion.div className="w-3/4 h-2 bg-emerald-500/60 rounded" animate={{ opacity: [0.5, 1, 0.5], width: ["50%", "75%", "50%"] }} transition={{ duration: 2, repeat: Infinity }}/>
            <motion.div className="w-1/2 h-2 bg-emerald-500/40 rounded" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}/>
            <div className="absolute bottom-3 right-3"><Terminal size={24} className="text-emerald-400" /></div>
         </div>
       </motion.div>
    </div>
  );
};


// --- CARD COMPONENT ---
const ServiceCard = ({ title, desc, link, Illustration, external }) => {
  const CardContent = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col items-center bg-card text-card-foreground rounded-2xl shadow-lg border border-border hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300 h-full overflow-hidden hover:-translate-y-2"
    >
      <Illustration />
      
      <div className="p-8 flex flex-col items-center text-center flex-grow w-full">
        <h3 className="text-xl font-bold text-foreground group-hover:text-red-800 transition-colors mb-3">
            {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
          {desc}
        </p>

        {external && (
            <div className="mt-auto pt-2 border-t border-border w-full flex justify-center">
                <span className="flex items-center gap-1 text-xs font-bold text-red-600 uppercase tracking-widest mt-4 group-hover:gap-2 transition-all">
                    Visit Web Services <ArrowUpRight size={14}/>
                </span>
            </div>
        )}
      </div>
    </motion.div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="h-full block">
      {CardContent}
    </a>
  ) : (
    <div className="h-full block cursor-default">
      {CardContent}
    </div>
  );
};


// --- MAIN COMPONENT ---
const Exploreprod = () => {
  return (
    <div className="relative flex flex-col bg-background mt-20 md:pt-20 md:p-12 md:pb-20 p-8">
            
            {/* Main Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 mt-10 text-center max-w-3xl mx-auto"
            >
                <h1 className="text-red-800 text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                    Our Ecosystem of Excellence
                </h1>
                <p className="text-muted-foreground text-lg">
                    We don't just create; we curate experiences. Discover our four pillars of quality.
                </p>
            </motion.div>

            {/* Main Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 max-w-7xl mx-auto w-full">
                <ServiceCard 
                    title="Premium Apparel"
                    desc="Threads that speak. Meticulously crafted garments where fabric, fit, and finish meet uncompromising standards."
                    Illustration={FashionIllustration}
                />
                <ServiceCard 
                    title="Creative Design"
                    desc="Visuals that stick. From corporate branding to artistic expression, we turn abstract concepts into iconic realities."
                    Illustration={DesignIllustration}
                />
                <ServiceCard 
                    title="Intelligent AI"
                    desc="The future, automated. Smart agents and business logic designed to scale your operations effortlessly."
                    Illustration={AIIllustration}
                    link="https://web.redcupseries.co.zw"
                    external
                />
                <ServiceCard 
                    title="Software Engineering"
                    desc="Code that builds empires. Robust web services and custom platforms engineered for peak performance."
                    Illustration={DevIllustration}
                    link="https://web.redcupseries.co.zw"
                    external
                />
            </div>

            <hr className="border-t border-black/5 my-16 max-w-5xl mx-auto" />
            
            {/* Widget Container */}
            <div className="max-w-7xl mx-auto w-full mb-16">
                 <BeholdWidget />
            </div>

            {/* Explore More Header */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-10"
            >
                <h2 className="text-red-800 font-bold text-3xl mb-2">
                    Expand Your Experience
                </h2>
                <p className="text-muted-foreground">Join the movement and partner with the best.</p>
            </motion.div>

            {/* Bottom Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
                
                {/* Merch */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col items-center text-center transition-all hover:shadow-xl hover:border-red-100"
                >
                    <ShoppingBag className="text-8xl text-red-800/80 mb-6 drop-shadow-sm" />
                    <h3 className="text-xl font-bold mb-3 text-foreground">Official Merchandise</h3>
                    <a href="/Store" className="mt-auto inline-block bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all py-3 px-8 rounded-full font-medium shadow-md">
                        Shop Now
                    </a>
                </motion.div>

                {/* Listings */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col items-center text-center transition-all hover:shadow-xl hover:border-red-100"
                >
                    <Layers className="text-8xl text-red-800/80 mb-6 drop-shadow-sm" />
                    <h3 className="text-xl font-bold mb-3 text-foreground">Curated Listings</h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                        A marketplace of trusted partners. View listings from brands that match our standard of excellence.
                    </p>

                </motion.div>

                 {/* Collaborate */}
                 <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col items-center text-center transition-all hover:shadow-xl hover:border-red-100"
                >
                    <Sparkles className="text-8xl text-red-800/80 mb-6 drop-shadow-sm" />
                    <h3 className="text-xl font-bold mb-3 text-foreground">Strategic Partners</h3>
                    <a href="/Contact" className="mt-auto inline-block bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all py-3 px-8 rounded-full font-medium shadow-md">
                        Collaborate
                    </a>
                </motion.div>
            </div>
    </div>
  );
};

export default Exploreprod;