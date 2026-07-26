"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Briefcase,
  FolderOpen,
  Layers,
  Mail,
  Download,
  ArrowRight,
  Command,
  FileText,
} from "lucide-react";
import { navLinks } from "@/lib/data";

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const iconMap: Record<string, React.ReactNode> = {
    About: <User size={16} />,
    Experience: <Briefcase size={16} />,
    Projects: <FolderOpen size={16} />,
    Stack: <Layers size={16} />,
    Services: <Layers size={16} />,
    Contact: <Mail size={16} />,
  };

  const commands: CommandItem[] = [
    ...navLinks.map((link) => ({
      icon: iconMap[link.label] || <ArrowRight size={16} />,
      label: `Go to ${link.label}`,
      action: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    })),
    {
      icon: <FileText size={16} />,
      label: "View Resume Center",
      action: () => {
        window.location.href = "/resume";
        setOpen(false);
      },
    },
    {
      icon: <Download size={16} />,
      label: "Download Resume",
      shortcut: "⌘D",
      action: () => {
        window.open("/api/resume/download", "_blank");
        setOpen(false);
      },
    },
    {
      icon: <Mail size={16} />,
      label: "Send Email",
      action: () => {
        window.location.href = "mailto:rahullohra987@gmail.com";
        setOpen(false);
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selected]) {
      filtered[selected].action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="command-dialog"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search size={16} className="text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/30 outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] text-white/30 bg-white/5 rounded border border-white/10">
                ESC
              </kbd>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-8">No results found.</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      selected === i
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white/80"
                    }`}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <span className="text-white/40">{cmd.icon}</span>
                    <span className="flex-1 text-left">{cmd.label}</span>
                    {cmd.shortcut && (
                      <kbd className="text-[10px] text-white/20 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </button>
                ))
              )}
            </div>
            <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-[10px] text-white/20">
              <span className="flex items-center gap-1">
                <Command size={10} /> K to toggle
              </span>
              <span>↑↓ navigate</span>
              <span>↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
