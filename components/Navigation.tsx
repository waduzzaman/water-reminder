"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Droplets, BarChart2, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: Droplets },
  { name: "Stats", href: "/stats", icon: BarChart2 },
  { name: "Reminders", href: "/reminders", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Bottom Navigation (Floating Pill) */}
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl sm:hidden w-[90%] max-w-sm border border-slate-200/50">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isActive ? "text-blue-500 scale-110" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                isActive ? "bg-blue-50" : "bg-transparent"
              )}>
                <Icon className={cn("h-5 w-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden w-72 flex-col border-r border-slate-200 bg-white sm:flex">
        <div className="flex h-24 items-center gap-3 px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm">
            <Droplets className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight text-slate-900">Water Reminder</span>
        </div>
        <nav className="flex flex-1 flex-col gap-2 p-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-blue-500" : "text-slate-400 group-hover:text-slate-600")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
