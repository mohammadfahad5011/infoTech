"use client";
import { motion } from 'framer-motion'

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    isLoading = false
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
        secondary: "bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50",
        outline: "border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600",
        ghost: "text-primary-600 hover:bg-primary-50"
    }

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg"
    }

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : null}
            {children}
        </motion.button>
    )
}

export default Button