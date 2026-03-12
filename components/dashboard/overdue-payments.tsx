"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Phone, MessageCircle, Check, ChevronRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const overduePayments = [
  {
    id: 1,
    tenant: "Ali Kocaman",
    phone: "0532 XXX XX XX",
    property: "2+1 Daire",
    neighborhood: "Ataşehir, Küçükbakkalköy",
    dueDate: "1 Mart 2026",
    daysOverdue: 11,
    amount: "₺16.000",
  },
  {
    id: 2,
    tenant: "Fatma Şahin",
    phone: "0534 XXX XX XX",
    property: "3+1 Daire",
    neighborhood: "Maltepe, Cevizli",
    dueDate: "5 Mart 2026",
    daysOverdue: 7,
    amount: "₺19.500",
  },
  {
    id: 3,
    tenant: "Burak Yıldız",
    phone: "0537 XXX XX XX",
    property: "1+1 Daire",
    neighborhood: "Kadıköy, Fenerbahçe",
    dueDate: "8 Mart 2026",
    daysOverdue: 4,
    amount: "₺12.500",
  },
]

export function OverduePayments() {
  return (
    <Card className="border-destructive/20 shadow-sm bg-gradient-to-br from-card to-destructive/[0.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive/10">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Geciken Tahsilatlar</CardTitle>
              <p className="text-xs text-destructive font-medium mt-0.5">₺48.000 toplam geciken</p>
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
          {overduePayments.map((payment) => (
            <div 
              key={payment.id}
              className={cn(
                "p-4 rounded-xl border transition-colors",
                payment.daysOverdue >= 10 
                  ? "border-destructive/30 bg-destructive/[0.03]" 
                  : "border-border bg-card"
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between lg:justify-start lg:gap-6 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{payment.tenant}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{payment.property}</p>
                    </div>
                    <div className="lg:hidden">
                      <p className="text-base font-bold text-foreground">{payment.amount}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {payment.neighborhood}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {payment.phone}
                    </span>
                  </div>
                </div>

                {/* Overdue info - desktop */}
                <div className="hidden lg:block text-right">
                  <p className="text-base font-bold text-foreground">{payment.amount}</p>
                  <p className={cn(
                    "text-xs font-semibold",
                    payment.daysOverdue >= 10 ? "text-destructive" : "text-chart-4"
                  )}>
                    {payment.daysOverdue} gün gecikme
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-border lg:border-none">
                  {/* Mobile overdue badge */}
                  <span className={cn(
                    "lg:hidden inline-flex items-center px-2 py-1 text-xs font-semibold rounded-lg",
                    payment.daysOverdue >= 10 
                      ? "bg-destructive/10 text-destructive" 
                      : "bg-chart-4/10 text-chart-4"
                  )}>
                    {payment.daysOverdue} gün gecikme
                  </span>
                  <div className="flex-1 lg:flex-none" />
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Phone className="w-3 h-3 mr-1.5" />
                    <span className="hidden sm:inline">Ara</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <MessageCircle className="w-3 h-3 mr-1.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </Button>
                  <Button variant="default" size="sm" className="h-8 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Check className="w-3 h-3 mr-1.5" />
                    <span className="hidden sm:inline">Tahsil Et</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
