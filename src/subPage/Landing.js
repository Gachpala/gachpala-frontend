"use client";
import Container from "@/components/container";
import Arrival from "@/components/arrival";
import HeroSection from "@/components/heroSection";
import CategorySection from "@/components/categorySection";
import FlashSale from "@/components/flashSale";
import BestCollection from "@/components/bestCollection";
import AutoPlayText from "@/components/autoPlayText";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productReducer } from "@/app/slices/products_slices";

export default function Landing() {
  const [allProducts, setAllProducts] = useState([]);
  let dispatch = useDispatch();

  async function getAllProducts() {
    try {
      let data = await axios.get("http://localhost:7575/products");
      setAllProducts(data.data);
      console.log(data);
      dispatch(productReducer(data.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [dispatch]);

  useEffect(() => {
    scrollTo(0, 0);
  });

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <HeroSection />

      <CategorySection />

      <div className="space-y-6 pb-12">
        <FlashSale products={allProducts} />

        <Container>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <Arrival products={allProducts} />
          </div>
        </Container>

        <Container>
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <BestCollection products={allProducts} />
          </div>
        </Container>
      </div>

      <div className="mt-0 mb-0 bg-white">
        <AutoPlayText />
      </div>
    </div>
  );
}
