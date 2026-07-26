"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Mail,
  ArrowUpRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("sending");
    // Simulate send
    setTimeout(() => {
      setFormState("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  const contactLinks = [
    {
      icon: <Mail size={18} />,
      label: "rahullohra.work@gmail.com",
      href: "mailto:rahullohra.work@gmail.com",
    },
    {
      icon: <GithubIcon size={18} />,
      label: "github.com/rahullohra",
      href: "https://github.com/rahullohra",
    },
    {
      icon: <LinkedinIcon size={18} />,
      label: "linkedin.com/in/rahullohra",
      href: "https://linkedin.com/in/rahullohra",
    },
  ];

  return (
    <section id="contact" className="relative py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-6 inline-flex">
            <Send size={12} /> Contact
          </span>
          <h2
            className="section-heading text-4xl sm:text-5xl md:text-6xl text-white mt-6 mb-6"
          >
            Let&apos;s build something{" "}
            <span className="gradient-text">amazing.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Have a project idea, need AI integration, or want to collaborate?
            Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/[0.03] border ${
                    errors.name ? "border-red-500/50" : "border-white/[0.06]"
                  } rounded-xl text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-xs text-red-400/80 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/[0.03] border ${
                    errors.email ? "border-red-500/50" : "border-white/[0.06]"
                  } rounded-xl text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400/80 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/[0.03] border ${
                    errors.message ? "border-red-500/50" : "border-white/[0.06]"
                  } rounded-xl text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-xs text-red-400/80 mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={formState !== "idle"}
                className="btn-primary w-full justify-center disabled:opacity-50"
                data-hoverable
              >
                {formState === "idle" && (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
                {formState === "sending" && (
                  <>
                    Sending... <Loader2 size={14} className="animate-spin" />
                  </>
                )}
                {formState === "sent" && (
                  <>
                    Sent! <CheckCircle size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center gap-4"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="glass-card p-5 flex items-center gap-4 group"
                data-hoverable
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.06] flex items-center justify-center text-white/40 group-hover:text-blue-400 transition-colors">
                  {link.icon}
                </div>
                <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors flex-1">
                  {link.label}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </motion.a>
            ))}

            <div className="glass-card p-5 mt-4">
              <p className="text-sm text-white/40 mb-3">Current Availability</p>
              <div className="flex items-center gap-2">
                <div className="pulse-dot" />
                <span className="text-sm text-emerald-400 font-medium">
                  Available for freelance & contract work
                </span>
              </div>
              <p className="text-xs text-white/20 mt-2">
                Typically respond within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
