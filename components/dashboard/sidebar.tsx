"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  HelpCircle,
  ClipboardList,
  Bell,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const mainNavItems = [
  { icon: LayoutDashboard, label: "Kontrol Paneli", href: "/", active: true },
  { icon: Building2, label: "Kiralık Takibi", href: "/rentals", badge: 24 },
  { icon: CreditCard, label: "Ödemeler", href: "/payments", badge: 5 },
  { icon: Users, label: "Müşteriler", href: "/clients" },
  { icon: TrendingUp, label: "Piyasa Analizi", href: "/market" },
]

const secondaryNavItems = [
  { icon: HelpCircle, label: "Emlak Sor", href: "/emlak-sor" },
  { icon: ClipboardList, label: "Taleplerim", href: "/requests" },
  { icon: Bell, label: "Bildirimler", href: "/notifications", badge: 3 },
  { icon: FileText, label: "Raporlar", href: "/reports" },
  { icon: Settings, label: "Ayarlar", href: "/settings" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
              EmlakNet
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", collapsed && "hidden")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Ana Menü
            </p>
          )}
          {mainNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className={cn(
                  "flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold rounded-full",
                  item.active 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-primary/10 text-primary"
                )}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-6 space-y-1">
          {!collapsed && (
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Diğer
            </p>
          )}
          {secondaryNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold bg-destructive/10 text-destructive rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Collapse toggle for collapsed state */}
      {collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-9 text-muted-foreground hover:text-foreground"
            onClick={() => setCollapsed(false)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* User section */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <span className="text-sm font-semibold text-primary">AK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Ahmet Kaya</p>
              <p className="text-xs text-muted-foreground truncate">Premium Ajan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
