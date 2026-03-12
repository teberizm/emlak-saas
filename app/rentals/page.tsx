"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  Phone,
  MessageCircle,
  MoreHorizontal,
  MapPin,
  Calendar,
  Home,
  ChevronDown,
  X,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for rentals
const rentalsData = [
  {
    id: 1,
    property: "3+1 Daire",
    address: "Caferağa Mah. Moda Cad. No:42/5",
    neighborhood: "Kadıköy",
    city: "İstanbul",
    tenant: "Mehmet Yılmaz",
    tenantPhone: "0532 XXX XX XX",
    rent: 18500,
    paymentDay: 1,
    leaseStart: "01.03.2024",
    leaseEnd: "01.03.2025",
    status: "active",
    sqm: 120,
    lastPayment: "01.03.2026",
    paymentStatus: "paid",
  },
  {
    id: 2,
    property: "2+1 Daire",
    address: "Levent Mah. Nispetiye Cad. No:18/3",
    neighborhood: "Beşiktaş",
    city: "İstanbul",
    tenant: "Ayşe Demir",
    tenantPhone: "0533 XXX XX XX",
    rent: 22000,
    paymentDay: 5,
    leaseStart: "15.06.2024",
    leaseEnd: "15.06.2025",
    status: "active",
    sqm: 95,
    lastPayment: "05.03.2026",
    paymentStatus: "paid",
  },
  {
    id: 3,
    property: "1+1 Stüdyo",
    address: "Mecidiyeköy Mah. Büyükdere Cad. No:88/12",
    neighborhood: "Şişli",
    city: "İstanbul",
    tenant: "Can Öztürk",
    tenantPhone: "0535 XXX XX XX",
    rent: 14000,
    paymentDay: 10,
    leaseStart: "01.09.2024",
    leaseEnd: "01.09.2025",
    status: "active",
    sqm: 55,
    lastPayment: "10.02.2026",
    paymentStatus: "overdue",
  },
  {
    id: 4,
    property: "4+1 Villa",
    address: "Tarabya Mah. Sahil Yolu No:156",
    neighborhood: "Sarıyer",
    city: "İstanbul",
    tenant: "Zeynep Kara",
    tenantPhone: "0536 XXX XX XX",
    rent: 45000,
    paymentDay: 15,
    leaseStart: "01.01.2024",
    leaseEnd: "01.01.2025",
    status: "expiring",
    sqm: 280,
    lastPayment: "15.03.2026",
    paymentStatus: "pending",
  },
  {
    id: 5,
    property: "2+1 Daire",
    address: "Küçükbakkalköy Mah. Işık Sok. No:7/4",
    neighborhood: "Ataşehir",
    city: "İstanbul",
    tenant: "Ali Kocaman",
    tenantPhone: "0537 XXX XX XX",
    rent: 16000,
    paymentDay: 1,
    leaseStart: "15.04.2024",
    leaseEnd: "15.04.2025",
    status: "active",
    sqm: 85,
    lastPayment: "01.02.2026",
    paymentStatus: "overdue",
  },
  {
    id: 6,
    property: "3+1 Daire",
    address: "Cevizli Mah. Bağdat Cad. No:220/8",
    neighborhood: "Maltepe",
    city: "İstanbul",
    tenant: "Fatma Şahin",
    tenantPhone: "0538 XXX XX XX",
    rent: 19500,
    paymentDay: 5,
    leaseStart: "01.07.2024",
    leaseEnd: "01.07.2025",
    status: "active",
    sqm: 110,
    lastPayment: "05.02.2026",
    paymentStatus: "overdue",
  },
  {
    id: 7,
    property: "1+0 Stüdyo",
    address: "Fenerbahçe Mah. Bağdat Cad. No:45/2",
    neighborhood: "Kadıköy",
    city: "İstanbul",
    tenant: "Emre Yıldırım",
    tenantPhone: "0539 XXX XX XX",
    rent: 12500,
    paymentDay: 20,
    leaseStart: "01.11.2024",
    leaseEnd: "01.11.2025",
    status: "active",
    sqm: 40,
    lastPayment: "20.02.2026",
    paymentStatus: "paid",
  },
  {
    id: 8,
    property: "Dükkan",
    address: "Alsancak Mah. Kıbrıs Şehitleri Cad. No:12",
    neighborhood: "Konak",
    city: "İzmir",
    tenant: null,
    tenantPhone: null,
    rent: 35000,
    paymentDay: null,
    leaseStart: null,
    leaseEnd: null,
    status: "vacant",
    sqm: 150,
    lastPayment: null,
    paymentStatus: null,
  },
]

const statusConfig = {
  active: { label: "Aktif", className: "bg-accent/10 text-accent border-accent/20" },
  expiring: { label: "Sözleşme Bitiyor", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  vacant: { label: "Boş", className: "bg-muted text-muted-foreground border-border" },
}

const paymentStatusConfig = {
  paid: { label: "Ödendi", className: "bg-accent/10 text-accent" },
  pending: { label: "Bekliyor", className: "bg-chart-4/10 text-chart-4" },
  overdue: { label: "Gecikti", className: "bg-destructive/10 text-destructive" },
}

type FilterType = "all" | "active" | "expiring" | "vacant" | "overdue"

export default function RentalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredRentals = rentalsData.filter(rental => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      rental.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.tenant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.address.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    let matchesFilter = true
    if (activeFilter === "active") matchesFilter = rental.status === "active"
    else if (activeFilter === "expiring") matchesFilter = rental.status === "expiring"
    else if (activeFilter === "vacant") matchesFilter = rental.status === "vacant"
    else if (activeFilter === "overdue") matchesFilter = rental.paymentStatus === "overdue"

    return matchesSearch && matchesFilter
  })

  const filterCounts = {
    all: rentalsData.length,
    active: rentalsData.filter(r => r.status === "active").length,
    expiring: rentalsData.filter(r => r.status === "expiring").length,
    vacant: rentalsData.filter(r => r.status === "vacant").length,
    overdue: rentalsData.filter(r => r.paymentStatus === "overdue").length,
  }

  return (
    <DashboardLayout 
      title="Kiralık Takibi"
      subtitle="Portföy Yönetimi"
      actions={
        <Button className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm shadow-primary/20">
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Yeni Kiralık Ekle</span>
          <span className="sm:hidden">Ekle</span>
        </Button>
      }
    >
      {/* Filters and Search */}
      <Card className="mb-6 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Kiracı, daire veya mahalle ara..."
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

            {/* Filter tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              {[
                { key: "all", label: "Tümü" },
                { key: "active", label: "Aktif" },
                { key: "expiring", label: "Bitiyor" },
                { key: "vacant", label: "Boş" },
                { key: "overdue", label: "Geciken", urgent: true },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as FilterType)}
                  className={cn(
                    "h-9 px-3 rounded-lg whitespace-nowrap",
                    activeFilter === filter.key 
                      ? filter.urgent 
                        ? "bg-destructive hover:bg-destructive/90 text-white" 
                        : "bg-primary hover:bg-primary/90"
                      : filter.urgent && filterCounts[filter.key as FilterType] > 0
                        ? "border-destructive/50 text-destructive hover:bg-destructive/5"
                        : ""
                  )}
                >
                  {filter.label}
                  <span className={cn(
                    "ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded",
                    activeFilter === filter.key 
                      ? "bg-white/20 text-white" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {filterCounts[filter.key as FilterType]}
                  </span>
                </Button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 px-3 rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                Filtreler
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-3 rounded-lg">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Dışa Aktar</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredRentals.length} kayıt gösteriliyor
        </p>
      </div>

      {/* Table - Desktop */}
      <div className="hidden lg:block">
        <Card className="border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Gayrimenkul</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Kiracı</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Kira</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Sözleşme</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Durum</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Ödeme</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRentals.map((rental) => {
                  const status = statusConfig[rental.status as keyof typeof statusConfig]
                  const paymentStatus = rental.paymentStatus 
                    ? paymentStatusConfig[rental.paymentStatus as keyof typeof paymentStatusConfig]
                    : null
                  
                  return (
                    <tr key={rental.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                            <Home className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">{rental.property}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              {rental.neighborhood}, {rental.city}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{rental.sqm} m²</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {rental.tenant ? (
                          <div>
                            <p className="text-sm font-medium text-foreground">{rental.tenant}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              {rental.tenantPhone}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            ₺{rental.rent.toLocaleString('tr-TR')}
                          </p>
                          {rental.paymentDay && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Her ayın {rental.paymentDay}. günü
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {rental.leaseStart && rental.leaseEnd ? (
                          <div>
                            <p className="text-sm text-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              {rental.leaseEnd}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Başlangıç: {rental.leaseStart}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border",
                          status.className
                        )}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {paymentStatus ? (
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
                            paymentStatus.className
                          )}>
                            {paymentStatus.label}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {rental.tenant && (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Detayları Gör
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Cards - Mobile */}
      <div className="lg:hidden space-y-3">
        {filteredRentals.map((rental) => {
          const status = statusConfig[rental.status as keyof typeof statusConfig]
          const paymentStatus = rental.paymentStatus 
            ? paymentStatusConfig[rental.paymentStatus as keyof typeof paymentStatusConfig]
            : null

          return (
            <Card key={rental.id} className="border-border/50">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                      <Home className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{rental.property}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{rental.neighborhood}, {rental.city}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border",
                    status.className
                  )}>
                    {status.label}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {rental.address}
                  </div>
                  {rental.tenant && (
                    <div className="flex items-center justify-between">
                      <span>Kiracı: {rental.tenant}</span>
                      {paymentStatus && (
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded",
                          paymentStatus.className
                        )}>
                          {paymentStatus.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-base font-bold text-foreground">
                      ₺{rental.rent.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-xs text-muted-foreground">{rental.sqm} m²</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {rental.tenant && (
                      <>
                        <Button variant="outline" size="sm" className="h-8">
                          <Phone className="w-3 h-3 mr-1" />
                          Ara
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredRentals.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Kayıt bulunamadı</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Arama kriterlerinize uygun kiralık bulunamadı.
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}>
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
