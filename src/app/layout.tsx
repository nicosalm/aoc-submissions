import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdventOfCode Submission Collection",
  description:
    "Compare your solutions with others! A collection of AOC submissions by various members of the UPL & friends.",
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
