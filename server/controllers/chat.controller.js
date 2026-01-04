import { Ollama } from 'ollama';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '../lib/logger.js';

const ollama = new Ollama({ host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434' });

export const chat = async (req, res) => {
    try {
        let { messages, model, provider } = req.body;

        // Default to Ollama if no keys present or if specifically requested
        let responseText = '';
        let usedProvider = 'ollama';

        // explicit provider check
        if (provider === 'openai' && process.env.OPENAI_API_KEY) {
            usedProvider = 'openai';
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const completion = await openai.chat.completions.create({
                messages: messages.map(m => ({ role: m.role, content: m.content })),
                model: model || 'gpt-3.5-turbo',
            });
            responseText = completion.choices[0].message.content;

        } else if (provider === 'gemini' && process.env.GEMINI_API_KEY) {
            usedProvider = 'gemini';
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const geminiModel = genAI.getGenerativeModel({ model: model || 'gemini-pro' });

            const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');
            const result = await geminiModel.generateContent(prompt);
            const response = await result.response;
            responseText = response.text();

        } else if (provider === 'ollama' || (!provider && !process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY)) {
            // Logic for Ollama (Explicit or Fallback)
            usedProvider = 'ollama';
            const modelToUse = model || process.env.OLLAMA_MODEL || 'llama3';
            logger.info({ host: process.env.OLLAMA_HOST, model: modelToUse }, 'Attempting Ollama Chat');

            const response = await ollama.chat({
                model: modelToUse,
                messages: messages.map(m => ({ role: m.role, content: m.content })),
                stream: false,
            });
            responseText = response.message.content;
        } else {
            // Default fallback if provider not matched or keys missing but provider not specified
            // If provider was not specified, and we have keys, use them in priority
            if (!provider) {
                if (process.env.OPENAI_API_KEY) {
                    usedProvider = 'openai';
                    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
                    const completion = await openai.chat.completions.create({
                        messages: messages.map(m => ({ role: m.role, content: m.content })),
                        model: model || 'gpt-3.5-turbo',
                    });
                    responseText = completion.choices[0].message.content;
                } else if (process.env.GEMINI_API_KEY) {
                    usedProvider = 'gemini';
                    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                    const geminiModel = genAI.getGenerativeModel({ model: model || 'gemini-pro' });
                    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');
                    const result = await geminiModel.generateContent(prompt);
                    const response = await result.response;
                    responseText = response.text();
                } else {
                    // Fallback to Ollama again
                    usedProvider = 'ollama';
                    const modelToUse = model || process.env.OLLAMA_MODEL || 'llama3';
                    logger.info({ host: process.env.OLLAMA_HOST, model: modelToUse }, 'Attempting Ollama Chat (Fallback)');

                    const response = await ollama.chat({
                        model: modelToUse,
                        messages: messages.map(m => ({ role: m.role, content: m.content })),
                        stream: false,
                    });
                    responseText = response.message.content;
                }
            } else {
                throw new Error(`Provider ${provider} not available or configured`);
            }
        }

        return res.status(200).json({
            role: 'assistant',
            content: responseText,
            provider: usedProvider
        });

    } catch (error) {
        logger.error({ err: error, message: error.message, stack: error.stack }, 'Chat API Error Detailed');

        // Return specific error if from Ollama
        if (error.status_code === 404 && error.message.includes('model')) {
            return res.status(404).json({ error: `Model '${req.body.model || process.env.OLLAMA_MODEL || 'llama3'}' not found. Please run 'ollama pull ${req.body.model || process.env.OLLAMA_MODEL || 'llama3'}'` });
        }

        return res.status(500).json({ error: error.message || 'Internal Server Error', details: error.toString() });
    }
};
