"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Plus, ChevronRight, MapPin, Home, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const recentRequests = [
  {
    id: 1,
    type: "Kiralık",
    location: "Kadıköy",
    rooms: "2+1",
    budget: "₺15-20K",
    status: "waiting",
    responses: 0,
  },
  {
    id: 2,
    type: "Satılık",
    location: "Beşiktaş",
    rooms: "3+1",
    budget: "₺4-6M",
    status: "responded",
    responses: 3,
  },
  {
    id: 3,
    type: "Kiralık",
    location: "Ataşehir",
    rooms: "1+1",
    budget: "₺10-12K",
    status: "closed",
    responses: 5,
  },
]

const statusConfig = {
  waiting: { label: "Bekliyor", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  responded: { label: "Cevap Geldi", className: "bg-accent/10 text-accent border-accent/20" },
  closed: { label: "Kapandı", className: "bg-muted text-muted-foreground border-border" },
}

export function EmlakSorWidget() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Emlak Sor</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Ağdan emlak ara</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 h-8">
            Tümü
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Quick action */}
        <Button 
          variant="outline" 
          className="w-full h-11 mb-4 border-dashed border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Emlak Sor
        </Button>

        {/* Recent requests */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Son Talepler</p>
          {recentRequests.map((request) => {
            const status = statusConfig[request.status as keyof typeof statusConfig]
            return (
              <div 
                key={request.id}
                className="p-3 rounded-xl border border-border bg-card hover:border-border/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border",
                    request.type === "Kiralık" ? "bg-primary/10 text-primary border-primary/20" : "bg-accent/10 text-accent border-accent/20"
                  )}>
                    {request.type}
                  </span>
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border",
                    status.className
                  )}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {request.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    {request.rooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet className="w-3 h-3" />
                    {request.budget}
                  </span>
                </div>
                {request.responses > 0 && (
                  <p className="text-xs font-medium text-accent mt-2">
                    {request.responses} cevap geldi
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
