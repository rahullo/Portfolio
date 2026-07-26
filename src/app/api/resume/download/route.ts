import { NextResponse } from "next/server";
import { getActiveResume, incrementDownloads } from "@/lib/resumeStore";
import fs from "fs";
import path from "path";

export async function GET() {
  const resume = getActiveResume();
  if (!resume) {
    return NextResponse.json(
      { error: "No active resume found" },
      { status: 404 }
    );
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "resumes",
    resume.filename
  );

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Resume file not found" },
      { status: 404 }
    );
  }

  incrementDownloads(resume.id);

  const fileBuffer = fs.readFileSync(filePath);
  const downloadName = resume.originalFilename || resume.filename;

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Content-Length": String(fileBuffer.length),
    },
  });
}
