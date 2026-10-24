import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bikaner Marathon",
  description: "Bikaner Marathon — races, routes, and registration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}