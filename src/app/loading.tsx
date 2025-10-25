import AppSidebar from "@/components/common/AppSidebar/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryProvider } from "@/providers/QueryProvider";

export default function Loading() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="border-1 p-[10px]">
                    <SidebarTrigger />
                </header>
                <main className="p-[20px] pt-[10px] h-full">
                    <div className="grid-cols-4 grid gap-[20px]">
                        <Skeleton className="h-[300px]" />
                        <Skeleton className="h-[300px]" />
                        <Skeleton className="h-[300px]" />
                        <Skeleton className="h-[300px]" />
                        <Skeleton className="col-span-full h-[300px]" />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}