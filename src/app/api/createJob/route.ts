import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "../../../../server/models/jobModel"; // Adjust the import for your Job model
import connectDb from "../../../../server/config/db";
connectDb();
// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Get the file and check for their existence
    const jobIconFile = formData.get("jobIcon") as File | null;
    const userPhotoFile = formData.get("UserPhoto") as File | null;

    if (!jobIconFile || !userPhotoFile) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Check for file type and size (optional)
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (
      !allowedFileTypes.includes(jobIconFile.type) ||
      !allowedFileTypes.includes(userPhotoFile.type)
    ) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Convert files to buffers
    const jobIconBuffer = Buffer.from(await jobIconFile.arrayBuffer());
    const userPhotoBuffer = Buffer.from(await userPhotoFile.arrayBuffer());

    // Generate unique file paths
    const jobIconPath = path.join(
      uploadDir,
      `${Date.now()}-${jobIconFile.name}`
    );
    const userPhotoPath = path.join(
      uploadDir,
      `${Date.now()}-${userPhotoFile.name}`
    );

    // Save files to disk
    await fs.promises.writeFile(jobIconPath, jobIconBuffer);
    await fs.promises.writeFile(userPhotoPath, userPhotoBuffer);

    // Generate URLs for saved files
    const jobIconUrl = `/uploads/${path.basename(jobIconPath)}`;
    const userPhotoUrl = `/uploads/${path.basename(userPhotoPath)}`;

    // Collect the form data for the job posting
    const jobData = {
      Jobtitle: formData.get("Jobtitle") as string,
      remote: formData.get("remote") as string,
      type: formData.get("type") as string,
      salary: formData.get("salary") as string,
      orgId: formData.get("orgId") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      countryid: formData.get("countryid") as string,
      stateid: formData.get("stateid") as string,
      cityid: formData.get("cityid") as string,
      jobIcon: jobIconUrl, // Save the job icon URL
      UserPhoto: userPhotoUrl, // Save the user photo URL
      userName: formData.get("userName") as string,
      userphoneNumber: formData.get("userphoneNumber") as string,
      useremail: formData.get("useremail") as string,
      description: formData.get("description") as string,
    };

    // Save the job to MongoDB
    const newJob = new Job(jobData);
    await newJob.save();

    // Return success response
    return NextResponse.json(
      { message: "Job saved successfully!", job: newJob, orgId: newJob.orgId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
