import React from 'react';
import { MessageSquare, Calculator, Newspaper, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const features = [
        {
            title: "AI Chat Assistant",
            description: "Intelligent conversations powered by local AI. Get answers, help with coding, and more.",
            icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
            path: "/chat",
            color: "bg-indigo-50 border-indigo-100 hover:border-indigo-200"
        },
        {
            title: "Smart Calculator",
            description: "Advanced mathematical operations with history and scientific functions.",
            icon: <Calculator className="w-8 h-8 text-emerald-600" />,
            path: "/calculator",
            color: "bg-emerald-50 border-emerald-100 hover:border-emerald-200"
        },
        {
            title: "News Feed",
            description: "Stay updated with the latest headlines and curated news stories.",
            icon: <Newspaper className="w-8 h-8 text-blue-600" />,
            path: "/news",
            color: "bg-blue-50 border-blue-100 hover:border-blue-200"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Intell-Unnati
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your unified workspace for productivity and intelligence. Access powerful tools in one clean interface.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(feature.path)}
                            className={`relative group cursor-pointer rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${feature.color}`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-100 py-12 text-center text-slate-500 text-sm bg-slate-50">
                <p>© {new Date().getFullYear()} Intell-Unnati. Built with local AI power.</p>
            </footer>
        </div>
    );
}
