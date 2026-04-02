/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Leaf } from "lucide-react";

const TreeCard = ({ product, onSelect }) => {
  const placeholder = "/plant-placeholder.png";
  const imageSrc = product.imageUrl || placeholder;

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-500 h-full flex flex-col"
      onClick={() => onSelect && onSelect(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-50">
        <img
          src={imageSrc}
          alt={product.name}
          onError={(e) => {
            if (e?.target?.src.endsWith(placeholder)) return;
            e.target.src = placeholder;
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm border border-white/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <h3 className="font-semibold text-neutral-900 text-lg leading-tight tracking-tight">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-400 font-medium italic mt-0.5">
              {product.scientificName}
            </p>
          </div>
          <p className="font-bold text-neutral-900">Tk {product.price}</p>
        </div>

        <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="pt-4 mt-auto border-t border-dashed border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
            <Leaf className="w-3.5 h-3.5" />
            <span>{product.careLevel || "Care"}</span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default TreeCard;
