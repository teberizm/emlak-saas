"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  showLastUpdate?: boolean
  actions?: ReactNode
}

export function DashboardLayout({ 
  children, 
  title, 
  subtitle, 
  showLastUpdate = false,
  actions 
}: DashboardLayoutProps) {
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
                {subtitle && (
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {subtitle}
                  </p>
                )}
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                {showLastUpdate && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Son güncelleme: 2 dk önce
                  </span>
                )}
                {actions}
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  )
}
