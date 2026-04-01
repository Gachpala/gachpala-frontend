import { inter, interSec } from "@/lib/fonts";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { TfiAngleLeft } from "react-icons/tfi";
export default function ShopCategory({ className }) {
  return (
    <div className={` ${className} flex flex-col justify-end items-start `}>
      <ul className=" mt-2 p-0 m-0 flex flex-col items-start gap-2 ">
        <li className={` ${interSec.className} select-none group relative  `}>
          <FaAngleRight className=" absolute -right-5 top-[50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 group-hover:duration-500 group-hover:ease-out " />
          Indoor Plants
        </li>
        <li className={` ${interSec.className} select-none group relative `}>
          <FaAngleRight className=" absolute -right-5 top-[50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 group-hover:duration-500 group-hover:ease-out " />
          Outdoor Plants
        </li>
        <li className={` ${interSec.className} select-none group relative `}>
          <FaAngleRight className=" absolute -right-5 top-[50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 group-hover:duration-500 group-hover:ease-out " />
          Tools
        </li>
        <li className={` ${interSec.className} select-none group relative `}>
          <FaAngleRight className=" absolute -right-5 top-[50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 group-hover:duration-500 group-hover:ease-out " />
          Gifts
        </li>
      </ul>
    </div>
  );
}
