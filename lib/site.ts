/** Canonical site URL for metadata, OG, and sitemap.
 *  Priority: NEXT_PUBLIC_SITE_URL env var → hardcoded production URL → localhost
 *  NOTE: Do NOT use VERCEL_URL — it resolves to the deployment preview URL, not production.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://gokulk.vercel.app";
}
