import { WorkOS } from "@workos-inc/node";
import React from "react";
import { addOrgAndUserData, Job } from "../../../../server/models/jobModel";
import { withAuth } from "@workos-inc/authkit-nextjs";
import Jobs from "@/app/components/Jobs";
type PageProps = {
  params: {
    orgId: string;
  };
};
// alert(JSON.stringify(org));

const Page = async ({ params }: PageProps) => {
  const { user } = await withAuth();
  const { orgId } = params;
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(orgId);
  // console.log(org);
  let jobsDocs = JSON.parse(JSON.stringify(await Job.find({ orgId: org.id })));
  // console.log(jobsDocs);
  jobsDocs = await addOrgAndUserData(jobsDocs, user);
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-xl my-6">{org.name} Jobs</h1>
      </div>
      <Jobs jobs={jobsDocs} header={"Jobs posted by "+ org.name} />
    </div>
  );
};

export default Page;
