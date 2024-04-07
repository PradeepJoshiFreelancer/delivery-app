import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { RecoilProvider } from "@/components/providers";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/components/lib/utils";

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
        <ThemeProvider>
          <RecoilProvider>
            <Sidebar>{children}</Sidebar>
          </RecoilProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
