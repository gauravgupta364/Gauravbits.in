// src/sections/Projects.jsx
import React from "react";
import { useScroll } from "framer-motion";

// Desktop/Laptop images
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";

// Mobile images
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

// Simple responsive hook to detect mobile (matches Tailwind's sm breakpoint: 640px)
function useIsMobile(query = "(max-width: 639px)") {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    if (mql.addEventListener) mql.addEventListener("change", handler);
    else mql.addListener(handler);

    setIsMobile(mql.matches);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handler);
      else mql.removeListener(handler);
    };
  }, [query]);

  return isMobile;
}

export default function Projects() {
  const isMobile = useIsMobile();

  // Base metadata
  const baseProjects = [
    { title: "nk studio", link: "https://www.nk.studio/", bgColor: "#0d4d3d", desktop: img1, mobile: photo1 },
    { title: "Gamily", link: "https://gamilyapp.com/", bgColor: "#3884d3", desktop: img2, mobile: photo2 },
    { title: "Hungry Tiger", link: "https://www.eathungrytiger.com/", bgColor: "#dc9317", desktop: img3, mobile: photo3 },
  ];

  // Pick desktop or mobile image
  const projects = React.useMemo(
    () => baseProjects.map((p) => ({ ...p, image: isMobile ? p.mobile : p.desktop })),
    [isMobile]
  );

  const sceneRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const numProjects = projects.length;
  const thresholds = projects.map((_, idx) => (idx + 1) / numProjects);

  const getActiveProjectIndex = (progress) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (progress <= thresholds[i]) return i;
    }
    return thresholds.length - 1;
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setActiveIndex(getActiveProjectIndex(v));
    });
  }, [scrollYProgress]);

  const activeProject = projects[activeIndex];
  const activeBg = activeProject?.bgColor ?? "#000000";

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * numProjects}vh`,
        backgroundColor: activeBg,
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* Top Title */}
        <h2 className="text-3xl font-semibold mt-12 z-10 text-white text-center">
          My Work
        </h2>

        {/* Project Cards */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "78%", maxWidth: "1200px" }}
            >
              {/* Project Title */}
              <h3
                className="
                  block text-center text-5xl text-white/95
                  sm:absolute sm:-top-20 sm:-left-40 sm:text-7xl md:text-8xl
                  sm:text-left sm:mb-0 font-bangers italic font-semibold
                "
                style={{ zIndex: 5 }}
              >
                {project.title}
              </h3>

              {/* Project Image */}
              <div
                className="
                  relative w-full rounded-xl overflow-hidden bg-black/20 shadow-2xl
                  md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]
                  mb-10 sm:mb-12
                  h-[62vh] sm:h-[66vh]
                "
                style={{
                  zIndex: 10,
                  borderRadius: "1rem",
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button — now opens in new tab */}
        <div className="absolute bottom-10">
          <a
            href={activeProject?.link || "#_"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}
