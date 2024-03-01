import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "@/components/context/AuthenticationContext";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/context/theme-provider";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pencil.io",
  description: "Create docs and draw your canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mono.className}>
        <AuthenticationProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Toaster />
            {children}
          </ThemeProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
