import { DashboardContextProvider } from "@/components/context/DashboardContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pencil.io - Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DashboardContextProvider>{children}</DashboardContextProvider>
      </body>
    </html>
  );
}
