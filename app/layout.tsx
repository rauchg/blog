import "./globals.css";

import "@fontsource/inter/variable.css";
import "@fontsource/roboto-mono/variable.css";

import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Imran's blog",
  description: "Imran's blog.",
  openGraph: {
    title: "Imran's blog",
    description: "Imran's blog.",
    // Update to your real domain when you deploy
    url: "https://example.com",
    siteName: "Imran's blog",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@imrane",
    creator: "@imrane",
  },
  // Update to your real domain when you deploy
  metadataBase: new URL("https://example.com"),
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
      className="antialiased"
      style={{
        fontFamily: "'Inter Variable', Inter, system-ui, sans-serif",
      }}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
