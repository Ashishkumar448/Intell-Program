import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, RefreshCw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewsAgent() {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/news')
            .then(res => res.json())
            .then(data => {
                if (data.articles) {
                    setNews(data.articles.map((article, index) => ({
                        id: index,
                        title: article.title,
                        source: article.source.name,
                        time: new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        summary: article.description || "No description available.",
                        category: "Technology", // NewsAPI doesn't return category per article easily without more logic
                        image: article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000",
                        url: article.url
                    })).slice(0, 10)); // Limit to 10
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load news.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 px-4 py-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Daily Briefing</h1>
                    </div>
                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors">
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
                {loading && <p className="text-center text-slate-500">Loading daily briefing...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {news.map((item) => (
                    <article key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="md:flex">
                            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">
                                        <span>{item.source}</span>
                                        <span>•</span>
                                        <span>{item.time}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                                        {item.title}
                                    </h2>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        {item.summary}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
                                        Read full story
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button onClick={() => window.open(item.url, '_blank')} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </main>
        </div>
    );
}
