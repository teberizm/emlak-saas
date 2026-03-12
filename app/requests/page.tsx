"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  MapPin, 
  Home,
  Wallet,
  MessageCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  User,
  Phone,
  Building2,
  Eye,
  Share
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock incoming requests from network
const incomingRequests = [
  {
    id: 1,
    agent: "Elif Çelik",
    agency: "Prime Gayrimenkul",
    type: "Kiralık",
    location: "Kadıköy",
    rooms: "3+1",
    budget: "₺20-25K",
    description: "Asansörlü, kapalı otoparklı, kombili daire arıyorum. Tercihen Caferağa veya Moda bölgesi.",
    date: "11 Mart 2026",
    status: "new",
    initials: "EÇ",
  },
  {
    id: 2,
    agent: "Burak Aksoy",
    agency: "Horizon Gayrimenkul",
    type: "Satılık",
    location: "Beşiktaş",
    rooms: "2+1",
    budget: "₺5-7M",
    description: "Deniz manzaralı veya park manzaralı olmalı. Yeni veya sıfır bina tercih edilir.",
    date: "10 Mart 2026",
    status: "viewed",
    initials: "BA",
  },
  {
    id: 3,
    agent: "Selin Yıldırım",
    agency: "Atlas Emlak",
    type: "Kiralık",
    location: "Ataşehir",
    rooms: "1+1",
    budget: "₺12-15K",
    description: "Yeni evli çift için. Metro yakını önemli. Eşyalı olabilir.",
    date: "9 Mart 2026",
    status: "responded",
    initials: "SY",
  },
  {
    id: 4,
    agent: "Mert Özkan",
    agency: "Kent Emlak",
    type: "Kiralık",
    location: "Şişli",
    rooms: "2+1",
    budget: "₺18-22K",
    description: "Profesyonel çalışan için. Metrobüs veya metro yakını tercih edilir.",
    date: "8 Mart 2026",
    status: "responded",
    initials: "MÖ",
  },
  {
    id: 5,
    agent: "Deniz Arslan",
    agency: "Güven Emlak",
    type: "Satılık",
    location: "Maltepe",
    rooms: "3+1",
    budget: "₺3-4M",
    description: "Aile için geniş daire. Site içi tercih edilir. Sosyal alanlar önemli.",
    date: "7 Mart 2026",
    status: "closed",
    initials: "DA",
  },
]

const statusConfig = {
  new: { label: "Yeni", className: "bg-primary/10 text-primary border-primary/20" },
  viewed: { label: "Görüldü", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  responded: { label: "Cevaplandı", className: "bg-accent/10 text-accent border-accent/20" },
  closed: { label: "Kapandı", className: "bg-muted text-muted-foreground border-border" },
}

type FilterType = "all" | "new" | "responded" | "closed"

export default function RequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredRequests = incomingRequests.filter(request => {
    const matchesSearch = searchQuery === "" || 
      request.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesFilter = true
    if (activeFilter === "new") matchesFilter = request.status === "new" || request.status === "viewed"
    else if (activeFilter === "responded") matchesFilter = request.status === "responded"
    else if (activeFilter === "closed") matchesFilter = request.status === "closed"

    return matchesSearch && matchesFilter
  })

  const filterCounts = {
    all: incomingRequests.length,
    new: incomingRequests.filter(r => r.status === "new" || r.status === "viewed").length,
    responded: incomingRequests.filter(r => r.status === "responded").length,
    closed: incomingRequests.filter(r => r.status === "closed").length,
  }

  return (
    <DashboardLayout 
      title="Gelen Talepler"
      subtitle="Ağdan Gelen İstekler"
    >
      {/* Filters and Search */}
      <Card className="mb-6 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Acenta, konum veya detay ara..."
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
                { key: "new", label: "Yeni", highlight: true },
                { key: "responded", label: "Cevaplanan" },
                { key: "closed", label: "Kapanan" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as FilterType)}
                  className={cn(
                    "h-9 px-3 rounded-lg whitespace-nowrap",
                    activeFilter === filter.key && "bg-primary hover:bg-primary/90"
                  )}
                >
                  {filter.label}
                  <span className={cn(
                    "ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded",
                    activeFilter === filter.key 
                      ? "bg-white/20 text-white" 
                      : filter.highlight && filterCounts[filter.key as FilterType] > 0
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                  )}>
                    {filterCounts[filter.key as FilterType]}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredRequests.length} talep gösteriliyor
        </p>
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const status = statusConfig[request.status as keyof typeof statusConfig]
          
          return (
            <Card key={request.id} className={cn(
              "border-border/50 transition-all hover:shadow-md",
              request.status === "new" && "border-primary/30 bg-primary/[0.02]"
            )}>
              <CardContent className="p-4 lg:p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Agent Info */}
                  <div className="flex items-start gap-3 lg:w-48 flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{request.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{request.agent}</p>
                      <p className="text-xs text-muted-foreground truncate">{request.agency}</p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border",
                        request.type === "Kiralık" 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "bg-accent/10 text-accent border-accent/20"
                      )}>
                        {request.type}
                      </span>
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border",
                        status.className
                      )}>
                        {status.label}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">{request.date}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        {request.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-muted-foreground" />
                        {request.rooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-muted-foreground" />
                        {request.budget}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:flex-col lg:items-end pt-3 lg:pt-0 border-t lg:border-t-0 border-border">
                    {request.status !== "closed" && (
                      <>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Eye className="w-3 h-3 mr-1.5" />
                          <span className="hidden sm:inline">Eşleştir</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Share className="w-3 h-3 mr-1.5" />
                          <span className="hidden sm:inline">Paylaş</span>
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">
                          <MessageCircle className="w-3 h-3 mr-1.5" />
                          <span className="hidden sm:inline">Yanıtla</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredRequests.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Talep bulunamadı</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bu kategoride talep bulunmuyor.
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
