import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";
import { PHProvider } from "./providers";
import dynamic from "next/dynamic";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Armin Babaei's blog",
  description: "Armin Babaei is the ...",
  openGraph: {
    title: "Armin Babaei's blog",
    description: "Armin Babaei is the ...",
    url: "https://arminbabaei.com",
    siteName: "Armin Babaei's blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@itsarminbabaei",
    creator: "@itsarminbabaei",
  },
  metadataBase: new URL("https://arminbabaei.com"),
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
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <PHProvider>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
            }}
          />
        </head>

        <body className="dark:text-gray-100 max-w-2xl m-auto">
          <main className="p-6 pt-3 md:pt-6 min-h-screen">
            <Header />
            {children}
          </main>

          <Footer />
          <Analytics />
        </body>
      </PHProvider>
    </html>
  );
}
