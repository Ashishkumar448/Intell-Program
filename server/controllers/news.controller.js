import { logger } from '../lib/logger.js';

export const getNews = async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        if (!apiKey) {
            // If no key, return mock data or error
            // For better UX, let's return the mock data if no key is present so it's not "blank"
            return res.status(200).json({
                articles: [
                    {
                        title: "News API Key Missing",
                        source: { name: "System" },
                        publishedAt: new Date().toISOString(),
                        description: "Please add NEWS_API_KEY to your server/.env file to see real news.",
                        urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000",
                        url: "#"
                    },
                    {
                        title: "AI Models Run Locally on Laptops",
                        source: { name: "TechDaily" },
                        publishedAt: new Date().toISOString(),
                        description: "New optimizations allow powerful LLMs like Llama 3 to run smoothly on consumer hardware, revolutionizing privacy and accessibility.",
                        urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
                        url: "#"
                    }
                ]
            });
        }

        const category = req.query.category || 'technology';
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error(data.message || 'Failed to fetch news');
        }

        res.json(data);
    } catch (error) {
        logger.error(error, 'News API Error');
        res.status(500).json({ error: 'Failed to fetch news' });
    }
};
