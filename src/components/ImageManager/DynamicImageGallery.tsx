'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Grid, X, Edit3, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageAsset {
  id: string
  src: string
  alt: string
  title: string
  description?: string
  category: 'branding' | 'product' | 'ui' | 'hero' | 'data-viz'
}

// Base d'images AIDYN disponibles
const aidynImages: ImageAsset[] = [
  {
    id: 'hero-claire',
    src: '/images/AIDYN_Hero_Site_-_Version_Claire.png',
    alt: 'AIDYN Hero Version Claire',
    title: 'Hero Principal',
    description: 'Version claire pour hero section',
    category: 'hero'
  },
  {
    id: 'serena-care',
    src: '/images/Section_SerenaCare_AIDYN.png',
    alt: 'SerenaCare Section',
    title: 'SerenaCare RPA',
    description: 'Spécifique Phase 1 RPA',
    category: 'product'
  },
  {
    id: 'data-viz',
    src: '/images/AIDYN_Data_Viz_-_Export_Transparent.png',
    alt: 'Data Visualization',
    title: 'Visualisation Données',
    description: 'Dashboard analytics',
    category: 'data-viz'
  },
  {
    id: 'badges',
    src: '/images/AIDYN_Badges_Confiance_-_Export.png',
    alt: 'Badges de Confiance',
    title: 'Badges Confiance',
    description: 'Certifications et trust',
    category: 'branding'
  },
  {
    id: 'logo-complete',
    src: '/images/Identit_de_Marque_Complte_AIDYN_Technologies.png',
    alt: 'Logo Complet AIDYN',
    title: 'Identité Complète',
    description: 'Logo principal avec variations',
    category: 'branding'
  },
  {
    id: 'ui-components',
    src: '/images/Section_Composants_UI_AIDYN.png',
    alt: 'Composants UI',
    title: 'Éléments Interface',
    description: 'Composants design system',
    category: 'ui'
  }
]

interface DynamicImageGalleryProps {
  currentImageId?: string
  onImageChange?: (imageId: string) => void
  category?: string
  showControls?: boolean
  className?: string
}

export default function DynamicImageGallery({
  currentImageId,
  onImageChange,
  category,
  showControls = true,
  className = ""
}: DynamicImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [filter, setFilter] = useState<string>(category || 'all')

  // Filtrer les images selon la catégorie
  const filteredImages = category
    ? aidynImages.filter(img => img.category === category)
    : aidynImages

  const categories = ['all', ...Array.from(new Set(aidynImages.map(img => img.category)))]

  useEffect(() => {
    if (currentImageId) {
      const image = aidynImages.find(img => img.id === currentImageId)
      if (image) {
        setSelectedImage(image)
        setCurrentIndex(filteredImages.findIndex(img => img.id === currentImageId))
      }
    }
  }, [currentImageId, filteredImages])

  const handleImageSelect = (image: ImageAsset) => {
    setSelectedImage(image)
    setCurrentIndex(filteredImages.findIndex(img => img.id === image.id))
    if (onImageChange) {
      onImageChange(image.id)
    }
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length

    handleImageSelect(filteredImages[newIndex])
  }

  return (
    <div className={`relative ${className}`}>
      {/* Image principale avec contrôles */}
      <div className="relative group">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl shadow-modern-xl"
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="w-full h-auto object-contain bg-gradient-to-br from-gray-50 to-gray-100"
              priority
            />

            {/* Overlay avec informations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-1">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-sm opacity-90">{selectedImage.description}</p>
              )}
            </motion.div>

            {/* Contrôles de navigation */}
            {showControls && filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bouton galerie */}
            {showControls && (
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-200"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-200"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Galerie modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  Galerie AIDYN
                </h2>
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filtres par catégorie */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filter === cat
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'all' ? 'Tout' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Grille d'images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(filter === 'all' ? aidynImages : aidynImages.filter(img => img.category === filter))
                  .map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage?.id === image.id
                        ? 'border-primary-500 shadow-lg'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => {
                      handleImageSelect(image)
                      setIsGalleryOpen(false)
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs font-medium truncate">
                        {image.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicateurs en bas */}
      {showControls && filteredImages.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {filteredImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(filteredImages[index])}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}