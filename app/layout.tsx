import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { InteractiveCursor } from "@/components/InteractiveCursor";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gokul — Full Stack Developer & AI Enthusiast | Tamil Nadu, India",
    template: "%s | Gokul",
  },
  description:
    "Portfolio of Gokul: Full Stack Developer and AI enthusiast in Tamil Nadu, India. BusTracker (NEXTSTOP), AI Resume tools, SecurePower Android security, React, TypeScript, Kotlin, and Firebase.",
  keywords: [
    "Gokul",
    "Full Stack Developer",
    "AI",
    "Tamil Nadu",
    "React",
    "TypeScript",
    "Next.js",
    "Kotlin",
    "Firebase",
    "Portfolio",
  ],
  authors: [{ name: "Gokul" }],
  creator: "Gokul",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Gokul — Portfolio",
    title: "Gokul — Full Stack Developer & AI Enthusiast",
    description:
      "End-to-end web apps, AI features, and Android security projects. Based in Tamil Nadu, India.",
    images: [
      {
        url: "/gokul-portrait.png",
        width: 1200,
        height: 630,
        alt: "Gokul — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokul — Full Stack Developer & AI Enthusiast",
    description:
      "Portfolio: NEXTSTOP BusTracker, AI Resume Maker, SecurePower. React, TypeScript, Kotlin, Firebase.",
    images: ["/gokul-portrait.png"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <InteractiveCursor />
        {children}
      </body>
    </html>
  );
}
