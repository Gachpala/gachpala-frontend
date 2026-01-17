"use client";
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
      className={` h-fit text-[20px] rounded-full text-white fixed right-10 bottom-10 z-50 select-none `}
    >
      <img src="/nim.gif" className="w-20 rounded-full " />
    </Link>
  );
}
