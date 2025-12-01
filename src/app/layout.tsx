import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AOC Submission Collection",
  description:
    "A collection of AdventOfCode code submissions for the Undergraduate Project Lab. Compare your solutions with others!",
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
