"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../common/Card";
import Button from "../common/Button";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import axios from "axios";

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const [projects, setProjects] = useState([]);

    //   const filters = ["all", "web", "mobile", "design"];

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
            .then(function (response) {
                setProjects(response.data);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    return (
        <section id="projects" className="py-20">
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
                        Our Projects
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Explore our portfolio of successful projects that showcase our
                        expertise and commitment to excellence.
                    </p>

                    {/* Filter Buttons */}
                    {/* <div className="flex flex-wrap justify-center gap-4">
                        {filters.map((filter) => (
                        <Button
                            key={filter}
                            variant={activeFilter === filter ? "primary" : "outline"}
                            onClick={() => setActiveFilter(filter)}
                            className="capitalize"
                        >
                            {filter}
                        </Button>
                        ))}
                    </div> */}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card hover className="h-full overflow-hidden">
                                    {/* Project Image */}
                                    <div className="relative aspect-video bg-gray-200">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            Project Image
                                        </div>
                                    </div>

                                    <Card.Body>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">{project.description}</p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex space-x-4">
                                            <a
                                                href={project.link}
                                                className="flex items-center text-primary-600 hover:text-primary-700"
                                            >
                                                <FiExternalLink className="mr-2" />
                                                Live Demo
                                            </a>
                                            <a
                                                href={project.githubLink}
                                                className="flex items-center text-primary-600 hover:text-primary-700"
                                            >
                                                <FiGithub className="mr-2" />
                                                Source Code
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
