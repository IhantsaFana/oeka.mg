import { useState } from 'react';

const API_KEY = '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';
const SITE_URL = 'https://oeka.vercel.app';
const SITE_NAME = "Ihantsa RAKOTONDRANAIVO's Portfolio";

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (userMessage) => {
        try {
            setIsLoading(true);
            setError(null);

            // Add user message to chat
            const newMessages = [...messages, { role: 'user', content: userMessage }];
            setMessages(newMessages);

            // Get AI response
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                    'HTTP-Referer': SITE_URL,
                    'X-Title': SITE_NAME
                },
                body: JSON.stringify({
                    model: 'mistralai/mistral-7b-instruct',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant for OEKA Portfolio website. Be friendly and professional. | Tu es un assistant utile pour le site web du portfolio OEKA. Sois amical et professionnel.'
                        },
                        ...newMessages
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message;
            setMessages([...newMessages, aiResponse]);

            return aiResponse.content;
        } catch (err) {
            setError(err.message);
            console.error('Chat error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
        setError(null);
    };

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat
    };
};
