"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, BarChart2, Bell, User, Target, Clock, Brain, Coffee } from "lucide-react"
import { toast } from "sonner"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto max-w-3xl p-6 sm:p-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">About Water Reminder</h1>
        <p className="text-slate-500 font-light">Why we built this and how to use it</p>
      </header>

      {/* Why Section */}
      <Card className="border-none bg-gradient-to-br from-blue-50 to-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Brain className="h-5 w-5 text-blue-500" />
            Why This App?
          </CardTitle>
          <CardDescription className="text-blue-600/70">
            Staying hydrated is one of the simplest yet most overlooked habits for good health.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-600">
          <p>
            Most people don&apos;t drink enough water. Dehydration leads to <span className="font-medium text-slate-800">fatigue</span>,{" "}
            <span className="font-medium text-slate-800">headaches</span>,{" "}
            <span className="font-medium text-slate-800">poor concentration</span>, and long-term health issues.
          </p>
          <p>
            Water Reminder makes hydration effortless by combining <span className="font-medium text-blue-600">one-tap tracking</span>,{" "}
            <span className="font-medium text-blue-600">smart reminders</span>, and{" "}
            <span className="font-medium text-blue-600">data-driven insights</span> — all in one beautiful interface.
          </p>
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
              <Target className="mt-0.5 h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <p className="font-medium text-slate-800">Personalized Goals</p>
                <p className="text-sm text-slate-500">Auto-calculate your daily target based on body weight (35ml per kg)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
              <Clock className="mt-0.5 h-5 w-5 text-indigo-500 shrink-0" />
              <div>
                <p className="font-medium text-slate-800">Smart Reminders</p>
                <p className="text-sm text-slate-500">Customizable browser notifications within your preferred time window</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
              <BarChart2 className="mt-0.5 h-5 w-5 text-emerald-500 shrink-0" />
              <div>
                <p className="font-medium text-slate-800">Weekly Insights</p>
                <p className="text-sm text-slate-500">Visual charts showing your 7-day hydration trends and goal completion</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
              <Coffee className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <p className="font-medium text-slate-800">Effortless Logging</p>
                <p className="text-sm text-slate-500">One-click quick-add buttons plus custom amounts for flexible tracking</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Droplets className="h-5 w-5 text-blue-500" />
            How to Use
          </CardTitle>
          <CardDescription>
            Get started in three simple steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold shadow-sm">
              1
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Set Your Profile</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Go to <span className="font-medium text-blue-600">Profile</span> and enter your weight. 
                Click <span className="font-medium text-blue-600">Auto-calculate</span> to get a recommended daily goal, 
                or set a custom target that fits your lifestyle.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold shadow-sm">
              2
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Log Your Intake</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                On the <span className="font-medium text-blue-600">Dashboard</span>, use the quick-add buttons (250ml, 500ml, 750ml) 
                or enter a custom amount. Each entry appears in your history log with a timestamp.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold shadow-sm">
              3
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Enable Reminders</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Head to <span className="font-medium text-blue-600">Reminders</span> and toggle notifications on. 
                Choose your active time window and interval (every 30–180 min). 
                Grant browser notification permission when prompted.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold shadow-sm">
              4
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Track Your Progress</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visit <span className="font-medium text-blue-600">Statistics</span> to see your weekly intake chart, 
                daily totals, weekly averages, and goal completion percentage. 
                The animated water glass on the Dashboard shows your real-time progress.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="border-none bg-gradient-to-br from-emerald-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-900">
            💡 Pro Tips
          </CardTitle>
          <CardDescription className="text-emerald-600/70">
            Get the most out of Water Reminder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <span className="font-medium shrink-0">📊</span>
            <span>Check your stats weekly to spot trends and adjust your goal if needed.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium shrink-0">🔔</span>
            <span>Start with reminders every 60 minutes and adjust based on your routine.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium shrink-0">⚡</span>
            <span>Use the custom amount button for non-standard servings (e.g., a 330ml bottle).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium shrink-0">⏰</span>
            <span>Set your reminder window to match your waking hours for relevant notifications only.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}