"use client";
/* eslint-disable @next/next/no-img-element */
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { BiUser } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { FiLogOut, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LiaSearchSolid } from "react-icons/lia";
import { easeOut, motion, AnimatePresence } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SignInUpPage from "@/app/signInUp/page";
import { API_BASE_URL } from "@/app/config";
import {
  AUTH_CHANGED_EVENT,
  AUTH_MODAL_EVENT,
  AUTH_TOKEN_KEY,
  clearAuthStorage,
  isAuthenticated,
  performLogout,
} from "@/lib/authGate";

import { STATIC_PRODUCTS } from "@/data/staticProducts";

const CART_UPDATED_EVENT = "gachpala:cart-updated";

export default function Home() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.products.cart);
  const getStoredProfile = () => {
    if (typeof window === "undefined") {
      return { name: "", email: "" };
    }

    const decodeJwtPayload = (token) => {
      if (!token || typeof token !== "string") return null;

      const parts = token.split(".");
      if (parts.length < 2) return null;

      try {
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
        return JSON.parse(atob(padded));
      } catch {
        return null;
      }
    };

    const readUserObject = (key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return null;

        return {
          name: String(parsed?.name || "").trim(),
          email: String(parsed?.email || "").trim(),
        };
      } catch {
        return null;
      }
    };

    const profile = readUserObject("currentUser") || readUserObject("user");
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const payload = decodeJwtPayload(token);
    const storedName = String(localStorage.getItem("user_name") || "").trim();
    const storedEmail = String(localStorage.getItem("user_email") || "").trim();

    const nameFromStorage = String(profile?.name || "").trim();
    const emailFromStorage = String(profile?.email || "").trim();
    const nameFromToken = String(payload?.name || "").trim();
    const emailFromToken = String(payload?.email || "").trim();

    return {
      name: storedName || nameFromStorage || nameFromToken,
      email: storedEmail || emailFromStorage || emailFromToken,
    };
  };

  const getLocalCartCount = useCallback(() => {
    if (!Array.isArray(cartItems) || !cartItems.length) return 0;
    return cartItems.reduce(
      (acc, item) => acc + Number(item?.quantity || 1),
      0,
    );
  }, [cartItems]);

  // Initialize to SSR-safe defaults so the server and the client's first
  // render match. The mount effect below syncs the real values from
  // localStorage/API after hydration, avoiding a hydration mismatch.
  const [cartCount, setCartCount] = useState(0);
  const [profile, setProfile] = useState({ name: "", email: "" });

  const [toggle, setToggle] = React.useState(false);
  const [toogleProfile, setToogleProfile] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [SignInUp, setSignInUp] = React.useState(false);
  const [cachedProducts, setCachedProducts] = React.useState(STATIC_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = React.useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
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
    const willOpen = !openSearch;
    setOpenSearch(willOpen);
    setToogleProfile(false);
    setToggle(false);
    if (willOpen) {
      // Focus the input after the panel animates open
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  };

  // Fetch products once when search opens (cache for session)
  useEffect(() => {
    if (!openSearch) return;
    if (cachedProducts.length > 0) return;

    let cancelled = false;
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) return;
        const data = await response.json();
        const rows = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];
        if (!cancelled) {
          setCachedProducts(rows);
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setIsLoadingProducts(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [openSearch, cachedProducts.length]);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed || cachedProducts.length === 0) return [];

    return cachedProducts
      .filter((product) => {
        const haystacks = [
          product?.name,
          product?.description,
          product?.category_name,
        ]
          .filter(Boolean)
          .map((v) => String(v).toLowerCase());
        return haystacks.some((v) => v.includes(trimmed));
      })
      .slice(0, 8); // Limit to 8 results for UX
  }, [searchQuery, cachedProducts]);

  const hasSearchQuery = searchQuery.trim().length > 0;

  const handleSearchResultClick = useCallback(
    (productId) => {
      setOpenSearch(false);
      setSearchQuery("");
      router.push(`/productDetails?id=${productId}`);
    },
    [router],
  );

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    const destination = trimmed
      ? `/shop?search=${encodeURIComponent(trimmed)}`
      : "/shop";
    router.push(destination);
    setOpenSearch(false);
    setSearchQuery("");
    setToggle(false);
    setToogleProfile(false);
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

  const handleSignOut = async () => {
    await performLogout();
    setProfile({ name: "", email: "" });
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

    const hydrateProfileFromApi = async () => {
      if (typeof window === "undefined") return;
      if (!isAuthenticated()) return;

      const existingProfile = getStoredProfile();
      if (existingProfile.name && existingProfile.email) return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/users/`, {
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

        if (!response.ok) return;

        const user =
          data?.user && typeof data.user === "object" ? data.user : data;
        const name = String(user?.name || existingProfile.name || "").trim();
        const email = String(user?.email || existingProfile.email || "").trim();

        if (!name && !email) return;

        const nextProfile = { name, email };
        localStorage.setItem("currentUser", JSON.stringify(nextProfile));
        setProfile(nextProfile);
      } catch {
        // noop
      }
    };

    // Sync from localStorage now that we're on the client (post-hydration).
    setProfile(getStoredProfile());
    setCartCount(getLocalCartCount());
    fetchCartCount();
    hydrateProfileFromApi();

    const handleOpenAuthModal = () => {
      if (isAuthenticated()) {
        return;
      }
      setSignInUp(true);
      setToogleProfile(false);
      setOpenSearch(false);
      setToggle(false);
    };

    const handleAuthChanged = () => {
      setProfile(getStoredProfile());
      fetchCartCount();
      hydrateProfileFromApi();
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
    window.addEventListener(AUTH_CHANGED_EVENT, handleAuthChanged);
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);

    return () => {
      window.removeEventListener(AUTH_MODAL_EVENT, handleOpenAuthModal);
      window.removeEventListener(AUTH_CHANGED_EVENT, handleAuthChanged);
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
    };
  }, [cartItems, getLocalCartCount]);

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
          <h1>demo</h1>
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
              className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_20px_50px_-16px_rgba(17,42,28,0.35)] z-50 origin-top-right"
            >
              {/* Profile header */}
              <div className="border-b border-emerald-50 bg-gradient-to-br from-[#f7fbf6] to-[#edf7ef] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00be62] text-sm font-bold text-white">
                    {(profile.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`${inter.className} truncate font-semibold text-[#1b2b22]`}
                    >
                      {profile.name || "My Account"}
                    </p>
                    <p
                      className={`${openSans.className} truncate text-xs text-[#6b7c73]`}
                    >
                      {profile.email || "Signed in"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation links */}
              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setToogleProfile(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#3d4f46] transition-colors hover:bg-[#edf7ef] hover:text-[#1f7a4d]"
                >
                  <BiUser size={16} /> My Profile
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setToogleProfile(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#3d4f46] transition-colors hover:bg-[#edf7ef] hover:text-[#1f7a4d]"
                >
                  <HiOutlineShoppingBag size={16} /> All Orders
                </Link>
              </div>

              {/* Sign out */}
              <div className="border-t border-emerald-50 p-2">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <FiLogOut size={16} /> Sign Out
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

        {/* Search panel */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: openSearch ? "auto" : 0,
            opacity: openSearch ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="absolute left-0 top-full w-full overflow-hidden z-40"
        >
          <div className="mx-auto max-w-2xl px-4 py-5 md:px-8 lg:px-10">
            <form
              className="relative flex w-full items-center"
              onSubmit={handleSearchSubmit}
            >
              <LiaSearchSolid className="absolute left-4 text-lg text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for plants..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoComplete="off"
                className={`${openSans.className} w-full rounded-full bg-gray-50 py-3 pl-11 pr-28 text-base text-gray-700 outline-none transition-all placeholder-gray-400 focus:ring-2 focus:ring-green-500/20`}
              />
              <button
                type="submit"
                className="absolute right-12 rounded-full bg-[#00be62] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#00a757]"
              >
                Search
              </button>
              <button
                type="button"
                className="absolute right-4"
                onClick={() => {
                  setOpenSearch(false);
                  setSearchQuery("");
                }}
                aria-label="Close search"
              >
                <FiX className="text-lg text-gray-400 transition-colors hover:text-red-500" />
              </button>
            </form>

            {/* Live search results dropdown */}
            <AnimatePresence>
              {hasSearchQuery && (
                <motion.div
                  ref={searchResultsRef}
                  key="search-results"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="mt-3 max-h-[60vh] overflow-y-auto rounded-2xl border border-emerald-100 bg-white shadow-lg"
                >
                  {isLoadingProducts ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-8">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#00be62] border-t-transparent" />
                      <p
                        className={`${openSans.className} text-sm text-gray-500`}
                      >
                        Loading products...
                      </p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul className="divide-y divide-emerald-50">
                      {searchResults.map((product) => {
                        const imgSrc =
                          product.image_url ||
                          product.thumbnail ||
                          product.img ||
                          "/images/plant-placeholder.png";

                        return (
                          <li key={product.id}>
                            <button
                              type="button"
                              onClick={() =>
                                handleSearchResultClick(product.id)
                              }
                              className="flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-emerald-50/60 focus-visible:bg-emerald-50/60 focus-visible:outline-none"
                            >
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#f0f0f0]">
                                <img
                                  src={imgSrc}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "/plant-placeholder.png";
                                  }}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p
                                  className={`${inter.className} truncate text-sm font-semibold text-[#1f1f1f]`}
                                >
                                  {product.name}
                                </p>
                                <div className="mt-0.5 flex items-center gap-2">
                                  <span
                                    className={`${openSans.className} text-xs font-semibold text-[#00be62]`}
                                  >
                                    {product.price} BDT
                                  </span>
                                  {product.category_name && (
                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-[#4e6559]">
                                      {product.category_name}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <GoSearch className="shrink-0 text-gray-300" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p
                        className={`${inter.className} text-sm font-medium text-gray-500`}
                      >
                        No plants found for &ldquo;{searchQuery.trim()}&rdquo;
                      </p>
                      <p
                        className={`${openSans.className} mt-1 text-xs text-gray-400`}
                      >
                        Try a different keyword or browse the shop
                      </p>
                    </div>
                  )}

                  {/* View all results link */}
                  {searchResults.length > 0 && (
                    <div className="border-t border-emerald-100 px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          const trimmed = searchQuery.trim();
                          router.push(
                            trimmed
                              ? `/shop?search=${encodeURIComponent(trimmed)}`
                              : "/shop",
                          );
                          setOpenSearch(false);
                          setSearchQuery("");
                        }}
                        className={`${openSans.className} w-full rounded-xl bg-emerald-50 py-2 text-center text-xs font-semibold text-[#1f7a4d] transition hover:bg-emerald-100`}
                      >
                        View all results →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <SignInUpPage isOpen={SignInUp} onClose={handleCloseSignInUp} />
    </nav>
  );
}
