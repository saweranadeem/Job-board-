import React from "react";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
} from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import { Job } from "../../server/models/jobModel";

const Home = async () => {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  // ✅ Connect to DB and fetch jobs
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobs = await Job.find().lean();

  return (
    <div>
      <Hero />
      <Jobs header="Latest Jobs" jobs={JSON.parse(JSON.stringify(jobs))} />
    </div>
  );
};

export default Home;
