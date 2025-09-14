import "@/styles/globals.css";

import { type Metadata } from "next";
import { Afacad_Flux, DM_Mono, Alkalami } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const afacadFlux = Afacad_Flux({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

const alkalami = Alkalami({
  subsets: ["arabic", "latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Bloom With Haru",
  description: "Build better habits with your AI companion",
  icons: [
    { rel: "icon", url: "/images/logo.png", sizes: "512x512" },
    { rel: "apple-touch-icon", url: "/images/logo.png", sizes: "512x512" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${afacadFlux.variable} ${dmMono.variable} ${alkalami.variable} ${afacadFlux.className} antialiased`}
        suppressHydrationWarning
      >
        <TRPCReactProvider>
          <NuqsAdapter>
            <Toaster />
            {children}
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
