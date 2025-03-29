import { Schema, model, models } from "mongoose";

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
    userphoneNumber: { type: String, required: true },
    useremail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Job = models.Job || model("Job", JobSchema);
export default Job;
