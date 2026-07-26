import { NextResponse } from "next/server";
import { getActiveResume, incrementDownloads } from "@/lib/resumeStore";
import fs from "fs";
import path from "path";

export async function GET() {
  const resume = getActiveResume();
  if (!resume) {
    return new NextResponse("No active resume found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "resumes",
    resume.filename
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Resume file not found", { status: 404 });
  }

  incrementDownloads(resume.id);

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${resume.originalFilename}"`,
      "Content-Length": String(fileBuffer.length),
    },
  });
}
