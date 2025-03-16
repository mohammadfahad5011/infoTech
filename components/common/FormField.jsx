"use client";
import { useState } from 'react'
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const FormField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    icon,
    placeholder,
    required = false,
    disabled = false,
    className = '',
    helper,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={className}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Icon */}
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}

                {/* Input Field */}
                <input
                    id={name}
                    name={name}
                    type={showPassword ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    onBlur={(e) => {
                        setIsFocused(false)
                        onBlur?.(e)
                    }}
                    onFocus={() => setIsFocused(true)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
            w-full rounded-lg transition-all duration-200
            ${icon ? 'pl-10' : 'pl-4'} 
            ${type === 'password' ? 'pr-10' : 'pr-4'}
            ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${isFocused ? 'ring-2' : ''}
          `}
                    {...props}
                />

                {/* Password Toggle */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handlePasswordToggle}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                        {showPassword ? (
                            <FiEyeOff className="w-5 h-5" />
                        ) : (
                            <FiEye className="w-5 h-5" />
                        )}
                    </button>
                )}

                {/* Error Icon */}
                {error && type !== 'password' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <FiAlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                )}
            </div>

            {/* Helper Text */}
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500">{helper}</p>
            )}

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-500"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FormField