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

// Client component to handle HTML element with hydration suppression
function Html({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      {children}
    </html>
  );
}

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
    <Html>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground" suppressHydrationWarning>
        <SiteHeader />
        <InteractiveCursor />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Smooth inertia scroll
                let targetScroll = 0;
                let currentScroll = 0;
                let velocity = 0;
                let lastScroll = 0;
                let scrollTimeout;
                let isUserScrolling = false;
                
                const handleScroll = () => {
                  targetScroll = window.scrollY;
                  isUserScrolling = true;
                  clearTimeout(scrollTimeout);
                  
                  const delta = window.scrollY - lastScroll;
                  velocity = delta * 0.8;
                  lastScroll = window.scrollY;
                  
                  scrollTimeout = setTimeout(() => {
                    isUserScrolling = false;
                  }, 150);
                };
                
                const applyInertia = () => {
                  if (Math.abs(velocity) > 0.2 && !isUserScrolling) {
                    velocity *= 0.92;
                    targetScroll += velocity;
                    
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
                    
                    window.scrollTo(0, targetScroll);
                  }
                  
                  if (Math.abs(velocity) > 0.2) {
                    requestAnimationFrame(applyInertia);
                  }
                };
                
                window.addEventListener('scroll', handleScroll, { passive: true });
                window.addEventListener('scroll', () => {
                  if (!isUserScrolling && Math.abs(velocity) > 0.2) {
                    requestAnimationFrame(applyInertia);
                  }
                }, { passive: true });
                
                // Page load animations - trigger after paint
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', () => {
                    requestAnimationFrame(() => {
                      const elements = document.querySelectorAll('.animate-load');
                      elements.forEach((el) => {
                        el.classList.add('visible');
                      });
                    });
                  });
                } else {
                  requestAnimationFrame(() => {
                    const elements = document.querySelectorAll('.animate-load');
                    elements.forEach((el) => {
                      el.classList.add('visible');
                    });
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
