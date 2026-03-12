"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, Send, ChevronRight, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const upcomingPayments = [
  {
    id: 1,
    tenant: "Mehmet Yılmaz",
    phone: "0532 XXX XX XX",
    property: "3+1 Daire",
    neighborhood: "Kadıköy, Caferağa",
    dueDate: "15 Mart 2026",
    daysLeft: 3,
    amount: "₺18.500",
    status: "pending",
  },
  {
    id: 2,
    tenant: "Ayşe Demir",
    phone: "0533 XXX XX XX",
    property: "2+1 Daire",
    neighborhood: "Beşiktaş, Levent",
    dueDate: "17 Mart 2026",
    daysLeft: 5,
    amount: "₺22.000",
    status: "pending",
  },
  {
    id: 3,
    tenant: "Can Öztürk",
    phone: "0535 XXX XX XX",
    property: "1+1 Stüdyo",
    neighborhood: "Şişli, Mecidiyeköy",
    dueDate: "18 Mart 2026",
    daysLeft: 6,
    amount: "₺14.000",
    status: "reminded",
  },
  {
    id: 4,
    tenant: "Zeynep Kara",
    phone: "0536 XXX XX XX",
    property: "4+1 Villa",
    neighborhood: "Sarıyer, Tarabya",
    dueDate: "20 Mart 2026",
    daysLeft: 8,
    amount: "₺45.000",
    status: "pending",
  },
]

export function UpcomingPayments() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-chart-4/10">
              <CalendarClock className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Yaklaşan Ödemeler</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Önümüzdeki 7 gün içinde</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 h-8">
            Tümü
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Mobile: Card layout, Desktop: Table layout */}
        <div className="hidden lg:block">
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Kiracı</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Daire / Konum</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Ödeme Tarihi</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Tutar</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {upcomingPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-foreground">{payment.tenant}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          {payment.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm text-foreground">{payment.property}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {payment.neighborhood}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm text-foreground">{payment.dueDate}</p>
                        <p className={cn(
                          "text-xs font-medium mt-0.5",
                          payment.daysLeft <= 3 ? "text-chart-4" : "text-muted-foreground"
                        )}>
                          {payment.daysLeft} gün kaldı
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <p className="text-sm font-semibold text-foreground">{payment.amount}</p>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          "h-8 text-xs",
                          payment.status === "reminded" && "bg-muted text-muted-foreground"
                        )}
                      >
                        <Send className="w-3 h-3 mr-1.5" />
                        {payment.status === "reminded" ? "Hatırlatıldı" : "Hatırlat"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile card layout */}
        <div className="lg:hidden space-y-3">
          {upcomingPayments.map((payment) => (
            <div 
              key={payment.id}
              className="p-4 rounded-xl border border-border bg-card hover:border-border/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{payment.tenant}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{payment.property}</p>
                </div>
                <p className="text-base font-bold text-foreground">{payment.amount}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {payment.neighborhood}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">{payment.dueDate}</p>
                  <p className={cn(
                    "text-xs font-medium",
                    payment.daysLeft <= 3 ? "text-chart-4" : "text-muted-foreground"
                  )}>
                    {payment.daysLeft} gün kaldı
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "h-8 text-xs",
                    payment.status === "reminded" && "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="w-3 h-3 mr-1.5" />
                  {payment.status === "reminded" ? "Hatırlatıldı" : "Hatırlat"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
