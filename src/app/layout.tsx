"use client";

import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
// import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/components/common/LanguageContext";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="">
        <ReactQueryProvider>
          <LanguageProvider>
          {/* <Providers> */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
          {/* </Providers> */}
          </LanguageProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
