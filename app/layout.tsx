import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/components/lib/utils";
import { Providers } from "@/provider";
import { Suspense } from "react";
import Loading from "./loading";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Delivery Tracking App",
  description: "Track your deliveries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Suspense fallback={<Loading />}>
            <Sidebar>{children}</Sidebar>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
