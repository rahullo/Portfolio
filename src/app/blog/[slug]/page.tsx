"use client";

import { use, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/blog";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getBlogPostBySlug(slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center">
        <div className="glass-card p-12 max-w-sm">
          <BookOpen size={36} className="text-white/20 mx-auto mb-4" />
          <h2 className="text-lg text-white/80 font-bold mb-2">Article Not Found</h2>
          <p className="text-xs text-white/40 mb-6">
            The requested article does not exist or has been removed.
          </p>
          <a href="/blog" className="btn-primary w-full justify-center">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative pb-20">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Aurora Background */}
      <div className="aurora">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24">
        {/* Back Link */}
        <motion.a
          href="/blog"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          data-hoverable
        >
          <ArrowLeft size={14} /> Back to Blog
        </motion.a>

        {/* Article Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-lg">
              {post.category}
            </span>
            <span className="text-xs text-white/30 flex items-center gap-1">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="text-xs text-white/30 flex items-center gap-1">
              <Clock size={12} /> {post.readingTime}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {post.title}
          </h1>

          <div className="h-px bg-white/10 w-full" />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none text-white/70 leading-relaxed text-sm sm:text-base space-y-6"
        >
          {post.content.split("\n\n").map((para, i) => {
            const trimmed = para.trim();
            if (!trimmed) return null;

            // Handle Headings
            if (trimmed.startsWith("##")) {
              return (
                <h3
                  key={i}
                  className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {trimmed.replace("##", "").trim()}
                </h3>
              );
            }
            if (trimmed.startsWith("#")) {
              return null; // Ignore main header since it's in the H1 tag
            }

            // Handle Lists
            if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
              return (
                <ul key={i} className="list-disc pl-5 space-y-2 text-white/60">
                  {trimmed
                    .split("\n")
                    .map((item, idx) => (
                      <li key={idx}>{item.replace(/^[*-\s]+/, "").trim()}</li>
                    ))}
                </ul>
              );
            }

            // Handle Code blocks
            if (trimmed.startsWith("```")) {
              return (
                <pre
                  key={i}
                  className="bg-white/[0.02] border border-white/10 rounded-xl p-4 font-mono text-xs overflow-x-auto text-white/80"
                >
                  <code>
                    {trimmed.replace(/```[a-z]*/g, "").trim()}
                  </code>
                </pre>
              );
            }

            return <p key={i}>{trimmed}</p>;
          })}
        </motion.article>
      </div>
    </div>
  );
}
