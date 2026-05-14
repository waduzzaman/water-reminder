"use client"

import { useEffect, useState } from "react"
import { useHydrationStore } from "@/store/useHydrationStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AffiliateLink from "@/components/AffiliateLink"
import { Droplets, TrendingUp, Award, Sparkles, Package, Filter } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

/* ------------------------------------------------------------------ */
/*  YOUR PRODUCT DATA                                                  */
/*                                                                     */
/*  To add real images, replace IMAGE_PLACEHOLDER with:                */
/*  `https://m.media-amazon.com/images/I/${asin}._AC_SL1500_.jpg`     */
/*  (may need the actual image filename from Amazon)                   */
/* ------------------------------------------------------------------ */

const TAG = "waterremind09-20"
const IMAGE_PLACEHOLDER = "https://picsum.photos/seed/hydroflask/400/400"

// Map ASINs to local images in /public/image/
// Add more entries as you drop in real product photos
const LOCAL_IMAGES: Record<string, string> = {
  B085DV8T75: "/image/owala-freesip-24oz.png", // Owala FreeSip 24oz
}

const getUrl = (asin: string) =>
  `https://www.amazon.ca/dp/${asin}?tag=${TAG}`

const getImage = (asin: string) =>
  LOCAL_IMAGES[asin] || IMAGE_PLACEHOLDER

const products = [
  {
    id: 1,
    name: "Owala FreeSip 24oz",
    description: "Drink two ways — straw or wide mouth. Keeps cold 24hrs. BPA-free.",
    asin: "B085DV8T75",
    badge: "Most Popular",
    category: "everyday",
  },
  {
    id: 2,
    name: "Owala FreeSip 32oz",
    description: "Bigger capacity — perfect for hitting your daily water goal.",
    asin: "B0C59F7Y8J",
    badge: "Best for Goals",
    category: "everyday",
  },
  {
    id: 3,
    name: "Owala FreeSip Sway 30oz",
    description: "Bucket handle, leak-proof, travel-friendly insulated bottle.",
    asin: "B0FK18HSQB",
    badge: "Best for Travel",
    category: "travel",
  },
  {
    id: 4,
    name: "Hydro Flask Wide Mouth 32oz",
    description: "Premium insulation — cold 24hrs, hot 12hrs. Lifetime warranty.",
    asin: "B07YXM6XTF",
    badge: "Premium Pick",
    category: "premium",
  },
  {
    id: 5,
    name: "Hydro Flask Wide Mouth 40oz",
    description: "Large capacity flask for all-day hydration. Dishwasher safe.",
    asin: "B07YXMJ5WF",
    badge: "All Day",
    category: "premium",
  },
  {
    id: 6,
    name: "Hydro Flask Standard Mouth 21oz",
    description: "Compact, cup-holder friendly. Great for gym and commuting.",
    asin: "B09SBS12KG",
    badge: "Best for Gym",
    category: "sport",
  },
  {
    id: 7,
    name: "YETI Rambler 26oz Chug Cap",
    description: "Nearly indestructible. Best cold & hot retention tested.",
    asin: "B0842S56G8",
    badge: "Most Durable",
    category: "outdoor",
  },
  {
    id: 8,
    name: "YETI Rambler 46oz Chug Cap",
    description: "Massive capacity, keeps ice for hours. Built like a tank.",
    asin: "B0BTTZHD5H",
    badge: "Max Capacity",
    category: "outdoor",
  },
  {
    id: 9,
    name: "Stanley Classic Vacuum Bottle",
    description: "Iconic classic design. Keeps drinks hot or cold 32 hours.",
    asin: "B000T21JFE",
    badge: "Classic",
    category: "classic",
  },
  {
    id: 10,
    name: "Hydro Flask Standard Mouth 32oz",
    description: "Versatile everyday bottle. Powder coat, dishwasher safe.",
    asin: "B07YXLZPNT",
    badge: "Best Value",
    category: "everyday",
  },
]

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "everyday", label: "Everyday" },
  { key: "premium", label: "Premium" },
  { key: "travel", label: "Travel" },
  { key: "sport", label: "Sport" },
  { key: "outdoor", label: "Outdoor" },
  { key: "classic", label: "Classic" },
]

export default function ShopPage() {
  const store = useHydrationStore()
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  const goalLiters = (store.goal / 1000).toFixed(1)

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="container mx-auto max-w-5xl p-6 sm:p-10 space-y-10">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 flex items-center gap-3">
          <Droplets className="h-7 w-7 text-blue-500" />
          Shop Water Bottles
        </h1>
        <p className="text-slate-500 font-light max-w-2xl">
          Hand-picked bottles to help you hit your daily goal of{" "}
          <span className="font-medium text-slate-700">{store.goal} ml ({goalLiters}L)</span>.
          Every purchase supports this project at no extra cost to you.
        </p>
      </header>

      {/* Amazon Disclosure — REQUIRED by Amazon Associates policy */}
      <Card className="border-none bg-amber-50/80">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">
                ⚠️ Affiliate Disclosure
              </p>
              <p className="text-sm text-amber-700/80 leading-relaxed mt-1">
                This page contains Amazon affiliate links. If you purchase through our links,
                we earn a small commission at <strong>no extra cost to you</strong>.
                Your support helps us keep this app free and improving.{" "}
                <span className="font-medium">JazakAllahu Khayran</span> for your support! 🤲
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <Card className="border-none bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="pt-6 flex items-center gap-4">
          <Sparkles className="h-6 w-6 text-blue-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800">Pro Tip</p>
            <p className="text-sm text-blue-600/80">
              Choose a bottle size matching your daily goal. A{" "}
              <span className="font-medium">{goalLiters}L</span> bottle means you only need
              to fill it once to hit your target!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-slate-400 shrink-0" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group overflow-hidden border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  {product.badge}
                </span>
              </div>
            )}

{/* Image */}
             <div className="relative aspect-square overflow-hidden bg-slate-100">
               <Image
                 src={getImage(product.asin)}
                 alt={product.name}
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-105"
                 unoptimized={!LOCAL_IMAGES[product.asin]}
               />
             </div>

            {/* Content */}
            <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[10px] text-blue-500 font-medium mt-0.5">
                  {product.badge}
                </p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                {product.description}
              </p>

              <div className="pt-2">
                <span className="text-xs text-slate-400">
                  ASIN: {product.asin}
                </span>
              </div>
            </CardContent>

            {/* Actions */}
            <div className="p-4 pt-0 space-y-2">
              <AffiliateLink
                productUrl={getUrl(product.asin)}
                productName={product.name}
                className="w-full justify-center py-2.5 text-sm"
              >
                🛒 View on Amazon
              </AffiliateLink>
              <Button
                variant="ghost"
                size="sm"
                className="w-full rounded-xl text-xs text-slate-500"
                onClick={() => toast.info(`🤔 ${product.name} — great pick for hydration!`)}
              >
                💡 Why this bottle?
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Disclosure */}
      <Card className="border-none bg-slate-50/50">
        <CardContent className="pt-6 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            <Award className="h-3 w-3 inline mr-1" />
            As an Amazon Associate, we earn from qualifying purchases.
            Prices and availability are subject to change. All recommendations are
            based on quality and suitability for hydration tracking.
          </p>
        </CardContent>
      </Card>
</div>
  )
}