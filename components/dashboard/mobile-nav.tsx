"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, MessageSquare, Network, MessagesSquare } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Kontrol Paneli", href: "/", active: true },
  { icon: Building2, label: "Gayrimenkuller", href: "/properties" },
  { icon: MessageSquare, label: "İstekler", href: "/requests" },
  { icon: Network, label: "Ağ", href: "/agents" },
  { icon: MessagesSquare, label: "Mesajlar", href: "/messages", badge: 3 },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
              item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-primary-foreground bg-primary rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
            {item.active && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
            )}
          </a>
        ))}
      </div>
    </nav>
  )
}
