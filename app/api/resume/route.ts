import { access } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

async function hasResume() {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");

  try {
    await access(resumePath);
    return true;
  } catch {
    return false;
  }
}

export async function HEAD() {
  return new NextResponse(null, { status: (await hasResume()) ? 200 : 404 });
}
