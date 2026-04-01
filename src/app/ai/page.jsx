"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Leaf, Menu, X, ArrowRight, Flame, Trash2 } from "lucide-react";
import {
  sendMessageStream,
  extractRecommendedProducts,
  initializeChat,
} from "../../services/geminiService.js";
import ChatMessage from "../../components/ChatMessage.jsx";
import Link from "next/link";
import { API_BASE_URL } from "@/app/config";

const SUGGESTIONS = [
  { text: "Best indoor plants? 🌿", label: "Indoor options" },
  { text: "Fruit trees for beginners 🥭", label: "Easy fruits" },
  { text: "How to treat yellow leaves? 🍂", label: "Plant care" },
  { text: "Trees for shade 🌳", label: "Landscaping" },
];

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "model",
      content:
        "Hello. I am **Gachpala AI**.\n\nI can help you explore our botanical collection or answer your plant care questions. How may I assist you?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          console.error("Failed to fetch products:", await response.text());
          return;
        }
        const data = await response.json();

        const mappedProducts = data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          scientificName: "",
          category: item.category_name || "Other",
          price: item.price,
          description: item.description,
          careLevel: "Moderate",
          imageUrl: item.image_url.startsWith("http")
            ? item.image_url
            : `${API_BASE_URL}${item.image_url}`,
          benefits: [],
          popular: item.is_featured,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    const fetchTopSelling = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/topselling`);
        if (!response.ok) {
          console.error(
            "Failed to fetch top selling products:",
            await response.text(),
          );
          return;
        }
        const data = await response.json();

        const mappedTopSelling = data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          scientificName: "",
          category: item.category_name || "Other",
          price: item.price,
          description: item.description,
          careLevel: "Moderate",
          imageUrl: item.image_url.startsWith("http")
            ? item.image_url
            : `${API_BASE_URL}${item.image_url}`,
          benefits: [],
          popular: item.is_featured,
        }));

        setTopSellingProducts(mappedTopSelling);
      } catch (error) {
        console.error("Failed to fetch top selling products", error);
      }
    };

    fetchProducts();
    fetchTopSelling();
  }, []);

  useEffect(() => {
    initializeChat(products);
  }, [products]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botMessageId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          role: "model",
          content: "",
          timestamp: new Date(),
        },
      ]);

      let fullResponse = "";

      await sendMessageStream(text, products, (chunk) => {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, content: fullResponse } : msg,
          ),
        );
      });

      const recommendations = extractRecommendedProducts(
        fullResponse,
        products,
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, relatedProducts: recommendations }
            : msg,
        ),
      );
    } catch (error) {
      console.error("Failed to generate response", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: "I'm having trouble connecting. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    const prompt = `Tell me about the ${product.name} and how to care for it.`;
    handleSend(prompt);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "model",
        content:
          "Chat cleared. How can I help you with your gardening journey today?",
        timestamp: new Date(),
      },
    ]);
  };

  const topSelling = topSellingProducts;
  const filteredProducts = products;

  return (
    <div
      className="relative w-full min-h-dvh overflow-hidden font-sans text-neutral-900 bg-[linear-gradient(180deg,#f8faf5_0%,#f2f5ee_100%)]"
      id="nimDad"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-neutral-900/15 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 w-80 bg-white/65 border-r border-emerald-100/70 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-50 flex flex-col backdrop-blur-xl ${
            isSidebarOpen
              ? "translate-x-0 shadow-2xl"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex-1 overflow-y-auto px-4 pb-5 mt-6 scrollbar-hide">
            {/* Top Selling Section */}
            <div className="mb-8 mt-4">
              <h2 className="px-4 text-[11px] font-bold text-neutral-500 uppercase tracking-[0.18em] mb-4 flex items-center gap-2">
                Top Selling{" "}
                <Flame size={12} className="text-orange-500 fill-orange-500" />
              </h2>
              <div className="space-y-3">
                {topSelling.length === 0 ? (
                  // Loading skeleton cards
                  <>
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="w-full px-4 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100/80 flex items-center gap-3 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-8 h-8 bg-neutral-50 rounded-bl-xl text-[10px] font-bold text-neutral-400 flex items-center justify-center">
                          #{index}
                        </div>
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-200 shrink-0 animate-pulse"></div>
                        <div className="flex-1 pr-4">
                          <div className="h-4 bg-neutral-200 rounded animate-pulse mb-2"></div>
                          <div className="h-3 bg-neutral-100 rounded animate-pulse w-16"></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  topSelling.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="w-full text-left group px-4 py-3 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-8 h-8 bg-neutral-50 rounded-bl-xl text-[10px] font-bold text-neutral-400 flex items-center justify-center">
                        #{index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                        <img
                          src={product.imageUrl}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                      <div className="pr-4">
                        <p className="text-sm font-semibold text-neutral-800 leading-tight group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5 font-medium">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-full relative bg-transparent">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-[#f6f7f2]/80 backdrop-blur-md z-30 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 text-neutral-500 hover:bg-neutral-50 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <span className="font-semibold text-neutral-900 flex items-center gap-2 tracking-wide">
                Gachpala NiM
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            <button
              onClick={handleClearChat}
              className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Clear Chat"
            >
              <Trash2 size={18} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 pt-20 pb-32 md:p-10 scrollbar-hide">
            <div className="max-w-3xl mx-auto w-full pb-8">
              {messages.map((msg) => (
                <ChatMessage ref={messagesEndRef} key={msg.id} message={msg} />
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs ml-1 font-medium tracking-wide animate-pulse mt-4">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              )}

              {/* Suggestions for empty chat (or just welcome message) */}
              {!isLoading && messages.length === 1 && (
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion.text)}
                      className="text-left p-4 rounded-2xl border border-neutral-100 bg-white/60 hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-300 group"
                    >
                      <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1 group-hover:text-emerald-600 transition-colors">
                        {suggestion.label}
                      </span>
                      <span className="text-sm font-medium text-neutral-800">
                        {suggestion.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 fixed md:bottom-18 bottom-0 left-0 right-0 md:relative z-30">
            <div className="max-w-3xl mx-auto w-full relative">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about plants..."
                  className="w-full pl-6 pr-14 py-4 bg-white/95 border border-neutral-200 rounded-full text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all shadow-[0_10px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_34px_rgb(0,0,0,0.10)]"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-[#00be62] text-white rounded-full hover:bg-[#00a757] disabled:opacity-50 disabled:hover:bg-[#00be62] transition-all flex items-center justify-center shadow-lg shadow-emerald-700/25 transform hover:scale-105 active:scale-95"
                >
                  {isLoading ? (
                    <Leaf size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] text-neutral-300 mt-4 font-medium tracking-wide">
                AI can make mistakes. Please verify.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
