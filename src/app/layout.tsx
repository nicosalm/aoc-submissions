import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPL AdventOfCode Submissions",
  description: "A collection of AdventOfCode submissions by UPL members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
