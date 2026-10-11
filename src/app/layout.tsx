import { pageMetadata } from "@/config/site";
import "@/styles/globals.css";
export const metadata = pageMetadata(
  "Bruno Proença Silva | Portfólio",
  "Software, visão computacional e robótica. Projetos de Bruno Proença Silva.",
  "/",
);
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
