"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  CreditCard,
  AlertCircle,
  MessageCircle,
  Users,
  Building2,
  TrendingUp,
  Check,
  X,
  CheckCheck,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock notifications
const notificationsData = [
  {
    id: 1,
    type: "payment_overdue",
    title: "Ödeme Gecikti",
    description: "Ali Kocaman'ın Mart ayı kirası 11 gündür ödenmedi.",
    time: "2 saat önce",
    read: false,
    icon: AlertCircle,
    color: "destructive",
    actionLabel: "Hatırlat",
  },
  {
    id: 2,
    type: "message",
    title: "Yeni Mesaj",
    description: "Elif Çelik sizinle bir gayrimenkul hakkında iletişime geçmek istiyor.",
    time: "4 saat önce",
    read: false,
    icon: MessageCircle,
    color: "primary",
    actionLabel: "Yanıtla",
  },
  {
    id: 3,
    type: "payment_upcoming",
    title: "Yaklaşan Ödeme",
    description: "Mehmet Yılmaz'ın ödeme tarihi 3 gün sonra.",
    time: "6 saat önce",
    read: false,
    icon: CreditCard,
    color: "chart-4",
    actionLabel: "Hatırlat",
  },
  {
    id: 4,
    type: "request",
    title: "Yeni Talep",
    description: "Burak Aksoy ağdan 2+1 kiralık daire talebi gönderdi.",
    time: "1 gün önce",
    read: true,
    icon: Users,
    color: "accent",
    actionLabel: "İncele",
  },
  {
    id: 5,
    type: "lease_expiring",
    title: "Sözleşme Bitiyor",
    description: "Zeynep Kara'nın sözleşmesi 15 gün sonra bitiyor.",
    time: "1 gün önce",
    read: true,
    icon: Building2,
    color: "chart-4",
    actionLabel: "Yenile",
  },
  {
    id: 6,
    type: "market_update",
    title: "Piyasa Güncellemesi",
    description: "Kadıköy'de kira fiyatları son 1 ayda %4.2 arttı.",
    time: "2 gün önce",
    read: true,
    icon: TrendingUp,
    color: "accent",
    actionLabel: "Detaylar",
  },
  {
    id: 7,
    type: "payment_received",
    title: "Ödeme Alındı",
    description: "Ayşe Demir'in Mart kirası başarıyla tahsil edildi: ₺22.000",
    time: "3 gün önce",
    read: true,
    icon: Check,
    color: "accent",
    actionLabel: null,
  },
  {
    id: 8,
    type: "message",
    title: "Yeni Mesaj",
    description: "Selin Yıldırım talebinize cevap verdi.",
    time: "4 gün önce",
    read: true,
    icon: MessageCircle,
    color: "primary",
    actionLabel: "Oku",
  },
]

const colorClasses = {
  destructive: {
    bg: "bg-destructive/10",
    icon: "text-destructive",
  },
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
  },
  accent: {
    bg: "bg-accent/10",
    icon: "text-accent",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    icon: "text-chart-4",
  },
}

type FilterType = "all" | "unread"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "unread") return !n.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <DashboardLayout 
      title="Bildirimler"
      subtitle="Güncellemeler"
      actions={
        unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 px-4 rounded-xl"
            onClick={markAllAsRead}
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Tümünü Okundu İşaretle
          </Button>
        )
      }
    >
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="h-9 px-4 rounded-lg"
        >
          Tümü
          <span className={cn(
            "ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded",
            activeFilter === "all" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
          )}>
            {notifications.length}
          </span>
        </Button>
        <Button
          variant={activeFilter === "unread" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("unread")}
          className="h-9 px-4 rounded-lg"
        >
          Okunmamış
          {unreadCount > 0 && (
            <span className={cn(
              "ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded",
              activeFilter === "unread" ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            )}>
              {unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon
          const colors = colorClasses[notification.color as keyof typeof colorClasses]
          
          return (
            <Card 
              key={notification.id} 
              className={cn(
                "border-border/50 transition-all hover:shadow-sm",
                !notification.read && "border-primary/30 bg-primary/[0.02]"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0",
                    colors.bg
                  )}>
                    <Icon className={cn("w-5 h-5", colors.icon)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={cn(
                        "text-sm text-foreground",
                        !notification.read && "font-semibold"
                      )}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {notification.actionLabel && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs hidden sm:flex"
                      >
                        {notification.actionLabel}
                      </Button>
                    )}
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile action button */}
                {notification.actionLabel && (
                  <div className="sm:hidden mt-3 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full h-9 text-xs">
                      {notification.actionLabel}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredNotifications.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {activeFilter === "unread" ? "Okunmamış bildirim yok" : "Bildirim yok"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeFilter === "unread" 
                ? "Tüm bildirimlerinizi okudunuz." 
                : "Henüz bildirim almadınız."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
