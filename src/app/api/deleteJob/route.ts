import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Job } from "../../../../server/models/jobModel"; // adjust path if needed

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  await mongoose.connect(process.env.MONGO_URI!);

  const deleted = await Job.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
}
