"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronRight,
  Cpu,
  X,
  Layers,
  AlertTriangle,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { projects } from "@/lib/data";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

type Project = (typeof projects)[number];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9997] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-card p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
              {project.category}
            </span>
            <h3
              className="text-2xl sm:text-3xl font-bold text-white mt-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            data-hoverable
          >
            <X size={20} />
          </button>
        </div>

        {/* Problem */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">
            <AlertTriangle size={14} className="text-amber-400" /> Problem
          </h4>
          <p className="text-sm text-white/50 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">
            <Lightbulb size={14} className="text-emerald-400" /> Solution
          </h4>
          <p className="text-sm text-white/50 leading-relaxed">
            {project.solution}
          </p>
        </div>

        {/* Architecture */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">
            <Layers size={14} className="text-blue-400" /> Architecture
          </h4>
          <p className="text-sm text-white/50 leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Challenges */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">
            <AlertTriangle size={14} className="text-purple-400" /> Challenges
          </h4>
          <p className="text-sm text-white/50 leading-relaxed">
            {project.challenges}
          </p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
            <Cpu size={14} className="text-cyan-400" /> Key Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white/40 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.04]"
              >
                <ChevronRight
                  size={12}
                  className="text-blue-400/60 mt-0.5 shrink-0"
                />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
            <BarChart3 size={14} className="text-emerald-400" /> Performance
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs text-white/40 bg-white/5 border border-white/[0.06] rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
            data-hoverable
          >
            <GithubIcon size={14} /> Source Code
          </a>
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
              data-hoverable
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section id="projects" className="relative py-28" ref={ref}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="section-label">
              <Cpu size={12} /> Projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6"
          >
            Products I&apos;ve{" "}
            <span className="gradient-text">engineered.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/40 max-w-xl mb-10"
          >
            Each project is a case study in building production-grade systems
            that solve real-world problems at scale.
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-hoverable
                className={`px-4 py-2 text-sm rounded-lg border transition-all duration-300 ${
                  filter === cat
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-transparent border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="glass-card p-6 sm:p-8 group cursor-pointer"
                onClick={() => setActiveProject(project)}
                data-hoverable
              >
                {/* Category Badge */}
                <span className="inline-block text-xs text-blue-400/80 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg mb-4">
                  {project.category}
                </span>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed mb-6">
                  {project.shortDesc}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.metrics.map((m, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 text-xs text-emerald-400/70 bg-emerald-500/10 border border-emerald-500/15 rounded-lg"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] text-white/30 bg-white/[0.03] border border-white/[0.05] rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="px-2 py-0.5 text-[11px] text-white/20">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>

                {/* View CTA */}
                <div className="flex items-center gap-2 text-sm text-white/30 group-hover:text-blue-400 transition-colors">
                  View Case Study{" "}
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
