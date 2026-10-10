import type { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = {
  // Preview remains unindexed until the production gate is approved.
  robots: { index: false, follow: false },
  title: "Bruno Proença Silva | Portfólio",
  description:
    "Software, visão computacional e robótica. Projetos de Bruno Proença Silva.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
