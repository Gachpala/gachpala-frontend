"use client";
import { arapey, inter, openSans } from "@/lib/fonts";
import { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { API_BASE_URL } from "@/app/config";
import {
  AUTH_CHANGED_EVENT,
  AUTH_TOKEN_KEY,
  isAuthenticated,
} from "@/lib/authGate";
import { useRouter } from "next/navigation";

const inputClassName =
  "w-full rounded-xl border border-[#cde1d2] bg-white/90 px-4 py-3 text-sm text-[#1f2f26] outline-none transition placeholder:text-[#7a8a81] focus:border-[#00be62] focus:ring-2 focus:ring-[#00be62]/15";

function SignInUpPageComponent({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);
  const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false);
  const [signUpConfirmVisible, setSignUpConfirmVisible] = useState(false);
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpAddress, setSignUpAddress] = useState("");
  const [signUpCity, setSignUpCity] = useState("");
  const [signUpDivision, setSignUpDivision] = useState("");
  const [signUpPostalCode, setSignUpPostalCode] = useState("");
  const [signUpCountry, setSignUpCountry] = useState("Bangladesh");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const isModalMode = typeof isOpen === "boolean";
  const router = useRouter();

  const switchTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const toggleSignInPassword = useCallback(() => {
    setSignInPasswordVisible((prev) => !prev);
  }, []);

  const toggleSignUpPassword = useCallback(() => {
    setSignUpPasswordVisible((prev) => !prev);
  }, []);

  const toggleSignUpConfirmPassword = useCallback(() => {
    setSignUpConfirmVisible((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setHasSession(loggedIn);

    if (!loggedIn) return;

    if (isModalMode) {
      onClose?.();
      return;
    }

    router.replace("/");
  }, [isModalMode, isOpen, onClose, router]);

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();

      const email = signInEmail.trim();
      const password = signInPassword;

      if (!email || !password) {
        setSignInError("Email and password are required.");
        setSignInSuccess("");
        return;
      }

      try {
        setIsSigningIn(true);
        setSignInError("");
        setSignInSuccess("");

        const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
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
          const message =
            data?.message || data?.error || `Login failed (${response.status})`;
          throw new Error(message);
        }

        const token = data?.token;
        if (!token) {
          throw new Error("Login succeeded but token was not returned.");
        }

        const userProfile = {
          name: String(data?.name || "").trim(),
          email: String(data?.email || email).trim(),
        };

        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem("currentUser", JSON.stringify(userProfile));
        localStorage.setItem("user_name", userProfile.name);
        localStorage.setItem("user_email", userProfile.email);
        setHasSession(true);
        setSignInSuccess("Signed in successfully.");
        setSignInEmail("");
        setSignInPassword("");

        window.dispatchEvent(
          new CustomEvent(AUTH_CHANGED_EVENT, {
            detail: { authenticated: true, user: userProfile },
          }),
        );

        if (isModalMode) {
          setTimeout(() => {
            handleClose();
          }, 300);
        } else {
          setTimeout(() => {
            router.replace("/");
          }, 300);
        }
      } catch (error) {
        setSignInError(error?.message || "Unable to sign in.");
      } finally {
        setIsSigningIn(false);
      }
    },
    [handleClose, isModalMode, router, signInEmail, signInPassword],
  );

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();

      const payload = {
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        password: signUpPassword,
        phone: signUpPhone.trim(),
        address: signUpAddress.trim(),
        city: signUpCity.trim(),
        division: signUpDivision.trim(),
        postal_code: signUpPostalCode.trim(),
        country: signUpCountry.trim(),
      };

      if (
        !payload.name ||
        !payload.email ||
        !payload.password ||
        !payload.phone ||
        !payload.address ||
        !payload.city ||
        !payload.division ||
        !payload.postal_code ||
        !payload.country
      ) {
        setSignUpError("All fields are required.");
        setSignUpSuccess("");
        return;
      }

      if (signUpPassword !== signUpConfirmPassword) {
        setSignUpError("Password and confirm password must match.");
        setSignUpSuccess("");
        return;
      }

      try {
        setIsSigningUp(true);
        setSignUpError("");
        setSignUpSuccess("");

        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
          const message =
            data?.message ||
            data?.error ||
            `Registration failed (${response.status})`;
          throw new Error(message);
        }

        setSignUpSuccess("Registration successful.");
        setSignUpName("");
        setSignUpEmail("");
        setSignUpPassword("");
        setSignUpConfirmPassword("");
        setSignUpPhone("");
        setSignUpAddress("");
        setSignUpCity("");
        setSignUpDivision("");
        setSignUpPostalCode("");
        setSignUpCountry("Bangladesh");

        setSignInSuccess("Registration successful. Please sign in.");
        setSignInError("");
        setActiveTab("signin");
      } catch (error) {
        setSignUpError(error?.message || "Unable to register.");
      } finally {
        setIsSigningUp(false);
      }
    },
    [
      signUpAddress,
      signUpCity,
      signUpConfirmPassword,
      signUpCountry,
      signUpDivision,
      signUpEmail,
      signUpName,
      signUpPassword,
      signUpPhone,
      signUpPostalCode,
    ],
  );

  if (hasSession) {
    return null;
  }

  const content = (
    <main
      className={`relative overflow-hidden ${
        isModalMode
          ? "bg-transparent px-0 py-0"
          : "min-h-screen bg-[#f4f6ef] px-4 py-20 md:px-6 md:py-24"
      }`}
    >
      {!isModalMode ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(4,129,66,0.18),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(10,85,48,0.16),transparent_38%),linear-gradient(180deg,#f8fbf6_0%,#eef2e8_100%)]" />
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border border-[#00be62] opacity-60" />
          <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full border border-[#00be62] opacity-60" />
        </>
      ) : null}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl overflow-hidden rounded-4xl border border-[#cfddd0] bg-white/85 shadow-[0_35px_70px_-42px_rgba(17,40,27,0.55)] backdrop-blur-sm lg:grid-cols-2">
        {isModalMode ? (
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 rounded-full border border-[#00be62] bg-white/90 p-1.5 text-[#4c6458] transition hover:bg-[#00be62] hover:text-white"
            aria-label="Close authentication modal"
          >
            <IoCloseSharp size={18} />
          </button>
        ) : null}

        <aside className="relative hidden bg-[linear-gradient(145deg,#153725_0%,#24563b_55%,#2f7650_100%)] p-10 text-white lg:block">
          <div className="absolute -top-12 right-8 h-36 w-36 rounded-full border border-white/25" />
          <div className="absolute bottom-12 -left-8 h-24 w-24 rounded-full border border-white/20" />

          <Image
            src="/logo.png"
            alt="Gachpala logo"
            width={152}
            height={61}
            priority
          />
          <p
            className={`${inter.className} mt-10 text-xs uppercase tracking-[0.2em] text-[#afd4be]`}
          >
            Gachpala Membership
          </p>
          <h1 className={`${arapey.className} mt-4 text-5xl leading-[1.05]`}>
            Grow a greener
            <br />
            everyday life.
          </h1>
          <p
            className={`${openSans.className} mt-6 max-w-sm text-sm leading-7 text-[#d7e8de]`}
          >
            Create your account to track orders, save favorites, and get plant
            care recommendations tailored to your collection.
          </p>

          <div className="mt-10 space-y-3 text-sm text-[#dbebe1]">
            <p>Premium plant selections</p>
            <p>Faster checkout experience</p>
            <p>Personalized botanical support</p>
          </div>
        </aside>

        <section className="p-6 sm:p-10 md:p-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p
                className={`${inter.className} text-xs uppercase tracking-[0.18em] text-[#377e57]`}
              >
                Account
              </p>
              <h2
                className={`${inter.className} mt-2 text-2xl text-[#1d2f24] sm:text-3xl`}
              >
                {activeTab === "signin" ? "Welcome Back" : "Create Account"}
              </h2>
            </div>
            <Link
              href="/"
              className={`${openSans.className} text-sm text-[#4f6358] hover:text-[#00be62]`}
            >
              {isModalMode ? "Home" : "Back to Home"}
            </Link>
          </div>

          <div className="mb-8 grid grid-cols-2 rounded-2xl border border-[#d7e5d9] bg-[#f4f8f4] p-1.5">
            <button
              type="button"
              onClick={() => switchTab("signin")}
              className={`${inter.className} rounded-xl px-4 py-2.5 text-sm transition ${
                activeTab === "signin"
                  ? "bg-[#00be62] text-white"
                  : "text-[#4f6257] hover:bg-white/70"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchTab("signup")}
              className={`${inter.className} rounded-xl px-4 py-2.5 text-sm transition ${
                activeTab === "signup"
                  ? "bg-[#00be62] text-white"
                  : "text-[#4f6257] hover:bg-white/70"
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "signin" ? (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email Address"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className={inputClassName}
              />
              <div className="relative">
                <input
                  type={signInPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={toggleSignInPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#648073] hover:text-[#00be62]"
                >
                  {signInPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label
                  className={`${openSans.className} flex items-center gap-2 text-[#5b6d63]`}
                >
                  <input type="checkbox" className="h-4 w-4 accent-[#00be62]" />
                  Remember me
                </label>
                <button
                  type="button"
                  className={`${openSans.className} text-[#00be62] hover:underline`}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSigningIn}
                className={`${inter.className} mt-2 w-full rounded-xl bg-[#00be62] px-5 py-3 text-sm tracking-widest text-white transition hover:bg-[#00a757]`}
              >
                {isSigningIn ? "SIGNING IN..." : "SIGN IN"}
              </button>

              {signInError ? (
                <p className={`${openSans.className} text-sm text-red-600`}>
                  {signInError}
                </p>
              ) : null}

              {signInSuccess ? (
                <p className={`${openSans.className} text-sm text-[#00be62]`}>
                  {signInSuccess}
                </p>
              ) : null}

              <p
                className={`${openSans.className} pt-3 text-center text-sm text-[#5e7166]`}
              >
                New to Gachpala?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("signup")}
                  className={`${inter.className} text-[#00be62] hover:underline`}
                >
                  Create an account
                </button>
              </p>
            </form>
          ) : (
            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={handleSignUp}
            >
              <input
                type="text"
                placeholder="Full Name"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className={inputClassName}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className={inputClassName}
              />

              <div className="relative sm:col-span-1">
                <input
                  type={signUpPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={toggleSignUpPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#648073] hover:text-[#00be62]"
                >
                  {signUpPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative sm:col-span-1">
                <input
                  type={signUpConfirmVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={toggleSignUpConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#648073] hover:text-[#00be62]"
                >
                  {signUpConfirmVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                value={signUpPhone}
                onChange={(e) => setSignUpPhone(e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="City"
                value={signUpCity}
                onChange={(e) => setSignUpCity(e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Division"
                value={signUpDivision}
                onChange={(e) => setSignUpDivision(e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={signUpPostalCode}
                onChange={(e) => setSignUpPostalCode(e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Country"
                value={signUpCountry}
                onChange={(e) => setSignUpCountry(e.target.value)}
                className={inputClassName}
              />
              <input
                type="text"
                placeholder="Address"
                value={signUpAddress}
                onChange={(e) => setSignUpAddress(e.target.value)}
                className={`${inputClassName} sm:col-span-2`}
              />

              <label
                className={`${openSans.className} sm:col-span-2 flex items-start gap-2 text-sm text-[#5b6d63]`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-[#00be62]"
                />
                I agree to the terms and privacy policy.
              </label>

              <button
                type="submit"
                disabled={isSigningUp}
                className={`${inter.className} sm:col-span-2 mt-1 w-full rounded-xl bg-[#00be62] px-5 py-3 text-sm tracking-widest text-white transition hover:bg-[#00a757] disabled:opacity-60`}
              >
                {isSigningUp ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>

              {signUpError ? (
                <p
                  className={`${openSans.className} sm:col-span-2 text-sm text-red-600`}
                >
                  {signUpError}
                </p>
              ) : null}

              {signUpSuccess ? (
                <p
                  className={`${openSans.className} sm:col-span-2 text-sm text-[#00be62]`}
                >
                  {signUpSuccess}
                </p>
              ) : null}

              <p
                className={`${openSans.className} sm:col-span-2 text-center text-sm text-[#5e7166]`}
              >
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("signin")}
                  className={`${inter.className} text-[#00be62] hover:underline`}
                >
                  Sign in now
                </button>
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  );

  if (!isModalMode) {
    return content;
  }

  if (!portalReady) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-90 bg-transparent backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed inset-0 z-100 overflow-y-auto p-4 md:p-8 transition-opacity duration-300 flex items-center justify-center ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>
    </>,
    document.body,
  );
}

export default memo(SignInUpPageComponent);
