import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pencil.io - Login",
  description: "Create docs and draw your canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
