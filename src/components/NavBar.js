"use client";
import { arapey, inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi";
import { LiaSearchSolid } from "react-icons/lia";
import { easeOut, motion } from "framer-motion";
import { pre } from "framer-motion/client";
import { FaRegHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

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
    <nav className=" relative z-50 select-none bg-[#f6f7f2] ">
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
              } bg-transparent px-3 hover:px-3 hover:text-white after:content-[''] after:w-0 after:h-full after:bg-[#00bf63] after:rounded-sm after:absolute after:left-0 after:bottom-0 hover:after:w-full hover:after:duration-300 hover:after:ease-out hover:after:-z-50 duration-150 ease-in z-50 relative`}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={handleClose}
              className={` ${
                (openSans.className, listItems)
              } bg-transparent px-3 hover:px-3 hover:text-white after:content-[''] after:w-0 after:h-full after:bg-[#00bf63] after:rounded-sm after:absolute after:left-0 after:bottom-0 hover:after:w-full hover:after:duration-300 hover:after:ease-out hover:after:-z-50 duration-150 ease-in z-50 relative`}
            >
              About
            </Link>

            <Link
              href="/shop"
              onClick={handleClose}
              className={` ${
                (openSans.className, listItems)
              } bg-transparent px-3 hover:px-3 hover:text-white after:content-[''] after:w-0 after:h-full after:bg-[#00bf63] after:rounded-sm after:absolute after:left-0 after:bottom-0 hover:after:w-full hover:after:duration-300 hover:after:ease-out hover:after:-z-50 duration-150 ease-in z-50 relative`}
            >
              Shop
            </Link>

            <a
              href="mailto:gachpala.business@gmail.com?subject=Inquiry%20from%20Gachpala&body=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20products."
              onClick={handleClose}
              className={` font-medium xl:text-[16.5px] lg:text-[16.5px] text-[13.5px] text-[#ffffff] bg-[#00bf63] xl:px-7 lg:px-7 md:px-4 px-3 xl:py-2 lg:py-2 py-1 border-2 border-[#00bf63]
               rounded-lg hover:bg-transparent hover:border-[#00bf63] hover:text-[#00bf63] duration-300 ease-in-out `}
            >
              Contact
            </a>
          </div>
          <ul className=" flex flex-row justify-center items-center xl:gap-5 lg:gap-5 gap-4 ">
            <li className={`${listItemsSec} cursor-pointer relative`}>
              <GoSearch
                onClick={handleOpenSearch}
                className=" xl:text-[24px] lg:text-[24px] text-[20px] text-[#58575B] "
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
              
              {/* Profile Dropdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ 
                    opacity: toogleProfile ? 1 : 0, 
                    scale: toogleProfile ? 1 : 0.95, 
                    y: toogleProfile ? 0 : -10,
                    display: toogleProfile ? "block" : "none"
                }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right"
              >
                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <p className={`${inter.className} font-bold text-gray-900`}>Sakib Al Hasan</p>
                    <p className={`${openSans.className} text-xs text-gray-500`}>sakib@example.com</p>
                </div>
                
                <div className="p-2">
                    <Link 
                        href="/profile" 
                        onClick={() => setToogleProfile(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                    >
                        <BiUser /> My Profile
                    </Link>
                    <Link 
                        href="/profile" 
                        onClick={() => setToogleProfile(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                    >
                        <HiOutlineShoppingBag /> My Orders
                    </Link>
                    <button 
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                    >
                        <FiLogOut /> Sign Out
                    </button>
                </div>
              </motion.div>
            </li>
            <Link href="/favourite">
              <li>
                <FaRegHeart className=" xl:text-[22px] lg:text-[22px] text-[20px] text-[#58575B]" />
              </li>
            </Link>

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

        {/* Full Width Search Bar */}
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: openSearch ? "auto" : 0, opacity: openSearch ? 1 : 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden border-t border-gray-100 z-40"
        >
            <div className="xl:px-10 lg:px-10 md:px-8 px-4 py-8 flex items-center justify-center">
                <div className="w-full max-w-4xl relative flex items-center">
                    <LiaSearchSolid className="absolute left-4 text-2xl text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for plants..."
                        className={`${openSans.className} w-full bg-gray-50 py-4 pl-14 pr-12 rounded-full text-lg outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-gray-700 placeholder-gray-400`}
                    />
                    <FiX 
                        className="absolute right-6 text-xl text-gray-400 cursor-pointer hover:text-red-500 transition-colors" 
                        onClick={() => setOpenSearch(false)}
                    />
                </div>
            </div>
        </motion.div>
      </div>
    </nav>
  );
}
