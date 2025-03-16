"use client";
import { useRef, useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'
import Button from './Button'

const ImageUpload = ({
    onChange,
    value = null,
    error = null,
    maxSize = 5, // in MB
    accept = "image/*",
    aspectRatio = "16/9"
}) => {
    const inputRef = useRef(null)
    const [preview, setPreview] = useState(value)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`)
            return
        }

        try {
            setIsLoading(true)

            // Create preview URL
            const previewUrl = URL.createObjectURL(file)
            setPreview(previewUrl)

            // Call onChange with the file
            if (onChange) {
                onChange(file)
            }
        } catch (error) {
            console.error('Error processing image:', error)
            alert('Error processing image. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        if (onChange) {
            onChange(null)
        }
    }

    return (
        <div className="space-y-2">
            <div
                className={`
          relative border-2 border-dashed rounded-lg
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${preview ? 'border-none' : 'hover:border-gray-400'}
        `}
                style={{ aspectRatio }}
            >
                {preview ? (
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                                variant="ghost"
                                className="text-white"
                                onClick={handleRemove}
                            >
                                <FiX className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4"
                    >
                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <div className="text-sm text-gray-600 text-center">
                            <span className="text-primary-600">Click to upload</span> or drag and drop
                            <div className="text-xs text-gray-500 mt-1">
                                Max file size: {maxSize}MB
                            </div>
                        </div>
                    </button>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    )
}

export default ImageUpload