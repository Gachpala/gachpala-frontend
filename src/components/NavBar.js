"use client";
/* eslint-disable @next/next/no-img-element */
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { FiLogOut, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LiaSearchSolid } from "react-icons/lia";
import { easeOut, motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SignInUpPage from "@/app/signInUp/page";
import { API_BASE_URL } from "@/app/config";
import {
  AUTH_MODAL_EVENT,
  AUTH_TOKEN_KEY,
  clearAuthStorage,
  isAuthenticated,
} from "@/lib/authGate";

const CART_UPDATED_EVENT = "gachpala:cart-updated";

export default function Home() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.products.cart);
  const getLocalCartCount = () => {
    if (!Array.isArray(cartItems) || !cartItems.length) return 0;
    return cartItems.reduce(
      (acc, item) => acc + Number(item?.quantity || 1),
      0,
    );
  };

  const [cartCount, setCartCount] = useState(getLocalCartCount());

  const [toggle, setToggle] = React.useState(false);
  const [toogleProfile, setToogleProfile] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [SignInUp, setSignInUp] = React.useState(false);
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

  const handleToogleSignInUp = () => {
    if (isAuthenticated()) {
      setToogleProfile((prev) => !prev);
      setOpenSearch(false);
      setToggle(false);
      return;
    }
    setSignInUp(true);
  };

  const handleCloseSignInUp = () => {
    setSignInUp(false);
  };

  const handleSignOut = () => {
    clearAuthStorage();
    setToogleProfile(false);
    setSignInUp(false);
    router.push("/");
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setCartCount(getLocalCartCount());
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();
        let data = {};

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = {};
          }
        }

        if (!response.ok) {
          setCartCount(getLocalCartCount());
          return;
        }

        const countFromSummary = Number(data?.summary?.items_count);
        const countFromRoot = Number(data?.items_count);
        const countFromItems = Array.isArray(data?.items)
          ? data.items.reduce(
              (acc, item) => acc + Number(item?.quantity || 1),
              0,
            )
          : NaN;

        const candidates = [countFromSummary, countFromRoot, countFromItems];
        const resolvedCount = candidates.find(
          (value) => Number.isFinite(value) && value >= 0,
        );

        setCartCount(
          Number.isFinite(resolvedCount) ? resolvedCount : getLocalCartCount(),
        );
      } catch {
        setCartCount(getLocalCartCount());
      }
    };

    fetchCartCount();

    const handleOpenAuthModal = () => {
      if (isAuthenticated()) {
        return;
      }
      setSignInUp(true);
      setToogleProfile(false);
      setOpenSearch(false);
      setToggle(false);
    };

    const handleCartUpdated = (event) => {
      const nextCount = Number(event?.detail?.count);
      if (!Number.isNaN(nextCount)) {
        setCartCount(nextCount);
        return;
      }

      fetchCartCount();
    };

    window.addEventListener(AUTH_MODAL_EVENT, handleOpenAuthModal);
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);

    return () => {
      window.removeEventListener(AUTH_MODAL_EVENT, handleOpenAuthModal);
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
    };
  }, [cartItems]);

  const displayedCartCount = cartCount;

  // const handleToogleDetails = () => {
  //   setToogleProfile((prev) => !prev); laterrrrrrrrrrrrr
  //   setOpenSearch(false);
  //   setToggle(false);
  // };

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
    <nav className="sticky top-0 z-50 select-none border-b border-emerald-100/80 bg-[#f7fbf6]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-3 px-3 py-3 md:px-6 md:py-4 xl:px-10">
        <Link href="/" className="shrink-0">
          <img
            src="/logo.png"
            alt="gachpala_logo"
            className="w-24 md:w-30 lg:w-34 xl:w-36"
          />
        </Link>

        <div className="hidden items-center rounded-full border border-emerald-200 bg-white px-2 py-1 shadow-sm md:flex">
          <Link
            href="/"
            onClick={handleClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-[#40564a] transition hover:bg-[#eaf5ee] hover:text-[#1f7a4d]"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={handleClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-[#40564a] transition hover:bg-[#eaf5ee] hover:text-[#1f7a4d]"
          >
            About
          </Link>
          <Link
            href="/shop"
            onClick={handleClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-[#40564a] transition hover:bg-[#eaf5ee] hover:text-[#1f7a4d]"
          >
            Shop
          </Link>
          <a
            href="mailto:gachpala.business@gmail.com?subject=Inquiry%20from%20Gachpala&body=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20products."
            onClick={handleClose}
            className="ml-1 rounded-full bg-[#00bf63] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00a757]"
          >
            Contact
          </a>
        </div>

        <ul className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
          <li>
            <button
              type="button"
              onClick={handleOpenSearch}
              aria-label="Open search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#4e6559] transition hover:border-[#00be62] hover:text-[#00be62] md:h-10 md:w-10"
            >
              <GoSearch className="text-[18px]" />
            </button>
          </li>

          <li className="relative">
            <button
              onClick={handleToogleSignInUp}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#4e6559] transition hover:border-[#00be62] hover:text-[#00be62] md:h-10 md:w-10"
              aria-label="Open account options"
            >
              <BiUser className="text-[20px]" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{
                opacity: toogleProfile ? 1 : 0,
                scale: toogleProfile ? 1 : 0.95,
                y: toogleProfile ? 0 : -10,
                display: toogleProfile ? "block" : "none",
              }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl z-50 origin-top-right"
            >
              <div className="border-b border-gray-50 bg-gray-50/50 p-4">
                <p className={`${inter.className} font-bold text-gray-900`}>
                  Sakib Al Hasan
                </p>
                <p className={`${openSans.className} text-xs text-gray-500`}>
                  sakib@example.com
                </p>
              </div>

              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setToogleProfile(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
                >
                  <BiUser /> My Profile
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setToogleProfile(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
                >
                  <HiOutlineShoppingBag /> My Orders
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <FiLogOut /> Sign Out
                </button>
              </div>
            </motion.div>
          </li>

          <li>
            <Link
              href="/favourite"
              aria-label="Go to favorites"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#4e6559] transition hover:border-[#00be62] hover:text-[#00be62] md:h-10 md:w-10"
            >
              <FaRegHeart className="text-[18px]" />
            </Link>
          </li>

          <li className="relative">
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#4e6559] transition hover:border-[#00be62] hover:text-[#00be62] md:h-10 md:w-10"
              aria-label="Go to cart"
            >
              <HiOutlineShoppingBag className="text-[19px]" />
              <div className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#588456] text-[10px] text-white md:h-5 md:w-5 md:text-[11px]">
                <span suppressHydrationWarning>{displayedCartCount}</span>
              </div>
            </Link>
          </li>

          <li className="md:hidden">
            <button
              type="button"
              onClick={handleToggle}
              aria-label="Toggle mobile menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#4e6559]"
            >
              <CiMenuBurger className="text-[18px]" />
            </button>
          </li>
        </ul>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: toggle ? "auto" : 0,
            opacity: toggle ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="absolute left-0 right-0 top-full overflow-hidden border-t border-emerald-100 bg-white shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-1 p-4">
            <Link
              href="/"
              onClick={handleClose}
              className="rounded-xl px-3 py-2 text-sm font-medium text-[#3f5649] hover:bg-[#edf7f1]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={handleClose}
              className="rounded-xl px-3 py-2 text-sm font-medium text-[#3f5649] hover:bg-[#edf7f1]"
            >
              About
            </Link>
            <Link
              href="/shop"
              onClick={handleClose}
              className="rounded-xl px-3 py-2 text-sm font-medium text-[#3f5649] hover:bg-[#edf7f1]"
            >
              Shop
            </Link>
            <a
              href="mailto:gachpala.business@gmail.com?subject=Inquiry%20from%20Gachpala&body=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20products."
              onClick={handleClose}
              className="mt-1 rounded-xl bg-[#00bf63] px-3 py-2 text-center text-sm font-semibold text-white hover:bg-[#00a757]"
            >
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: openSearch ? "auto" : 0,
            opacity: openSearch ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="absolute left-0 top-full w-full overflow-hidden border-t border-emerald-100 bg-white shadow-lg z-40"
        >
          <div className="flex items-center justify-center px-4 py-5 md:px-8 lg:px-10 xl:px-10">
            <div className="relative flex w-full max-w-2xl items-center">
              <LiaSearchSolid className="absolute left-4 text-lg text-gray-400" />
              <input
                type="text"
                placeholder="Search for plants..."
                className={`${openSans.className} w-full rounded-full bg-gray-50 py-3 pl-11 pr-10 text-base text-gray-700 outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-green-500/20`}
              />
              <button
                type="button"
                className="absolute right-4"
                onClick={() => setOpenSearch(false)}
                aria-label="Close search"
              >
                <FiX className="text-lg text-gray-400 transition-colors hover:text-red-500" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <SignInUpPage isOpen={SignInUp} onClose={handleCloseSignInUp} />
    </nav>
  );
}
