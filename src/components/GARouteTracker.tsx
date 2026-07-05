'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    // eslint-disable-next-line no-unused-vars
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Wysyła `page_view` do GA4 przy każdej nawigacji klienckiej (App Router / SPA).
 * Pierwsze wejście page_view wysyła config gtag (send_page_view: true) — tu
 * pomijamy pierwszy render i łapiemy tylko kolejne przejścia, żeby nie liczyć
 * landingu podwójnie ani nie gubić go jako "(not set)".
 */
export default function GARouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    const qs = searchParams?.toString()
    const pagePath = qs ? `${pathname}?${qs}` : pathname

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  // klik w tel:/mailto: gdziekolwiek na stronie → kluczowe zdarzenie
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="tel:"], a[href^="mailto:"]')
      if (!a || typeof window.gtag !== 'function') return
      const href = a.getAttribute('href') || ''
      window.gtag('event', href.startsWith('tel:') ? 'klik_tel' : 'klik_mail', { link_url: href })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
