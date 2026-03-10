"use client"

import { useEffect, useState } from "react"
import { useHydrationStore } from "@/store/useHydrationStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Droplets, Plus, Trash2, GlassWater } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { motion } from "motion/react"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<number | null>(null)
  const store = useHydrationStore()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setNow(Date.now())
  }, [])

  if (!mounted || now === null) return null

  const dailyTotal = store.getDailyTotal()
  const progress = Math.min((dailyTotal / store.goal) * 100, 100)
  const todayIntakes = store.getTodayIntakes().sort((a, b) => b.timestamp - a.timestamp)

  const handleAdd = (amount: number) => {
    store.addIntake(amount)
    toast.success(`Added ${amount}ml of water!`, {
      icon: <GlassWater className="h-4 w-4 text-blue-500" />,
    })
  }

  return (
    <div className="container mx-auto max-w-3xl p-6 sm:p-10 space-y-10">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Today</h1>
          <p className="text-slate-500 font-light">{format(now, "EEEE, MMMM d")}</p>
        </div>
      </header>

      <Card className="border-none bg-gradient-to-br from-blue-50 to-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Droplets className="h-5 w-5 text-blue-500" />
            Hydration Goal
          </CardTitle>
          <CardDescription className="text-blue-600/70">
            You&apos;ve reached {Math.round(progress)}% of your daily target.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="w-full flex-1 space-y-6">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tighter text-blue-600">
                    {dailyTotal}
                  </span>
                  <span className="text-lg font-medium text-blue-400">ml</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-blue-400">Target</span>
                  <p className="text-lg font-medium text-blue-900">{store.goal} ml</p>
                </div>
              </div>
              <Progress value={progress} className="h-4 bg-blue-100/50" />
            </div>

            {/* Glass Visual */}
            <div className="relative flex h-36 w-24 shrink-0 flex-col justify-end overflow-hidden rounded-b-[2rem] rounded-t-sm border-x-4 border-b-4 border-white/80 bg-white/40 shadow-[inset_0_-5px_15px_rgba(0,0,0,0.05)] backdrop-blur-sm">
              {/* Glass reflection */}
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"></div>
              
              {/* Water */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${progress}%` }}
                transition={{ type: "spring", bounce: 0.2, duration: 1.5 }}
                className="relative w-full bg-gradient-to-t from-blue-500 to-blue-300"
              >
                {/* Water surface */}
                <div className="absolute top-0 left-0 h-2 w-full -translate-y-1/2 rounded-full bg-blue-200/90"></div>
                
                {/* Bubbles */}
                <motion.div 
                  animate={{ y: [0, -20], opacity: [0, 1, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute bottom-2 left-3 h-2 w-2 rounded-full bg-white/40"
                />
                <motion.div 
                  animate={{ y: [0, -30], opacity: [0, 0.8, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 0.5 }}
                  className="absolute bottom-6 right-4 h-1.5 w-1.5 rounded-full bg-white/30"
                />
                <motion.div 
                  animate={{ y: [0, -15], opacity: [0, 0.9, 0] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 1 }}
                  className="absolute bottom-4 left-6 h-1 w-1 rounded-full bg-white/50"
                />
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900">Quick Add</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[250, 500, 750].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="h-28 flex-col gap-3 rounded-3xl border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
              onClick={() => handleAdd(amount)}
            >
              <GlassWater className="h-7 w-7 text-blue-400" />
              <span className="font-medium text-base">+{amount} ml</span>
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-28 flex-col gap-3 rounded-3xl border-dashed border-slate-300 bg-transparent hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => {
              const amount = window.prompt("Enter amount in ml:")
              if (amount && !isNaN(Number(amount))) {
                handleAdd(Number(amount))
              }
            }}
          >
            <Plus className="h-7 w-7 text-slate-400" />
            <span className="font-medium text-base text-slate-500">Custom</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Your water intake log for today</CardDescription>
        </CardHeader>
        <CardContent>
          {todayIntakes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-4">
                <GlassWater className="h-8 w-8 text-slate-300" />
              </div>
              <p className="font-medium text-slate-500">No water logged yet</p>
              <p className="text-sm font-light mt-1">Drink some water to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayIntakes.map((intake) => (
                <div
                  key={intake.id}
                  className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <GlassWater className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{intake.amount} ml</p>
                      <p className="text-sm text-slate-500 font-light">
                        {format(intake.timestamp, "h:mm a")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500 hover:bg-red-50"
                    onClick={() => store.removeIntake(intake.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
