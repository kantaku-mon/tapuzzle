import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEROGRID — Tap to Zero",
  description:
    "A 6×6 puzzle game. Tap cells to reduce them and their neighbors. Get every cell to zero to win.",
  keywords: ["puzzle", "game", "grid", "math", "strategy"],
  authors: [{ name: "ZeroGrid" }],
  openGraph: {
    title: "ZEROGRID — Tap to Zero",
    description: "Can you reduce all 36 cells to zero?",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04070e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Load fonts asynchronously to avoid render-blocking */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
