import { NextRequest, NextResponse } from "next/server";
import {
  addResume,
  getNextVersion,
  saveResumeFile,
  type ResumeEntry,
} from "@/lib/resumeStore";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";

export async function POST(request: NextRequest) {
  // Auth check
  const token = request.headers.get("x-admin-token");
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const notes = (formData.get("notes") as string) || "";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10 MB limit" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const version = getNextVersion();
    const timestamp = Date.now();
    const safeFilename = `resume_v${version.replace(".", "_")}_${timestamp}.pdf`;

    const publicUrl = saveResumeFile(buffer, safeFilename);

    const entry: ResumeEntry = {
      id: `resume_v${version.replace(".", "_")}_${timestamp}`,
      filename: safeFilename,
      originalFilename: file.name,
      publicUrl,
      uploadedAt: new Date().toISOString(),
      version,
      fileSize: file.size,
      pages: 1, // placeholder — updated client-side
      isActive: true,
      downloads: 0,
      views: 0,
      notes,
    };

    addResume(entry);

    return NextResponse.json({ resume: entry }, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
