"use client"

import { useEffect, useState } from "react"

interface AffiliateLinkProps {
  productUrl: string
  productName?: string
  children?: React.ReactNode
  className?: string
}

/**
 * AffiliateLink — Wraps any Amazon product URL with your tracking ID.
 *
 * Usage:
 *   <AffiliateLink productUrl="https://www.amazon.ca/dp/B01ACATR1A">
 *     View on Amazon 🛒
 *   </AffiliateLink>
 *
 * The link automatically appends ?tag=<your-tracking-id> to the URL.
 * JazakAllahu Khayran for supporting the project through your purchases!
 */
export default function AffiliateLink({
  productUrl,
  productName,
  children,
  className = "",
}: AffiliateLinkProps) {
  const [trackingId, setTrackingId] = useState<string>("")

  useEffect(() => {
    // NEXT_PUBLIC_ variables are inlined at build time
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = (process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID as string) || ""
    setTrackingId(id)
  }, [])

  // Build the affiliate URL
  const separator = productUrl.includes("?") ? "&" : "?"
  const affiliateUrl = trackingId
    ? `${productUrl}${separator}tag=${trackingId}`
    : productUrl

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors ${className}`}
      onClick={() => {
        // Log click for GA4 / gtag if available
        if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("event", "affiliate_click", {
            event_category: "Affiliate",
            event_label: productName || productUrl,
            value: 1,
          })
        }
      }}
    >
      {children || productName || "Buy on Amazon"}
    </a>
  )
}