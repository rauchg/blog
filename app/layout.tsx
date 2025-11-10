import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";

const geist = localFont({
  src: [
    {
      path: "../fonts/geist-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/geist-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/geist-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/geist-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans"
});

const geistMono = localFont({
  src: "../fonts/geist-mono-regular.ttf",
  variable: "--font-geist-mono",
  weight: "400",
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

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${geist.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
