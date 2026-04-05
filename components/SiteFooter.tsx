"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { getScrollSectionVariants } from "@/lib/sectionVariants";
import { IconGithub, IconLinkedIn, IconMail } from "@/components/icons/SocialIcons";

const linkClass =
  "inline-flex items-center gap-2 text-sm text-foreground font-medium transition-colors hover:text-[var(--accent-cyan)]";

export function SiteFooter() {
  const reduced = useReducedMotion();
  const variants = getScrollSectionVariants(reduced);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", projectType: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
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
    <footer id="contact" className="relative border-t border-white/10 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={variants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
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
                  <a href={profile.email} className={linkClass}>
                    <IconMail className="h-5 w-5 shrink-0" />
                    Email
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <IconLinkedIn className="h-5 w-5 shrink-0" />
                    LinkedIn
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)] mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground transition focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Select a project type</option>
                  <option value="web-app" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Web Application</option>
                  <option value="mobile-app" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Mobile Application</option>
                  <option value="full-stack" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Full Stack Project</option>
                  <option value="ai-feature" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>AI Feature</option>
                  <option value="consulting" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Consulting</option>
                  <option value="other" style={{ backgroundColor: '#0a0a0f', color: '#e5e5e7' }}>Other</option>
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/30 resize-none"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-center text-sm text-green-400">
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-center text-sm text-red-400">
                  ✗ Failed to send message. Please try again or email me directly.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow w-full rounded-lg bg-gradient-to-r from-cyan-500/90 to-violet-500/90 px-6 py-3 text-sm font-semibold text-[var(--bg-void)] transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "SEND MESSAGE"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
