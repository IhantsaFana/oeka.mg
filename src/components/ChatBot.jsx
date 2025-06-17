import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useChat } from "../hooks/useChat";
import { toast } from "react-toastify";

const Chat = () => {
  const {
    messages: chatMessages,
    isLoading,
    error,
    sendMessage: sendChatMessage,
  } = useChat();
  const [inputText, setInputText] = useState("");
  const [displayMessages, setDisplayMessages] = useState([
    {
      id: "initial",
      text: "Salut ! Je suis Ihantsa. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayMessages]);

  const generateId = () => Date.now() + Math.random();

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: generateId(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    setDisplayMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const response = await sendChatMessage(inputText);
      const botResponse = {
        id: generateId(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setDisplayMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
      const errorMessage = {
        id: generateId(),
        text: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard.",
        sender: "bot",
        timestamp: new Date(),
      };
      setDisplayMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="p-4 text-red-500 text-center">
          Erreur : {error.message || "Veuillez réessayer plus tard."}
        </div>
      )}
      <div
        className="flex-1 overflow-y-auto space-y-4 p-4"
        ref={chatContainerRef}
      >
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-xs ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                {message.sender === "user" ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-white" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="prose prose-invert max-w-none">
                  <div className="text-sm">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({ node, ...props }) => (
                          <p className="mb-1" {...props} />
                        ),
                        a: ({ node, ...props }) => (
                          <a
                            className="text-blue-400 hover:text-blue-300"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code
                              className="bg-gray-800 px-1 rounded"
                              {...props}
                            />
                          ) : (
                            <code
                              className="block bg-gray-800 p-2 rounded"
                              {...props}
                            />
                          ),
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc list-inside mb-1" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal list-inside mb-1"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-0.5" {...props} />
                        ),
                        h1: ({ node, ...props }) => (
                          <h1 className="text-xl font-bold mb-2" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="text-lg font-bold mb-2" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="text-base font-bold mb-1" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-gray-500 pl-2 italic"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading && inputText.trim()) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            aria-label="Envoyer le message"
            className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl w-80 mb-4 transition-all duration-500 ease-in-out transform ${
            isMinimized
              ? "scale-95 opacity-0 translate-y-4"
              : "scale-100 opacity-100 translate-y-0"
          } backdrop-blur-sm border border-gray-200`}
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Ihantsa</h3>
                <p className="text-xs text-purple-200">En ligne</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={minimizeChat}
                aria-label="Minimiser le chat"
                className="text-white hover:text-purple-200 transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={toggleChat}
                aria-label="Fermer le chat"
                className="text-white hover:text-purple-200 transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          {!isMinimized && (
            <div className="h-96">
              <Chat />
            </div>
          )}
        </div>
      )}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-3 group"
      >
        {hasNewMessage && !isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-20"></div>
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {isOpen ? (
            <X size={24} className="transition-transform duration-300" />
          ) : (
            <MessageCircle
              size={24}
              className="transition-transform duration-300"
            />
          )}
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
      </button>
      {!isOpen && hasNewMessage && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-bounce">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Parler avec moi ?
              </p>
              <p className="text-xs text-gray-600">Cliquez pour discuter</p>
            </div>
          </div>
          <div className="absolute bottom-0 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
