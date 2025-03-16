"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";

const ContactSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    //   const onSubmit = async (data) => {
    //     try {
    //       // TODO: Implement actual API call
    //       console.log("Form data:", data);
    //       toast.success("Message sent successfully!");
    //       reset();
    //     } catch (error) {
    //       toast.error("Failed to send message. Please try again.");
    //     }
    //   };

    const onSubmit = async (data) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  // Add this line
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }
    
          const result = await response.json();
    
          if (result.success) {
            toast.success("Message sent successfully!");
            reset(); // Clear the form
          } else {
            toast.error("Failed to send message: " + result.message);
          }
        } catch (error) {
          console.error("Error details:", error);
          toast.error("Something went wrong. Please try again.");
        }
    };

    const contactInfo = [
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: "Our Location",
            details: ["1234 Street Name", "City, Country", "Postal Code"],
        },
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: "Contact Info",
            details: ["+1 (123) 456-7890", "+1 (123) 456-7891"],
        },
        {
            icon: <FiMail className="w-6 h-6" />,
            title: "Email Us",
            details: ["contact@example.com", "support@example.com"],
        },
    ];

    return (
        <section id="contact" className="py-20 bg-gray-50">
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
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600">
                        Have a question or want to work together? We&apos;d love to hear from
                        you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info, index) => (
                            <Card key={info.title} className="p-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-4">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {info.title}
                                        </h3>
                                        {info.details.map((detail, i) => (
                                            <p key={i} className="text-gray-600">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <Card className="p-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Full Name"
                                        {...register("name", { required: "Name is required" })}
                                        error={errors.name?.message}
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        error={errors.email?.message}
                                    />
                                </div>
                                <Input
                                    label="Subject"
                                    {...register("subject", { required: "Subject is required" })}
                                    error={errors.subject?.message}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        {...register("message", {
                                            required: "Message is required",
                                        })}
                                        rows={6}
                                        className={`w-full px-4 py-2 rounded-lg border border-gray-300
                      focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                      ${errors.message ? "border-red-500" : ""}`}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-amber-600"
                                    isLoading={isSubmitting}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
