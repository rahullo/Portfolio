"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { education } from "@/lib/data";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label">About</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6"
        >
          Building products,{" "}
          <span className="gradient-text">not just code.</span>
        </motion.h2>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-lg text-white/50 leading-relaxed mb-4">
            I enjoy building AI-powered products that combine machine learning,
            scalable backend systems, and exceptional user experiences. From
            deploying NLP pipelines that process thousands of documents to
            engineering privacy-preserving federated learning systems for
            healthcare—I focus on shipping products that solve real problems.
          </p>
          <p className="text-lg text-white/50 leading-relaxed">
            My work sits at the intersection of AI research and product
            engineering. I've architected production systems at India's national
            cybersecurity agency, built decentralized ML frameworks, and
            developed intelligent document processing platforms—always with a
            focus on security, scalability, and impact.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="section-heading text-xl text-white mb-8 flex items-center gap-3"
        >
          <GraduationCap size={20} className="text-blue-400" />
          Education
        </motion.h3>

        <div className="relative pl-10">
          <div className="timeline-line" />

          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              <div className="timeline-dot" style={{ top: "6px" }} />
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-white font-semibold text-base">
                      {edu.degree}
                    </h4>
                    <p className="text-blue-400/80 text-sm font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-white/30">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {edu.location}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {edu.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-white/40 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/50 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
