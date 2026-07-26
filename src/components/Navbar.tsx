"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              scrolled
                ? "glass border border-white/[0.06]"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" data-hoverable>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110">
                R
              </div>
              <span className="text-white font-semibold text-sm hidden sm:block" style={{ fontFamily: "var(--font-heading)" }}>
                Rahul Lohra
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-hoverable
                  className="px-3 py-1.5 text-sm text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume"
                data-hoverable
                className="px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors rounded-lg hover:bg-blue-500/10 flex items-center gap-1"
              >
                <span>Resume</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Cmd+K hint */}
              <button
                data-hoverable
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                  );
                }}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white/30 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Command size={12} />
                <span>K</span>
              </button>

              {/* Status */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="pulse-dot" />
                <span className="text-xs text-emerald-400 font-medium">Available</span>
              </div>

              {/* Mobile toggle */}
              <button
                className="md:hidden text-white/60 hover:text-white p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-hoverable
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24"
          >
            <nav className="flex flex-col items-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 text-lg text-white/70 hover:text-white transition-colors border-b border-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/resume"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 text-lg text-blue-400 hover:text-blue-300 font-medium transition-colors border-b border-white/5"
              >
                Resume Center
              </motion.a>
              <div className="flex items-center gap-2 mt-6 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="pulse-dot" />
                <span className="text-sm text-emerald-400 font-medium">
                  Available for Freelance
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
