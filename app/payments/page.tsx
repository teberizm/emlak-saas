"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter,
  Download,
  Phone,
  MessageCircle,
  Check,
  Send,
  MapPin,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  X,
  Wallet,
  TrendingUp,
  CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock payment data
const paymentsData = [
  {
    id: 1,
    tenant: "Ali Kocaman",
    phone: "0532 XXX XX XX",
    property: "2+1 Daire",
    neighborhood: "Ataşehir, Küçükbakkalköy",
    amount: 16000,
    dueDate: "2026-03-01",
    dueDateLabel: "1 Mart 2026",
    status: "overdue",
    daysOverdue: 11,
    lastReminder: "5 Mart 2026",
  },
  {
    id: 2,
    tenant: "Fatma Şahin",
    phone: "0534 XXX XX XX",
    property: "3+1 Daire",
    neighborhood: "Maltepe, Cevizli",
    amount: 19500,
    dueDate: "2026-03-05",
    dueDateLabel: "5 Mart 2026",
    status: "overdue",
    daysOverdue: 7,
    lastReminder: "8 Mart 2026",
  },
  {
    id: 3,
    tenant: "Burak Yıldız",
    phone: "0537 XXX XX XX",
    property: "1+1 Daire",
    neighborhood: "Kadıköy, Fenerbahçe",
    amount: 12500,
    dueDate: "2026-03-08",
    dueDateLabel: "8 Mart 2026",
    status: "overdue",
    daysOverdue: 4,
    lastReminder: null,
  },
  {
    id: 4,
    tenant: "Mehmet Yılmaz",
    phone: "0532 XXX XX XX",
    property: "3+1 Daire",
    neighborhood: "Kadıköy, Caferağa",
    amount: 18500,
    dueDate: "2026-03-15",
    dueDateLabel: "15 Mart 2026",
    status: "upcoming",
    daysLeft: 3,
    lastReminder: null,
  },
  {
    id: 5,
    tenant: "Ayşe Demir",
    phone: "0533 XXX XX XX",
    property: "2+1 Daire",
    neighborhood: "Beşiktaş, Levent",
    amount: 22000,
    dueDate: "2026-03-17",
    dueDateLabel: "17 Mart 2026",
    status: "upcoming",
    daysLeft: 5,
    lastReminder: "10 Mart 2026",
  },
  {
    id: 6,
    tenant: "Can Öztürk",
    phone: "0535 XXX XX XX",
    property: "1+1 Stüdyo",
    neighborhood: "Şişli, Mecidiyeköy",
    amount: 14000,
    dueDate: "2026-03-18",
    dueDateLabel: "18 Mart 2026",
    status: "upcoming",
    daysLeft: 6,
    lastReminder: "10 Mart 2026",
  },
  {
    id: 7,
    tenant: "Zeynep Kara",
    phone: "0536 XXX XX XX",
    property: "4+1 Villa",
    neighborhood: "Sarıyer, Tarabya",
    amount: 45000,
    dueDate: "2026-03-20",
    dueDateLabel: "20 Mart 2026",
    status: "upcoming",
    daysLeft: 8,
    lastReminder: null,
  },
  {
    id: 8,
    tenant: "Mehmet Yılmaz",
    phone: "0532 XXX XX XX",
    property: "3+1 Daire",
    neighborhood: "Kadıköy, Caferağa",
    amount: 18500,
    dueDate: "2026-02-01",
    dueDateLabel: "1 Şubat 2026",
    status: "paid",
    paidDate: "1 Şubat 2026",
  },
  {
    id: 9,
    tenant: "Ayşe Demir",
    phone: "0533 XXX XX XX",
    property: "2+1 Daire",
    neighborhood: "Beşiktaş, Levent",
    amount: 22000,
    dueDate: "2026-02-05",
    dueDateLabel: "5 Şubat 2026",
    status: "paid",
    paidDate: "5 Şubat 2026",
  },
  {
    id: 10,
    tenant: "Emre Yıldırım",
    phone: "0539 XXX XX XX",
    property: "1+0 Stüdyo",
    neighborhood: "Kadıköy, Fenerbahçe",
    amount: 12500,
    dueDate: "2026-02-20",
    dueDateLabel: "20 Şubat 2026",
    status: "paid",
    paidDate: "20 Şubat 2026",
  },
]

type TabType = "overdue" | "upcoming" | "paid"

const tabConfig = {
  overdue: { 
    label: "Geciken", 
    icon: AlertCircle, 
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  upcoming: { 
    label: "Yaklaşan", 
    icon: Clock, 
    color: "text-chart-4",
    bgColor: "bg-chart-4/10"
  },
  paid: { 
    label: "Tahsil Edilen", 
    icon: CheckCircle2, 
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("overdue")

  const filteredPayments = paymentsData.filter(payment => {
    // Status filter
    const matchesTab = payment.status === activeTab

    // Search filter
    const matchesSearch = searchQuery === "" || 
      payment.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const tabCounts = {
    overdue: paymentsData.filter(p => p.status === "overdue").length,
    upcoming: paymentsData.filter(p => p.status === "upcoming").length,
    paid: paymentsData.filter(p => p.status === "paid").length,
  }

  const totalOverdue = paymentsData
    .filter(p => p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalUpcoming = paymentsData
    .filter(p => p.status === "upcoming")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPaid = paymentsData
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <DashboardLayout 
      title="Ödeme Takibi"
      subtitle="Tahsilat Yönetimi"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-destructive/20 bg-gradient-to-br from-card to-destructive/[0.02]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive/10">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Geciken Toplam</p>
                <p className="text-lg font-bold text-destructive">
                  ₺{totalOverdue.toLocaleString('tr-TR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-chart-4/20 bg-gradient-to-br from-card to-chart-4/[0.02]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-chart-4/10">
                <Clock className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Yaklaşan Toplam</p>
                <p className="text-lg font-bold text-chart-4">
                  ₺{totalUpcoming.toLocaleString('tr-TR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/[0.02]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Bu Ay Tahsil</p>
                <p className="text-lg font-bold text-accent">
                  ₺{totalPaid.toLocaleString('tr-TR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Search */}
      <Card className="mb-6 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
              {(Object.keys(tabConfig) as TabType[]).map((tab) => {
                const config = tabConfig[tab]
                const Icon = config.icon
                const isActive = activeTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive 
                        ? "bg-card shadow-sm text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive && config.color)} />
                    <span className="hidden sm:inline">{config.label}</span>
                    <span className={cn(
                      "px-1.5 py-0.5 text-[10px] font-semibold rounded",
                      isActive ? config.bgColor : "bg-muted",
                      isActive ? config.color : "text-muted-foreground"
                    )}>
                      {tabCounts[tab]}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Kiracı veya daire ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-secondary/50 border-border/50 rounded-xl"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 px-3 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filtreler
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-3 rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Dışa Aktar</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-3">
        {filteredPayments.map((payment) => (
          <Card 
            key={payment.id} 
            className={cn(
              "border-border/50 transition-all hover:shadow-md",
              payment.status === "overdue" && (payment.daysOverdue ?? 0) >= 10 && "border-destructive/30 bg-destructive/[0.02]"
            )}
          >
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Tenant Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between lg:justify-start lg:gap-6 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{payment.tenant}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{payment.property}</p>
                    </div>
                    {/* Mobile amount */}
                    <div className="lg:hidden text-right">
                      <p className="text-base font-bold text-foreground">
                        ₺{payment.amount.toLocaleString('tr-TR')}
                      </p>
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
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {payment.dueDateLabel}
                    </span>
                  </div>
                </div>

                {/* Status & Amount - Desktop */}
                <div className="hidden lg:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-base font-bold text-foreground">
                      ₺{payment.amount.toLocaleString('tr-TR')}
                    </p>
                    {payment.status === "overdue" && (
                      <p className={cn(
                        "text-xs font-semibold",
                        (payment.daysOverdue ?? 0) >= 10 ? "text-destructive" : "text-chart-4"
                      )}>
                        {payment.daysOverdue} gün gecikme
                      </p>
                    )}
                    {payment.status === "upcoming" && (
                      <p className={cn(
                        "text-xs font-medium",
                        (payment.daysLeft ?? 0) <= 3 ? "text-chart-4" : "text-muted-foreground"
                      )}>
                        {payment.daysLeft} gün kaldı
                      </p>
                    )}
                    {payment.status === "paid" && (
                      <p className="text-xs font-medium text-accent">
                        {payment.paidDate} tarihinde ödendi
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-border">
                  {/* Mobile status badge */}
                  {payment.status === "overdue" && (
                    <span className={cn(
                      "lg:hidden inline-flex items-center px-2 py-1 text-xs font-semibold rounded-lg",
                      (payment.daysOverdue ?? 0) >= 10 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-chart-4/10 text-chart-4"
                    )}>
                      {payment.daysOverdue} gün gecikme
                    </span>
                  )}
                  {payment.status === "upcoming" && (
                    <span className={cn(
                      "lg:hidden inline-flex items-center px-2 py-1 text-xs font-semibold rounded-lg",
                      (payment.daysLeft ?? 0) <= 3 ? "bg-chart-4/10 text-chart-4" : "bg-muted text-muted-foreground"
                    )}>
                      {payment.daysLeft} gün kaldı
                    </span>
                  )}
                  {payment.status === "paid" && (
                    <span className="lg:hidden inline-flex items-center px-2 py-1 text-xs font-semibold rounded-lg bg-accent/10 text-accent">
                      Ödendi
                    </span>
                  )}
                  
                  <div className="flex-1 lg:flex-none" />
                  
                  {payment.status !== "paid" && (
                    <>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Phone className="w-3 h-3 mr-1.5" />
                        <span className="hidden sm:inline">Ara</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <MessageCircle className="w-3 h-3 mr-1.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </Button>
                      {payment.status === "overdue" ? (
                        <Button variant="default" size="sm" className="h-8 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Check className="w-3 h-3 mr-1.5" />
                          <span className="hidden sm:inline">Tahsil Et</span>
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={cn(
                            "h-8 text-xs",
                            payment.lastReminder && "bg-muted text-muted-foreground"
                          )}
                        >
                          <Send className="w-3 h-3 mr-1.5" />
                          <span className="hidden sm:inline">
                            {payment.lastReminder ? "Hatırlatıldı" : "Hatırlat"}
                          </span>
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredPayments.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Kayıt bulunamadı</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bu kategoride ödeme kaydı bulunmuyor.
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
