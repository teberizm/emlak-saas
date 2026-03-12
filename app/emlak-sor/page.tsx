"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  HelpCircle, 
  MapPin, 
  Home,
  Wallet,
  Send,
  MessageCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock past requests
const pastRequests = [
  {
    id: 1,
    type: "Kiralık",
    location: "Kadıköy",
    rooms: "2+1",
    budget: "₺15-20K",
    status: "responded",
    responses: 3,
    date: "10 Mart 2026",
    description: "Asansörlü, kombili, güneş alan",
  },
  {
    id: 2,
    type: "Satılık",
    location: "Beşiktaş",
    rooms: "3+1",
    budget: "₺4-6M",
    status: "responded",
    responses: 5,
    date: "8 Mart 2026",
    description: "Deniz manzaralı, garajlı",
  },
  {
    id: 3,
    type: "Kiralık",
    location: "Ataşehir",
    rooms: "1+1",
    budget: "₺10-12K",
    status: "waiting",
    responses: 0,
    date: "5 Mart 2026",
    description: "Metro yakını, eşyalı olabilir",
  },
  {
    id: 4,
    type: "Kiralık",
    location: "Şişli",
    rooms: "2+1",
    budget: "₺18-22K",
    status: "closed",
    responses: 7,
    date: "1 Mart 2026",
    description: "Metrobüs yakını",
  },
]

const statusConfig = {
  waiting: { label: "Bekliyor", icon: Clock, className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  responded: { label: "Cevap Geldi", icon: MessageCircle, className: "bg-accent/10 text-accent border-accent/20" },
  closed: { label: "Kapandı", icon: CheckCircle2, className: "bg-muted text-muted-foreground border-border" },
}

export default function EmlakSorPage() {
  const [formData, setFormData] = useState({
    type: "rental",
    location: "",
    rooms: "",
    minBudget: "",
    maxBudget: "",
    description: "",
  })

  return (
    <DashboardLayout 
      title="Emlak Sor"
      subtitle="Ağdan Emlak Ara"
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left - New Request Form */}
        <div className="xl:col-span-5">
          <Card className="border-border/50 sticky top-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Yeni Talep Oluştur</CardTitle>
                  <CardDescription>Ağdaki acentalara emlak sorun</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {/* Type Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Talep Türü</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.type === "rental" ? "default" : "outline"}
                      className="flex-1 h-10"
                      onClick={() => setFormData(prev => ({ ...prev, type: "rental" }))}
                    >
                      Kiralık
                    </Button>
                    <Button
                      type="button"
                      variant={formData.type === "sale" ? "default" : "outline"}
                      className="flex-1 h-10"
                      onClick={() => setFormData(prev => ({ ...prev, type: "sale" }))}
                    >
                      Satılık
                    </Button>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">Konum</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="İlçe veya mahalle"
                      className="pl-10 h-10"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Rooms */}
                <div className="space-y-2">
                  <Label htmlFor="rooms" className="text-sm font-medium">Oda Sayısı</Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="rooms"
                      placeholder="Örn: 2+1, 3+1"
                      className="pl-10 h-10"
                      value={formData.rooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Bütçe Aralığı</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Min"
                        className="pl-10 h-10"
                        value={formData.minBudget}
                        onChange={(e) => setFormData(prev => ({ ...prev, minBudget: e.target.value }))}
                      />
                    </div>
                    <span className="flex items-center text-muted-foreground">-</span>
                    <div className="relative flex-1">
                      <Input
                        placeholder="Max"
                        className="h-10"
                        value={formData.maxBudget}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxBudget: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Ek Detaylar</Label>
                  <Textarea
                    id="description"
                    placeholder="Asansör, otopark, manzara gibi özellikler..."
                    className="min-h-[100px] resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Talebi Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right - Past Requests */}
        <div className="xl:col-span-7">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Geçmiş Taleplerim</CardTitle>
                  <CardDescription>{pastRequests.length} talep</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastRequests.map((request) => {
                  const status = statusConfig[request.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div 
                      key={request.id}
                      className="p-4 rounded-xl border border-border bg-card hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border",
                            request.type === "Kiralık" 
                              ? "bg-primary/10 text-primary border-primary/20" 
                              : "bg-accent/10 text-accent border-accent/20"
                          )}>
                            {request.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{request.date}</span>
                        </div>
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border",
                          status.className
                        )}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm mb-2">
                        <span className="flex items-center gap-1 text-foreground font-medium">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          {request.location}
                        </span>
                        <span className="flex items-center gap-1 text-foreground">
                          <Home className="w-3.5 h-3.5 text-muted-foreground" />
                          {request.rooms}
                        </span>
                        <span className="flex items-center gap-1 text-foreground">
                          <Wallet className="w-3.5 h-3.5 text-muted-foreground" />
                          {request.budget}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">{request.description}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        {request.responses > 0 ? (
                          <span className="flex items-center gap-1 text-sm font-medium text-accent">
                            <User className="w-4 h-4" />
                            {request.responses} cevap geldi
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Henüz cevap yok</span>
                        )}
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 h-8">
                          Detaylar
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
