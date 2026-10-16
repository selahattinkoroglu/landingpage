import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://konyaarazozkiralama.com",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
