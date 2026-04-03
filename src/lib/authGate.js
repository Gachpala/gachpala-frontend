"use client";

export const AUTH_MODAL_EVENT = "gachpala:open-auth-modal";
export const AUTH_CHANGED_EVENT = "gachpala:auth-changed";

export const AUTH_TOKEN_KEY = "user_token";

const STORAGE_KEYS = [
  AUTH_TOKEN_KEY,
  "authToken",
  "token",
  "accessToken",
  "user",
  "currentUser",
  "isLoggedIn",
];

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  return STORAGE_KEYS.some((key) => {
    const value = localStorage.getItem(key);
    if (!value) return false;

    if (key === "isLoggedIn") {
      return value === "true";
    }

    if (key === "user" || key === "currentUser") {
      try {
        const parsed = JSON.parse(value);
        return Boolean(parsed);
      } catch {
        return value.length > 0;
      }
    }

    return value.length > 0;
  });
};

export const openAuthModal = (source = "unknown") => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(AUTH_MODAL_EVENT, {
      detail: { source },
    }),
  );
};

export const requireAuthOrRun = (action, source = "unknown") => {
  if (!isAuthenticated()) {
    openAuthModal(source);
    return false;
  }

  action?.();
  return true;
};

export const clearAuthStorage = () => {
  if (typeof window === "undefined") return;

  STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
};
