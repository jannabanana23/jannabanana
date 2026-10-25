import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: { default: `${profile.name} | Architecture portfolio`, template: `%s | ${profile.shortName}` },
  description: `Architecture portfolio of ${profile.name}. ${profile.span}.`,
};

export const viewport: Viewport = { themeColor: "#c9c3b8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
