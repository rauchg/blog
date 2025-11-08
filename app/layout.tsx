import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AnalyticsWrapper from "./analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.rmashate.com"),
  title: {
    default: "Ron Mashate - Product Leader & AI Experience Builder",
    template: "%s | Ron Mashate",
  },
  description: "Product management insights, AI systems development, and lessons from building digital products that drive real business impact.",
  openGraph: {
    title: "Ron Mashate - Product Leader & AI Experience Builder",
    description: "Product management insights, AI systems development, and lessons from building digital products that drive real business impact.",
    url: "https://blog.rmashate.com",
    siteName: "Ron Mashate Blog",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Ron Mashate",
    card: "summary_large_image",
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
      className={`${inter.variable} font-sans`}
    >
      <head>
        <AnalyticsWrapper />
      </head>
      <body className="antialiased max-w-2xl flex flex-col md:flex-row mx-4 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-12 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}