"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Share2, Check, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "property",
    title: "Yeni gayrimenkul listelendi",
    description: "Sarıyer'de villa portföyünüze eklendi",
    time: "2 dakika önce",
    icon: Building2,
  },
  {
    id: 2,
    type: "client",
    title: "Müşteri eşleştirildi",
    description: "Mehmet Y. 3 gayrimenkulle eşleştirildi",
    time: "15 dakika önce",
    icon: Users,
  },
  {
    id: 3,
    type: "share",
    title: "Gayrimenkul paylaşıldı",
    description: "Elif Ç. sizinle bir gayrimenkul paylaştı",
    time: "1 saat önce",
    icon: Share2,
  },
  {
    id: 4,
    type: "deal",
    title: "Anlaşma tamamlandı",
    description: "Alınan komisyon: ₺42.500",
    time: "3 saat önce",
    icon: Check,
  },
  {
    id: 5,
    type: "message",
    title: "Yeni mesaj",
    description: "Burak A. size bir mesaj gönderdi",
    time: "5 saat önce",
    icon: MessageCircle,
  },
]

const iconStyles = {
  property: "bg-primary/10 text-primary",
  client: "bg-accent/10 text-accent",
  share: "bg-chart-3/10 text-chart-3",
  deal: "bg-accent/10 text-accent",
  message: "bg-chart-4/10 text-chart-4",
}

export function ActivityFeed() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Son Aktiviteler</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
          
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0",
                  iconStyles[activity.type as keyof typeof iconStyles]
                )}
              >
                <activity.icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
