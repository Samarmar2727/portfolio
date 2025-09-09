"use client";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black px-4">
      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
        Hi, I&apos;m <span className="text-orange-500">Samar Khaled</span>
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6">
        Frontend Developer
      </h2>

      {/* Description */}
      <p className="max-w-2xl text-gray-600 dark:text-gray-400 mb-8">
        Crafting modern, responsive web experiences with <br />
        <span className="font-semibold">React, Next.js & Tailwind CSS</span>.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <a
          href="#contact"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Contact Me
        </a>
        <a
          href="https://docs.google.com/document/d/1FNkXJ7rLgj7z_-tetRZ9PtTKvE4aYffzitpmC4pc9qw/edit?usp=drivesdk"
          className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
