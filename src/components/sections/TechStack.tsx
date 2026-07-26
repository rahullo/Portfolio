"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2 } from "lucide-react";
import { techStack } from "@/lib/data";

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(Object.keys(techStack)[0]);

  const categories = Object.keys(techStack);

  return (
    <section id="stack" className="relative py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">
            <Code2 size={12} /> Tech Stack
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-16"
        >
          Tools I use to{" "}
          <span className="gradient-text">ship fast.</span>
        </motion.h2>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-hoverable
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-transparent border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack[activeCategory as keyof typeof techStack]?.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="glass-card p-5 group"
              data-hoverable
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/80 font-medium">
                  {skill.name}
                </span>
                <span className="text-xs text-white/30 tabular-nums">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #3b82f6, #a78bfa)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
