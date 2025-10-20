"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  live?: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Pickly: E-commerce Web Application",
    description:
      "A full-featured e-commerce platform with authentication, filtering, search, wishlist, cart, and checkout.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "REST API",
    ],
    features: [
      "User authentication",
      "Product browsing & filters",
      "Wishlist & cart",
      "Order confirmation",
    ],
    live: "https://pickly-ecommerce.vercel.app",
    github: "https://github.com/Samarmar2727/pickly-ecommerce",
    image: "/e.commerce2.JPG",
  },
  {
    title: "Admin Dashboard",
    description:
      "A fully responsive admin dashboard with charts, calendar, dark mode, and routing.",
    technologies: [
      "React",
      "Vite",
      "Material UI",
      "Nivo Charts",
      "React Router DOM",
      "FullCalendar",
      "MUI X",
    ],
    features: [
      "Interactive charts",
      "Calendar integration",
      "Dark/Light mode",
      "Routing & navigation",
      "Fully responsive",
    ],
    live: "https://admin-dashboard-27.netlify.app",
    github: "https://github.com/Samarmar2727/admin-dashboard",
    image: "/dashboard 2.JPG",
  },
  {
    title: "Weather App",
    description:
      "A weather forecast application with multilingual support, real-time weather data, and elegant UI.",
    technologies: [
      "React",
      "Vite",
      "Redux Toolkit",
      "Material UI",
      "Emotion",
      "Axios",
      "Date-fns",
      "Moment.js",
      "i18next",
    ],
    features: [
      "Real-time weather data",
      "Multilingual support",
      "Date & time formatting",
      "Responsive design",
    ],
    live: "https://weather-app277.netlify.app",
    github: "https://github.com/Samarmar2727/weather-app",
    image: "/weather app.JPG",
  },
  {
    title: "Movie Web App",
    description:
      "Responsive movie database app integrated with OMDb API. Includes search, filters, trailer, and pagination.",
    technologies: ["React", "Vite", "Tailwind", "Material UI", "OMDb API"],
    features: [
      "Dynamic hero section",
      "Search & filter",
      "Movie details with trailer",
      "Pagination",
    ],
    live: "https://movie-web-app-ecru.vercel.app",
    github: "https://github.com/Samarmar2727/movie-web-app",
    image: "/movie.JPG",
  },
  {
    title: "To-Do List App",
    description:
      "Simple task manager with add, edit, delete, and complete task functionality.",
    technologies: ["React", "Material UI"],
    features: ["Add/Edit/Delete tasks", "Mark as complete", "Responsive UI"],
    live: "https://samarmar2727.github.io/TO-DO-List-by-react/",
    github: "https://github.com/Samarmar2727/TO-DO-List-by-react",
    image: "/todo.JPG",
  },

  {
    title: "Prayer Times App",
    description:
      "An app displaying daily prayer times with a clean and responsive design.",
    technologies: ["React", "Vite", "Axios", "Material UI", "Emotion"],
    features: [
      "Fetch daily prayer times",
      "Responsive design",
      "Simple & clean UI",
    ],
     live: "https://prayers-times2.netlify.app",
    github: "https://github.com/Samarmar2727/prayers-times",
    image: "/prayers.JPG",
  },
  {
    title: "Social Media App",
    description:
      "Training project with login, register, posts, comments, and profile with avatar upload using Tarmeez API.",
    technologies: ["JavaScript", "Bootstrap", "Tarmeez API"],
    features: [
      "Auth (login/register)",
      "CRUD posts",
      "Comments",
      "Profile page",
    ],
    github: "https://github.com/Samarmar2727/social-media-project",
    image: "/social 2.JPG",
  },
];

export default function Projects() {
  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
      {
        scale: 1.02,
        boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "power1.inOut",
        paused: true,
      }
    );
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Featured Projects
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="project-card bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 flex flex-col transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
              }}
            >
              {/* Project Image */}
              <div className="relative w-full h-60 mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 dark:text-orange-400">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {project.description}
              </p>

              {/* Technologies */}
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Technologies:
              </p>
              <ul className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, idx) => (
                  <li
                    key={idx}
                    className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Key Features */}
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Key Features:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="mt-auto flex gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    className="flex-1 bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  className="flex-1 border border-orange-500 text-orange-500 text-center py-2 rounded-lg hover:bg-orange-500 hover:text-white transition cursor-pointer"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
