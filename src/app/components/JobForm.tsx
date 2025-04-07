"use client";
import React, { useState } from "react";
import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { jobModel } from "../../../server/models/jobModel";
import { saveJobAction } from "../actions/editJob";

const JobForm = ({ orgId, jobdoc }: { orgId: string; jobdoc?: jobModel }) => {
  const router = useRouter();
  const [countryid, setCountryid] = useState<number>(
    parseInt(jobdoc?.countryid || "") || 0
  );
  const [stateid, setstateid] = useState<number>(
    parseInt(jobdoc?.stateid || "") || 0
  );
  const [cityid, setcityid] = useState<number>(
    parseInt(jobdoc?.cityid || "") || 0
  );

  const [country, setCountry] = useState<string>(jobdoc?.country || "");
  const [state, setstate] = useState<string>(jobdoc?.state || "");
  const [city, setcity] = useState<string>(jobdoc?.city || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add location fields
    formData.set("countryid", countryid.toString());
    formData.set("stateid", stateid.toString());
    formData.set("cityid", cityid.toString());
    formData.set("country", country);
    formData.set("state", state);
    formData.set("city", city);
    formData.set("orgId", orgId);

    // Extract ID if exists (to detect update vs create)
    const id = formData.get("id");

    try {
      setLoading(true);

      if (id) {
        // 🔄 Update existing job
        const updatedDoc = await saveJobAction(formData);
        router.push(`/jobs/${updatedDoc?.orgId}`);
      } else {
        // 🆕 Create new job via API (usually used when uploading files)
        const response = await axios.post("/api/createJob", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        router.push(`/jobs/${response.data.orgId}`);
      }
    } catch (error: any) {
      console.error("Error saving job:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        {/* {JSON.stringify(jobdoc)} */}
        <Theme>
          <form onSubmit={handleSave}>
            {jobdoc && <input type="hidden" name="id" value={jobdoc?._id} />}
            <TextField.Root
              name="Jobtitle"
              placeholder="Job Title"
              className="mb-7"
              defaultValue={jobdoc?.Jobtitle}
              required
            />
            <div className="grid sm:grid-cols-3 gap-6 *:grow mb-7">
              <div>
                Remote ?
                <RadioGroup.Root
                  defaultValue={jobdoc?.remote || "hybrid"}
                  name="remote"
                >
                  <RadioGroup.Item value="on-site">on-site</RadioGroup.Item>
                  <RadioGroup.Item value="hybrid">Hybrid</RadioGroup.Item>
                  <RadioGroup.Item value="fully">Fully-Remote</RadioGroup.Item>
                </RadioGroup.Root>
              </div>
              <div>
                Full Time ?
                <RadioGroup.Root
                  defaultValue={jobdoc?.type || "part-time"}
                  name="type"
                >
                  <RadioGroup.Item value="project">Project</RadioGroup.Item>
                  <RadioGroup.Item value="part-time">Part-time</RadioGroup.Item>
                  <RadioGroup.Item value="full-time">Full-time</RadioGroup.Item>
                </RadioGroup.Root>
              </div>
              <div className="content-center">
                Salary
                <TextField.Root
                  name="salary"
                  defaultValue={jobdoc?.salary}
                  required
                >
                  <TextField.Slot>$</TextField.Slot>
                  <TextField.Slot>k/year</TextField.Slot>
                </TextField.Root>
              </div>
            </div>

            <div className="mb-7">
              Location
              <div className="flex flex-col sm:flex-row gap-4 *:grow">
                <CountrySelect
                  defaultValue={
                    countryid ? { id: countryid, name: country } : 0
                  }
                  onChange={(e: any) => {
                    setCountryid(e.id);
                    setCountry(e.name);
                  }}
                  placeHolder="Select Country"
                />

                <StateSelect
                  defaultValue={stateid ? { id: stateid, name: state } : 0}
                  countryid={countryid}
                  onChange={(e: any) => {
                    setstateid(e.id);
                    setstate(e.name);
                  }}
                  placeHolder="Select State"
                />

                <CitySelect
                  defaultValue={cityid ? { id: cityid, name: city } : 0}
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e: any) => {
                    setcityid(e.id);
                    setcity(e.name);
                  }}
                  placeHolder="Select City"
                />
              </div>
            </div>

            <div className="sm:flex mb-7">
              <div className="w-1/3">
                <h3>Job icon</h3>
                <ImageUpload
                  name="jobIcon"
                  icon={faStar}
                  defaultValue={jobdoc?.jobIcon || ""}
                />
              </div>
              <div className="grow">
                <h3>Contact person</h3>
                <div className="flex gap-2">
                  <ImageUpload
                    name="UserPhoto"
                    defaultValue={jobdoc?.UserPhoto || ""}
                    icon={faUser}
                  />
                  <div className="grow flex flex-col gap-1">
                    <TextField.Root
                      placeholder="XYZ"
                      name="userName"
                      defaultValue={jobdoc?.userName || ""}
                      required
                    >
                      <TextField.Slot>
                        <FontAwesomeIcon icon={faUser} />
                      </TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                      placeholder="Phone"
                      type="tel"
                      name="userphoneNumber"
                      defaultValue={jobdoc?.userphoneNumber || ""}
                      required
                    >
                      <TextField.Slot>
                        <FontAwesomeIcon icon={faPhone} />
                      </TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                      placeholder="Email"
                      type="email"
                      name="useremail"
                      defaultValue={jobdoc?.useremail || ""}
                      required
                    >
                      <TextField.Slot>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </TextField.Slot>
                    </TextField.Root>
                  </div>
                </div>
              </div>
            </div>

            <TextArea
              placeholder="Job description"
              name="description"
              resize="vertical"
              defaultValue={jobdoc?.description || ""}
              required
            />

            {error && <p className="text-red-500 mt-3">{error}</p>}

            <div className="mt-3 flex justify-center">
              <Button type="submit" disabled={loading}>
                <span className="px-8">{loading ? "Saving..." : "Save"}</span>
              </Button>
            </div>
          </form>
        </Theme>
      </div>
    </>
  );
};

export default JobForm;
