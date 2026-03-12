"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Network } from "lucide-react"
import { cn } from "@/lib/utils"

const kpiData = [
  {
    title: "Aktif Gayrimenkuller",
    value: "128",
    change: "+12%",
    trend: "up",
    icon: Building2,
    description: "geçen aya göre",
    sparkline: [30, 45, 35, 50, 65, 55, 70, 85],
  },
  {
    title: "Aktif Müşteriler",
    value: "2.847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "geçen aya göre",
    sparkline: [40, 35, 45, 55, 50, 60, 70, 75],
  },
  {
    title: "Aylık Anlaşmalar",
    value: "₺4.2M",
    change: "+23.5%",
    trend: "up",
    icon: TrendingUp,
    description: "geçen aya göre",
    sparkline: [20, 35, 30, 45, 55, 65, 80, 95],
  },
  {
    title: "Ağ İstekleri",
    value: "342",
    change: "-4.1%",
    trend: "down",
    icon: Network,
    description: "geçen aya göre",
    sparkline: [60, 55, 65, 50, 45, 40, 35, 38],
  },
]

function Sparkline({ data, trend }: { data: number[]; trend: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  const width = 80
  const height = 32
  const padding = 2
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={trend === "up" ? "oklch(0.65 0.17 160)" : "oklch(0.55 0.22 25)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
      />
    </svg>
  )
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {kpiData.map((kpi) => (
        <Card 
          key={kpi.title}
          className="group relative overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-border"
        >
          <CardContent className="p-5 lg:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <Sparkline data={kpi.sparkline} trend={kpi.trend} />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
                  {kpi.value}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-medium rounded-full",
                    kpi.trend === "up"
                      ? "bg-accent/10 text-accent"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
