"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments"
import { OverduePayments } from "@/components/dashboard/overdue-payments"
import { BelowMarketRentals } from "@/components/dashboard/below-market-rentals"
import { EmlakSorWidget } from "@/components/dashboard/emlak-sor-widget"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop only */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />

        {/* Page content */}
        <main className="flex-1 px-4 py-5 lg:px-6 xl:px-8 lg:py-6 pb-24 lg:pb-8 overflow-auto">
          {/* Page header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Kontrol Paneli
                </p>
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                  Hoş geldiniz, Ahmet
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  Son güncelleme: 2 dk önce
                </span>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <section className="mb-6 lg:mb-8">
            <KpiCards />
          </section>

          {/* Main content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6">
            {/* Left column - Primary content (8 cols) */}
            <div className="xl:col-span-8 space-y-5 lg:space-y-6">
              {/* Overdue payments - Most important, shown first */}
              <OverduePayments />
              
              {/* Upcoming payments */}
              <UpcomingPayments />
              
              {/* Below market rentals */}
              <BelowMarketRentals />
            </div>

            {/* Right column - Secondary content (4 cols) */}
            <div className="xl:col-span-4 space-y-5 lg:space-y-6">
              {/* Quick stats */}
              <QuickStats />
              
              {/* Emlak Sor - Secondary feature but visible */}
              <EmlakSorWidget />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  )
}
