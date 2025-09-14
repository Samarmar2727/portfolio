"use client";

import { useTypewriter } from "../hooks/useTypewriter";

const skills = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Bootstrap", "Tailwind CSS", "Sass", "Material UI", "Redux", 
  "Zustand", "REST APIs", "Responsive Design", "Framer Motion & GSAP", "Git & GitHub",
];

export default function Skills() {
  const currentSkill = useTypewriter(skills, 150, 80, 1000);

  return (
    <section id="skills" className="py-12 flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <h2 className="text-4xl font-bold mb-8">My Skills</h2>

      <div className="mb-12 text-2xl font-mono border-r-2 border-orange-500 pr-2 animate-pulse">
        {currentSkill}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <span key={i} className="px-4 py-2 rounded-md bg-orange-600 text-white text-center text-sm font-semibold shadow-md hover:bg-orange-500 transition">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
