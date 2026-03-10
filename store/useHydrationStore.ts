import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startOfDay, isSameDay } from 'date-fns';

export interface WaterIntake {
  id: string;
  amount: number;
  timestamp: number;
}

export interface ReminderSettings {
  enabled: boolean;
  intervalMinutes: number;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

interface HydrationState {
  goal: number; // ml
  weight: number; // kg
  intakes: WaterIntake[];
  reminderSettings: ReminderSettings;
  setGoal: (goal: number) => void;
  setWeight: (weight: number) => void;
  addIntake: (amount: number) => void;
  removeIntake: (id: string) => void;
  updateReminderSettings: (settings: Partial<ReminderSettings>) => void;
  getDailyTotal: (date?: number) => number;
  getTodayIntakes: () => WaterIntake[];
}

export const useHydrationStore = create<HydrationState>()(
  persist(
    (set, get) => ({
      goal: 2500, // default 2.5L
      weight: 70, // default 70kg
      intakes: [],
      reminderSettings: {
        enabled: false,
        intervalMinutes: 60,
        startTime: '09:00',
        endTime: '22:00',
      },
      setGoal: (goal) => set({ goal }),
      setWeight: (weight) => set({ weight }),
      addIntake: (amount) =>
        set((state) => ({
          intakes: [
            ...state.intakes,
            { id: crypto.randomUUID(), amount, timestamp: Date.now() },
          ],
        })),
      removeIntake: (id) =>
        set((state) => ({
          intakes: state.intakes.filter((i) => i.id !== id),
        })),
      updateReminderSettings: (settings) =>
        set((state) => ({
          reminderSettings: { ...state.reminderSettings, ...settings },
        })),
      getDailyTotal: (date = Date.now()) => {
        const targetDate = startOfDay(date);
        return get().intakes
          .filter((i) => isSameDay(i.timestamp, targetDate))
          .reduce((sum, i) => sum + i.amount, 0);
      },
      getTodayIntakes: () => {
        const today = startOfDay(Date.now());
        return get().intakes.filter((i) => isSameDay(i.timestamp, today));
      },
    }),
    {
      name: 'hydration-storage',
    }
  )
);
