import type { Metadata } from "next";
import { Caveat, Fraunces, Manrope } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Script face for handwritten signatures (wall typed entries + tegaki fallback).
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humaine-movement.com"),
  title: {
    default: "HumAIne — Stay human with AI",
    template: "%s · HumAIne",
  },
  description:
    "A global movement for people who refuse to choose between embracing AI and staying deeply human. Read and sign the HumAIne Manifesto.",
  openGraph: {
    title: "HumAIne — Stay human with AI",
    description:
      "A global movement for people who refuse to choose between embracing AI and staying deeply human.",
    url: "https://humaine-movement.com",
    siteName: "HumAIne Movement",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
