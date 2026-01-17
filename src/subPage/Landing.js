import Container from "@/components/container";
import Arrival from "@/components/arrival";
import Banner from "@/components/banner";
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
    <>
      <Banner />
      <AutoPlayText />
      <Container>
        <Arrival />
        <BestCollection />
      </Container>
    </>
  );
}
