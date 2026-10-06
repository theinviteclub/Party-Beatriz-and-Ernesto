import type { Metadata } from "next";
import "./globals.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const SITE_URL = "https://theinviteclub.github.io" + BASE_PATH + "/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Save the Date · Beatriz & Ernesto",
  description: "Beatriz e Ernesto te convidam para uma noite de Halloween, lua, tarot e estrelas. 19h30, Velho Monge.",
  icons: { icon: `${BASE_PATH}/favicon.svg` },
  openGraph: {
    title: "Save the Date · Beatriz & Ernesto",
    description: "Uma noite de Halloween, lua, tarot e estrelas. Separe a data!",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "Save the Date · Beatriz & Ernesto",
    description: "Uma noite de Halloween, lua, tarot e estrelas. Separe a data!",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
