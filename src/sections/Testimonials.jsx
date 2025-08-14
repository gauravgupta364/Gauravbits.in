import React from "react";
import { motion } from "framer-motion";
import m1 from "../assets/m1.PNG";
import m2 from "../assets/m2.PNG";
import w1 from "../assets/w1.PNG";
import w2 from "../assets/w2.PNG";



const testimonials = [
  {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Gaurav is a visionary developer. His attention to detail and creativity blew us away. Our project was a massive success because of him.",
    image: m1
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer at PixelWorks",
    review:
      "Working with Gaurav was an absolute pleasure. He brings design and code together like magic. Highly recommend him!",
    image: w1,
  },
  {
    name: "Amy jacobsan",
    role: "Tech Manager at CodeEmpire",
    review:
      "From concept to execution, Gaurav handled everything flawlessly. His work ethic and innovation are unmatched.",
    image: m2,
  },
  {
    name: "Carry Smith",
    role: "CTO at Innovate Labs",
    review:
      "Gaurav transformed our outdated platform into something modern and powerful. His skills are world-class.",
    image: w2,
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-16"
      >
        What People Say
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {testimonials.map((testi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
          >
            {/* User Image */}
            <img
              src={testi.image}
              alt={testi.name}
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
            />
            {/* Review */}
            <p className="text-gray-200 italic mb-4">"{testi.review}"</p>
            {/* Name & Role */}
            <h3 className="text-lg font-semibold">{testi.name}</h3>
            <p className="text-sm text-gray-400">{testi.role}</p>
          </motion.div>
          
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
