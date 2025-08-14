// src/sections/Home.jsx
import { motion } from "framer-motion";
import React from "react";
import avatar from "../assets/avator.png";
import {
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

// Socials (same as Footer)
const socials = [
  { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@gauravbitss" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/gauravbuilds" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/gaurav-gupta-4179671b0/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/gauravbits/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/gauravgupta364" },
];

// Glow animation for socials
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Home() {
  // Typewriter animation logic
  const roles = ["Software Developer", "Web Developer", "Content Creator"];
  const TYPE_SPEED = 60;
  const ERASE_SPEED = 40;
  const HOLD_TIME = 1200;

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = roles[index];
    const delay = deleting ? ERASE_SPEED : TYPE_SPEED;
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), HOLD_TIME);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <section id="home" className="h-screen w-full relative overflow-hidden bg-black">
      {/* Neon background layers */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full 
                        bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] 
                        opacity-10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full 
                        bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
                        opacity-30 blur-[150px] animate-pulse delay-500"></div>
      </div>

      {/* Main content grid */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-12">
            {/* Typewriter roles */}
            <motion.div
              className="mb-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span 
                className="inline-block w-[2px] ml-1 bg-white animate-pulse" 
                style={{ height: "1em" }} 
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold 
                         text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-white font-bold text-6xl sm:text-7xl md:text-8xl whitespace-nowrap">
                Gaurav Gupta
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high‑impact web experiences — 
              building modern, scalable, and lightning‑fast applications that make a difference.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-white 
                           bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
                           shadow-lg shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                View My Work
              </a>
              <a
                href="/Resume.pdf"
                download
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white 
                           hover:bg-gray-200 shadow-lg hover:scale-105 transition-all duration-300"
              >
                My Resume
              </a>
            </motion.div>

            {/* Social Icons */}
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Avatar */}
        <div className="relative hidden lg:block">
          {/* Glow */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "410px",
              height: "760px",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
              zIndex: 0,
            }}
          />
          {/* Avatar Image */}
          <motion.img
            src={avatar}
            alt="Gaurav Gupta avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-60px",
              width: "880px",
              height: "880px",
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>

      {/* Floating particles unchanged */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 1.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mobile adjustments */}
      <style>{`
        @media (max-width: 1023.98px) {
          #home .lg\\:grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          #home .lg\\:text-left {
            text-align: center !important;
          }
          #home .lg\\:justify-start {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
