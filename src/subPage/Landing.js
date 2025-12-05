import Container from "@/components/container";
import Arrival from "@/components/arrival";
import Banner from "@/components/banner";
import BestCollection from "@/components/bestCollection";
import AutoPlayText from "@/components/autoPlayText";
import React from "react";

export default function Landing() {
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
