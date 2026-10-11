// Google Analytics 4, loaded after the page is idle so it never competes with first paint.
// Disabled entirely until a measurement ID is set (see `analyticsId` in data/content.ts).
import type { Metric } from 'web-vitals'

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let enabled = false

export function track(event: string, params: Params = {}) {
  if (enabled) window.gtag('event', event, params)
}

export function initAnalytics(measurementId: string) {
  if (!measurementId || enabled) return
  enabled = true

  // gtag queues calls in dataLayer until the script arrives, so tracking can start immediately.
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js requires the `arguments` object itself, not an array copy.
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId)

  const load = () => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)
  }
  const whenIdle = () => ('requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 4000 }) : setTimeout(load, 2000))
  if (document.readyState === 'complete') whenIdle()
  else addEventListener('load', whenIdle, { once: true })

  trackSectionViews()
  trackWebVitals()
}

// One `section_view` per section per visit, when the section reaches the middle of the screen
// (works for sections taller than the viewport) or is almost fully visible (catches short
// sections at the bottom of the page whose top can never reach the middle).
function trackSectionViews() {
  const seen = new Set<string>()
  const sections = document.querySelectorAll('section[id]')
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const id = entry.target.id
      if (!entry.isIntersecting || seen.has(id)) continue
      seen.add(id)
      track('section_view', { section: id })
    }
    if (seen.size === sections.length) observers.forEach((o) => o.disconnect())
  }
  const observers = [
    new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -50% 0px' }),
    new IntersectionObserver(onIntersect, { threshold: 0.9 }),
  ]
  sections.forEach((s) => observers.forEach((o) => o.observe(s)))
}

// Real-user load performance (Core Web Vitals), reported once per metric per visit.
async function trackWebVitals() {
  const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals')
  const report = ({ name, value, rating, id }: Metric) =>
    track('web_vitals', {
      metric_name: name,
      // CLS is a small unitless score; scale it so GA's integer-friendly reports stay useful.
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      metric_id: id,
      non_interaction: true,
    })
  onCLS(report)
  onFCP(report)
  onINP(report)
  onLCP(report)
  onTTFB(report)
}
