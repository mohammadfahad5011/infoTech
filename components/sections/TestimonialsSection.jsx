"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import Card from "../common/Card";
import axios from "axios";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`)
      .then(function (response) {
        setTestimonials(response.data);
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
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
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600">
            Don&apos;t just take our word for it - hear what our clients have to
            say about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 
                p-2 rounded-full bg-white shadow-md hover:bg-gray-50 z-10"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 
                p-2 rounded-full bg-white shadow-md hover:bg-gray-50 z-10"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Current Testimonial */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Client Image */}
                  <div className="w-20 h-20 rounded-full bg-gray-200 mb-4">
                    {testimonials[currentIndex]?.author_img ? (
                      <img
                        src={testimonials[currentIndex].author_img}
                        alt={testimonials[currentIndex]?.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(testimonials[currentIndex]?.rating || 5)].map(
                      (_, i) => (
                        <FiStar key={i} className="w-5 h-5 fill-current" />
                      )
                    )}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg text-gray-600 mb-6">
                    &quot;
                    {testimonials[currentIndex]?.quote ||
                      "No testimonial available."}
                    &quot;
                  </blockquote>

                  {/* Client Info */}
                  <cite className="not-italic">
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentIndex]?.name || "Anonymous"}
                    </div>
                    <div className="text-gray-500">
                      {testimonials[currentIndex]?.designation ||
                        "Unknown Position"}
                    </div>
                  </cite>
                </div>
              </Card>
            </motion.div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${
                      index === currentIndex
                        ? "bg-primary-600 w-4"
                        : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
