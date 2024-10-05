import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live Trains UK",
  description: "App for viewing live trains in the UK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}