"use client"

import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          {subtitle && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {subtitle}
            </p>
          )}
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
