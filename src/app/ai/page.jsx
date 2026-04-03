"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import { Send, Leaf, Menu, Flame, Trash2 } from "lucide-react";
import {
  sendMessageStream,
  extractRecommendedProducts,
  initializeChat,
} from "../../services/geminiService.js";
import ChatMessage from "../../components/ChatMessage.jsx";
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
  }, []);

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

  return (
    <div className="relative h-[calc(100dvh-4.5rem)] md:h-[calc(100dvh-5rem)] overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#ddf3e3_0%,#f2f7ef_38%,#f8fbf6_100%)] text-neutral-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-lime-200/35 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1460px] gap-3 px-3 py-2 md:gap-4 md:px-5 md:py-3 lg:gap-5">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-neutral-900/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 transform border-r border-emerald-100/80 bg-white/80 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:static md:z-auto md:h-full md:translate-x-0 md:rounded-3xl md:border md:shadow-[0_20px_60px_-42px_rgba(17,42,28,0.45)] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto px-4 pb-5 pt-5 scrollbar-hide md:pt-4">
            <div className="mb-5 rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3f7859]">
                Gachpala AI
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#1e3327]">
                Ask Plant Expert
              </h2>
              <p className="mt-2 text-xs leading-5 text-[#607066]">
                Discover plant matches, care tips, and buying guidance in one
                chat.
              </p>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Top Selling{" "}
                <Flame size={12} className="fill-orange-500 text-orange-500" />
              </h3>
              <div className="space-y-2.5">
                {topSelling.length === 0 ? (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-neutral-100/80 bg-white px-4 py-3 shadow-sm"
                      >
                        <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-xl bg-neutral-50 text-[10px] font-bold text-neutral-400">
                          #{index}
                        </div>
                        <div className="h-10 w-10 shrink-0 animate-pulse overflow-hidden rounded-lg bg-neutral-200" />
                        <div className="flex-1 pr-4">
                          <div className="mb-2 h-4 animate-pulse rounded bg-neutral-200" />
                          <div className="h-3 w-16 animate-pulse rounded bg-neutral-100" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  topSelling.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-neutral-100 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
                    >
                      <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-xl bg-neutral-50 text-[10px] font-bold text-neutral-400">
                        #{index + 1}
                      </div>
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <img
                          src={product.imageUrl}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt=""
                        />
                      </div>
                      <div className="pr-4">
                        <p className="text-sm font-semibold leading-tight text-neutral-800 transition-colors group-hover:text-emerald-700">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-neutral-400">
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

        <main className="relative grid h-full min-h-0 flex-1 grid-rows-[auto,1fr,auto] overflow-hidden rounded-3xl border border-emerald-100/70 bg-white/70 shadow-[0_24px_70px_-45px_rgba(17,42,28,0.45)] backdrop-blur-xl">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-emerald-100 bg-white/75 px-4 backdrop-blur-md md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="-ml-1 rounded-lg p-2 text-neutral-500 hover:bg-neutral-50 md:hidden"
              >
                <Menu size={20} />
              </button>
              <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 md:text-base">
                Gachpala NiM
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </div>

            <button
              onClick={handleClearChat}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
              title="Clear Chat"
            >
              <Trash2 size={18} />
            </button>
          </header>

          <div className="min-h-0 overflow-y-auto px-4 pb-4 pt-4 scrollbar-hide md:px-8 md:pb-5 md:pt-6">
            <div className="mx-auto w-full max-w-3xl pb-6">
              {messages.map((msg) => (
                <ChatMessage ref={messagesEndRef} key={msg.id} message={msg} />
              ))}

              {isLoading && (
                <div className="mt-4 ml-1 flex items-center gap-2 text-xs font-medium tracking-wide text-neutral-400 animate-pulse">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                  <div
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              )}

              {!isLoading && messages.length === 1 && (
                <div className="mt-12 grid grid-cols-1 gap-3 animate-fade-in-up sm:grid-cols-2">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion.text)}
                      className="group rounded-2xl border border-neutral-100 bg-white/70 p-4 text-left transition-all duration-300 hover:border-emerald-200 hover:bg-white hover:shadow-md"
                    >
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400 transition-colors group-hover:text-emerald-600">
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

          <div className="z-30 border-t border-emerald-100 bg-white/92 p-3 backdrop-blur-md md:bg-transparent md:p-6">
            <div className="mx-auto w-full max-w-3xl">
              <div className="group relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about plants..."
                  className="w-full rounded-full border border-neutral-200 bg-white/95 py-4 pl-6 pr-14 text-neutral-800 placeholder-neutral-400 shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-all hover:shadow-[0_12px_34px_rgb(0,0,0,0.10)] focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute bottom-2 right-2 top-2 aspect-square flex items-center justify-center rounded-full bg-[#00be62] text-white shadow-lg shadow-emerald-700/25 transition-all hover:scale-105 hover:bg-[#00a757] active:scale-95 disabled:opacity-50 disabled:hover:bg-[#00be62]"
                >
                  {isLoading ? (
                    <Leaf size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
              <p className="mt-3 text-center text-[10px] font-medium tracking-wide text-neutral-400 md:mt-4">
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
