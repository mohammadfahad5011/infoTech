"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiTwitter, FiGithub } from "react-icons/fi";
import Card from "../common/Card";
import axios from "axios";

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/team`)
            .then(function (response) {
                setTeamMembers(response.data);
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
        <section id="team" className="py-20">
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
                        Meet Our Team
                    </h2>
                    <p className="text-lg text-gray-600">
                        Our diverse team of experts brings together years of experience and
                        passion for creating exceptional digital solutions.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card hover className="h-full overflow-hidden">
                                {/* Member Image */}
                                <div className="relative aspect-square">
                                    <img
                                        src={member.member_img}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay with social links */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                        <a
                                            href={member.linkedin_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-600 transition-colors"
                                        >
                                            <FiLinkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={member.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-600 transition-colors"
                                        >
                                            <FiGithub className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={member.twitter_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-600 transition-colors"
                                        >
                                            <FiTwitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Member Info */}
                                <Card.Body className="text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary-600 mb-3">{member.designation}</p>
                                    <p className="text-gray-600 mb-4">{member.details}</p>

                                    {/* Social Links */}
                                    <div className="flex justify-center space-x-4">
                                        <a
                                            href={member.linkedin_link}
                                            className="text-gray-400 hover:text-primary-600 transition-colors"
                                        >
                                            <FiLinkedin size={20} />
                                        </a>
                                        <a
                                            href={member.twitter_link}
                                            className="text-gray-400 hover:text-primary-600 transition-colors"
                                        >
                                            <FiTwitter size={20} />
                                        </a>
                                        <a
                                            href={member.github_link}
                                            className="text-gray-400 hover:text-primary-600 transition-colors"
                                        >
                                            <FiGithub size={20} />
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;