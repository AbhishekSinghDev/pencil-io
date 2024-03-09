import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

const josefin_sans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pencil.io - Workspace",
  description: "Create docs and draw your canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={josefin_sans.className}>{children}</section>;
}
