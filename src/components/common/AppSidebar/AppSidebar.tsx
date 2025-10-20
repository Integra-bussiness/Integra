'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Building, ChevronDown, ChevronUp, HomeIcon, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppSidebar() {

    const pathname = usePathname()

    const items = [
        {
            title: 'Главная',
            url: "/dashboard",
            icon: HomeIcon
        },
        {
            title: 'CRM',
            url: "/clients",
            icon: Users
        }
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="font-bold font text-xl flex gap-[10px] items-center flex-row">
                <Building />
                <span >Integra</span>
            </SidebarHeader>
            <SidebarContent>
                <Collapsible defaultOpen>
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className="flex justify-between items-center">
                                <span>Управление заказами</span>
                                <ChevronDown />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title} >
                                            <SidebarMenuButton asChild isActive={item.url === pathname}>
                                                <Link href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User /> Пользователь
                                    <ChevronUp />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top">
                                <DropdownMenuItem>
                                    <span>Выйти из профиля</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}