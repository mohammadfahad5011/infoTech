"use client";
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-primary-50/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center lg:text-left"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            We Build Amazing
                            <span className="text-primary-600 block mt-2">Digital Experiences</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Our team of experts combines creativity and technology to deliver
                            outstanding digital solutions that drive results and exceed expectations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg">
                                <Link href="#projects" variant="secondary" size="lg">
                                    View Our Work
                                </Link>
                            </Button>
                            <Button>
                                <Link href="#contact" variant="secondary" size="lg">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Hero Image/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-primary-400 rounded-full opacity-20 blur-3xl" />
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">Hero Image</span>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-8 left-0 w-20 h-20 bg-primary-400 rounded-lg opacity-20"
                        />
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className="absolute bottom-8 right-4 w-16 h-16 bg-primary-600 rounded-full opacity-20"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection