import React from "react";
import JobRow from "./JobRow";

const Jobs = () => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-xl">
        <div className="container mx-auto">
          <h2 className="font-bold">Recent Jobs</h2>
          <div className="flex flex-col gap-2">
            <JobRow />
            <JobRow />
            <JobRow />
            <JobRow />
            <JobRow />
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
