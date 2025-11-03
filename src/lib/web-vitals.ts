/**
 * Web Vitals monitoring utility
 * Tracks Core Web Vitals for performance monitoring
 */

import type { Metric } from 'web-vitals'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

interface NavigatorConnection {
  effectiveType?: string
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection
}

function getConnectionSpeed(): string {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as NavigatorWithConnection).connection
    return conn?.effectiveType || 'unknown'
  }
  return 'unknown'
}

export function sendToAnalytics(metric: Metric) {
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID || 'development',
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob)
    } else {
      fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
      }).catch((err) => {
        console.error('[Web Vitals] Failed to send:', err)
      })
    }
  }
}

/**
 * Report Web Vitals with custom thresholds
 */
export function reportWebVitals(metric: Metric) {
  // Core Web Vitals thresholds
  const thresholds = {
    FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
    LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
    FID: { good: 100, poor: 300 },   // First Input Delay
    CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
    TTFB: { good: 800, poor: 1800 }, // Time to First Byte
    INP: { good: 200, poor: 500 },   // Interaction to Next Paint
  }

  // Determine rating
  let rating: 'good' | 'needs-improvement' | 'poor' = 'good'
  const threshold = thresholds[metric.name as keyof typeof thresholds]
  
  if (threshold) {
    if (metric.value > threshold.poor) {
      rating = 'poor'
    } else if (metric.value > threshold.good) {
      rating = 'needs-improvement'
    }
  }

  // Add rating to metric
  const enrichedMetric = { ...metric, rating }

  // Send to analytics
  sendToAnalytics(enrichedMetric)

  // Warn in development for poor metrics
  if (process.env.NODE_ENV === 'development' && rating === 'poor') {
    console.warn(`⚠️ Poor ${metric.name} detected:`, metric.value)
  }
}
