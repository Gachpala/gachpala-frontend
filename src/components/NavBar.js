"use client";
import { arapey, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi";
import { LiaSearchSolid } from "react-icons/lia";
import { easeOut, motion } from "framer-motion";
import { pre } from "framer-motion/client";

export default function Home() {
  const listItems =
    "xl:text-[17px] lg:text-[17px] text-[14px] text-[#58575B] font-normal ";
  const listItemsSec = " text-[20px] text-[#111111] ";

  const [toggle, setToggle] = React.useState(false);
  const [toogleProfile, setToogleProfile] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  // const profileRef = useRef(null);

  const handleToggle = () => {
    setToggle((prev) => !prev);
    setOpenSearch(false);
    setToogleProfile(false);
  };

  const handleClose = () => {
    setToggle(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch((prev) => !prev);
    setToogleProfile(false);
    setToggle(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (profileRef.current && !profileRef.current.contains(event.target)) {
  //       setToogleProfile(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <nav className=" relative z-50 select-none ">
      <div className=" xl:py-[23.5px] lg:py-[23.5px] md:py-[23.5px] py-4 xl:px-10 lg:px-10 md:px-8 px-4 flex flex-row justify-between items-center ">
        <Link href="/">
          <img
            src="/logo.png"
            alt="gachpala_logo"
            className=" 2xl:w-40 xl:w-36 lg:w-32 md:w-28 w-23 "
          />
        </Link>

        <div className=" flex justify-between items-center xl:gap-[120px] lg:gap-16 md:gap-7 ">
          <div
            className={` ${
              toggle
                ? " flex flex-col gap-2 justify-center items-center absolute left-0 top-12 bg-[#F6F7F2] pb-5 w-full "
                : "hidden"
            }  xl:flex lg:flex md:flex justify-center items-center xl:gap-[30px] lg:gap-5 md:gap-2 `}
          >
            <Link
              href="/"
              onClick={handleClose}
              className={` ${
                (openSans.className, listItems)
              } bg-transparent rounded-md hover:bg-[#00bf63] px-3 hover:px-3 hover:text-white duration-200 ease-in `}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={handleClose}
              className={` ${
                (openSans.className, listItems)
              } bg-transparent rounded-md hover:bg-[#00bf63] px-3 hover:px-3 hover:text-white duration-200 ease-in `}
            >
              About
            </Link>

            <Link
              href="/shop"
              onClick={handleClose}
              className={` ${
                (openSans.className, listItems)
              } bg-transparent rounded-md hover:bg-[#00bf63] px-3 hover:px-3 hover:text-white duration-200 ease-in `}
            >
              Shop
            </Link>

            <a
              href="mailto:gachpala.business@gmail.com?subject=Inquiry%20from%20Gachpala&body=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20products."
              onClick={handleClose}
              className={` font-medium xl:text-[16.5px] lg:text-[16.5px] text-[13.5px] text-[#ffffff] bg-[#00bf63] xl:px-7 lg:px-7 md:px-4 px-3 xl:py-2 lg:py-2 py-1 border-2 border-[#00bf63] rounded-lg
                hover:bg-transparent hover:border-[#00bf63] hover:text-[#00bf63] duration-300 ease-in-out `}
            >
              Contact
            </a>
          </div>
          <ul className=" flex flex-row justify-center items-center xl:gap-5 lg:gap-5 gap-4 ">
            <li className={`${listItemsSec} cursor-pointer relative`}>
              <LiaSearchSolid
                onClick={handleOpenSearch}
                className=" xl:text-[24px] lg:text-[24px] text-[20px] text-[#58575B] "
              />
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 30 }}
                transition={{ duration: 0.2, ease: easeOut }}
                type="text"
                placeholder="Search"
                className={` ${
                  (openSans.className,
                  openSearch
                    ? "block absolute xl:right-0 lg:left-0 md:-left-2.5 top-10 "
                    : "hidden")
                } font-normal text-[14px] bg-black/10 backdrop-blur-2xl outline-2 outline-black/10 p-2 w-[100px] placeholder:${
                  openSans.className
                } placeholder:text-[#58575B] `}
              />
            </li>
            <li className=" relative ">
              <button
                onClick={() => {
                  setToogleProfile((prev) => !prev);
                  setOpenSearch(false);
                  setToggle(false);
                }}
                className={`${listItemsSec} cursor-pointer block `}
              >
                <BiUser className=" xl:text-[24px] lg:text-[24px] text-[20px] text-[#58575B] " />
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0, top: -20 }}
                whileInView={{ opacity: 1, scale: 1, top: 35 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className={` ${
                  toogleProfile
                    ? "flex flex-col justify-center items-center xl:gap-3 lg:gap-3 md:gap-3 gap-1 absolute xl:left-[-60px] lg:left-[-60px] md:left-[-45px] -left-8 top-10  "
                    : "hidden"
                } bg-black/10 backdrop-blur-2xl xl:w-[150px] lg:w-[150px] md:w-[110px] w-[110px] xl:h-[150px] lg:h-[150px] md:h-[120px] h-[110px] drop-shadow-xl shadow-xl `}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1, ease: easeOut }}
                  className=" flex flex-col justify-center items-center gap-1 "
                >
                  <img src="/boy.jpg" className=" w-8 rounded-full " />
                  <label
                    className={` ${openSans.className} font-normal xl:text-[20px] lg:text-[17px] text-[15px] text-black `}
                  >
                    Name
                  </label>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1, ease: easeOut }}
                  className=" flex justify-center items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1 cursor-pointer "
                >
                  <FiLogOut className=" xl:text-[20px] lg:text-[17px] text-[15px] text-black " />
                  <h1
                    className={` ${openSans.className} font-normal xl:text-[20px] lg:text-[17px] text-[15px] text-black `}
                  >
                    Sign out
                  </h1>
                </motion.button>
              </motion.div>
            </li>

            <Link href="/cart" className=" relative">
              <li className={`${listItemsSec} `}>
                <HiOutlineShoppingBag className=" xl:text-[24px] lg:text-[24px] text-[20px] text-[#58575B] " />
              </li>
              <div className=" text-[12px] text-white bg-[#588456] w-5 h-5 rounded-full flex justify-center items-center absolute left-3 top-3 ">
                12
              </div>
            </Link>
            <li className={` xl:hidden lg:hidden md:hidden block `}>
              <CiMenuBurger onClick={handleToggle} className=" text-[18px] " />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
