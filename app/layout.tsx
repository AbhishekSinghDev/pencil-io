import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "@/components/context/AuthenticationContext";
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
    <html lang="en" suppressHydrationWarning>
      <body className={mono.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
