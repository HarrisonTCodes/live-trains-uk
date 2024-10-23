import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Live Trains UK',
  description: 'App for viewing live trains in the UK',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
