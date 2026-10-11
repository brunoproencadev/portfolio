import type { MetadataRoute } from "next";
import { publication } from "@/config/site";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!publication.indexable) return [];
  return ["/", ...projects.map(({ slug }) => `/projetos/${slug}`)].map(
    (path) => ({ url: new URL(path, publication.url).href }),
  );
}
