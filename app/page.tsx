"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { PropertyCards } from "@/components/dashboard/property-cards"
import { ClientRequests } from "@/components/dashboard/client-requests"
import { AgentNetwork } from "@/components/dashboard/agent-network"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop only */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header />

        {/* Page content */}
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8 overflow-auto">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
                  Kontrol Paneli
                </h1>
                <p className="text-muted-foreground mt-1">
                  Hoş geldiniz, Ahmet. Gayrimenkullerinizde neler olup bittiğine dair bir özet.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Canlı güncellemeler
                </span>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <section className="mb-8">
            <KpiCards />
          </section>

          {/* Main grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Left column - 2/3 width on XL */}
            <div className="xl:col-span-2 space-y-6 lg:space-y-8">
              <PropertyCards />
              <ClientRequests />
            </div>

            {/* Right column - 1/3 width on XL */}
            <div className="space-y-6 lg:space-y-8">
              <AgentNetwork />
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  )
}
