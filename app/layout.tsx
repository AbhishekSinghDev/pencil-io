import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "@/components/context/AuthenticationContext";

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
      <AuthenticationProvider>
        <body className={mono.className}>{children}</body>
      </AuthenticationProvider>
    </html>
  );
}
