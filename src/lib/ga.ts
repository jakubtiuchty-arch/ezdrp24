/** Bezpieczne wysłanie zdarzenia GA4 (nazwy spójne z takmą — kokpit je rozumie). */
export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag === 'function') w.gtag('event', name, params || {})
}
