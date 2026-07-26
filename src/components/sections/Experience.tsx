"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">
            <Briefcase size={12} /> Experience
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-16"
        >
          Where I&apos;ve shipped{" "}
          <span className="gradient-text">production systems.</span>
        </motion.h2>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-blue-400 font-medium text-sm">
                    {exp.company}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">
                    {exp.companyDesc}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-3 mb-6">
                {exp.highlights.map((highlight, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + j * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={14} className="text-emerald-400/60 mt-1 shrink-0" />
                    <p className="text-sm text-white/50 leading-relaxed">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs text-white/40 bg-white/5 border border-white/[0.06] rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
