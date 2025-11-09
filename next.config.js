/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable optimized package imports for better tree-shaking
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'zustand',
    ],
  },
  // Webpack optimization for better code splitting
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Three.js separate chunk (large library)
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Framer Motion separate chunk
            framer: {
              name: 'framer',
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              chunks: 'all',
              priority: 25,
            },
            // Common components chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    return config
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    // Enable image optimization with quality settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for images
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Enable compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/assets/models/:file*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
        {
          key: 'Content-Type',
          value: 'model/gltf-binary',
        },
      ],
    },
    ]
  },
  env: {
    SITE_NAME: 'AIDYN Technologies',
    SITE_URL: 'https://aidyn-tech.com',
    NEXT_PUBLIC_ASSET_ORIGIN: '/assets/models'
  },
}

module.exports = nextConfig
