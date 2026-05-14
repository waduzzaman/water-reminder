<div align="center">

# 💧 Water Reminder

**Stay hydrated, stay healthy — your smart daily water tracking companion.**

![Water Reminder Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

A beautifully designed **Next.js 15** SaaS web app that helps you track your daily water intake, visualize your hydration habits, and receive smart reminders to drink water throughout the day.

---

## ✨ Why This App?

Most people don't drink enough water. Dehydration leads to fatigue, headaches, poor concentration, and long-term health issues. **Water Reminder** solves this by:

- **Making tracking effortless** — Log water with one click using quick-add buttons
- **Visualizing your progress** — Watch an animated water glass fill up as you approach your goal
- **Smart reminders** — Get browser notifications at intervals you choose, within your preferred time window
- **Data-driven insights** — View weekly charts to understand your hydration trends and stay accountable
- **Personalized goals** — Auto-calculate your daily water intake based on your body weight (35ml per kg)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/water-reminder.git
cd water-reminder

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

> **Note:** The app uses `localStorage` for state persistence, so no database or API keys are required for local development.

---

## 📖 Features

### 🏠 Dashboard (`/`)

The home page gives you a complete overview of your hydration for the day:

| Feature | Description |
|---------|-------------|
| **Progress Ring** | Animated water glass that fills up as you approach your daily goal |
| **Quick Add** | One-tap buttons to log 250ml, 500ml, or 750ml — plus a custom input |
| **Intake History** | Chronological log of every water entry for today, with timestamps and delete option |
| **Goal Display** | Shows your current daily target in ml |

### 📊 Statistics (`/stats`)

Visualize your hydration trends over the past 7 days:

- **Today's Intake** — Total ml consumed today
- **Weekly Average** — Mean daily intake over the last 7 days
- **Goal Completion** — Percentage of today's goal reached
- **Bar Chart** — Interactive weekly overview comparing daily intake against your goal

### ⏰ Reminders (`/reminders`)

Configure smart water reminders:

- **Toggle** — Enable or disable browser notifications
- **Time Window** — Set when reminders start and end (e.g., 9:00 AM – 10:00 PM)
- **Interval** — Choose how often to be reminded (30–180 minutes, in 15-minute increments)
- **Permission Handling** — Gracefully handles denied notification permissions

### 👤 Profile (`/profile`)

Manage your personal settings:

- **Weight Input** — Set your body weight in kilograms
- **Auto-Calculate Goal** — Automatically compute your daily target (35ml × weight in kg)
- **Manual Goal Override** — Set a custom daily goal if the auto-calculation doesn't fit your needs

### 🛒 Shop (`/shop`)

Browse and purchase recommended water bottles through our Amazon affiliate links:

- **Hand-Picked Products** — 6 curated bottles for every budget ($22–$55)
- **Smart Recommendations** — Pro tip suggests bottle size based on your daily goal
- **Affiliate Disclosure** — Full transparency per Amazon Associates policy
- **Direct Purchase Links** — Each product links straight to Amazon with your tracking ID

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) with `localStorage` persistence |
| **Charts** | [Recharts](https://recharts.org/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) (toast) + Browser Notifications API |
| **Database (schema)** | [Prisma](https://www.prisma.io/) + PostgreSQL (schema ready, localStorage used in dev) |
| **Utilities** | [date-fns](https://date-fns.org/) |

---

## 📁 Project Structure

```
water-reminder/
├── app/
│   ├── layout.tsx              # Root layout with navigation shell
│   ├── page.tsx                # Dashboard — main tracking view
│   ├── globals.css             # Global styles
│   ├── profile/
│   │   └── page.tsx            # Profile & goal settings
│   ├── reminders/
│   │   └── page.tsx            # Reminder configuration
│   ├── stats/
│   │   └── page.tsx            # Weekly statistics & charts
│   └── shop/
│       └── page.tsx            # Amazon affiliate product shop
├── components/
│   ├── Navigation.tsx          # Sidebar + mobile bottom nav (with Shop link)
│   ├── AffiliateLink.tsx       # Reusable Amazon affiliate link wrapper
│   └── ui/                     # shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── switch.tsx
│       └── tabs.tsx
├── hooks/
│   └── use-mobile.ts           # Mobile viewport detection
├── lib/
│   └── utils.ts                # Utility functions (cn helper)
├── store/
│   └── useHydrationStore.ts    # Zustand store with persistence
├── prisma/
│   └── schema.prisma           # Database schema (User, WaterIntake, Reminder)
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## ⚙️ Available Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Run production server
npm run lint       # Run ESLint linter
npm run clean      # Clear Next.js cache
```

---

## 🗃️ Data Model

The app's Prisma schema defines three models (ready for PostgreSQL integration):

**User** — Stores profile info and relationships
- `id` — Unique identifier (cuid)
- `name` — Display name
- `email` — Unique email
- `weight` — Body weight in kg
- `goal` — Daily water target in ml (default: 2000)

**WaterIntake** — Each logged water entry
- `id` — Unique identifier (cuid)
- `amount` — Volume in ml
- `time` — Time of intake (HH:mm)
- `date` — Auto-generated timestamp

**Reminder** — Notification schedule configuration
- `id` — Unique identifier (cuid)
- `interval` — Minutes between reminders
- `startTime` / `endTime` — Active window (HH:mm)
- `enabled` — Toggle on/off

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Built with 💧 and ❤️ using Next.js**

⭐ Star this repo if you find it helpful!

</div>