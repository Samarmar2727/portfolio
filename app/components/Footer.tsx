"use client";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 gap-4">
        {/* Copyright */}
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Samar Khaled. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex gap-6 justify-center md:justify-end">
          {/* GitHub */}
          <a
            href="https://github.com/Samarmar2727"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-8 h-8 md:w-7 md:h-7 hover:text-gray-400 transition-colors" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/samar-khaled2727"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-8 h-8 md:w-7 md:h-7 hover:text-blue-400 transition-colors" />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/201029491757"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="w-8 h-8 md:w-7 md:h-7 text-green-500 hover:text-green-600 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
