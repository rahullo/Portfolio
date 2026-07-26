"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Download,
  ZoomIn,
  ZoomOut,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Copy,
  Printer,
  FileText,
  Calendar,
  HardDrive,
  Eye,
  ArrowDownToLine,
  Share2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { showToast } from "@/components/Toast";

const ResumeViewer = dynamic(() => import("@/components/ResumeViewer"), {
  ssr: false,
  loading: () => (
    <div className="glass-card rounded-t-none overflow-auto min-h-[600px] max-h-[80vh] flex items-center justify-center p-4 bg-[rgba(10,10,10,0.6)]">
      <Loader2 size={32} className="text-white/20 animate-spin" />
    </div>
  ),
});

interface ResumeMeta {
  id: string;
  filename: string;
  originalFilename: string;
  publicUrl: string;
  uploadedAt: string;
  version: string;
  fileSize: number;
  pages: number;
  isActive: boolean;
  downloads: number;
  views: number;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResumePage() {
  const [meta, setMeta] = useState<ResumeMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((r) => r.json())
      .then((data) => {
        if (data.resume) setMeta(data.resume);
      })
      .catch(() => showToast("Failed to load resume", "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async () => {
    try {
      const res = await fetch("/api/resume/download");
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = meta?.originalFilename || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Resume downloaded successfully");
    } catch {
      showToast("Download failed", "error");
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/resume`;
    navigator.clipboard.writeText(url);
    showToast("Resume link copied to clipboard");
  };

  const handlePrint = () => {
    if (!meta) return;
    const printWindow = window.open(meta.publicUrl, "_blank");
    printWindow?.addEventListener("load", () => printWindow.print());
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/resume`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rahul Lohra — Resume",
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleFullscreen = () => {
    containerRef.current?.requestFullscreen?.();
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  const scrollToPage = (pageNumber: number) => {
    const el = document.getElementById(`page-${pageNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prevPage = () => {
    const prevP = Math.max(currentPage - 1, 1);
    setCurrentPage(prevP);
    scrollToPage(prevP);
  };

  const nextPage = () => {
    const nextP = Math.min(currentPage + 1, numPages);
    setCurrentPage(nextP);
    scrollToPage(nextP);
  };

  // Metadata items
  const metaItems = meta
    ? [
        { icon: <FileText size={14} />, label: "Version", value: `v${meta.version}` },
        { icon: <Calendar size={14} />, label: "Updated", value: formatDate(meta.uploadedAt) },
        { icon: <HardDrive size={14} />, label: "Size", value: formatFileSize(meta.fileSize) },
        { icon: <FileText size={14} />, label: "Pages", value: String(numPages || meta.pages) },
        { icon: <Eye size={14} />, label: "Views", value: String(meta.views) },
        { icon: <ArrowDownToLine size={14} />, label: "Downloads", value: String(meta.downloads) },
      ]
    : [];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Aurora */}
      <div className="aurora">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Back */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          data-hoverable
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </motion.a>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="section-label mb-4 inline-flex">
            <FileText size={12} /> Resume Center
          </span>
          <h1
            className="section-heading text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-2"
          >
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-white/40 max-w-lg">
            Preview, download, or share the latest version of my resume.
          </p>
        </motion.div>

        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 glass-card p-8 min-h-[600px] flex items-center justify-center">
              <Loader2 size={32} className="text-white/20 animate-spin" />
            </div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-4 animate-pulse">
                  <div className="h-3 w-20 bg-white/5 rounded mb-2" />
                  <div className="h-5 w-16 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : !meta ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-16 text-center"
          >
            <FileText size={48} className="text-white/10 mx-auto mb-4" />
            <h3 className="text-lg text-white/60 mb-2 section-heading">
              No resume uploaded yet
            </h3>
            <p className="text-sm text-white/30">
              Upload your first resume from the admin dashboard.
            </p>
          </motion.div>
        ) : (
          /* Main Content */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* PDF Viewer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              {/* Toolbar */}
              <div className="glass-card rounded-b-none border-b-0 p-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={zoomOut}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    data-hoverable
                    title="Zoom Out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-xs text-white/40 tabular-nums w-12 text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    data-hoverable
                    title="Zoom In"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <div className="w-px h-5 bg-white/10 mx-1" />
                  <button
                    onClick={() => setScale(1.4)}
                    className="px-2 py-1 text-xs text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    data-hoverable
                  >
                    Fit
                  </button>
                </div>

                {/* Page nav */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-20"
                    data-hoverable
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs text-white/40 tabular-nums">
                    {currentPage} / {numPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage >= numPages}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-20"
                    data-hoverable
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrint}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    data-hoverable
                    title="Print"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    data-hoverable
                    title="Fullscreen"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Container (Dynamically Loaded without SSR) */}
              <ResumeViewer
                file={meta.publicUrl}
                numPages={numPages}
                scale={scale}
                onLoadSuccess={setNumPages}
                onPageInView={setCurrentPage}
                containerRef={containerRef}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Metadata */}
              {metaItems.map((item, i) => (
                <div key={i} className="glass-card p-4">
                  <div className="flex items-center gap-2 text-white/30 text-xs mb-1">
                    {item.icon} {item.label}
                  </div>
                  <p className="text-white/80 font-semibold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.value}
                  </p>
                </div>
              ))}

              {/* Recently Updated badge */}
              {meta && new Date().getTime() - new Date(meta.uploadedAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                <div className="glass-card p-3 border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-xs text-emerald-400 font-medium">
                    ✨ Recently Updated
                  </span>
                </div>
              )}

              {/* Actions */}
              <button
                onClick={handleDownload}
                className="btn-primary w-full justify-center"
                data-hoverable
              >
                <Download size={16} /> Download PDF
              </button>

              <button
                onClick={handleCopyLink}
                className="btn-secondary w-full justify-center"
                data-hoverable
              >
                <Copy size={16} /> Copy Link
              </button>

              <button
                onClick={handleShare}
                className="btn-secondary w-full justify-center"
                data-hoverable
              >
                <Share2 size={16} /> Share Resume
              </button>

              <button
                onClick={handlePrint}
                className="btn-secondary w-full justify-center"
                data-hoverable
              >
                <Printer size={16} /> Print
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
