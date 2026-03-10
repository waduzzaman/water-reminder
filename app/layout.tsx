import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import { Navigation } from '@/components/Navigation';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Water Reminder – Track Your Daily Hydration',
  description: 'Stay hydrated with smart water reminders and hydration tracking.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning className="bg-[#f8fafc] font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <div className="flex min-h-screen flex-col sm:flex-row">
          <Navigation />
          <main className="flex-1 pb-20 sm:pb-0">
            {children}
          </main>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
