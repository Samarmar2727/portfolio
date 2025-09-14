"use client";

import { useEffect, useState } from "react";

export function useTypewriter(texts: string[], speed = 150, deleteSpeed = 80, pause = 1000) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const current = texts[textIndex % texts.length];
    const typingSpeed = isDeleting ? deleteSpeed : speed;

    const type = () => {
      setDisplayedText((prev) =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayedText === current) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, texts, speed, deleteSpeed, pause]);

  return displayedText;
}
