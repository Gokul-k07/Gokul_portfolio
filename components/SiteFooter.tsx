"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile } from "@/data/profile";
import { getScrollSectionVariants } from "@/lib/sectionVariants";
import { IconGithub, IconLinkedIn, IconMail } from "@/components/icons/SocialIcons";

const linkClass =
  "inline-flex items-center gap-2 text-sm text-foreground font-medium transition-colors hover:text-[var(--accent-cyan)]";

export function SiteFooter() {
  const reduced = useReducedMotion();
  const variants = getScrollSectionVariants(reduced);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Fbo0lz0q1jyAfz7tp");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.title || !formData.message) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    try {
      // Send email using EmailJS
      const response = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gcp11ax",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_x14m8u3",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Fbo0lz0q1jyAfz7tp"
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", title: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="relative border-t border-white/10 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={variants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h2 id="contact-heading" className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Let&apos;s build something worth shipping
          </h2>
          <p className="mt-3 text-muted">
            Open to full-time roles and contract work. Tell me about your stack, timeline, and goals
            &mdash; I&apos;ll respond with clarity on fit and next steps.
          </p>
        </motion.div>

        {/* Two Column Layout: Info Left, Form Right */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            variants={variants}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <p className="font-display text-lg font-semibold text-foreground">{profile.name}</p>
                <p className="mt-1 text-sm text-muted">{profile.role}</p>
                <p className="mt-2 text-sm text-muted">{profile.location}</p>
              </div>

              {/* Social Links */}
              <div className="space-y-3 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                  Connect
                </p>
                <div className="flex flex-col gap-3">
                  <a href={profile.email} className={linkClass} aria-label={`Email ${profile.name}`}>
                    <IconMail className="h-5 w-5 shrink-0" />
                    Email
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`${profile.name} on LinkedIn`}
                  >
                    <IconLinkedIn className="h-5 w-5 shrink-0" />
                    LinkedIn
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`${profile.name} on GitHub`}
                  >
                    <IconGithub className="h-5 w-5 shrink-0" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            variants={variants}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">GET IN TOUCH</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition-colors duration-300 focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition-colors duration-300 focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)] mb-2">
                  Project Type
                </label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground transition-colors duration-300 focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Select a project type</option>
                  <option value="Web Application" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Web Application</option>
                  <option value="Mobile Application" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Mobile Application</option>
                  <option value="Full Stack Project" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Full Stack Project</option>
                  <option value="AI Feature" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>AI Feature</option>
                  <option value="Consulting" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Consulting</option>
                  <option value="Other" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)] mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your vision..."
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition-colors duration-300 focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 resize-none"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-center text-sm text-green-400 transition-all duration-300"
                >
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-center text-sm text-red-400 transition-all duration-300"
                >
                  ✗ Failed to send message. Please try again or email me directly.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glow w-full rounded-lg bg-gradient-to-r from-cyan-500/90 to-violet-500/90 px-6 py-3 text-sm font-semibold text-[var(--bg-void)] transition-all duration-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "SEND MESSAGE"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
