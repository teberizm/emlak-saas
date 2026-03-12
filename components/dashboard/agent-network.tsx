"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Share, Star, CheckCircle } from "lucide-react"

const agents = [
  {
    id: 1,
    name: "Elif Çelik",
    agency: "Prime Real Estate",
    location: "Istanbul",
    trustScore: 98,
    deals: 47,
    initials: "EÇ",
    verified: true,
  },
  {
    id: 2,
    name: "Burak Aksoy",
    agency: "Horizon Properties",
    location: "Istanbul",
    trustScore: 94,
    deals: 32,
    initials: "BA",
    verified: true,
  },
  {
    id: 3,
    name: "Selin Yıldırım",
    agency: "Atlas Emlak",
    location: "Ankara",
    trustScore: 91,
    deals: 28,
    initials: "SY",
    verified: false,
  },
]

function TrustScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 18
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-muted/30"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-accent transition-all duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
        {score}
      </span>
    </div>
  )
}

export function AgentNetwork() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Agent Network</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Top performing partners</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
            View all
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-200"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-sm font-semibold text-primary">
                  {agent.initials}
                </div>
                {agent.verified && (
                  <CheckCircle className="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-accent fill-background" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{agent.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{agent.agency}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-chart-4 text-chart-4" />
                    {agent.deals} deals
                  </span>
                  <span className="text-xs text-muted-foreground">{agent.location}</span>
                </div>
              </div>

              {/* Trust Score */}
              <TrustScoreRing score={agent.trustScore} />

              {/* Actions */}
              <div className="flex flex-col gap-1.5">
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                  <MessageCircle className="w-3 h-3 mr-1.5" />
                  Message
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-muted-foreground">
                  <Share className="w-3 h-3 mr-1.5" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
