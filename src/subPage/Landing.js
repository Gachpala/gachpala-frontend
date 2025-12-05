import Container from "@/components/container";
import Arrival from "@/components/arrival";
import Banner from "@/components/banner";
import BestCollection from "@/components/bestCollection";
import AutoPlayText from "@/components/autoPlayText";
import React from "react";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <Banner />
      <AutoPlayText />
      <Container>
        <Arrival />
        <BestCollection />
      </Container>
      <Link
        href="/ai"
        className={` h-fit text-[20px] rounded-full text-white fixed right-10 bottom-10 z-50 `}
      >
        <img src="/nim.gif" className="w-[80px] rounded-full " />
      </Link>
    </>
  );
}
