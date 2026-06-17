"use client";

import { API_BASE_URL } from "@/app/config";

export const AUTH_MODAL_EVENT = "gachpala:open-auth-modal";
export const AUTH_CHANGED_EVENT = "gachpala:auth-changed";
export const SESSION_EXPIRED_EVENT = "gachpala:session-expired";

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

/**
 * Decode a JWT and return true if it carries an `exp` claim that is already
 * in the past. Tokens without a readable `exp` are treated as non-expired so
 * we never lock out a valid session on a parsing quirk.
 */
const isTokenExpired = (token) => {
  try {
    const [, payload] = token.split(".");
    if (!payload) return false;
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (!decoded?.exp) return false;
    return decoded.exp * 1000 <= Date.now();
  } catch {
    return false;
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  // Authentication is gated solely on a present, non-expired auth token.
  // Stale keys (currentUser, isLoggedIn, ...) left over from an incomplete
  // logout must NOT count as authenticated, or guarded routes loop on 401.
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;

  return !isTokenExpired(token);
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

/**
 * Force-logout the user: clear all auth data, fire the auth-changed event,
 * and redirect to the home page. This is used when the backend returns 401.
 */
export const forceLogout = () => {
  if (typeof window === "undefined") return;

  clearAuthStorage();
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");

  window.dispatchEvent(
    new CustomEvent(AUTH_CHANGED_EVENT, {
      detail: { authenticated: false, reason: "session_expired" },
    }),
  );

  window.dispatchEvent(
    new CustomEvent(SESSION_EXPIRED_EVENT, {
      detail: { timestamp: Date.now() },
    }),
  );

  // Redirect to home page
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};

/**
 * Full logout: call the backend /users/logout endpoint to invalidate the
 * server-side session, then clear local auth state.  This is the single
 * function that NavBar, Profile, etc. should call for manual sign-out.
 */
export const performLogout = async () => {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // ignore logout network errors
    }
  }

  clearAuthStorage();
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");

  window.dispatchEvent(
    new CustomEvent(AUTH_CHANGED_EVENT, {
      detail: { authenticated: false },
    }),
  );
};


/**
 * Install a global fetch interceptor that catches 401 responses from
 * authenticated API calls and triggers an automatic logout.
 *
 * Call this ONCE at app startup (e.g. in a root-level client component).
 * The interceptor is debounced so that parallel 401 responses don't
 * trigger multiple logouts.
 */
let _interceptorInstalled = false;

export const setupAuthInterceptor = () => {
  if (typeof window === "undefined") return;
  if (_interceptorInstalled) return;
  _interceptorInstalled = true;

  const originalFetch = window.fetch;
  let _logoutScheduled = false;

  window.fetch = async function patchedFetch(input, init) {
    const response = await originalFetch.call(this, input, init);

    // Only intercept authenticated requests to our own API
    const url = typeof input === "string" ? input : input?.url || "";
    const isOurApi = url.startsWith(API_BASE_URL);
    const hasAuthHeader =
      init?.headers?.Authorization ||
      init?.headers?.authorization ||
      (init?.headers instanceof Headers &&
        init.headers.has("Authorization"));

    if (response.status === 401 && isOurApi && hasAuthHeader) {
      // Skip if we're on a login/register endpoint (401 there means bad creds, not expired session)
      const isAuthEndpoint =
        url.includes("/login") || url.includes("/register");

      if (!isAuthEndpoint && !_logoutScheduled) {
        _logoutScheduled = true;

        // Small delay to let the calling code receive the response,
        // then trigger logout
        setTimeout(() => {
          forceLogout();
          _logoutScheduled = false;
        }, 100);
      }
    }

    return response;
  };
};
