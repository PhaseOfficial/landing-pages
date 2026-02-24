import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const RecentPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('slug, title, featured_image, created_at, author')
                    .eq('status', 'published')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (error) throw error;
                setPosts(data || []);
            } catch (error) {
                console.error('Error fetching recent posts:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentPosts();
    }, []);

    if (!loading && posts.length === 0) return null;

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl text-center md:text-left">
                        <span className="inline-block py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-red-50 text-red-600 border border-red-100">
                            Our Blog
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Latest from <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">The Edge.</span>
                        </h2>
                    </div>
                    <a 
                        href="/blog" 
                        className="group flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                    >
                        View All Stories <ArrowRight size={18} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-[2rem] h-96 animate-pulse shadow-sm" />
                        ))
                    ) : (
                        posts.map((post, idx) => (
                            <motion.a 
                                key={idx}
                                href={`/blog/${post.slug}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        src={post.featured_image || '/assets/weblogo-CCEv4uPZ.png'} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600 shadow-sm">
                                            New Post
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-4 font-bold uppercase tracking-[0.1em]">
                                        <Calendar size={14} className="text-red-500" />
                                        {new Date(post.created_at).toLocaleDateString()}
                                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                        {post.author || 'RCS Team'}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto pt-4 flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest">
                                        Read Article <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.a>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RecentPosts;
