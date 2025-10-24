'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import { reportWebVitals } from '@/lib/web-vitals'

/**
 * Web Vitals Reporter Component
 * Automatically reports Core Web Vitals metrics
 */
export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric)
  })

  useEffect(() => {
    // Log environment info in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals] Monitoring enabled')
    }
  }, [])

  return null
}
