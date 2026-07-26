"use client";

import { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Loader2, FileText } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeViewerProps {
  file: string;
  numPages: number;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onPageInView: (pageNumber: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumeViewer({
  file,
  numPages,
  scale,
  onLoadSuccess,
  onPageInView,
  containerRef,
}: ResumeViewerProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || numPages === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageId = entry.target.id;
            const pageNum = parseInt(pageId.replace("page-", ""), 10);
            if (!isNaN(pageNum)) {
              onPageInView(pageNum);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.3, // Trigger when 30% of page is visible
      }
    );

    // Dynamic selection of all rendered pages
    const pageElements = container.querySelectorAll("[id^='page-']");
    pageElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [numPages, onPageInView, containerRef]);

  return (
    <div
      ref={containerRef}
      className="glass-card rounded-t-none overflow-auto min-h-[600px] max-h-[80vh] flex flex-col items-center p-6 bg-[rgba(10,10,10,0.6)] w-full gap-6 scroll-smooth"
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => onLoadSuccess(numPages || 0)}
        loading={
          <div className="flex items-center justify-center min-h-[500px]">
            <Loader2 size={32} className="text-white/20 animate-spin" />
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center min-h-[500px] text-white/30">
            <FileText size={40} className="mb-3" />
            <p>Failed to load PDF</p>
          </div>
        }
        className="flex flex-col items-center w-full"
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div
            key={i + 1}
            id={`page-${i + 1}`}
            className="shadow-2xl border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/10"
          >
            <Page
              pageNumber={i + 1}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
