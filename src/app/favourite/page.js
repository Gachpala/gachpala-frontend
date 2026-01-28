"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, interSec } from "@/lib/fonts";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Favourite() {
  const favorites = useSelector((state) => state.products.favorites);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for initial render
    setIsLoading(false);
  }, []);

  return (
    <section>
      {/* Header Banner */}
      <div className=" bg-[#ebeee3] p-18 mb-[130px] ">
        <Container>
          <div className=" bg-[#ebeee3]  ">
            <p
              className={`${inter.className} text-xl font-bold text-gray-800 mb-2`}
            >
              Wishlist
            </p>
            <p className={` ${interSec.className} text-md `}>
              home / <span className="text-gray-600">wishlist</span>
            </p>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <Container>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-20">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-20">
            {favorites.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                img={product.image}
                alt={product.name}
                title={product.name}
                price={`${product.price}`}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 mb-20">
            <p
              className={`${inter.className} text-2xl font-bold text-gray-800 mb-4`}
            >
              No Favourites Yet
            </p>
            <p
              className={`${interSec.className} text-gray-600 text-center max-w-md`}
            >
              Start adding your favourite plants to this collection. They will
              appear here for easy access.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
