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
  Mail,
  MoreHorizontal,
  User,
  Building2,
  Calendar,
  ChevronDown,
  X,
  Eye,
  Edit,
  Trash2,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for clients
const clientsData = [
  {
    id: 1,
    name: "Mehmet Yılmaz",
    phone: "0532 XXX XX XX",
    email: "mehmet@email.com",
    type: "tenant",
    status: "active",
    properties: 1,
    totalRent: 18500,
    joinDate: "01.03.2024",
    lastContact: "10.03.2026",
    notes: "Düzenli ödemeler",
    initials: "MY",
    rating: 5,
  },
  {
    id: 2,
    name: "Ayşe Demir",
    phone: "0533 XXX XX XX",
    email: "ayse@email.com",
    type: "tenant",
    status: "active",
    properties: 1,
    totalRent: 22000,
    joinDate: "15.06.2024",
    lastContact: "08.03.2026",
    notes: "Ev sahibi ile iyi ilişkiler",
    initials: "AD",
    rating: 4,
  },
  {
    id: 3,
    name: "Can Öztürk",
    phone: "0535 XXX XX XX",
    email: "can@email.com",
    type: "tenant",
    status: "overdue",
    properties: 1,
    totalRent: 14000,
    joinDate: "01.09.2024",
    lastContact: "05.03.2026",
    notes: "Ödemede 1 ay gecikme var",
    initials: "CÖ",
    rating: 3,
  },
  {
    id: 4,
    name: "Zeynep Kara",
    phone: "0536 XXX XX XX",
    email: "zeynep@email.com",
    type: "tenant",
    status: "expiring",
    properties: 1,
    totalRent: 45000,
    joinDate: "01.01.2024",
    lastContact: "12.03.2026",
    notes: "Sözleşme yenileme görüşmesi",
    initials: "ZK",
    rating: 5,
  },
  {
    id: 5,
    name: "Ali Kocaman",
    phone: "0537 XXX XX XX",
    email: "ali@email.com",
    type: "tenant",
    status: "overdue",
    properties: 1,
    totalRent: 16000,
    joinDate: "15.04.2024",
    lastContact: "01.03.2026",
    notes: "2 ay gecikme - takip edilmeli",
    initials: "AK",
    rating: 2,
  },
  {
    id: 6,
    name: "Fatma Şahin",
    phone: "0538 XXX XX XX",
    email: "fatma@email.com",
    type: "tenant",
    status: "overdue",
    properties: 1,
    totalRent: 19500,
    joinDate: "01.07.2024",
    lastContact: "07.03.2026",
    notes: "1 hafta gecikme",
    initials: "FŞ",
    rating: 3,
  },
  {
    id: 7,
    name: "Emre Yıldırım",
    phone: "0539 XXX XX XX",
    email: "emre@email.com",
    type: "tenant",
    status: "active",
    properties: 1,
    totalRent: 12500,
    joinDate: "01.11.2024",
    lastContact: "20.02.2026",
    notes: "Yeni kiracı",
    initials: "EY",
    rating: 4,
  },
  {
    id: 8,
    name: "Hasan Koç",
    phone: "0540 XXX XX XX",
    email: "hasan@email.com",
    type: "owner",
    status: "active",
    properties: 3,
    totalRent: 56000,
    joinDate: "01.01.2023",
    lastContact: "11.03.2026",
    notes: "Premium mal sahibi - 3 daire",
    initials: "HK",
    rating: 5,
  },
  {
    id: 9,
    name: "Selin Aydın",
    phone: "0541 XXX XX XX",
    email: "selin@email.com",
    type: "owner",
    status: "active",
    properties: 2,
    totalRent: 38000,
    joinDate: "15.03.2023",
    lastContact: "09.03.2026",
    notes: "2 daire yönetimi",
    initials: "SA",
    rating: 4,
  },
  {
    id: 10,
    name: "Oğuz Demir",
    phone: "0542 XXX XX XX",
    email: "oguz@email.com",
    type: "prospect",
    status: "new",
    properties: 0,
    totalRent: 0,
    joinDate: "10.03.2026",
    lastContact: "10.03.2026",
    notes: "Kiralık arıyor - Kadıköy 2+1",
    initials: "OD",
    rating: 0,
  },
]

const statusConfig = {
  active: { label: "Aktif", className: "bg-accent/10 text-accent border-accent/20" },
  overdue: { label: "Gecikme Var", className: "bg-destructive/10 text-destructive border-destructive/20" },
  expiring: { label: "Sözleşme Bitiyor", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  new: { label: "Yeni", className: "bg-primary/10 text-primary border-primary/20" },
}

const typeConfig = {
  tenant: { label: "Kiracı", className: "bg-primary/10 text-primary" },
  owner: { label: "Mal Sahibi", className: "bg-accent/10 text-accent" },
  prospect: { label: "Aday", className: "bg-chart-4/10 text-chart-4" },
}

type FilterType = "all" | "tenant" | "owner" | "prospect" | "overdue"

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredClients = clientsData.filter(client => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.notes?.toLowerCase().includes(searchQuery.toLowerCase())

    // Type filter
    let matchesFilter = true
    if (activeFilter === "tenant") matchesFilter = client.type === "tenant"
    else if (activeFilter === "owner") matchesFilter = client.type === "owner"
    else if (activeFilter === "prospect") matchesFilter = client.type === "prospect"
    else if (activeFilter === "overdue") matchesFilter = client.status === "overdue"

    return matchesSearch && matchesFilter
  })

  const filterCounts = {
    all: clientsData.length,
    tenant: clientsData.filter(c => c.type === "tenant").length,
    owner: clientsData.filter(c => c.type === "owner").length,
    prospect: clientsData.filter(c => c.type === "prospect").length,
    overdue: clientsData.filter(c => c.status === "overdue").length,
  }

  return (
    <DashboardLayout 
      title="Müşteriler"
      subtitle="Müşteri Yönetimi"
      actions={
        <Button className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm shadow-primary/20">
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Yeni Müşteri</span>
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
                placeholder="İsim, e-posta veya not ara..."
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
                { key: "tenant", label: "Kiracılar" },
                { key: "owner", label: "Mal Sahipleri" },
                { key: "prospect", label: "Adaylar" },
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
          {filteredClients.length} müşteri gösteriliyor
        </p>
      </div>

      {/* Table - Desktop */}
      <div className="hidden lg:block">
        <Card className="border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Müşteri</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Tür</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">İletişim</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Gayrimenkul</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Durum</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Puan</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClients.map((client) => {
                  const status = statusConfig[client.status as keyof typeof statusConfig]
                  const type = typeConfig[client.type as keyof typeof typeConfig]
                  
                  return (
                    <tr key={client.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                            <span className="text-sm font-semibold text-primary">{client.initials}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">{client.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">
                              {client.notes}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
                          type.className
                        )}>
                          {type.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {client.phone}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {client.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm text-foreground flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-muted-foreground" />
                            {client.properties} gayrimenkul
                          </p>
                          {client.totalRent > 0 && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              ₺{client.totalRent.toLocaleString('tr-TR')}/ay
                            </p>
                          )}
                        </div>
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
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "w-3.5 h-3.5",
                                star <= client.rating 
                                  ? "fill-chart-4 text-chart-4" 
                                  : "text-muted-foreground/30"
                              )}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Profili Gör
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                E-posta Gönder
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
        {filteredClients.map((client) => {
          const status = statusConfig[client.status as keyof typeof statusConfig]
          const type = typeConfig[client.type as keyof typeof typeConfig]

          return (
            <Card key={client.id} className="border-border/50">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{client.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{client.name}</p>
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded mt-1",
                        type.className
                      )}>
                        {type.label}
                      </span>
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
                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {client.email}
                  </div>
                  {client.notes && (
                    <p className="text-muted-foreground pt-1">{client.notes}</p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      {client.properties}
                    </div>
                    {client.totalRent > 0 && (
                      <span className="text-xs font-medium text-foreground">
                        ₺{client.totalRent.toLocaleString('tr-TR')}/ay
                      </span>
                    )}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-3 h-3",
                            star <= client.rating 
                              ? "fill-chart-4 text-chart-4" 
                              : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <Phone className="w-3 h-3 mr-1" />
                      Ara
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredClients.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Müşteri bulunamadı</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Arama kriterlerinize uygun müşteri bulunamadı.
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
