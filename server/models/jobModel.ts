import { Schema, model, models } from "mongoose";
import {
  AutoPaginatable,
  OrganizationMembership,
  User,
  WorkOS,
} from "@workos-inc/node";
import mongoose from "mongoose";
export type jobModel = {
  _id: string;
  Jobtitle: string;
  remote: string;
  type: string;
  salary: string;
  country: string;
  state: string;
  city: string;
  countryId: string;
  stateId: string;
  cityId: string;
  jobIcon: string;
  UserPhoto: string;
  userName: string;
  orgId: string;
  userphoneNumber: string;
  useremail: string;
  orgName?: string;
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
};
const JobSchema = new Schema(
  {
    Jobtitle: { type: "String", required: true },
    remote: { type: "String", required: true },
    type: { type: "String", required: true },
    salary: { type: "String", required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    countryId: { type: String, required: true },
    stateId: { type: String, required: true },
    cityId: { type: String, required: true },
    jobIcon: { type: String },
    UserPhoto: { type: String },
    userName: { type: String, required: true },
    orgId: { type: String, required: true },
    userphoneNumber: { type: String, required: true },
    useremail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export async function addOrgAndUserData(
  jobsDocs: jobModel[],
  user: User | null
) {
  jobsDocs = JSON.parse(JSON.stringify(jobsDocs));
  await mongoose.connect(process.env.MONGO_URI as string);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  let oms: AutoPaginatable<OrganizationMembership> | null = null;
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user?.id,
    });
  }
  for (const job of jobsDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find((om) => om.organizationId === job.orgId);
    }
  }
  return jobsDocs;
}

export const Job = models.Job || model("Job", JobSchema);
