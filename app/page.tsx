"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments"
import { OverduePayments } from "@/components/dashboard/overdue-payments"
import { BelowMarketRentals } from "@/components/dashboard/below-market-rentals"
import { EmlakSorWidget } from "@/components/dashboard/emlak-sor-widget"
import { QuickStats } from "@/components/dashboard/quick-stats"

export default function DashboardPage() {
  return (
    <DashboardLayout 
      title="Hoş geldiniz, Ahmet"
      subtitle="Kontrol Paneli"
      showLastUpdate
    >
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
    </DashboardLayout>
  )
}
