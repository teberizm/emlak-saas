"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Wallet, Building } from "lucide-react"
import { cn } from "@/lib/utils"

const requests = [
  {
    id: 1,
    clientName: "Mehmet Yılmaz",
    budget: "₺3-5M",
    location: "Kadıköy",
    propertyType: "Apartment",
    status: "New",
    initials: "MY",
  },
  {
    id: 2,
    clientName: "Ayşe Demir",
    budget: "₺6-8M",
    location: "Beşiktaş",
    propertyType: "Villa",
    status: "Matching",
    initials: "AD",
  },
  {
    id: 3,
    clientName: "Can Öztürk",
    budget: "₺2-3M",
    location: "Ataşehir",
    propertyType: "Apartment",
    status: "Shared",
    initials: "CÖ",
  },
  {
    id: 4,
    clientName: "Zeynep Kara",
    budget: "₺10-15M",
    location: "Sarıyer",
    propertyType: "Villa",
    status: "New",
    initials: "ZK",
  },
]

const statusConfig = {
  New: { label: "New", className: "bg-primary/10 text-primary border-primary/20" },
  Matching: { label: "Matching", className: "bg-accent/10 text-accent border-accent/20" },
  Shared: { label: "Network", className: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  Closed: { label: "Closed", className: "bg-muted text-muted-foreground border-border" },
}

export function ClientRequests() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Client Requests</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Active property inquiries</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
            View board
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="group flex items-center gap-4 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-200 cursor-pointer"
            >
              {/* Avatar */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 text-sm font-semibold text-primary flex-shrink-0">
                {request.initials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{request.clientName}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-medium",
                      statusConfig[request.status as keyof typeof statusConfig].className
                    )}
                  >
                    {statusConfig[request.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Wallet className="w-3 h-3" />
                    {request.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {request.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {request.propertyType}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
