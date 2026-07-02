import type { Metadata } from "next";
import { Caveat, Nunito } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
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
  applicationName: "HumAIne Movement",
  title: {
    default: "HumAIne Movement | Championing Human-AI Synergy",
    template: "%s · HumAIne",
  },
  description:
    "HumAIne is a global movement and signable manifesto for people who believe embracing AI should deepen human agency, thinking, purpose, and connection.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "HumAIne Movement | Championing Human-AI Synergy",
    description:
      "A global movement and signable manifesto for people who believe embracing AI should deepen human agency, thinking, purpose, and connection.",
    url: "https://humaine-movement.com",
    siteName: "HumAIne Movement",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "HumAIne Movement | Championing Human-AI Synergy",
    description:
      "Read and sign the HumAIne Manifesto for using AI with purpose, active thinking, human agency, and deeper human connection.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${caveat.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
