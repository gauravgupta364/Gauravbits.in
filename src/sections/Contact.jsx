import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Astra from "../assets/Astra.png";

const SERVICE_ID = "service_msru4yg";          // <- updated
const TEMPLATE_ID = "template_7qqubns";
const PUBLIC_KEY  = "aKLohsVJnST4eZayW";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // numbers only for budget
    if (name === "budget" && value !== "" && !/^\d+$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Fill the details in this field";
    if (!formData.email.trim()) newErrors.email = "Fill the details in this field";
    if (!formData.service) newErrors.service = "Fill the details in this field";
    if (formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill the details in this field";
    if (!formData.idea.trim()) newErrors.idea = "Fill the details in this field";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // send both common & default EmailJS names so either template works
          name: formData.name,
          from_name: formData.name,

          email: formData.email,
          reply_to: formData.email,

          service: formData.service,
          budget: formData.budget,

          idea: formData.idea,
          message: formData.idea,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      // err.text (if present) has the exact reason (unknown variable, wrong IDs, etc.)
      if (err?.text) console.error("EmailJS detail:", err.text);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      {/* Left Image with bounce animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <motion.img
          src={Astra}
          alt="Contact"
          className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Right Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 text-white border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 text-white border ${
                errors.email ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Service */}
          <div className="flex flex-col">
            <label className="mb-1">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.service ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            >
              <option value="" disabled>
                Something in mind?
              </option>
              <option value="webdev" className="text-black">Web Development</option>
              <option value="mobile" className="text-black">Mobile Application</option>
              <option value="other" className="text-black">Others</option>
            </select>
            {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
          </div>

          {/* Budget (conditional) */}
          {formData.service && formData.service !== "other" && (
            <div className="flex flex-col">
              <label className="mb-1">
                Your Budget <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="budget"
                placeholder="Enter your budget"
                value={formData.budget}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 text-white border ${
                  errors.budget ? "border-red-500" : "border-gray-500"
                } focus:outline-none focus:border-blue-500`}
              />
              {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}
            </div>
          )}

          {/* Idea */}
          <div className="flex flex-col">
            <label className="mb-1">
              Explain Your Idea <span className="text-red-500">*</span>
            </label>
            <textarea
              name="idea"
              placeholder="Explain your idea..."
              rows={5}
              value={formData.idea}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.idea ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-blue-500`}
            ></textarea>
            {errors.idea && <p className="text-red-500 text-xs">{errors.idea}</p>}
          </div>

          {/* Status messages */}
          {status === "sending" && <p className="text-yellow-400 text-sm">Sending...</p>}
          {status === "success" && <p className="text-green-400 text-sm">Message sent successfully ✅</p>}
          {status === "error" && <p className="text-red-400 text-sm">Something went wrong ❌</p>}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
