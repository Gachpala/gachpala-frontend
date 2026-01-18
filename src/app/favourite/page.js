"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import { inter, interSec } from "@/lib/fonts";
import { useState } from "react";

export default function Favourite() {
  // Mock data - replace with actual favourite items from your state management
  const [favourites] = useState([
    {
      id: 1,
      image: "/plant.png",
      title: "Chinese Money Plant",
      price: "23.00",
      rating: 4,
    },
    {
      id: 2,
      image: "/plant.png",
      title: "Snake Plant",
      price: "19.99",
      rating: 5,
    },
    {
      id: 3,
      image: "/plant.png",
      title: "Monstera Deliciosa",
      price: "45.00",
      rating: 4,
    },
    {
      id: 4,
      image: "/plant.png",
      title: "Pothos Plant",
      price: "15.99",
      rating: 4,
    },
    {
      id: 5,
      image: "/plant.png",
      title: "Peace Lily",
      price: "28.50",
      rating: 5,
    },
    {
      id: 6,
      image: "/plant.png",
      title: "Spider Plant",
      price: "12.99",
      rating: 4,
    },
    {
      id: 7,
      image: "/plant.png",
      title: "Spider Plant",
      price: "12.99",
      rating: 4,
    },
    {
      id: 7,
      image: "/plant.png",
      title: "Spider Plant",
      price: "12.99",
      rating: 5,
    },
  ]);

  return (
    <section>
      {/* Header Banner */}
      <div className=" bg-[#ebeee3] p-18 mb-[130px] ">
        <Container>
          <div className=" bg-[#ebeee3]  ">
            <p
              className={`${inter.className} text-xl font-bold text-gray-800 mb-2`}
            >
              My Favourites
            </p>
            <p className={` ${interSec.className} text-md `}>
              home / <span className="text-gray-600">favourites</span>
            </p>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <Container>
        {favourites.length > 0 ? (
          <div className=" grid grid-cols-4 gap-6 mb-20 ">
            {favourites.map((product) => (
              <Product
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
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
