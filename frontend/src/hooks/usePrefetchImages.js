import { useEffect } from 'react'

/**
 * Prefetch images when user hovers over navigation links.
 * Images are loaded into browser cache so they appear instantly on navigation.
 */
const ROUTE_IMAGES = {
  '/': ['/images/main-bg.webp'],
  '/coach': ['/images/StroevGallery/test.webp', '/images/logo1.svg', '/images/StroevGallery/1.webp?w=400'],
  '/camp2025': ['/images/12.webp', '/images/gallery/1.webp?w=600', '/images/gallery/2.webp?w=600'],
  '/training': ['/images/logo1.svg', '/images/training-photo1.webp?w=400', '/images/training-photo2.webp?w=400', '/images/training-photo3.webp?w=400'],
}

function prefetchImages(pathname) {
  const urls = ROUTE_IMAGES[pathname]
  if (!urls) return
  urls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

export function usePrefetchOnHover() {
  const handleLinkMouseEnter = (e) => {
    const link = e.target.closest('a[href^="/"]')
    if (!link || link.target === '_blank') return
    try {
      const pathname = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/'
      prefetchImages(pathname)
    } catch {
      // ignore invalid URLs
    }
  }

  return { onMouseEnter: handleLinkMouseEnter }
}

/**
 * Hook to add global prefetch listener (event delegation).
 * Call once in App.
 */
export function usePrefetchListener() {
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('a[href^="/"]')
      if (!link || link.target === '_blank') return
      try {
        const pathname = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/'
        prefetchImages(pathname)
      } catch {}
    }
    document.addEventListener('mouseover', handler, { passive: true })
    return () => document.removeEventListener('mouseover', handler)
  }, [])
}
