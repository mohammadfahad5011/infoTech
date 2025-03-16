"use client";
import { motion } from 'framer-motion'

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const Component = hover ? motion.div : 'div'

  return (
    <Component
      {...(hover ? { 
        whileHover: { y: -5 },
        transition: { duration: 0.2 }
      } : {})}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}

// Sub-components for better organization
Card.Header = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
)

Card.Body = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
)

Card.Footer = ({ children, className = '' }) => (
  <div className={`p-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
)

export default Card