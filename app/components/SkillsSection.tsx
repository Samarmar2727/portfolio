"use client";

import { useEffect, useState } from "react";

const skills = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Bootstrap", "Tailwind CSS", "Sass", "Material UI", "Redux", 
  "Zustand", "REST APIs", "Responsive Design", "Framer Motion & GSAP", "Git & GitHub",
];

export default function Skills() {
  const [currentSkill, setCurrentSkill] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = skills[skillIndex % skills.length];
    const typingSpeed = isDeleting ? 80 : 150;

    const type = () => {
      setCurrentSkill((prev) =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && currentSkill === current) {
        setTimeout(() => setIsDeleting(true), 1000); 
      } else if (isDeleting && currentSkill === "") {
        setIsDeleting(false);
        setSkillIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentSkill, isDeleting, skillIndex]);

  return (
    <section id="skills" className="py-12 flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <h2 className="text-4xl font-bold mb-8">My Skills</h2>

      {/* Typewriter effect */}
      <div className=" mb-12 text-2xl font-mono border-r-2 border-orange-500 pr-2 animate-pulse">
        {currentSkill}
      </div>

      {/* Pills list as fallback */}
      <div  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-md bg-orange-600 text-white  text-center text-sm font-semibold shadow-md hover:bg-orange-500 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
