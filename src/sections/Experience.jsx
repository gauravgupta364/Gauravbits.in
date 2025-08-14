import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Wenvoid Limited",
    duration: "2022 - 2023",
    description:
      "Worked with team to build high-performance apps, integrated AI features, and improved engagement by 10%.",
  },
  {
    role: "Graduate Engineer Trainee",
    company: "HCL Technologies",
    duration: "2023 - 2024",
    description:
      "Worked as a Tester on a large Scale Life Science Project. Developed test cases, executed tests, and reported bugs to ensure quality.",
  },
  {
    role: "Software Developer",
    company: "Syneos Health",
    duration: "2024 - 2025",
    description:
      "Implemented UI features, fixed bugs, and contributed to scalable codebases.",
  },
];

const Experience = () => {
  const SCENE_HEIGHT_VH = 100 * experiences.length * 1.2;
  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const numExperiences = experiences.length;
  const thresholds = experiences.map((_, idx) => (idx + 1) / numExperiences);

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Section Title */}
          <div className="shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
              Experience
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop horizontal timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Base rail */}
              <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                  style={{ width: lineWidth }}
                />
              </div>

              {/* Desktop cards */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];

                  const markerScale = useTransform(
                    scrollYProgress,
                    [start, end],
                    [0, 1]
                  );
                  const markerOpacity = useTransform(
                    scrollYProgress,
                    [start, end],
                    [0, 1]
                  );

                  const isAbove = idx % 2 === 0;
                  const cardOpacity = useTransform(
                    scrollYProgress,
                    [start, end],
                    [0, 1]
                  );
                  const cardY = useTransform(
                    scrollYProgress,
                    [start, end],
                    [isAbove ? 30 : -30, 0]
                  );

                  return (
                    <div
                      key={idx}
                      className="relative flex-1 flex justify-center items-center min-w-0"
                    >
                      <motion.div
                        className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
                        style={{ scale: markerScale, opacity: markerOpacity }}
                      />
                      <motion.div
                        className={`absolute ${
                          isAbove ? "-top-8" : "-bottom-8"
                        } w-[3px] bg-white/40`}
                        style={{ height: 40, opacity: cardOpacity }}
                      />
                      <motion.div
                        className={`absolute ${
                          isAbove ? "bottom-12" : "top-12"
                        } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
                        style={{ opacity: cardOpacity, y: cardY }}
                      >
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-md text-gray-400 mb-3">
                          {exp.company} | {exp.duration}
                        </p>
                        <p className="text-md text-gray-300 break-words">
                          {exp.description}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile vertical timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* Left-side timeline */}
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                  style={{ height: lineHeight }}
                />
              </div>

              {/* Mobile cards */}
              <div className="relative flex flex-col gap-10 ml-10 mt-6">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];

                  const markerScale = useTransform(
                    scrollYProgress,
                    [start, end],
                    [0, 1]
                  );
                  const markerOpacity = useTransform(
                    scrollYProgress,
                    [start, end],
                    [0, 1]
                  );

                  const cardOpacity = useTransform(
                    scrollYProgress,
                    [start, end],
                    [0, 1]
                  );
                  const cardX = useTransform(
                    scrollYProgress,
                    [start, end],
                    [-24, 0]
                  );

                  return (
                    <div key={idx} className="relative flex items-start">
                      <motion.div
                        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
                        style={{ scale: markerScale, opacity: markerOpacity }}
                      />
                      <motion.div
                        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[95vw] max-w-[360px] ml-6 shadow-lg"
                        style={{ opacity: cardOpacity, x: cardX }}
                      >
                        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
                        <p className="text-sm text-gray-400 mb-2 break-words">
                          {exp.company} | {exp.duration}
                        </p>
                        <p className="text-sm text-gray-300 break-words">
                          {exp.description}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
