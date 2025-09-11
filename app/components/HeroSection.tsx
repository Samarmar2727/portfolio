"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leavesRef = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const LEAVES_COUNT = 12;
  const symbols = ["🍂", "🎃", "🌰"]; // Autumn mix

  // Loop typing effect for "Samar Khaled"
  const [displayName, setDisplayName] = useState("");
  const fullName = "Samar Khaled";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;

    const handleTyping = () => {
      const updatedText = isDeleting
        ? fullName.substring(0, displayName.length - 1)
        : fullName.substring(0, displayName.length + 1);

      setDisplayName(updatedText);

      if (!isDeleting && updatedText === fullName) {
        setTimeout(() => setIsDeleting(true), 1000); // pause before delete
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayName, isDeleting, loopIndex]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const rand = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      // Falling autumn symbols
      const leavesTimeline = gsap.timeline({ paused: false });

      leavesRef.current.forEach((leafEl) => {
        if (!leafEl) return;

        gsap.set(leafEl, {
          x: rand(0, W),
          y: -rand(20, 120),
          scale: rand(0.7, 1.1),
          rotation: rand(-30, 30),
          opacity: rand(0.8, 1),
        });

        const duration = rand(7, 13);
        const delay = rand(0, 4);
        const sway = rand(50, 150);
        const spin = rand(120, 720);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          repeat: -1,
          delay,
        });

        tl.to(
          leafEl,
          {
            y: H + 200,
            rotate: `+=${spin}`,
            duration,
          },
          0
        );

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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => leavesTimeline.play(),
        onLeave: () => leavesTimeline.pause(),
      });

      // Subtitle typewriter ("Frontend Developer")
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
      {/* Falling autumn symbols */}
      {Array.from({ length: LEAVES_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            leavesRef.current[i] = el;
          }}
          className="pointer-events-none select-none absolute"
          style={{ left: 0, top: 0 }}
          aria-hidden
        >
          {symbols[Math.floor(Math.random() * symbols.length)]}
        </div>
      ))}

      {/* Content */}
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
          Contact Me
        </a>
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

