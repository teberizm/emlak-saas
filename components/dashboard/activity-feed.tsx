"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Share2, Check, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "property",
    title: "New property listed",
    description: "Villa in Sarıyer added to your portfolio",
    time: "2 min ago",
    icon: Building2,
  },
  {
    id: 2,
    type: "client",
    title: "Client matched",
    description: "Mehmet Y. matched with 3 properties",
    time: "15 min ago",
    icon: Users,
  },
  {
    id: 3,
    type: "share",
    title: "Property shared",
    description: "Elif Ç. shared a property with you",
    time: "1 hour ago",
    icon: Share2,
  },
  {
    id: 4,
    type: "deal",
    title: "Deal completed",
    description: "Commission received: ₺42,500",
    time: "3 hours ago",
    icon: Check,
  },
  {
    id: 5,
    type: "message",
    title: "New message",
    description: "Burak A. sent you a message",
    time: "5 hours ago",
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
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
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
