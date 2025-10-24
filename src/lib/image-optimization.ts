/**
 * Image Optimization Utilities
 * Helper functions for optimized image handling
 */

/**
 * Get optimized image props for next/image
 * @param src Image source path
 * @param alt Alt text for accessibility
 * @param priority Whether to prioritize loading (for above-fold images)
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  priority: boolean = false
) {
  return {
    src,
    alt,
    priority,
    quality: priority ? 90 : 75, // Higher quality for critical images
    loading: priority ? 'eager' as const : 'lazy' as const,
    placeholder: 'blur' as const,
  }
}

/**
 * Image size presets for common use cases
 */
export const IMAGE_SIZES = {
  hero: {
    width: 1920,
    height: 1080,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px',
  },
  card: {
    width: 800,
    height: 600,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
  },
  thumbnail: {
    width: 400,
    height: 300,
    sizes: '(max-width: 768px) 50vw, 400px',
  },
  icon: {
    width: 64,
    height: 64,
    sizes: '64px',
  },
} as const

/**
 * Get responsive image sizes string
 * @param preset Size preset name
 */
export function getImageSizes(preset: keyof typeof IMAGE_SIZES): string {
  return IMAGE_SIZES[preset].sizes
}

/**
 * Check if image should use blur placeholder
 * @param src Image source
 */
export function shouldUseBlurPlaceholder(src: string): boolean {
  // Only use blur for local images
  return src.startsWith('/') && !src.endsWith('.svg')
}

/**
 * Generate blur data URL for placeholder
 * @param width Image width
 * @param height Image height
 */
export function generateBlurDataURL(width: number, height: number): string {
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#0f172a" offset="0%" />
          <stop stop-color="#1e293b" offset="50%" />
          <stop stop-color="#0f172a" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#0f172a" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
}

/**
 * Image format detection
 */
export function getImageFormat(src: string): 'png' | 'jpg' | 'webp' | 'avif' | 'svg' | 'unknown' {
  const ext = src.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'png':
      return 'png'
    case 'jpg':
    case 'jpeg':
      return 'jpg'
    case 'webp':
      return 'webp'
    case 'avif':
      return 'avif'
    case 'svg':
      return 'svg'
    default:
      return 'unknown'
  }
}

/**
 * Recommend optimization for image
 */
export function getOptimizationRecommendation(src: string): {
  shouldOptimize: boolean
  recommendedFormat: 'webp' | 'avif' | 'none'
  reason: string
} {
  const format = getImageFormat(src)
  
  if (format === 'svg') {
    return {
      shouldOptimize: false,
      recommendedFormat: 'none',
      reason: 'SVG is already optimized for web',
    }
  }
  
  if (format === 'avif') {
    return {
      shouldOptimize: false,
      recommendedFormat: 'none',
      reason: 'AVIF is the most efficient format',
    }
  }
  
  if (format === 'webp') {
    return {
      shouldOptimize: true,
      recommendedFormat: 'avif',
      reason: 'AVIF provides better compression than WebP',
    }
  }
  
  return {
    shouldOptimize: true,
    recommendedFormat: 'webp',
    reason: `${format.toUpperCase()} should be converted to WebP for better performance`,
  }
}
