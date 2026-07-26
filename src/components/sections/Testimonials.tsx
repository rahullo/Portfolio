"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-28" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="section-label">
            <Quote size={12} /> Testimonials
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-16 text-center"
        >
          What people{" "}
          <span className="gradient-text">say.</span>
        </motion.h2>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 sm:p-12 text-center min-h-[250px] flex flex-col items-center justify-center">
            <Quote size={32} className="text-blue-400/20 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8 max-w-2xl italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white/80 font-medium">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-white/30">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() =>
                setCurrent((prev) =>
                  (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-2 text-white/20 hover:text-white/60 hover:bg-white/5 rounded-lg transition-colors"
              data-hoverable
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-blue-400 w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  data-hoverable
                />
              ))}
            </div>
            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % testimonials.length)
              }
              className="p-2 text-white/20 hover:text-white/60 hover:bg-white/5 rounded-lg transition-colors"
              data-hoverable
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
