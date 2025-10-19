import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/AppSidebar/AppSidebar";
import { siteConfig } from "@/config/siteConfig";

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
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="border-1 p-[10px]">
              <SidebarTrigger />
            </header>
            <main className="pl-[20px] pt-[10px] h-full">
              {children}
            </main>
            <footer>123</footer>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html >
  );
}
