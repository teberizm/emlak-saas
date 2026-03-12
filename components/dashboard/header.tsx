"use client"

import { Bell, MessageSquare, Plus, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 lg:px-8 bg-background/80 backdrop-blur-xl border-b border-border">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl w-64 lg:w-80 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-secondary">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search properties, clients..."
            className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs font-medium text-muted-foreground bg-background rounded-md border border-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-primary-foreground bg-primary rounded-full">
            3
          </span>
        </Button>

        <div className="w-px h-6 mx-2 bg-border hidden sm:block" />

        <Button className="hidden sm:flex items-center gap-2 h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Property</span>
        </Button>

        <Avatar className="w-9 h-9 ml-2 ring-2 ring-border">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
