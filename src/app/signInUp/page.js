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

  const switchTab = useCallback((tab) => setActiveTab(tab), []);
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  const toggleSignInPassword = useCallback(
    () => setSignInPasswordVisible((p) => !p),
    [],
  );

  const toggleSignUpPassword = useCallback(
    () => setSignUpPasswordVisible((p) => !p),
    [],
  );

  const toggleSignUpConfirmPassword = useCallback(
    () => setSignUpConfirmVisible((p) => !p),
    [],
  );

  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setHasSession(loggedIn);

    if (!loggedIn) return;

    if (isModalMode) {
      onClose?.();
    } else {
      router.replace("/");
    }
  }, [isModalMode, onClose, router]);

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();

      const email = signInEmail.trim();
      const password = signInPassword;

      if (!email || !password) {
        setSignInError("Email and password are required.");
        return;
      }

      try {
        setIsSigningIn(true);
        setSignInError("");

        const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data?.message || "Login failed");

        localStorage.setItem(AUTH_TOKEN_KEY, data.token);

        setSignInSuccess("Signed in successfully.");

        window.dispatchEvent(
          new CustomEvent(AUTH_CHANGED_EVENT, {
            detail: { authenticated: true },
          }),
        );

        setTimeout(() => router.replace("/"), 300);
      } catch (err) {
        setSignInError(err.message);
      } finally {
        setIsSigningIn(false);
      }
    },
    [signInEmail, signInPassword, router],
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
      };

      if (
        !payload.name ||
        !payload.email ||
        !payload.password ||
        !payload.phone ||
        !payload.address
      ) {
        setSignUpError("All fields are required.");
        return;
      }

      if (signUpPassword !== signUpConfirmPassword) {
        setSignUpError("Passwords do not match.");
        return;
      }

      try {
        setIsSigningUp(true);
        setSignUpError("");

        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data?.message || "Registration failed");

        setSignUpSuccess("Registration successful. Please sign in.");

        setSignUpName("");
        setSignUpEmail("");
        setSignUpPassword("");
        setSignUpConfirmPassword("");
        setSignUpPhone("");
        setSignUpAddress("");

        setActiveTab("signin");
      } catch (err) {
        setSignUpError(err.message);
      } finally {
        setIsSigningUp(false);
      }
    },
    [
      signUpName,
      signUpEmail,
      signUpPassword,
      signUpConfirmPassword,
      signUpPhone,
      signUpAddress,
    ],
  );

  if (hasSession) return null;

  const content = (
    <main className="min-h-screen bg-[#f4f6ef] px-4 py-20">
      <div className="mx-auto max-w-6xl bg-white/90 p-8 rounded-3xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl">
            {activeTab === "signin" ? "Welcome Back" : "Create Account"}
          </h2>
          <Link href="/">Home</Link>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => switchTab("signin")}>Sign In</button>
          <button onClick={() => switchTab("signup")}>Sign Up</button>
        </div>

        {activeTab === "signin" ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              className={inputClassName}
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />

            <input
              className={inputClassName}
              type={signInPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />

            <button type="submit" disabled={isSigningIn}>
              {isSigningIn ? "Signing in..." : "Sign In"}
            </button>

            {signInError && <p>{signInError}</p>}
            {signInSuccess && <p>{signInSuccess}</p>}
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              className={inputClassName}
              placeholder="Full Name"
              value={signUpName}
              onChange={(e) => setSignUpName(e.target.value)}
            />
            <input
              className={inputClassName}
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <input
              className={inputClassName}
              placeholder="Phone"
              value={signUpPhone}
              onChange={(e) => setSignUpPhone(e.target.value)}
            />
            <input
              className={inputClassName}
              placeholder="Address"
              value={signUpAddress}
              onChange={(e) => setSignUpAddress(e.target.value)}
            />

            <input
              className={inputClassName}
              type={signUpPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <input
              className={inputClassName}
              type={signUpConfirmVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={signUpConfirmPassword}
              onChange={(e) => setSignUpConfirmPassword(e.target.value)}
            />

            <button type="submit" disabled={isSigningUp}>
              {isSigningUp ? "Creating..." : "Create Account"}
            </button>

            {signUpError && <p>{signUpError}</p>}
            {signUpSuccess && <p>{signUpSuccess}</p>}
          </form>
        )}
      </div>
    </main>
  );

  if (!isModalMode) return content;
  if (!portalReady) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/40" onClick={handleClose} />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>
    </>,
    document.body,
  );
}

export default memo(SignInUpPageComponent);
