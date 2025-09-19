"use client";

import { motion } from "framer-motion";

export default function Video() {
  return (
    <section className="bg-gray-900 py-16 px-6 text-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-medium mb-10 text-gray-300">
        How We Support You
      </h2>

      {/* Video */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl"
      >
        <iframe
          className="w-full h-[500px] md:h-[280px]"
          src="https://www.youtube.com/embed/YTsQH8nVNu4?si=DRBYtlpKrhA7g-nc"
          title="How We Support You"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>
    </section>
  );
}
