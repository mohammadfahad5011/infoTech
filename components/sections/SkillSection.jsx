"use client";
import { motion } from 'framer-motion'
import Card from '../common/Card'
import { FiCode, FiLayout, FiSmartphone, FiServer, FiDatabase, FiTrello } from 'react-icons/fi'

const SkillsSection = () => {
    const skills = [
        {
            category: "Frontend Development",
            icon: <FiLayout className="w-6 h-6" />,
            technologies: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "SASS"],
            description: "Building responsive and interactive user interfaces"
        },
        {
            category: "Backend Development",
            icon: <FiServer className="w-6 h-6" />,
            technologies: ["Node.js", "Python", "Java", "PHP", "Express", "Django"],
            description: "Creating robust and scalable server applications"
        },
        {
            category: "Mobile Development",
            icon: <FiSmartphone className="w-6 h-6" />,
            technologies: ["React Native", "Flutter", "iOS", "Android", "Ionic"],
            description: "Developing cross-platform mobile applications"
        },
        {
            category: "Database Management",
            icon: <FiDatabase className="w-6 h-6" />,
            technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
            description: "Designing and optimizing database solutions"
        },
        {
            category: "DevOps",
            icon: <FiCode className="w-6 h-6" />,
            technologies: ["Docker", "Kubernetes", "AWS", "CI/CD", "Jenkins"],
            description: "Implementing efficient deployment workflows"
        },
        {
            category: "Project Management",
            icon: <FiTrello className="w-6 h-6" />,
            technologies: ["Agile", "Scrum", "Jira", "Trello", "Git"],
            description: "Managing projects with agile methodologies"
        }
    ]

    return (
        <section id="skills" className="py-20 bg-gray-50">
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
                        Our Skills & Expertise
                    </h2>
                    <p className="text-lg text-gray-600">
                        We bring together a wide range of technical skills and expertise to deliver
                        comprehensive solutions for your digital needs.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-4">
                                        {skill.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {skill.category}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {skill.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {skill.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsSection