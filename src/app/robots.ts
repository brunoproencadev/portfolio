import type { MetadataRoute } from "next";
import { publication } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return publication.indexable
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: new URL("/sitemap.xml", publication.url).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
