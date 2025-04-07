import JobForm from "@/app/components/JobForm";
import { Job } from "../../../../../server/models/jobModel";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import React from "react";
type PageProps = {
  params: {
    jobId: string;
  };
};
const page = async (pageProps: PageProps) => {
  const jobId = pageProps.params.jobId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobdoc = JSON.parse(JSON.stringify(await Job.findById(jobId)));
  if (!jobdoc) {
    return "job not found";
  }
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return "Not any User is Login";
  }
  const orgms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobdoc.orgId,
  });
  if (orgms.data.length === 0) {
    return "Access denied";
  }
  return (
    <div>
      {" "}
      <JobForm orgId={jobdoc.orgId} jobdoc={jobdoc} />{" "}
    </div>
  );
};

export default page;
