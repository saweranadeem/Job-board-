'use server';
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { Job } from "../../../server/models/jobModel";

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);

  const entries = Object.fromEntries(formData.entries());

  // Manually extract ID
  const { id, ...rest } = entries;

  // Convert File objects to null or skip
  const jobData: Record<string, any> = {};
  for (const key in rest) {
    const value = rest[key];
    if (value instanceof File) {
      if (value.size > 0) {
        // You can either reject, or extract URL if uploaded already
        throw new Error(`File upload not supported directly in this action: ${key}`);
      }
      continue; // Skip empty File
    }
    jobData[key] = value;
  }

  const jobDoc = id
    ? await Job.findByIdAndUpdate(id, jobData, { new: true })
    : await Job.create(jobData);

  if ('orgId' in jobData) {
    revalidatePath('/jobs/' + jobData?.orgId);
  }

  return JSON.parse(JSON.stringify(jobDoc));
}
