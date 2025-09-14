"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PersonalInfo() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    console.log("itemsRef.current:", itemsRef.current); // المفروض يطبع array فيها العناصر

    if (!sectionRef.current || itemsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const personalData = [
    { label: "Name", value: "Samar Khaled" },
    { label: "Role", value: "Frontend Developer" },
    { label: "Location", value: "Egypt" },
    { label: "Email", value: "skhaled510@gmail.com" },
    { label: "GitHub", value: "https://github.com/Samarmar2727" },
    { label: "LinkedIn", value: "https://www.linkedin.com/in/samar-khaled2727" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900"
    >
      <h2
        ref={(el) => {
          if (el) itemsRef.current[0] = el;
        }}
        className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-8 sm:mt-12 mb-8 sm:mb-12"
      >
        Personal Information
      </h2>

      <div className="w-full max-w-xl flex flex-col gap-6">
        {personalData.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index + 1] = el;
            }}
            className="p-4 bg-transparent dark:bg-gray-800 text-left  
                       rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.label}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 break-words">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
