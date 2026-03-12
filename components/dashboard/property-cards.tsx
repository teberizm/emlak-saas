"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Pencil, Share2, MapPin, Maximize, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    location: "Beşiktaş, İstanbul",
    price: "₺4.250.000",
    size: "185 m²",
    status: "Aktif",
    type: "Daire",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    location: "Kadıköy, İstanbul",
    price: "₺8.900.000",
    size: "320 m²",
    status: "Beklemede",
    type: "Villa",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    location: "Ataşehir, İstanbul",
    price: "₺3.150.000",
    size: "145 m²",
    status: "Aktif",
    type: "Daire",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    location: "Çankaya, Ankara",
    price: "₺5.750.000",
    size: "210 m²",
    status: "Satıldı",
    type: "Daire",
  },
]

const statusStyles = {
  Aktif: "bg-accent/10 text-accent border-accent/20",
  Beklemede: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Satıldı: "bg-muted text-muted-foreground border-border",
}

export function PropertyCards() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Son Gayrimenkuller</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Gayrimenkul ilanlarınızı yönetin</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
            Tümünü gör
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group flex gap-4 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <img
                  src={property.image}
                  alt={property.location}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
                <Badge
                  className={cn(
                    "absolute top-2 left-2 text-[10px] font-medium border",
                    statusStyles[property.status as keyof typeof statusStyles]
                  )}
                >
                  {property.status}
                </Badge>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{property.price}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Maximize className="w-3 h-3" />
                      {property.size}
                    </span>
                    <span className="text-xs text-muted-foreground">{property.type}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 mt-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                    <Share2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
