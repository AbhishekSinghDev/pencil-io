import Header from "@/components/shared/landing_components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pencil.io - Pricing",
  description: "Create docs and draw your canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header showLinks={true} showTryButton={true} />
      {children}
    </section>
  );
}
