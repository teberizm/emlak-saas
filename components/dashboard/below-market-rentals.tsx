"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, ArrowUpRight, ChevronRight, MapPin, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const belowMarketRentals = [
  {
    id: 1,
    title: "3+1 Daire, Kadıköy",
    neighborhood: "Caferağa Mah.",
    currentRent: "₺15.000",
    marketAverage: "₺22.000",
    difference: -32,
    sqm: "120 m²",
    tenant: "Mehmet Y.",
  },
  {
    id: 2,
    title: "2+1 Daire, Beşiktaş",
    neighborhood: "Levent Mah.",
    currentRent: "₺18.000",
    marketAverage: "₺25.000",
    difference: -28,
    sqm: "95 m²",
    tenant: "Ayşe D.",
  },
  {
    id: 3,
    title: "1+1 Stüdyo, Şişli",
    neighborhood: "Mecidiyeköy",
    currentRent: "₺11.000",
    marketAverage: "₺14.500",
    difference: -24,
    sqm: "55 m²",
    tenant: "Can Ö.",
  },
]

export function BelowMarketRentals() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-chart-4/10">
              <TrendingDown className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Piyasa Altı Kiralıklar</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Kira güncellemesi önerilir</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 h-8">
            Tümü
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {belowMarketRentals.map((rental) => (
            <div 
              key={rental.id}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Property info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-semibold text-foreground">{rental.title}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rental.neighborhood}
                    </span>
                    <span>{rental.sqm}</span>
                    <span>Kiracı: {rental.tenant}</span>
                  </div>
                </div>

                {/* Rent comparison */}
                <div className="flex items-center gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Mevcut</p>
                    <p className="text-sm font-bold text-foreground">{rental.currentRent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Piyasa Ort.</p>
                    <p className="text-sm font-semibold text-accent">{rental.marketAverage}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 text-xs font-bold rounded-lg",
                      "bg-chart-4/10 text-chart-4"
                    )}>
                      {rental.difference}%
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    İncele
                  </Button>
                </div>
              </div>
              {/* Mobile action */}
              <div className="sm:hidden mt-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="w-full h-9 text-xs">
                  <ArrowUpRight className="w-3 h-3 mr-1.5" />
                  Detayları İncele
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
