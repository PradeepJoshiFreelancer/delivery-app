"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastContainerWrapper() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <SessionProvider>{children}</SessionProvider>
        <ToastContainerWrapper />
      </RecoilRoot>
    </ThemeProvider>
  );
};
