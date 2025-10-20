import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { Toaster } from "sonner";


const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["cyrillic", 'latin']
});


export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.descr,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${rubik.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" duration={2000} />
      </body>
    </html >
  );
}
