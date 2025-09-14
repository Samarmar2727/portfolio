"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a
         href="#projects"
         className="text-xl font-bold dark:text-orange-500">Samar Khaled</a>

        {/* Links (desktop) */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Actions (dark mode + burger) */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {/* Burger menu (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded"
          >
            {isOpen ? <X size={24} className="dark:text-red-200" /> : <Menu size={24} className="dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 flex flex-col items-center gap-4 py-6 shadow-md">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
