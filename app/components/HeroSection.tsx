"use client";


import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


/**
 * Hero with:
 * - SVG leaves (falling + sway + rotate)
 * - ScrollTrigger controlling leaves animation (pause/resume)
 * - Typewriter effect for subtitle
 */

// Register the ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export default function HeroSection() {


      // Reference to the hero section container (used for gsap.context / ScrollTrigger scope)
  const sectionRef = useRef<HTMLElement | null>(null);

    // Array refs for each leaf DOM element so GSAP can animate them directly
  const leavesRef = useRef<Array<HTMLDivElement | null>>([]);

   // Refs for content that will animate (title, subtitle, buttons)
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  
  // How many leaves to render
  const LEAVES_COUNT = 10;

    useEffect(() => {
    // Guard: ensure sectionRef is present in DOM
    if (!sectionRef.current) return;

        // gsap.context helps to scope animations to this component and makes cleanup easy
      const ctx = gsap.context(() => {
      const W = window.innerWidth;
      const H = window.innerHeight;
         // small helper for random numbers between min and max
      const rand = (min: number, max: number) => Math.random() * (max - min) + min;

      // -----------------------
      // 1) Leaves animation
      // -----------------------
      // Create a timeline to control all leaves together (so we can pause/resume)
      const leavesTimeline = gsap.timeline({ paused: false });

      // For each leaf element, set initial state and add their animation into the timeline
      leavesRef.current.forEach((leafEl, i) => {
        if (!leafEl) return;

         // Set initial style for better performance using gsap.set (no animation, immediate)
        gsap.set(leafEl, {
          x: rand(0, W),     // start at random horizontal position
          y: -rand(20, 120), // start slightly above viewport
          scale: rand(0.7, 1.1),
          rotation: rand(-30, 30),
          opacity: rand(0.8, 1),
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });

        // Randomized motion parameters
        const duration = rand(7, 13); // how long it takes to fall
        const delay = rand(0, 4);     // staggered delays
        const sway = rand(50, 150);   // horizontal sway amount
        const spin = rand(120, 720);  // total rotation during fall

         // Build an individual timeline for this leaf and add it to leavesTimeline
        const tl = gsap.timeline({
          defaults: { ease: "none" }, // linear fall feel
          repeat: -1,                 // infinite loop
          delay,
        });

        // Main fall: move down beyond bottom of viewport and rotate while falling
        tl.to(leafEl, {
          y: H + 200,           // move past the bottom
          rotate: `+=${spin}`,  // rotate relative to current rotation
          duration,
        }, 0);

        // Sway: go left-right while falling (yoyo makes it go back)
        tl.to(leafEl, {
          x: `+=${sway}`,       // move horizontally then come back
          duration: duration / 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,            // do a left-right once per fall
        }, 0);

           // Add this leaf's individual timeline into the main leavesTimeline (so all timelines are alive)
        leavesTimeline.add(tl, 0);
      });


      // -----------------------
      // 2) Use ScrollTrigger to pause/resume leaves when hero leaves viewport
      // -----------------------
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",      // when top of hero hits top of viewport
        end: "bottom top",     // until bottom of hero reaches top of viewport
        onEnter: () => leavesTimeline.play(),       // play when hero is in view
        onEnterBack: () => leavesTimeline.play(),   // play when scrolling back up
        onLeave: () => leavesTimeline.pause(),      // pause when hero scrolled past
        onLeaveBack: () => leavesTimeline.play(),
        // markers: true, // uncomment during debugging to see trigger positions
      });

       // Subtitle: we'll implement a typewriter using small timeline steps
      // Clear subtitle text first (we will "type" it)
      if (subtitleRef.current) subtitleRef.current.textContent = "";

      const fullSubtitle = "Frontend Developer";
      const typingDelay = 0.06; // seconds between chars
      const contentTL = gsap.timeline({ paused: true });


      // For each character, append it after a short tween (this creates the typewriter effect)
      fullSubtitle.split("").forEach((char, idx) => {
        contentTL.to({}, {
          duration: typingDelay,
          onComplete: () => {
            if (subtitleRef.current) subtitleRef.current.textContent += char;
          }
        });
      });

      // Small pause then animate buttons in
      contentTL.from(buttonsRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
      }, "+=0.15");

      // Optionally, we could tie contentTL start to a ScrollTrigger (e.g. start when hero enters view)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        onEnter: () => contentTL.play(0),
      });

      // Start content timeline paused (we'll trigger it manually onEnter)
      contentTL.pause()
      }, sectionRef); // scope context to sectionRef


       // Cleanup when component unmounts: revert context (kills animations, triggers)
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  // Inline SVG for a leaf (you can replace path with a different nicer leaf
  // SVG later). We render multiple copies of the same SVG.
  const LeafSVG = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path
        d="M20.6 3.4c-3.6 0-9.7 2.5-13 5.8-3.3 3.3-5.8 9.4-5.8 13 0-.1 4.2-1.1 8.6-5.5 4.4-4.4 5.4-8.6 5.5-8.6 3.6 0 6.1-2.2 6.1-6.1 0-1.5-1.2-2.7-2.4-2.7z"
        fill="#D97706" /* amber-600 */
      />
      <path
        d="M6 18c0 0 2.5-2.1 5.5-5.1C14 9.3 16.2 6.8 18 6"
        stroke="#92400E"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black px-4 overflow-hidden"
      aria-label="Hero - Samar Khaled"
    >
      {/* Render leaves as absolutely-positioned elements (GSAP will animate them) */}
      {Array.from({ length: LEAVES_COUNT }).map((_, i) => (
        <div
          key={i}
          // store DOM node reference so GSAP can animate it
            ref={(el) => {
            leavesRef.current[i] = el;
            }}

          className="pointer-events-none select-none absolute"
          style={{ left: 0, top: 0 }} // positioning is managed by GSAP (we set x/y there)
          aria-hidden
        >
          {LeafSVG}
        </div>
      ))}

      {/* Content on top of leaves (z-10) */}
      <h1
        ref={titleRef}
        className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 relative z-10"
      >
        Hi, I&apos;m <span className="text-orange-500">Samar Khaled</span>
      </h1>

      <h2
        ref={subtitleRef}
        className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6 relative z-10"
        aria-live="polite"
      >
        {/* subtitle will be filled by the typewriter */}
      </h2>

      <p className="max-w-2xl text-gray-600 dark:text-gray-400 mb-8 relative z-10">
        Crafting modern, responsive web experiences with <br />
        <span className="font-semibold">React, Next.js & Tailwind CSS</span>.
      </p>

      <div ref={buttonsRef} className="flex gap-4 relative z-10">
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





