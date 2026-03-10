"use client"

import { useEffect, useState } from "react"
import { useHydrationStore } from "@/store/useHydrationStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Clock, Save } from "lucide-react"
import { toast } from "sonner"

export default function RemindersPage() {
  const [mounted, setMounted] = useState(false)
  const store = useHydrationStore()
  
  const [settings, setSettings] = useState(store.reminderSettings)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setSettings(store.reminderSettings)
  }, [store.reminderSettings])

  if (!mounted) return null

  const handleSave = () => {
    store.updateReminderSettings(settings)
    
    if (settings.enabled) {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            toast.success("Reminders saved and notifications enabled!")
          } else {
            toast.error("Please allow notifications in your browser settings.")
            store.updateReminderSettings({ enabled: false })
            setSettings({ ...settings, enabled: false })
          }
        })
      } else {
        toast.error("Your browser does not support notifications.")
      }
    } else {
      toast.success("Reminders saved!")
    }
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 sm:p-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Reminders</h1>
        <p className="text-slate-500 font-light">Configure when you want to be reminded</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Bell className="h-5 w-5 text-blue-500" />
            Smart Reminders
          </CardTitle>
          <CardDescription>
            Get notified to drink water throughout the day.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-colors hover:bg-white hover:shadow-sm">
            <div className="space-y-1">
              <Label className="text-base font-medium text-slate-900">Enable Reminders</Label>
              <p className="text-sm text-slate-500 font-light">
                Receive push notifications to stay hydrated.
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 opacity-100 transition-all duration-300" style={{ opacity: settings.enabled ? 1 : 0.5, pointerEvents: settings.enabled ? 'auto' : 'none' }}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="startTime" className="text-slate-700">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    id="startTime"
                    type="time"
                    className="pl-12 h-12 rounded-2xl border-slate-200 bg-slate-50/50 text-base focus-visible:ring-blue-500"
                    value={settings.startTime}
                    onChange={(e) => setSettings({ ...settings, startTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="endTime" className="text-slate-700">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    id="endTime"
                    type="time"
                    className="pl-12 h-12 rounded-2xl border-slate-200 bg-slate-50/50 text-base focus-visible:ring-blue-500"
                    value={settings.endTime}
                    onChange={(e) => setSettings({ ...settings, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label htmlFor="interval" className="text-slate-700">Reminder Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                min="30"
                max="180"
                step="15"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50/50 text-base focus-visible:ring-blue-500"
                value={settings.intervalMinutes}
                onChange={(e) => setSettings({ ...settings, intervalMinutes: Number(e.target.value) })}
              />
              <p className="text-sm text-slate-500 font-light mt-2">
                Remind me every <span className="font-medium text-slate-700">{settings.intervalMinutes}</span> minutes between <span className="font-medium text-slate-700">{settings.startTime}</span> and <span className="font-medium text-slate-700">{settings.endTime}</span>.
              </p>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full gap-2 rounded-2xl h-14 text-base mt-4 shadow-sm">
            <Save className="h-5 w-5" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
