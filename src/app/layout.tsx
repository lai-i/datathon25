import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Roboto({
  weight: ['300', '400', '500'],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "UR3 Dashboard",
  description: "UR3E Cobot Dashboard for DataOrbit 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
