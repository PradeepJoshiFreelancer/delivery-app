"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const RecoilProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const THemeProvider = ({ children }: { children: ReactNode }) => {
  return <NextThemesProvider>{children}</NextThemesProvider>;
};
