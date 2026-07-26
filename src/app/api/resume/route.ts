import { NextResponse } from "next/server";
import { getActiveResume, incrementViews } from "@/lib/resumeStore";

export async function GET() {
  const resume = getActiveResume();
  if (!resume) {
    return NextResponse.json(
      { error: "No active resume found" },
      { status: 404 }
    );
  }
  incrementViews(resume.id);
  return NextResponse.json({ resume });
}
