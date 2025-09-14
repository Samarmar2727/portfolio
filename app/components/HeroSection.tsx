"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTypewriter } from "../hooks/useTypewriter"; // Reusable typewriter hook

// Register GSAP plugin safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  // Refs for DOM elements
  const sectionRef = useRef<HTMLElement | null>(null);
  const leavesRef = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const LEAVES_COUNT = 15;//  number of falling leaves
  const symbols = ["🍂"]; // falling leaves symbol

  //Typewriter effect for name
  const displayName = useTypewriter(["Samar Khaled"], 150, 100, 1000);

  // Falling leaves animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const rand = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      // Timeline for all leaves
      const leavesTimeline = gsap.timeline({ paused: false });

      // Animate each falling leaf 
      leavesRef.current.forEach((leafEl) => {
        if (!leafEl) return;

        const size = rand(0.8, 1.6); // smaller, more natural sizes

        gsap.set(leafEl, {
          x: rand(0, W),
          y: -rand(20, 120),
          scale: size,
          rotation: rand(-30, 30),
          opacity: rand(0.8, 1),
        });

        const duration = rand(8, 15); // random falling speed
        const delay = rand(0, 5);
        const sway = rand(50, 150); // horizontal sway
        const spin = rand(120, 720); // rotation spin

        // Individual timeline per leaf
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          repeat: -1,
          delay,
        });

        // Falling down
        tl.to(
          leafEl,
          {
            y: H + 200,
            rotate: `+=${spin}`,
            duration,
          },
          0
        );

        // Horizontal swaying motion
        tl.to(
          leafEl,
          {
            x: `+=${sway}`,
            duration: duration / 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0
        );

        leavesTimeline.add(tl, 0);
      });

      // Scroll trigger: pause animation when out of view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => leavesTimeline.play(),
        onLeave: () => leavesTimeline.pause(),
      });

      // Subtitle typewriter effect ("Frontend Developer")
      if (subtitleRef.current) subtitleRef.current.textContent = "";
      const fullSubtitle = "Frontend Developer";
      const typingDelay = 0.06;
      const contentTL = gsap.timeline();

      fullSubtitle.split("").forEach((char) => {
        contentTL.to({}, {
          duration: typingDelay,
          onComplete: () => {
            if (subtitleRef.current)
              subtitleRef.current.textContent += char;
          },
        });
      });

      // Animate buttons after subtitle typing
      contentTL.from(buttonsRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
      }, "+=0.15");

      contentTL.play(0);

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section 
      id="home"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black px-4 overflow-hidden"
      aria-label="Hero - Samar Khaled"
    >
      {/* Falling autumn leaves */}
      {Array.from({ length: LEAVES_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            leavesRef.current[i] = el;
          }}
          className="pointer-events-none select-none absolute text-lg sm:text-xl lg:text-2xl"
          style={{ left: 0, top: 0 }}
          aria-hidden
        >
          {symbols[0]}
        </div>
      ))}

      {/* Hero content */}
      <h1
        ref={titleRef}
        className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 relative z-10"
      >
        Hi, I&apos;m{" "}
        <span className="text-orange-500">{displayName}</span>
        <span className="animate-pulse">|</span>
      </h1>

      <h2
        ref={subtitleRef}
        className="text-lg sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6 relative z-10"
        aria-live="polite"
      />

      <p className="max-w-2xl text-gray-600 dark:text-gray-400 mb-8 relative z-10 text-sm sm:text-base">
        Crafting modern, responsive web experiences with <br />
        <span className="font-semibold">
          React, Next.js & Tailwind CSS
        </span>.
      </p>

      <div ref={buttonsRef} className="flex gap-4 relative z-10">
        <a
          href="#contact"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Contact Me</a>
        <a
          href="/samarkhaled-fronted.pdf"
          download
          className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
