import { NextResponse } from "next/server";
import { getAllResumes } from "@/lib/resumeStore";

export async function GET() {
  const resumes = getAllResumes();
  return NextResponse.json({ resumes });
}
