"use client"; // Required for Next.js App Router since we use DOM APIs

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Storing coordinates in refs to prevent unnecessary re-renders in the animation loop
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set initial position to center to prevent flashing at 0,0
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Event delegation: robustly check if we are hovering over a clickable element
      if (e.target.closest("a, button, .hover-target")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId;
    const renderCursor = () => {
      // Lerp (Linear Interpolation) factor for the smooth lag effect
      const speed = 0.15;

      cursor.current.x += (mouse.current.x - cursor.current.x) * speed;
      cursor.current.y += (mouse.current.y - cursor.current.y) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursor.current.x}px, ${cursor.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Cleanup event listeners and animation frames on unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-dot ${isHovering ? "hovering" : ""}`}
    />
  );
}
