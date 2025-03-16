"use client";
import { motion } from 'framer-motion'

const LoadingState = ({
    type = 'spinner', // spinner, dots, skeleton
    text = 'Loading...',
    fullScreen = false
}) => {
    const Spinner = () => (
        <div className="flex items-center justify-center">
            <motion.div
                className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {text && <span className="ml-3 text-gray-600">{text}</span>}
        </div>
    )

    const Dots = () => (
        <div className="flex items-center justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary-600 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
            {text && <span className="ml-3 text-gray-600">{text}</span>}
        </div>
    )

    const Skeleton = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="h-8 bg-gray-200 rounded"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ width: `${Math.random() * 50 + 50}%` }}
                />
            ))}
        </div>
    )

    const content = {
        spinner: <Spinner />,
        dots: <Dots />,
        skeleton: <Skeleton />
    }[type]

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                {content}
            </div>
        )
    }

    return content
}

export default LoadingState