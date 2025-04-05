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

import { useRouter } from "next/navigation";
const JobForm = ({ orgId }: { orgId: string }) => {
  // alert(JSON.stringify(orgId));
  const router = useRouter();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [cityid, setcityid] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error message

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const jobIconFile = formData.get("jobIcon");
    const userPhotoFile = formData.get("UserPhoto");

    // Check if files are attached
    if (!jobIconFile || !userPhotoFile) {
      alert("Please upload both job icon and user photo.");
      return;
    }

    formData.set("countryId", countryid.toString());
    formData.set("stateId", stateid.toString());
    formData.set("cityId", cityid.toString());
    formData.set("country", country);
    formData.set("state", state);
    formData.set("city", city);
    formData.set("orgId", orgId);

    try {
      setLoading(true);
      const response = await axios.post("/api/createJob", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // alert("Job created successfully!");
      // alert(JSON.stringify(response.data.orgId));

      // Using `router.push` to navigate to the dynamic page
      router.push(`/jobs/${response.data.orgId}`);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(
        "Error submitting form:",
        error?.response?.data || error.message
      );
      setError(error?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto">
      <Theme>
        <form onSubmit={handleSave}>
          <TextField.Root
            name="Jobtitle"
            placeholder="Job Title"
            className="mb-7"
            required
          />
          <div className="grid sm:grid-cols-3 gap-6 *:grow mb-7">
            <div>
              Remote ?
              <RadioGroup.Root defaultValue="hybrid" name="remote">
                <RadioGroup.Item value="on-site">on-site</RadioGroup.Item>
                <RadioGroup.Item value="hybrid">Hybrid</RadioGroup.Item>
                <RadioGroup.Item value="fully">Fully-Remote</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div>
              Full Time ?
              <RadioGroup.Root defaultValue="part-time" name="type">
                <RadioGroup.Item value="project">Project</RadioGroup.Item>
                <RadioGroup.Item value="part-time">Part-time</RadioGroup.Item>
                <RadioGroup.Item value="full-time">Full-time</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="content-center">
              Salary
              <TextField.Root name="salary" required>
                <TextField.Slot>$</TextField.Slot>
                <TextField.Slot>k/year</TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <div className="mb-7">
            Location
            <div className="flex flex-col sm:flex-row gap-4 *:grow">
              <CountrySelect
                onChange={(e: any) => {
                  setCountryid(e.id);
                  setCountry(e.name);
                }}
                placeHolder="Select Country"
              />

              <StateSelect
                countryid={countryid}
                onChange={(e: any) => {
                  setstateid(e.id);
                  setstate(e.name);
                }}
                placeHolder="Select State"
              />

              <CitySelect
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
              <ImageUpload name="jobIcon" icon={faStar} />
            </div>
            <div className="grow">
              <h3>Contact person</h3>
              <div className="flex gap-2">
                <ImageUpload name="UserPhoto" icon={faUser} />
                <div className="grow flex flex-col gap-1">
                  <TextField.Root placeholder="XYZ" name="userName" required>
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faUser} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder="Phone"
                    type="tel"
                    name="userphoneNumber"
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
            required
          />
          {error && <p className="text-red-500 mt-3">{error}</p>}{" "}
          {/* Show error message */}
          <div className="mt-3 flex justify-center">
            <Button type="submit" disabled={loading}>
              <span className="px-8">{loading ? "Saving..." : "Save"}</span>
            </Button>
          </div>
        </form>
      </Theme>
    </div>
  );
};

export default JobForm;
