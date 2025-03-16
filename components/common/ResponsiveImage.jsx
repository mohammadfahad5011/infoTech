"use client";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiImage, FiAlertCircle } from 'react-icons/fi'

const ResponsiveImage = ({
    src,
    alt,
    sizes = '100vw',
    className = '',
    aspectRatio = '16/9',
    objectFit = 'cover',
    loading = 'lazy',
    blur = true,
    onClick,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [imageSrc, setImageSrc] = useState(src)

    useEffect(() => {
        setImageSrc(src)
        setIsLoading(true)
        setError(false)
    }, [src])

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setError(true)
        setIsLoading(false)
    }

    // Generate srcSet for responsive images
    const generateSrcSet = () => {
        const widths = [320, 640, 768, 1024, 1280, 1536]
        return widths
            .map(width => {
                const url = new URL(src)
                url.searchParams.set('width', width)
                return `${url.toString()} ${width}w`
            })
            .join(', ')
    }

    // Fallback component when image fails to load
    const ErrorFallback = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <FiAlertCircle className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
    )

    // Loading placeholder
    const LoadingPlaceholder = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <FiImage className="w-8 h-8 text-gray-400 animate-pulse" />
        </div>
    )

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ aspectRatio }}
            onClick={onClick}
        >
            <AnimatePresence>
                {isLoading && blur && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <LoadingPlaceholder />
                    </motion.div>
                )}
            </AnimatePresence>

            {!error ? (
                <motion.img
                    src={imageSrc}
                    srcSet={generateSrcSet()}
                    sizes={sizes}
                    alt={alt}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isLoading ? 0.5 : 1,
                        filter: isLoading ? 'blur(10px)' : 'blur(0px)'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`
            w-full h-full
            ${onClick ? 'cursor-pointer' : ''}
          `}
                    style={{ objectFit }}
                    {...props}
                />
            ) : (
                <ErrorFallback />
            )}

            {/* Optional overlay for clickable images */}
            {onClick && !error && !isLoading && (
                <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                />
            )}
        </div>
    )
}

// Additional image utility functions
export const getImageDimensions = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height,
                aspectRatio: img.width / img.height
            })
        }
        img.onerror = reject
        img.src = url
    })
}

export const optimizeImageUrl = (url, { width, height, quality = 80 } = {}) => {
    const optimizedUrl = new URL(url)
    if (width) optimizedUrl.searchParams.set('width', width)
    if (height) optimizedUrl.searchParams.set('height', height)
    optimizedUrl.searchParams.set('quality', quality)
    return optimizedUrl.toString()
}

export default ResponsiveImage