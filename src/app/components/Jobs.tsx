import React from "react";
import JobRow from "./JobRow";
import type { jobModel } from "../../../server/models/jobModel";

const Jobs = ({ header, jobs }: { header: string; jobs: jobModel[] }) => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-xl">
        <div className="container mx-auto">
          <h2 className="font-bold">{header}</h2>
          <div className="flex flex-col gap-4">
            {!jobs?.length && <div>No jobs found</div>}
            {jobs && jobs.map((job) => <JobRow key={job._id} jobDoc={job} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
