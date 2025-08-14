// src/sections/Skills.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { FaJava, FaReact } from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPython,
  SiDocker,
  SiMongodb,
  SiAngular,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";

export default function Skills() {
  // Skills list with icons
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiAngular />, name: "Angular" },
  ];

  // Duplicate for smooth infinite loop
  const repeatedSkills = [...skills, ...skills, ...skills];

  // Direction detection (-1 → right-to-left, 1 → left-to-right)
  const [dir, setDir] = useState(-1); // default scroll direction: right-to-left
  const controls = useAnimation();
  const containerRef = useRef(null);
  const touchYRef = useRef(null);
  const rafRef = useRef(null);

  // If you still use the keyframe approach elsewhere, keep this available
  const startAnimation = async (direction) => {
    if (direction === 0) {
      await controls.stop();
      return;
    }
    const from = direction === 1 ? "-100%" : "0%";
    const to = direction === 1 ? "0%" : "-100%";

    controls.start({
      x: [from, to],
      transition: {
        ease: "linear",
        duration: 20,
        repeat: Infinity,
      },
    });
  };

  // Detect scroll & touch direction
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const nextDir = e.deltaY > 0 ? -1 : 1; // scroll down → R-to-L, scroll up → L-to-R
      if (nextDir !== dir) setDir(nextDir);
    };

    const onTouchStart = (e) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (touchYRef.current == null) return;
      const dy = e.touches[0].clientY - touchYRef.current;
      const nextDir = dy < 0 ? -1 : 1;
      if (nextDir !== dir) setDir(nextDir);
      touchYRef.current = e.touches[0].clientY;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [dir]);

  // rAF-based marquee for reliable direction flipping
  const x = useMotionValue(0);
  const trackRef = useRef(null);

  useEffect(() => {
    let rafId;
    let last = performance.now();
    const BASE_SPEED = 80; // px/sec; tweak as needed

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + BASE_SPEED * dir * dt;

      // Wrap inside one repetition width (since repeated 3x)
      const loopWidth = trackRef.current?.scrollWidth
        ? trackRef.current.scrollWidth / 3
        : 0;

      if (loopWidth > 0) {
        while (next <= -loopWidth) next += loopWidth;
        while (next >= 0) next -= loopWidth;
      }

      x.set(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [dir, x]);

  return (
    <section
      id="skills"
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Neon background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-20 blur-[120px] animate-pulse delay-500"></div>
      </div>

      {/* Section Title */}
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Skills
      </motion.h2>

      {/* Subtitle line under the title */}
      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Scrolling icons */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1CD8D2]"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={skill.name}
              title={skill.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </span>
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
