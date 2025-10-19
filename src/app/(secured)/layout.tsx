import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/AppSidebar/AppSidebar";

export default function SidebarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="border-1 p-[10px]">
                    <SidebarTrigger />
                </header>
                <main className="pl-[20px] pt-[10px] h-full">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
