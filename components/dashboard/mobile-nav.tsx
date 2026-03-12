"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, CreditCard, HelpCircle, User } from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Panel", href: "/", active: true },
  { icon: Building2, label: "Kiralıklar", href: "/rentals" },
  { icon: CreditCard, label: "Ödemeler", href: "/payments", badge: 5, urgent: true },
  { icon: HelpCircle, label: "Sor", href: "/emlak-sor" },
  { icon: User, label: "Profil", href: "/profile" },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/98 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around px-1 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center gap-0.5 min-w-[60px] px-2 py-2 rounded-xl transition-all duration-200",
              item.active
                ? "bg-primary/10"
                : "active:bg-muted"
            )}
          >
            <div className="relative">
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                item.active ? "text-primary" : "text-muted-foreground"
              )} />
              {item.badge && (
                <span className={cn(
                  "absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full",
                  item.urgent 
                    ? "bg-destructive text-white" 
                    : "bg-primary text-primary-foreground"
                )}>
                  {item.badge}
                </span>
              )}
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-colors",
              item.active ? "text-primary" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}
