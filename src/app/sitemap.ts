import type { MetadataRoute } from "next";
import { publication } from "@/config/site";
import { caseProjects } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!publication.indexable) return [];
  return ["/", ...caseProjects.map(({ slug }) => `/projetos/${slug}`)].map(
    (path) => ({ url: new URL(path, publication.url).href }),
  );
}
