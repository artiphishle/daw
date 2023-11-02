// eslint-disable-next-line camelcase
import { Inter } from 'next/font/google';
import { PrimeReactProvider } from 'primereact/api';

import './globals.css';

import { type Metadata } from 'next';
import { type ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  description: 'Digital Audio Workstation',
  title: 'DAW',
};

interface IRootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html className="box-content h-full" lang="en">
      <body className={`${inter.className} flex flex-col h-full`}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
