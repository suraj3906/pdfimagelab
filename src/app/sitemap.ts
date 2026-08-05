import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/pdf-tools",
    "/pdf-tools/merge-pdf",
    "/pdf-tools/compress-pdf",
    "/pdf-tools/split-pdf",
    "/pdf-tools/rotate-pdf",
    "/pdf-tools/delete-pages",
    "/pdf-tools/image-to-pdf",
    "/image-tools",
    "/image-tools/compress-image",
    "/image-tools/resize-image",
    "/image-tools/convert-image",
    "/calculators",
    "/calculators/percentage",
    "/blog",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
