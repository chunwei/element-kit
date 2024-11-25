import { Placeholder } from '@/img/PlaceHolder'
import { Collection } from '@/types'
import { memo, useCallback, useState, useEffect } from 'react'

interface CollectionImageProps {
  collection: Collection
  className?: string
  onImageLoad?: () => void
  onImageError?: () => void
}

const CollectionImage = memo<CollectionImageProps>(
  ({ collection, className = '', onImageLoad, onImageError }) => {
    const [showPlaceholder, setShowPlaceholder] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [currentSrc, setCurrentSrc] = useState<string>(
      () => collection.featuredImageUrl || collection.imageUrl || ''
    )

    const handleImageError = useCallback(() => {
      if (currentSrc !== collection.imageUrl && collection.imageUrl) {
        setCurrentSrc(collection.imageUrl)
      } else {
        setShowPlaceholder(true)
        onImageError?.()
      }
    }, [currentSrc, collection.imageUrl, onImageError])

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true)
      setShowPlaceholder(false)
      onImageLoad?.()
    }, [onImageLoad])

    // 预加载图片
    useEffect(() => {
      if (!currentSrc) {
        setShowPlaceholder(true)
        return
      }

      const img = new Image()
      img.src = currentSrc

      img.onload = () => {
        handleImageLoad()
      }

      img.onerror = () => {
        handleImageError()
      }

      return () => {
        img.onload = null
        img.onerror = null
      }
    }, [currentSrc, handleImageLoad, handleImageError])

    if (showPlaceholder) {
      return <Placeholder className={className} />
    }

    return (
      <>
        {!imageLoaded && <Placeholder className={className} loading={true} />}
        <img
          src={currentSrc}
          alt={collection.name}
          className={`${className} object-cover ${imageLoaded ? 'block' : 'hidden'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </>
    )
  }
)

CollectionImage.displayName = 'CollectionImage'

export default CollectionImage
