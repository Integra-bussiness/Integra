"use server"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/AppSidebar/AppSidebar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QueryProvider } from "@/providers/QueryProvider";

export default async function SidebarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    console.log("USER:", user);


    if (!user) {
        console.log('Не авторизован!');
        redirect("/");
    }


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="border-1 p-[10px]">
                    <SidebarTrigger />
                </header>
                <main className="pl-[20px] pt-[10px] h-full">
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
