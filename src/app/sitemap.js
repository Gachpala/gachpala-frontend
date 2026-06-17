const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gachpala.com";

// Static, publicly indexable routes. Product/seller detail pages are
// query-param driven and excluded here; add a dynamic source if those
// move to path-based URLs.
const ROUTES = ["", "/shop", "/about", "/contact", "/ai"];

export default function sitemap() {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/shop" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
