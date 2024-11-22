"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Phone, Settings, BarChart, UserCog, Target, FileText, Users } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: FileText, label: "Campaigns & Calls", href: "/campaigns" },
  { icon: Target, label: "Target Lists", href: "/target-list" },
  { icon: UserCog, label: "Agent Configuration", href: "/agent" },
  { icon: BarChart, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Team Management", href: "/team" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <h2 className="text-2xl font-bold text-primary">AI Voice Agent</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  )
}

