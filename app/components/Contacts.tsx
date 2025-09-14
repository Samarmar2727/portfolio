"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
        >
          Let&apos;s work together
        </motion.h2>

        {/* Form + Socials */}
        <motion.form
          action="https://formspree.io/f/xnnbrqpr"
          method="POST"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-4 text-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            Send Message
          </button>

          {/* Socials inside the same box */}
          <div className="mt-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
             or 
             reach me via:
            </p>
            <div className="flex justify-center space-x-6 text-3xl text-orange-500">
              <a
                href="https://www.linkedin.com/in/samar-khaled2727"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Samarmar2727"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://wa.me/01029491757"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
