"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
  Area,
  AreaChart,
  Tooltip,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Market trend data
const marketTrendData = [
  { month: "Eki", avgRent: 15200, yourRent: 14800 },
  { month: "Kas", avgRent: 15800, yourRent: 15000 },
  { month: "Ara", avgRent: 16200, yourRent: 15200 },
  { month: "Oca", avgRent: 16800, yourRent: 15500 },
  { month: "Şub", avgRent: 17400, yourRent: 16000 },
  { month: "Mar", avgRent: 18100, yourRent: 16500 },
]

// District comparison data
const districtData = [
  { district: "Kadıköy", avgRent: 22500, change: 12.5 },
  { district: "Beşiktaş", avgRent: 28000, change: 15.2 },
  { district: "Şişli", avgRent: 19500, change: 8.3 },
  { district: "Ataşehir", avgRent: 17000, change: 10.1 },
  { district: "Sarıyer", avgRent: 32000, change: 18.7 },
  { district: "Maltepe", avgRent: 16500, change: 9.4 },
]

// Property type comparison
const propertyTypeData = [
  { type: "1+1", avgRent: 12500, count: 1250 },
  { type: "2+1", avgRent: 17500, count: 2340 },
  { type: "3+1", avgRent: 22000, count: 1890 },
  { type: "4+1", avgRent: 32000, count: 560 },
]

// Your portfolio comparison
const portfolioComparison = [
  { 
    property: "3+1 Daire, Kadıköy",
    currentRent: 18500,
    marketAvg: 22500,
    diff: -17.8,
    recommendation: "Zam önerilir",
  },
  { 
    property: "2+1 Daire, Beşiktaş",
    currentRent: 22000,
    marketAvg: 24000,
    diff: -8.3,
    recommendation: "Piyasaya yakın",
  },
  { 
    property: "1+1 Stüdyo, Şişli",
    currentRent: 14000,
    marketAvg: 13500,
    diff: 3.7,
    recommendation: "Piyasa üstü",
  },
  { 
    property: "4+1 Villa, Sarıyer",
    currentRent: 45000,
    marketAvg: 42000,
    diff: 7.1,
    recommendation: "Piyasa üstü",
  },
  { 
    property: "2+1 Daire, Ataşehir",
    currentRent: 16000,
    marketAvg: 17500,
    diff: -8.6,
    recommendation: "Piyasaya yakın",
  },
]

export default function MarketPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6ay")

  return (
    <DashboardLayout 
      title="Piyasa Analizi"
      subtitle="Pazar Verileri"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">İstanbul Ort. Kira</span>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xl font-bold text-foreground">₺18.100</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-accent" />
              <span className="text-xs font-medium text-accent">+4.0%</span>
              <span className="text-xs text-muted-foreground">bu ay</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Portföy Ortalaması</span>
              <Home className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">₺16.500</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="w-3 h-3 text-chart-4" />
              <span className="text-xs font-medium text-chart-4">-8.8%</span>
              <span className="text-xs text-muted-foreground">piyasanın altı</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Zam Potansiyeli</span>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xl font-bold text-foreground">₺14.500</p>
            <p className="text-xs text-muted-foreground mt-1">
              Toplam aylık potansiyel
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Piyasa Altı</span>
              <Info className="w-4 h-4 text-chart-4" />
            </div>
            <p className="text-xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground mt-1">
              gayrimenkul zam bekliyor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Market Trend Chart */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Kira Trendi</CardTitle>
                <CardDescription>Piyasa ortalaması vs. portföyünüz</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                {selectedPeriod === "6ay" ? "Son 6 Ay" : "Son 12 Ay"}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgRent: {
                  label: "Piyasa Ort.",
                  color: "hsl(var(--chart-1))",
                },
                yourRent: {
                  label: "Portföyünüz",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorYour" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `₺${(value/1000).toFixed(0)}K`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="avgRent"
                    stroke="var(--color-avgRent)"
                    fillOpacity={1}
                    fill="url(#colorAvg)"
                    name="Piyasa Ort."
                  />
                  <Area
                    type="monotone"
                    dataKey="yourRent"
                    stroke="var(--color-yourRent)"
                    fillOpacity={1}
                    fill="url(#colorYour)"
                    name="Portföyünüz"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* District Comparison */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">İlçe Karşılaştırması</CardTitle>
            <CardDescription>Ortalama kira ve aylık değişim</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgRent: {
                  label: "Ort. Kira",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" className="text-xs" tickFormatter={(value) => `₺${(value/1000).toFixed(0)}K`} />
                  <YAxis dataKey="district" type="category" className="text-xs" width={70} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="avgRent" 
                    fill="hsl(var(--chart-1))" 
                    radius={[0, 4, 4, 0]}
                    name="Ort. Kira"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Comparison Table */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Portföy Piyasa Karşılaştırması</CardTitle>
              <CardDescription>Gayrimenkullerinizin piyasa değerlendirmesi</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Rapor İndir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Gayrimenkul</th>
                    <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Mevcut Kira</th>
                    <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Piyasa Ort.</th>
                    <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Fark</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Öneri</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {portfolioComparison.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{item.property}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="text-sm font-semibold text-foreground">
                          ₺{item.currentRent.toLocaleString('tr-TR')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="text-sm text-muted-foreground">
                          ₺{item.marketAvg.toLocaleString('tr-TR')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={cn(
                          "inline-flex items-center text-sm font-semibold",
                          item.diff < -10 ? "text-destructive" :
                          item.diff < 0 ? "text-chart-4" :
                          "text-accent"
                        )}>
                          {item.diff > 0 ? "+" : ""}{item.diff}%
                          {item.diff < 0 ? (
                            <ArrowDownRight className="w-3 h-3 ml-0.5" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 ml-0.5" />
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
                          item.diff < -10 ? "bg-destructive/10 text-destructive" :
                          item.diff < 0 ? "bg-chart-4/10 text-chart-4" :
                          "bg-accent/10 text-accent"
                        )}>
                          {item.recommendation}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {portfolioComparison.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{item.property}</span>
                  </div>
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
                    item.diff < -10 ? "bg-destructive/10 text-destructive" :
                    item.diff < 0 ? "bg-chart-4/10 text-chart-4" :
                    "bg-accent/10 text-accent"
                  )}>
                    {item.recommendation}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Mevcut</p>
                    <p className="font-semibold text-foreground">₺{item.currentRent.toLocaleString('tr-TR')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Piyasa</p>
                    <p className="text-muted-foreground">₺{item.marketAvg.toLocaleString('tr-TR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Fark</p>
                    <p className={cn(
                      "font-semibold",
                      item.diff < -10 ? "text-destructive" :
                      item.diff < 0 ? "text-chart-4" :
                      "text-accent"
                    )}>
                      {item.diff > 0 ? "+" : ""}{item.diff}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
