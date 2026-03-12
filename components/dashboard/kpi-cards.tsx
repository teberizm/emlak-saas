"use client"

import { Card } from "@/components/ui/card"
import { Building2, Wallet, AlertCircle, CalendarClock } from "lucide-react"
import { cn } from "@/lib/utils"

const kpiData = [
  {
    title: "Takip Edilen Kiralıklar",
    value: "24",
    change: "+3",
    changeLabel: "bu ay eklenen",
    trend: "up",
    icon: Building2,
    color: "primary",
  },
  {
    title: "Bu Ay Tahsil Edilen",
    value: "₺187.500",
    change: "₺12.500",
    changeLabel: "kalan tahsilat",
    trend: "up",
    icon: Wallet,
    color: "accent",
  },
  {
    title: "Geciken Ödemeler",
    value: "5",
    change: "₺32.000",
    changeLabel: "toplam geciken",
    trend: "down",
    icon: AlertCircle,
    color: "destructive",
  },
  {
    title: "Yaklaşan Ödemeler",
    value: "8",
    change: "7 gün içinde",
    changeLabel: "tahsilat bekleniyor",
    trend: "neutral",
    icon: CalendarClock,
    color: "chart-4",
  },
]

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: "text-primary",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    icon: "text-accent",
  },
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    icon: "text-destructive",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    icon: "text-chart-4",
  },
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
      {kpiData.map((kpi) => {
        const colors = colorClasses[kpi.color as keyof typeof colorClasses]
        return (
          <Card
            key={kpi.title}
            className="relative overflow-hidden p-4 lg:p-5 bg-card border-border/50 hover:border-border hover:shadow-md transition-all duration-300 group"
          >
            {/* Background decoration */}
            <div className={cn(
              "absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-60",
              colors.bg
            )} />
            
            {/* Icon */}
            <div className={cn(
              "flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl mb-3 lg:mb-4",
              colors.bg
            )}>
              <kpi.icon className={cn("w-5 h-5", colors.icon)} />
            </div>

            {/* Content */}
            <div className="relative">
              <p className="text-[10px] lg:text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {kpi.title}
              </p>
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-foreground">
                {kpi.value}
              </p>
              <div className="flex flex-col lg:flex-row lg:items-center gap-0.5 lg:gap-1.5 mt-2">
                <span className={cn(
                  "text-xs lg:text-sm font-semibold",
                  kpi.trend === "down" ? "text-destructive" : colors.text
                )}>
                  {kpi.change}
                </span>
                <span className="text-[10px] lg:text-xs text-muted-foreground">
                  {kpi.changeLabel}
                </span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
