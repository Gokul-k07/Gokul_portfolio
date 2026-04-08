import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gokulk.vercel.app/"; //getSiteUrl();
  const lastModified = new Date();

  const projectUrls = getAllProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
