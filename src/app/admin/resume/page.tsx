"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Trash2,
  CheckCircle,
  Eye,
  Download,
  FileText,
  Shield,
  Lock,
  Loader2,
  ArrowLeft,
  RotateCcw,
  X,
} from "lucide-react";
import { showToast } from "@/components/Toast";

interface ResumeEntry {
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
  notes: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminResumePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [resumes, setResumes] = useState<ResumeEntry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch("/api/resume/all");
      const data = await res.json();
      setResumes(data.resumes || []);
    } catch {
      showToast("Failed to load resumes", "error");
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchResumes();
  }, [authenticated, fetchResumes]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminToken(passcode);
    setAuthenticated(true);
    showToast("Admin access granted", "success");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      showToast("Only PDF files are allowed", "error");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      showToast("File size exceeds 10 MB", "error");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("notes", notes);

      const res = await fetch("/api/resume/upload", {
        method: "POST",
        headers: { "x-admin-token": adminToken },
        body: formData,
      });

      clearInterval(interval);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      setUploadProgress(100);
      showToast("Resume uploaded successfully!");
      setSelectedFile(null);
      setNotes("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchResumes();
    } catch (err) {
      clearInterval(interval);
      showToast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      const res = await fetch(`/api/resume/activate/${id}`, {
        method: "PATCH",
        headers: { "x-admin-token": adminToken },
      });
      if (!res.ok) throw new Error();
      showToast("Resume activated");
      await fetchResumes();
    } catch {
      showToast("Failed to activate", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resume version permanently?")) return;
    try {
      const res = await fetch(`/api/resume/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": adminToken },
      });
      if (!res.ok) throw new Error();
      showToast("Resume deleted");
      await fetchResumes();
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  // Auth Gate
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="aurora">
          <div className="aurora-blob aurora-blob-1" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="glass-card p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <Shield size={24} className="text-blue-400" />
            </div>
            <h2 className="section-heading text-xl text-white mb-2">
              Admin Access
            </h2>
            <p className="text-sm text-white/40 mb-6">
              Enter your admin passcode to manage resumes.
            </p>
            <form onSubmit={handleAuth}>
              <div className="relative mb-4">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Admin passcode"
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center"
                data-hoverable
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <div className="aurora">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16">
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
          className="mb-10"
        >
          <span className="section-label mb-4 inline-flex">
            <Shield size={12} /> Admin Dashboard
          </span>
          <h1 className="section-heading text-3xl sm:text-4xl text-white mt-4 mb-2">
            Resume <span className="gradient-text">Management</span>
          </h1>
          <p className="text-white/40">
            Upload, version, and manage your resume without code changes.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 sm:p-8 mb-8"
        >
          <h2 className="section-heading text-lg text-white mb-6 flex items-center gap-2">
            <Upload size={18} className="text-blue-400" /> Upload New Resume
          </h2>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 mb-6 ${
              dragOver
                ? "border-blue-400/50 bg-blue-500/5"
                : selectedFile
                ? "border-emerald-400/30 bg-emerald-500/5"
                : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
            }`}
            data-hoverable
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex items-center justify-center gap-3">
                <FileText size={24} className="text-emerald-400" />
                <div className="text-left">
                  <p className="text-sm text-white/80 font-medium">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-white/30">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="p-1 text-white/30 hover:text-white/60"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/40 mb-1">
                  Drag & drop your PDF here, or click to browse
                </p>
                <p className="text-xs text-white/20">PDF only · Max 10 MB</p>
              </>
            )}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
              Release Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Updated work experience section"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/90 placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Progress Bar */}
          <AnimatePresence>
            {uploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-white/30 mt-2 text-center">
                  {uploadProgress < 100 ? "Uploading..." : "Complete!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Button */}
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="btn-primary disabled:opacity-40"
              data-hoverable
            >
              {uploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={14} /> Publish Resume
                </>
              )}
            </button>
            {selectedFile && (
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setNotes("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="btn-secondary"
                data-hoverable
              >
                Cancel
              </button>
            )}
          </div>
        </motion.div>

        {/* Version History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 sm:p-8"
        >
          <h2 className="section-heading text-lg text-white mb-6 flex items-center gap-2">
            <RotateCcw size={18} className="text-purple-400" /> Version History
          </h2>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={40} className="text-white/10 mx-auto mb-3" />
              <p className="text-sm text-white/30">No resumes uploaded yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume, i) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex flex-wrap items-center gap-4 p-4 rounded-xl border transition-colors ${
                    resume.isActive
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Info */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-white/80 font-medium">
                        v{resume.version}
                      </span>
                      {resume.isActive && (
                        <span className="px-2 py-0.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase tracking-wider font-medium">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/30">
                      {resume.originalFilename} · {formatFileSize(resume.fileSize)} · {formatDate(resume.uploadedAt)}
                    </p>
                    {resume.notes && (
                      <p className="text-xs text-white/20 mt-1 italic">
                        {resume.notes}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-1" title="Views">
                      <Eye size={12} /> {resume.views}
                    </span>
                    <span className="flex items-center gap-1" title="Downloads">
                      <Download size={12} /> {resume.downloads}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <a
                      href={resume.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      data-hoverable
                      title="Preview"
                    >
                      <Eye size={14} />
                    </a>
                    <a
                      href={resume.publicUrl}
                      download={resume.originalFilename}
                      className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      data-hoverable
                      title="Download"
                    >
                      <Download size={14} />
                    </a>
                    {!resume.isActive && (
                      <button
                        onClick={() => handleActivate(resume.id)}
                        className="p-2 text-white/30 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                        data-hoverable
                        title="Activate"
                      >
                        <CheckCircle size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      data-hoverable
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
