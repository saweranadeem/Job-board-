"use client";
import React from "react";
import { useState } from "react";
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
const JobForm = ({ orgId }: { orgId: string }) => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [cityid, setcityid] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");

  const handleSave = () => {
    async function handleSaveJob(data: FormData) {
      // data.set('country', countryName.toString());
      // data.set('state', stateName.toString());
      // data.set('city', cityName.toString());
      data.set("countryId", countryid.toString());
      data.set("stateId", stateid.toString());
      data.set("cityId", cityid.toString());
      data.set("country", country.toString());
      data.set("state", state.toString());
      data.set("city", city.toString());
      // data.set("orgId", orgId);
    }
  };
  return (
    <div className="container mx-auto ">
      {/* {JSON.stringify(orgId)} */}
      <Theme>
        <form action={handleSave}>
          <TextField.Root
            name="Jobtitle"
            placeholder="Job Title"
            className="mb-7"
          ></TextField.Root>
          <div className="grid sm:grid-cols-3 gap-6 *:grow mb-7 ">
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
              <RadioGroup.Root defaultValue="part-time" name="jobType">
                <RadioGroup.Item value="project">Project</RadioGroup.Item>
                <RadioGroup.Item value="part-time">Part-time</RadioGroup.Item>
                <RadioGroup.Item value="full-time">Full-time</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div className="content-center">
              Salary
              <TextField.Root name="salary">
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

              <ImageUpload
                name="jobIcon"
                icon={faStar}
                // defaultValue={jobDoc?.jobIcon || ""}
              />
            </div>
            <div className="grow">
              <h3>Contact person</h3>
              <div className="flex gap-2">
                <ImageUpload
                  name="UserPhoto"
                  icon={faUser}
                  // defaultValue={jobDoc?.contactPhoto || ""}
                />
                <div className="grow flex flex-col gap-1">
                  <TextField.Root
                    placeholder="John Doe"
                    name="userName"
                    // defaultValue={jobDoc?.contactName || ""}
                  >
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faUser} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder="Phone"
                    type="tel"
                    name="userphoneNumber"
                    // defaultValue={jobDoc?.contactPhone || ""}
                  >
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faPhone} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder="Email"
                    type="email"
                    name="useremail"
                    // defaultValue={jobDoc?.contactEmail || ""}
                  >
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </TextField.Slot>
                  </TextField.Root>
                </div>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <TextArea
              placeholder="Job description"
              name="desription"
              resize="vertical"
            />
          </div>
          <div className="mt-3 flex justify-center">
            <Button>
              <span className="px-8">Save</span>
            </Button>
          </div>
        </form>
      </Theme>
    </div>
  );
};

export default JobForm;
