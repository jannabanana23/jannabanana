import type { Metadata } from "next";
import { Barlow_Condensed, Jost } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-barlow" });

export const metadata: Metadata = {
  title: { default: `${profile.name} | Portfolio`, template: `%s | ${profile.shortName}` },
  description: `Architecture portfolio of ${profile.name}. ${profile.span}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${barlow.variable}`}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
