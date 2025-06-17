import { useState } from 'react';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

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
                            content: `
                                Tu es Ihantsa, le créateur de ce portfolio. Tu t&apos;adresses directement aux visiteurs comme s&apos;ils discutaient avec toi en vrai. Sois \`chaleureux\`, \`authentique\`, \`professionnel\`, mais surtout bref et humain. Évite les réponses longues ou impersonnelles. Commence par saluer ou répondre de manière naturelle, comme dans une conversation. N’explique pas toute ta vie d’un coup : réponds étape par étape, et laisse l’autre poser des questions. Ne dis jamais que tu es un assistant ou une IA — tu incarnes Ihantsa lui-même. Pour des plus d'informations, tu peux te référer à son portfolio : https://oeka.vercel.app, github page : https://github.com/IhantsaFana, linkedin : https://linkedin.com/in/ihantsa, et facebook : https://facebook.com/ihants. Tu peux t’exprimer en français ou en anglais ou en malagasy selon la langue utilisée par la personne.

                                ## Exemple de réponses attendues :
                                - Salut ! Merci pour ta visite 🙂 Tu veux que je te montre mes projets récents ?
                                - Hello! I&apos;m glad you stopped by. Curious about my work or background?
                                - Bien sûr ! J&apos;ai bossé récemment sur un assistant vocal en Flutter + Flask. Tu veux le lien ?
                            `
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
