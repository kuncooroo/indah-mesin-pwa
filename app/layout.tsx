import type { Metadata, Viewport } from "next";

import { ConditionalShell } from "@/components/layout/conditional-shell";
import { ibmPlexSans, jetbrainsMono } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "IndustrialX — Industrial Marketplace",
  description:
    "Marketplace mesin industri B2B dengan katalog digital dan pemesanan via WhatsApp.",
  applicationName: "IndustrialX",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IndustrialX",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#00236f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-on-surface antialiased">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
