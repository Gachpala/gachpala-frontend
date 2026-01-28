import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import TreeCard from "./TreeCard.jsx";

const ChatMessage = ({ message, ref }) => {
  const isBot = message.role === "model";
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    if (message.timestamp) {
      const date =
        typeof message.timestamp === "string"
          ? new Date(message.timestamp)
          : message.timestamp;
      setFormattedTime(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }, [message.timestamp]);

  return (
    <div
      className={`flex w-full mb-8 ${
        isBot ? "justify-start" : "justify-end"
      } group`}
    >
      <div
        className={`flex flex-col max-w-[95%] md:max-w-[85%] ${
          isBot ? "items-start" : "items-end"
        }`}
      >
        {/* Avatar / Identity */}
        {isBot && (
          <div className="flex items-center gap-2 mb-2 ml-1 opacity-100 transition-opacity">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-neutral-100 overflow-hidden">
              <img
                src="/lg.png"
                alt="AI"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-neutral-400">
              Gachpala AI
            </span>
          </div>
        )}

        {/* Message Bubble */}
        <div
          ref={ref}
          className={`relative px-6 py-4 rounded-8 text-sm md:text-[15px] leading-relaxed tracking-wide shadow-sm transition-all duration-300 ${
            isBot
              ? "bg-white text-neutral-700 border border-neutral-100 rounded-tl-md"
              : "bg-neutral-900 text-neutral-50 rounded-tr-md shadow-lg shadow-neutral-900/5"
          }`}
        >
          {isBot ? (
            <div className="markdown-body">
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => (
                    <span
                      className="font-semibold text-neutral-900"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc ml-4 my-3 space-y-1 text-neutral-600"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="pl-1" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-2 last:mb-0" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </div>

        {/* Timestamp */}
        <span
          className={`text-[10px] text-neutral-300 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isBot ? "ml-2" : "mr-2"
          }`}
        >
          {formattedTime}
        </span>

        {/* Recommended Products Grid */}
        {isBot &&
          message.relatedProducts &&
          message.relatedProducts.length > 0 && (
            <div className="mt-6 w-full">
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-3 ml-1">
                Recommendations
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {message.relatedProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <TreeCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ChatMessage;
