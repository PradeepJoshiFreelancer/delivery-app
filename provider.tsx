"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <SessionProvider>{children}</SessionProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};