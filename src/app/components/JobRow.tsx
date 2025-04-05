"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { jobModel } from "../../../server/models/jobModel";
import TimeAgo from "react-timeago";
import Link from "next/link";
const JobRow = ({ jobDoc }: { jobDoc: jobModel }) => {
  // alert(JSON.stringify(jobDoc));
  return (
    <div className="bg-white p-6 rounded-md shadow-sm flex gap-2 justify-between items-center relative ">
      <div className="absolute cursor-pointer top-4 right-4">
        <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
      </div>

      <div>
        <img src={jobDoc.jobIcon} alt="logo" className="size-12" />
      </div>
      <div className="grow">
        <div className="text-gray-700 text-sm capitalize">{jobDoc.orgName}</div>
        <div className="font-bold text-lg">{jobDoc.Jobtitle}</div>
        <div className="text-gray-400 text-sm capitalize">
          {jobDoc.remote} &middot; {jobDoc.city}, {jobDoc.country} &middot;
          {jobDoc.type} &middot;
          {jobDoc.isAdmin && (
            <>
              <Link href={"/jobs/edit/" + jobDoc._id}>Edit</Link> &middot;{" "}
              <button
                type="button"
                // onClick={async () => {
                //   await axios.delete("/api/jobs?id=" + jobDoc._id);
                //   window.location.reload();
                // }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-gray-700 text-sm ">
        <TimeAgo date={jobDoc.createdAt} />
      </div>
    </div>
  );
};

export default JobRow;
