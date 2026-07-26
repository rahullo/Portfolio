"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Layers,
  Server,
  Rocket,
  MessageSquare,
  Zap,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/data";

const iconComponents: Record<string, React.ReactNode> = {
  Brain: <Brain size={24} />,
  Layers: <Layers size={24} />,
  Server: <Server size={24} />,
  Rocket: <Rocket size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Zap: <Zap size={24} />,
};

export default function FreelanceServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">
            <Rocket size={12} /> Services
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6"
        >
          How I can help you{" "}
          <span className="gradient-text">build.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/40 max-w-xl mb-14"
        >
          From zero-to-one MVPs to scaling AI systems in production—I partner
          with founders and teams to ship products that matter.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="glass-card p-6 group"
              data-hoverable
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.06] flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                {iconComponents[service.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {service.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors"
                data-hoverable
              >
                Get Started <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
