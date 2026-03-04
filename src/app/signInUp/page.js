"use client";
import { inter, openSans } from "@/lib/fonts";
import { useState, useCallback, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const FaEye = dynamic(
  () => import("react-icons/fa").then((mod) => ({ default: mod.FaEye })),
  { ssr: false },
);
const FaEyeSlash = dynamic(
  () => import("react-icons/fa").then((mod) => ({ default: mod.FaEyeSlash })),
  { ssr: false },
);
const IoCloseSharp = dynamic(
  () =>
    import("react-icons/io5").then((mod) => ({ default: mod.IoCloseSharp })),
  { ssr: false },
);

const inputClassName =
  "w-full p-3 rounded-xl bg-white border-2 border-green-700/30 focus:border-green-700/80 focus:outline-0 mb-4";

function SignInUpPageComponent({ isOpen = true, onClose }) {
  const [switched, setSwitched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToogleSwitch = useCallback(() => {
    setSwitched((prev) => !prev);
  }, []);

  const handlePasswordToggle = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handleClosePage = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 transition-opacity duration-300 backdrop-blur-md z-50 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClosePage}
        id="clickOutside"
      ></div>

      <div
        id="signCover"
        className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[900px] w-fit mx-auto rounded-xl overflow-hidden transition-opacity duration-300 z-50 will-change-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" relative ">
          <div
            className={`w-[550px] mx-auto pt-20 pb-5 bg-[#ffffff] p-4 rounded-lg z-50 transition-transform duration-500 ease-in-out border-2 border-green-700/40 drop-shadow-xl drop-shadow-green-700/20 will-change-transform ${switched ? "translate-y-[-120%] duration-300 ease-out " : " translate-y-[20%] "} relative `}
          >
            <div>
              <Image
                src="/logo.png"
                alt="gachpala-logo"
                width={160}
                height={64}
                priority
                className="mx-auto"
              />
              <p
                className={` ${openSans.className} font-bold text-xl mt-4 text-center `}
              >
                Welcome back <br /> Lets grow together
              </p>
            </div>
            <form className=" mt-15 ">
              <input
                type="email"
                placeholder="Email"
                className={inputClassName}
              />
              <div className="relative flex items-center">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={` ${inputClassName} mb-0! `}
                />
                {isPasswordVisible ? (
                  <FaEyeSlash
                    onClick={handlePasswordToggle}
                    className="absolute right-4 top-0 cursor-pointer hover:text-gray-600"
                  />
                ) : (
                  <FaEye
                    onClick={handlePasswordToggle}
                    className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer hover:text-gray-600"
                  />
                )}
              </div>

              <button
                className=" w-full px-5 bg-green-600 text-white p-3 rounded-full mt-4
           hover:bg-green-700 transition-colors duration-300 select-none cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <div className=" flex justify-center items-center gap-1 mt-10 ">
              <div className=" h-0.5 w-full bg-black/50 "></div>
              <p className={` ${inter.className} text-center  `}>or</p>
              <div className=" h-0.5 w-full bg-black/50 "></div>
            </div>
            <div className=" flex justify-center items-center mt-15 ">
              <p>
                Don't have an account?
                <button
                  onClick={handleToogleSwitch}
                  className={` ${inter.className} font-bold text-green-600 ml-2 underline select-none cursor-pointer `}
                >
                  Sign Up
                </button>
              </p>
            </div>
            <button
              onClick={handleClosePage}
              className=" absolute right-4 top-4 bg-white p-1 rounded-full cursor-pointer select-none hover:bg-green-600 duration-300 ease-out "
            >
              <IoCloseSharp className=" text-[16px] text-lack  " />
            </button>
          </div>

          {/* sign up */}
          <div
            className={` w-[1000] mx-auto pt-10 pb-5 bg-[#ffffff] px-4 rounded-lg z-50 transition-transform duration-500 ease-in-out border-2 border-green-700 will-change-transform ${switched ? "translate-y-[-70%] duration-300 ease-out " : "translate-y-[120%]"} relative`}
          >
            <div>
              <Image
                src="/logo.png"
                alt="gachpala-logo"
                width={160}
                height={64}
                priority
                className="mx-auto"
              />
              <p
                className={` ${openSans.className} font-bold text-xl mt-4 text-center `}
              >
                Your journey starts here <br /> Take the first step
              </p>
            </div>
            <form className=" mt-15 grid grid-cols-2 gap-x-4 p-2 ">
              <input
                type="text"
                placeholder="Name"
                className={inputClassName}
              />
              <input
                type="email"
                placeholder="Email"
                className={inputClassName}
              />
              <div className=" relative mb-4 ">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={` ${inputClassName} mb-0! `}
                />
                {isPasswordVisible ? (
                  <FaEyeSlash
                    onClick={handlePasswordToggle}
                    className=" absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer hover:text-gray-600"
                  />
                ) : (
                  <FaEye
                    onClick={handlePasswordToggle}
                    className=" absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer hover:text-gray-600"
                  />
                )}
              </div>
              <div className="relative flex items-center mb-4">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={` ${inputClassName} mb-0! `}
                />
                {isPasswordVisible ? (
                  <FaEyeSlash
                    onClick={handlePasswordToggle}
                    className="absolute right-4 cursor-pointer hover:text-gray-600"
                  />
                ) : (
                  <FaEye
                    onClick={handlePasswordToggle}
                    className="absolute right-4 cursor-pointer hover:text-gray-600"
                  />
                )}
              </div>
              <input
                type="number"
                placeholder="Phone Number"
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Address"
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="City"
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Division"
                className={inputClassName}
              />
              <input
                type="number"
                placeholder="Postal Code"
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Country"
                className={inputClassName}
              />
            </form>
            <button
              className="w-full px-5 bg-green-600 text-white p-3 rounded-full mt-4
                hover:bg-green-700 transition-colors duration-300 select-none cursor-pointer"
            >
              Sign Up
            </button>
            <div className=" flex justify-center items-center gap-1 mt-5 ">
              <div className=" h-0.5 w-full bg-black/50 "></div>
              <p className={` ${inter.className} text-center  `}>or</p>
              <div className=" h-0.5 w-full bg-black/50 "></div>
            </div>
            <div className=" flex justify-center items-center mt-15 ">
              <p>
                Already have an account?
                <button
                  onClick={handleToogleSwitch}
                  className={` ${inter.className} font-bold text-green-600 ml-2 underline select-none cursor-pointer `}
                >
                  Sign In
                </button>
              </p>
            </div>
            <button
              onClick={handleClosePage}
              className=" absolute right-4 top-4 bg-white p-1 rounded-full cursor-pointer select-none hover:bg-green-600 duration-300 ease-out "
            >
              <IoCloseSharp className=" text-[16px] text-lack  " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SignInUpPageComponent);
