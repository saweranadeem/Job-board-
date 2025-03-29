import React from "react";
import { WorkOS } from "@workos-inc/node";
import { withAuth } from "@workos-inc/authkit-nextjs";
import JobForm from "@/app/components/JobForm";
type PageProps = {
  params: {
    orgId: string;
  };
};
const page = async (props: PageProps) => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await withAuth();
  if (!user) {
    return "Please log in";
  }
  const orgId = props.params.orgId;
  //   console.log(orgId);
  //   JSON.stringify(orgId);
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return "no access";
  }

  return (
    <div>
      <JobForm orgId={orgId} />
    </div>
  );
};

export default page;
