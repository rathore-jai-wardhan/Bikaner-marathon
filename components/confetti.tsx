
"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function LaunchConfetti() {
  useEffect(() => {
    // Respect accessibility preferences.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Play once per browser tab session.
    const sessionKey = "bikaner-marathon-launch-confetti";

    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    sessionStorage.setItem(sessionKey, "shown");

    const end = Date.now() + 2200;

    const colors = ["#D4AF37", "#F5D76E", "#FFF1B8", "#B8860B"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 90,
        spread: 100,
        startVelocity: 28,
        gravity: 1.1,
        ticks: 180,
        origin: { x: Math.random(), y: -0.08 },
        colors,
        scalar: 0.9,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      confetti.reset();
    };
  }, []);

  return null;
}
