"use client"

import { useEffect, useState } from "react"
import { useHydrationStore } from "@/store/useHydrationStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { subDays, format, startOfDay, isSameDay } from "date-fns"

export default function StatsPage() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<number | null>(null)
  const store = useHydrationStore()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setNow(Date.now())
  }, [])

  if (!mounted || now === null) return null

  // Generate last 7 days data
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(startOfDay(now), 6 - i)
    const dailyTotal = store.intakes
      .filter((intake) => isSameDay(intake.timestamp, date))
      .reduce((sum, intake) => sum + intake.amount, 0)

    return {
      name: format(date, "EEE"),
      total: dailyTotal,
      goal: store.goal,
    }
  })

  const todayTotal = store.getDailyTotal()
  const weeklyAverage = Math.round(
    chartData.reduce((sum, day) => sum + day.total, 0) / 7
  )
  const goalCompletion = Math.min(Math.round((todayTotal / store.goal) * 100), 100)

  return (
    <div className="container mx-auto max-w-4xl p-6 sm:p-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Statistics</h1>
        <p className="text-slate-500 font-light">Your hydration trends</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600/80">
              Today&apos;s Intake
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold tracking-tight text-blue-600">{todayTotal} <span className="text-xl font-medium text-blue-400">ml</span></div>
            <p className="text-sm text-blue-500/70 mt-1 font-light">
              Goal: {store.goal} ml
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-600/80">
              Weekly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold tracking-tight text-indigo-600">{weeklyAverage} <span className="text-xl font-medium text-indigo-400">ml</span></div>
            <p className="text-sm text-indigo-500/70 mt-1 font-light">
              Over the last 7 days
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600/80">
              Goal Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold tracking-tight text-emerald-600">{goalCompletion}<span className="text-xl font-medium text-emerald-400">%</span></div>
            <p className="text-sm text-emerald-500/70 mt-1 font-light">
              For today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>Your water intake over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 13 }} 
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                  labelStyle={{ color: '#64748b', fontWeight: 500, marginBottom: '4px' }}
                  itemStyle={{ color: '#0ea5e9', fontWeight: 600 }}
                />
                <Bar 
                  dataKey="total" 
                  fill="#3b82f6" 
                  radius={[6, 6, 6, 6]} 
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
