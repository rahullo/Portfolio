import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "resumes.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "resumes");

export interface ResumeEntry {
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

interface ResumeDB {
  resumes: ResumeEntry[];
}

function readDB(): ResumeDB {
  if (!fs.existsSync(DATA_PATH)) {
    const initial: ResumeDB = { resumes: [] };
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as ResumeDB;
}

function writeDB(db: ResumeDB): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2));
}

export function getActiveResume(): ResumeEntry | null {
  const db = readDB();
  return db.resumes.find((r) => r.isActive) || null;
}

export function getAllResumes(): ResumeEntry[] {
  const db = readDB();
  return db.resumes.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

export function getResumeById(id: string): ResumeEntry | null {
  const db = readDB();
  return db.resumes.find((r) => r.id === id) || null;
}

export function addResume(entry: ResumeEntry): void {
  const db = readDB();
  // Deactivate all existing
  db.resumes.forEach((r) => (r.isActive = false));
  db.resumes.push(entry);
  writeDB(db);
}

export function activateResume(id: string): boolean {
  const db = readDB();
  const target = db.resumes.find((r) => r.id === id);
  if (!target) return false;
  db.resumes.forEach((r) => (r.isActive = false));
  target.isActive = true;
  writeDB(db);
  return true;
}

export function deleteResume(id: string): boolean {
  const db = readDB();
  const idx = db.resumes.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  const entry = db.resumes[idx];
  // Delete physical file
  const filePath = path.join(UPLOAD_DIR, entry.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  db.resumes.splice(idx, 1);
  // If deleted was active, activate newest remaining
  if (entry.isActive && db.resumes.length > 0) {
    db.resumes.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    db.resumes[0].isActive = true;
  }
  writeDB(db);
  return true;
}

export function incrementDownloads(id: string): void {
  const db = readDB();
  const entry = db.resumes.find((r) => r.id === id);
  if (entry) {
    entry.downloads += 1;
    try {
      writeDB(db);
    } catch (err) {
      console.warn("Could not save download analytics to disk (normal in Vercel):", err);
    }
  }
}

export function incrementViews(id: string): void {
  const db = readDB();
  const entry = db.resumes.find((r) => r.id === id);
  if (entry) {
    entry.views += 1;
    try {
      writeDB(db);
    } catch (err) {
      console.warn("Could not save view analytics to disk (normal in Vercel):", err);
    }
  }
}

export function getNextVersion(): string {
  const db = readDB();
  if (db.resumes.length === 0) return "1.0";
  const versions = db.resumes.map((r) => parseFloat(r.version) || 0);
  const max = Math.max(...versions);
  return (max + 1).toFixed(1);
}

export function saveResumeFile(buffer: Buffer, filename: string): string {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  const filePath = path.join(UPLOAD_DIR, filename);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/resumes/${filename}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
