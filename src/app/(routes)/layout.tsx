import { PrimeReactProvider } from "primereact/api";

import { type Metadata } from "next";
import { type ReactNode } from "react";

import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Digital Audio Workstation",
  title: "DAW",
};

interface IRootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html className="box-content h-full" lang="en">
      <body className={`${inter.className} h-full`}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
