import type { Metadata } from "next";

export function publicationConfig(env: Record<string, string | undefined>) {
  const indexable = env.SITE_INDEXABLE === "true";
  if (env.SITE_INDEXABLE && !["true", "false"].includes(env.SITE_INDEXABLE)) {
    throw new Error("SITE_INDEXABLE must be true or false");
  }
  const url = env.SITE_URL ? new URL(env.SITE_URL) : undefined;
  if (
    url &&
    (url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "[::1]")
  ) {
    throw new Error("SITE_URL must be a public HTTPS origin");
  }
  if (indexable && !url) throw new Error("Indexing requires SITE_URL");
  // Vercel previews stay unindexed even when they inherit production env vars.
  return { url, indexable: indexable && env.VERCEL_ENV !== "preview" };
}

export const publication = publicationConfig(process.env);

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    metadataBase: publication.url,
    alternates: publication.url ? { canonical: path } : undefined,
    robots: { index: publication.indexable, follow: publication.indexable },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: "Bruno Proença Silva",
      url: publication.url ? path : undefined,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Bruno Proença Silva — Software, visão computacional e robótica.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
