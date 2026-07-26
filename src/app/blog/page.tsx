"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getBlogPosts();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Aurora Background */}
      <div className="aurora">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Back Link */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          data-hoverable
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </motion.a>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="section-label mb-4 inline-flex">
            <BookOpen size={12} /> Blog Section
          </span>
          <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-2">
            Engineering & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-white/40 max-w-lg">
            Thoughts on AI systems, scalable backend architectures, and machine learning.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
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

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass-card p-6 block group"
              data-hoverable
            >
              <div className="flex flex-wrap gap-3 items-center mb-3">
                <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-lg">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <Calendar size={12} /> {post.date}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <Clock size={12} /> {post.readingTime}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                {post.title}
              </h2>

              <p className="text-sm text-white/40 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-blue-400 transition-colors">
                Read Article <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
