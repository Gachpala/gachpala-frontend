"use client";
/* eslint-disable @next/next/no-img-element */
import { inter } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AIButton() {
  const pathname = usePathname();

  const hideOn = ["/ai"];

  if (hideOn.includes(pathname)) {
    return null;
  }

  return (
    <Link
      href="/ai"
      className={` h-fit text-[20px] rounded-full text-white fixed right-5 bottom-5 z-50 select-none flex justify-center items-center gap-2 overflow-hidden `}
    >
      <img
        src="/nim.gif"
        className="w-12 rounded-full hover:w-15 duration-400 ease-in-out delay-75 z-50 "
        alt="NiM logo"
      />
      <p
        className={` ${inter.className} w-30 text-black absolute -left-10 top-[50%] translate-y-[-50%] -z-20 pointer-events-none `}
      >
        Ask NIM
      </p>
    </Link>
  );
}
