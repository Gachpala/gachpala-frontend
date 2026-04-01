"use client";
import Container from "@/components/container";
import Arrival from "@/components/arrival";
import HeroSection from "@/components/heroSection";
import CategorySection from "@/components/categorySection";
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
      let data = await axios.get("https://api.gachpala.com/products");
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
    <div className=" -z-50 min-h-screen">
      <HeroSection />

      <CategorySection />

      <div className="space-y-6 pb-12">

        <Container>
          <div className="bg-[#ebeee3] px-4 py-10 rounded-2xl mt-15 shadow-sm flex justify-center items-center ">
            <Arrival products={allProducts} />
          </div>
        </Container>

        <Container>
          <div className="bg-[#ebeee3] px-4 py-10 rounded-2xl mt-15 shadow-sm flex justify-center items-center ">
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
