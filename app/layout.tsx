import type { Metadata } from "next";
import "./globals.css";
import Preloader from "./preloader";

export const metadata: Metadata = {
  title: "Lotus Ghee | The Goodness of Pure Ghee",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  description: "Traditional purity, rich aroma, and wholesome nutrition — Lotus Ghee.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Preloader />{children}</body></html>;
}
