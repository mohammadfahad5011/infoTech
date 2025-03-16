"use client";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import Card from '../common/Card'

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Card className="overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left"
            >
                <span className="font-semibold text-gray-900">{question}</span>
                <span className="ml-4">
                    {isOpen ? (
                        <FiMinus className="w-5 h-5 text-primary-600" />
                    ) : (
                        <FiPlus className="w-5 h-5 text-gray-400" />
                    )}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-6 pb-6 text-gray-600">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}

const FaqSection = () => {
    const faqs = [
        {
            question: "What services do you provide?",
            answer: "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, cloud solutions, and digital marketing. Our team specializes in creating custom solutions tailored to your specific needs."
        },
        {
            question: "How long does a typical project take?",
            answer: "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. We'll provide a detailed timeline during our initial consultation."
        },
        {
            question: "Do you provide ongoing support?",
            answer: "Yes, we offer various support and maintenance packages to ensure your digital solutions continue to perform optimally. This includes regular updates, bug fixes, security patches, and technical support."
        },
        {
            question: "What is your development process?",
            answer: "We follow an agile development methodology with regular client check-ins. The process typically includes discovery, planning, design, development, testing, and deployment phases. We emphasize collaboration and transparency throughout."
        },
        {
            question: "How do you handle project pricing?",
            answer: "We offer flexible pricing models including fixed-price and time-and-materials arrangements. After understanding your requirements, we'll provide a detailed proposal with transparent pricing and milestone-based payments."
        },
        {
            question: "Can you work with our existing systems?",
            answer: "Yes, we have experience integrating with various existing systems and technologies. We'll assess your current infrastructure and recommend the best approach for seamless integration."
        }
    ]

    return (
        <section id="faq" className="py-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Find answers to common questions about our services and process.
                    </p>
                </motion.div>

                {/* FAQ Grid */}
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <FaqItem question={faq.question} answer={faq.answer} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqSection