"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Workflow } from "lucide-react";
import { processSteps } from "@/lib/data";

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">
            <Workflow size={12} /> Process
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-16"
        >
          How I{" "}
          <span className="gradient-text">deliver.</span>
        </motion.h2>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="glass-card p-6 relative overflow-hidden group"
              data-hoverable
            >
              {/* Step Number */}
              <span className="absolute top-4 right-4 text-5xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                {step.step}
              </span>

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.06] flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-blue-400" style={{ fontFamily: "var(--font-heading)" }}>
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
