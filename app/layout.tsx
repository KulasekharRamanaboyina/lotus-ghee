import type { Metadata, Viewport } from "next";
import { Gloock, Instrument_Sans, Instrument_Serif, Tiro_Telugu } from "next/font/google";
import "./globals.css";
import Preloader from "./preloader";

const display = Gloock({ weight: "400", subsets: ["latin"], variable: "--f-display", display: "swap" });
const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--f-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const telugu = Tiro_Telugu({ weight: "400", subsets: ["telugu", "latin"], variable: "--f-telugu", display: "swap" });

export const metadata: Metadata = {
  title: "Lotus Ghee — Pure ghee, the way home made it",
  description: "Cow ghee and buffalo ghee from Lotus. Pure, aromatic and free of preservatives, in packs from 15 ml to 15 ltr.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#f3e9d4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable} ${telugu.variable}`}>
      <body>
        <Preloader />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
