"use client"

import { useEffect, useState } from "react"
import { useHydrationStore } from "@/store/useHydrationStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Target, Scale, Save } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const store = useHydrationStore()
  
  const [weight, setWeight] = useState(store.weight)
  const [goal, setGoal] = useState(store.goal)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setWeight(store.weight)
    setGoal(store.goal)
  }, [store.weight, store.goal])

  if (!mounted) return null

  const calculateGoal = () => {
    // Basic formula: weight (kg) * 35 ml
    const calculated = Math.round(weight * 35)
    setGoal(calculated)
    toast.info(`Goal calculated: ${calculated} ml`)
  }

  const handleSave = () => {
    store.setWeight(weight)
    store.setGoal(goal)
    toast.success("Profile saved!")
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 sm:p-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Profile</h1>
        <p className="text-slate-500 font-light">Manage your personal hydration goals</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <User className="h-5 w-5 text-blue-500" />
            Personal Details
          </CardTitle>
          <CardDescription>
            Update your weight to calculate your optimal daily water intake.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="weight" className="text-slate-700">Weight (kg)</Label>
            <div className="relative">
              <Scale className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                id="weight"
                type="number"
                className="pl-12 h-12 rounded-2xl border-slate-200 bg-slate-50/50 text-base focus-visible:ring-blue-500"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="goal" className="text-slate-700">Daily Goal (ml)</Label>
              <Button variant="link" size="sm" onClick={calculateGoal} className="h-auto p-0 text-blue-500 font-medium">
                Auto-calculate
              </Button>
            </div>
            <div className="relative">
              <Target className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                id="goal"
                type="number"
                className="pl-12 h-12 rounded-2xl border-slate-200 bg-slate-50/50 text-base focus-visible:ring-blue-500"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
              />
            </div>
            <p className="text-sm text-slate-500 font-light">
              The recommended daily intake is about 35ml per kg of body weight.
            </p>
          </div>

          <Button onClick={handleSave} className="w-full gap-2 rounded-2xl h-14 text-base mt-4 shadow-sm">
            <Save className="h-5 w-5" />
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
