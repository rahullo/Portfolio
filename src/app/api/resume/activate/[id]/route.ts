import { NextRequest, NextResponse } from "next/server";
import { activateResume } from "@/lib/resumeStore";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get("x-admin-token");
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const success = activateResume(id);
  if (!success) {
    return NextResponse.json(
      { error: "Resume not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Resume activated" });
}
