const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gachpala.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep authenticated/transactional pages out of the index.
      disallow: ["/checkout", "/cart", "/profile", "/favourite", "/signInUp"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
