"use client";
import { motion } from 'framer-motion'
import { FiTarget, FiUsers, FiCode, FiAward } from 'react-icons/fi'
import Card from '../common/Card'

const AboutSection = () => {
    const features = [
        {
            icon: <FiTarget />,
            title: "Our Mission",
            description: "To deliver exceptional digital solutions that drive real business value and exceed client expectations."
        },
        {
            icon: <FiUsers />,
            title: "Our Team",
            description: "A diverse group of passionate experts dedicated to creating innovative solutions."
        },
        {
            icon: <FiCode />,
            title: "Technology",
            description: "We leverage cutting-edge technologies to build scalable and efficient solutions."
        },
        {
            icon: <FiAward />,
            title: "Experience",
            description: "Years of expertise in delivering successful projects across various industries."
        }
    ]

    const stats = [
        { value: '100+', label: 'Projects Completed' },
        { value: '50+', label: 'Happy Clients' },
        { value: '5+', label: 'Years Experience' },
        { value: '15+', label: 'Team Members' }
    ]

    return (
        <section id="about" className="py-20 bg-gray-50">
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
                        About Our Team
                    </h2>
                    <p className="text-lg text-gray-600">
                        We&apos;re a team of dedicated professionals committed to delivering excellence
                        in every project we undertake.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection