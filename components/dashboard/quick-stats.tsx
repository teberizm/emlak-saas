"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Users, Home } from "lucide-react"

const stats = [
  { 
    label: "Boşta Daireler", 
    value: "2", 
    icon: Home,
    color: "text-chart-4"
  },
  { 
    label: "Aktif Müşteriler", 
    value: "18", 
    icon: Users,
    color: "text-primary"
  },
  { 
    label: "Piyasa Üstü", 
    value: "5", 
    icon: TrendingUp,
    color: "text-accent"
  },
  { 
    label: "Raporlar", 
    value: "12", 
    icon: FileText,
    color: "text-muted-foreground"
  },
]

export function QuickStats() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Hızlı Bakış</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-lg font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
