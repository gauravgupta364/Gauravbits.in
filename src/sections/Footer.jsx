// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

/**
 * Social media links configuration
 * - Each object represents a platform
 * - Replace `href` with your own profile links
 * - Add/remove items if you want more or fewer social platforms
 */
const socials = [
  { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@gauravbitss" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/gauravbuilds" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/gaurav-gupta-4179671b0/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/gauravbits/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/gauravgupta364" },
];

/**
 * Framer Motion variants for hover/tap glow effects
 * - Initial: normal state
 * - Hover: scale up, lift slightly, and glow with neon shadows
 * - Tap: slightly shrink when clicked/tapped
 */
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* --- Background neon gradient effects --- */}
      {/* Blue glow overlay (top-right side) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,204,0.35),transparent_70%)]" />
      {/* Green glow overlay (bottom-left side) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      {/* --- Main Footer Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Start faded & lowered
        whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into view
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      >
        {/* --- Personal Name / Branding --- */}
        {/* Change text to your name or brand */}
        <div className="w-full">
          <h1
            className="font-bangers font-semibold leading-none text-white text-center select-none"
            style={{
              fontSize: "clamp(3rem, 5vw, 14rem)", // Responsive scaling
              letterSpacing: "0.02em",
              lineHeight: 0.9,
              paddingLeft: "3vw",
              paddingRight: "3vw",
              whiteSpace: "nowrap",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            Gaurav Gupta
          </h1>
        </div>

        {/* --- Accent underline --- */}
        {/* Decorative gradient line under name */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400" />

        {/* --- Social Media Links --- */}
        {/* Icons mapped dynamically from `socials` array */}
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label} // Accessible label
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 transition-colors duration-200"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon /> {/* Icon for each social */}
            </motion.a>
          ))}
        </div>

        {/* --- Personal Quote / Tagline --- */}
        {/* Replace this with your favorite quote or brand message */}
        <p className="text-gray-300 italic max-w-xl">
          “Success is when preparation meets opportunity.”
        </p>

        {/* --- Copyright / Trademark --- */}
        {/* Auto-updates year dynamically */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Gaurav Gupta. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
