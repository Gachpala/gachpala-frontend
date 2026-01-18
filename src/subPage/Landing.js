import Container from "@/components/container";
import Arrival from "@/components/arrival";
import HeroSection from "@/components/heroSection";
import CategorySection from "@/components/categorySection";
import FlashSale from "@/components/flashSale";
import BestCollection from "@/components/bestCollection";
import AutoPlayText from "@/components/autoPlayText";
import React, { useEffect } from "react";
import axios from "axios";

export default function Landing() {


  async function getAllProducts() {
    let data = await axios.get("https://dummyjson.com/products");
    console.log(data);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <HeroSection />
      
      <CategorySection />
      
      <div className="space-y-6 pb-12">
        <FlashSale />
        
        <Container>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                 <Arrival />
            </div>
        </Container>
        
        <Container>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                <BestCollection />
            </div>
        </Container>
      </div>
      
      <div className="mt-0 mb-0 bg-white">
          <AutoPlayText /> 
      </div>
    </div>
  );
}
