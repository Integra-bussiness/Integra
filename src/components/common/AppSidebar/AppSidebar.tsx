'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Building, ChevronDown, ChevronUp, Database, HomeIcon, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo } from "react"

export default memo(function AppSidebar() {

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
        },
        {
            title: 'Структура',
            url: "/structure",
            icon: Users
        }
    ]

    const collapsibleItems = [
        {
            collapseTitle: 'Статистика',
            items: [
                {
                    title: 'Главная',
                    url: "/dashboard",
                    icon: HomeIcon
                },
                {
                    title: 'CRM',
                    url: "/clients",
                    icon: Users
                },
                {
                    title: 'Структура',
                    url: "/structure",
                    icon: Database
                }
            ]
        },

    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="font-bold font text-xl flex gap-[10px] items-center flex-row">
                <Building />
                <span >Integra</span>
            </SidebarHeader>
            <SidebarContent>
                {collapsibleItems.map((collapse) => {
                    return (
                        <Collapsible defaultOpen key={collapse.collapseTitle}>
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger className="flex justify-between items-center">
                                        <span>{collapse.collapseTitle}</span>
                                        <ChevronDown />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {collapse.items.map((item) => (
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
                    )
                })}
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
})