import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`dark:bg-gray-900`}>
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
