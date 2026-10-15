
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOGIX | Web Design & Development",
  description:
    "LOGIX builds modern websites and digital experiences for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
