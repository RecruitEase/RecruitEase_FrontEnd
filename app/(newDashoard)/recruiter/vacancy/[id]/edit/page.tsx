"use client";
import React, { useState, useEffect } from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import { useSession } from "next-auth/react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/form_inputs/CustomInput";
import { Select, SelectItem } from "@nextui-org/react";
import { toTitleCase } from "@/utils/stringUtils";
import CustomTextArea from "@/components/form_inputs/CustomTextArea";
import { Button } from "@nextui-org/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  modules,
  formats,
  locations,
  jobTypes,
  experienceLevelTypes,
  educationLevelTypes,
  fieldValues,
} from "@/components/recruiter/data";

const job = {
  jobTitle: "Software Engineer",
  jobType: "full time",
  locations: ["colombo", "galle"],
  fields: ["Automobile", "Insurance"],
  experienceLevel: 3,
  educationLevel: 3,
  overview: "This is a software engineer job",
  description: "This is a software engineer job",
  deadline: "2022-12-31",
  image: "https://via.placeholder.com/150",
};

const EditVacancy = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      locations: job.locations,
      fields: job.fields,
      experienceLevel: job.experienceLevel,
      educationLevel: job.educationLevel,
      overview: job.overview,
      description: job.description,
      deadline: job.deadline,
    },
  });

  const [value, setValue] = useState(job.description);
  const { data: session } = useSession();

  const user = session?.user;

  const [selectedLocations, setSelectedLocations] = useState(
    new Set(job.locations)
  );
  const [selectedFields, setSelectedFields] = useState(new Set(job.fields));

  useEffect(() => {
    setFormValue("description", job.description);
  }, [setFormValue, job.description]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title={`Edit Vacancy for ${job.jobTitle}`}
          user={user?.firstName || "Guest"}
          subtext="Edit the vacancy details"
        />
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col lg:flex-row w-full flex-wrap m-1"}>
          <CustomInput
            className={"lg:w-[45%] w-full"}
            name={"jobTitle"}
            label={"Job Title"}
            placeholder={"Enter the job title"}
            required={true}
            register={register}
            errors={errors}
            validationSchema={{
              required: {
                value: true,
                message: "Please enter a job title",
              },
            }}
          />

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"jobType"}>
              Job Type
              <span className={"text-danger"}> * </span>
            </label>
            <Select
              name={"jobType"}
              items={jobTypes}
              placeholder="Select the job type"
              variant={"bordered"}
              defaultValue={job.jobType}
              {...register("jobType", {
                required: {
                  value: true,
                  message: "Please choose the job type",
                },
              })}
            >
              {(jobType) => (
                <SelectItem key={jobType.key}>{jobType.label}</SelectItem>
              )}
            </Select>
            <span className="mt-3 text-danger text-sm">
              {errors && errors["jobType"]
                ? errors["jobType"].message
                : "\u00A0"}
            </span>
          </div>

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"locations"}>
              Locations
              <span className={"text-danger"}> * </span>
            </label>
            <Select
              name="locations"
              selectionMode="multiple"
              placeholder="Select locations"
              selectedKeys={selectedLocations}
              variant={"bordered"}
              onSelectionChange={(keys) => setSelectedLocations(new Set(keys))}
              {...register("locations", {
                required: {
                  value: true,
                  message: "Please choose the locations",
                },
              })}
            >
              {locations.map((location) => (
                <SelectItem key={location.key}>{location.label}</SelectItem>
              ))}
            </Select>
            <p className="text-small text-default-500">
              Selected:{" "}
              {selectedLocations.size === 0
                ? "None"
                : Array.from(selectedLocations).map(toTitleCase).join(", ")}
            </p>

            <span className="mt-3 text-danger text-sm">
              {errors && errors["locations"]
                ? errors["locations"].message
                : "\u00A0"}
            </span>
          </div>

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"fields"}>
              Fields
              <span className={"text-danger"}> * </span>
            </label>
            <Select
              name="fields"
              selectionMode="multiple"
              placeholder="Select fields"
              selectedKeys={selectedFields}
              variant={"bordered"}
              onSelectionChange={(keys) => setSelectedFields(new Set(keys))}
              {...register("fields", {
                required: {
                  value: true,
                  message: "Please choose the fields",
                },
              })}
            >
              {fieldValues.map((field) => (
                <SelectItem key={field.key}>{field.label}</SelectItem>
              ))}
            </Select>
            <p className="text-small text-default-500">
              Selected:{" "}
              {selectedFields.size === 0
                ? "None"
                : Array.from(selectedFields).map(toTitleCase).join(", ")}
            </p>

            <span className="mt-3 text-danger text-sm">
              {errors && errors["fields"] ? errors["fields"].message : "\u00A0"}
            </span>
          </div>

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"experienceLevel"}>
              Experience Level
              <span className={"text-danger"}> * </span>
            </label>
            <Select
              name={"experienceLevel"}
              items={experienceLevelTypes}
              defaultValue={job.experienceLevel}
              placeholder="Select the experience level"
              variant={"bordered"}
              {...register("experienceLevel", {
                required: {
                  value: true,
                  message: "Please choose the experience level",
                },
              })}
            >
              {(experienceLevelType) => (
                <SelectItem key={experienceLevelType.key}>
                  {experienceLevelType.label}
                </SelectItem>
              )}
            </Select>
            <span className="mt-3 text-danger text-sm">
              {errors && errors["experienceLevel"]
                ? errors["experienceLevel"].message
                : "\u00A0"}
            </span>
          </div>

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"educationLevel"}>
              Education Level
              <span className={"text-danger"}> * </span>
            </label>
            <Select
              name={"educationLevel"}
              defaultValue={job.educationLevel}
              items={educationLevelTypes}
              placeholder="Select the education level"
              variant={"bordered"}
              {...register("educationLevel", {
                required: {
                  value: true,
                  message: "Please choose the education level",
                },
              })}
            >
              {(educationLevelType) => (
                <SelectItem key={educationLevelType.key}>
                  {educationLevelType.label}
                </SelectItem>
              )}
            </Select>
            <span className="mt-3 text-danger text-sm">
              {errors && errors["educationLevel"]
                ? errors["educationLevel"].message
                : "\u00A0"}
            </span>
          </div>

          <CustomTextArea
            className={"w-full"}
            name={"overview"}
            label={"Overview"}
            placeholder={"Enter the job overview"}
            required={true}
            register={register}
            errors={errors}
            validationSchema={{
              required: {
                value: true,
                message: "Please enter a job overview",
              },
            }}
            defaultValue={job.overview}
          />

          <div className={"mb-1 mx-2 w-full"}>
            <label htmlFor={"description"}>
              Description <small>( Format options are available)</small>
              <span className={"text-danger"}> * </span>
            </label>
            <ReactQuill
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={(content) => setValue(content)}
              className="h-96"
            />
            <input
              type="hidden"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please enter the job description",
                },
              })}
              value={value}
            />
            <span className="mt-3 text-danger text-sm">
              {errors && errors["description"]
                ? errors["description"].message
                : "\u00A0"}
            </span>
          </div>

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"deadline"}>
              Deadline
              <span className={"text-danger"}> * </span>
            </label>
            <Input
              id="deadline"
              variant="bordered"
              type={"date"}
              defaultValue={job.deadline}
              {...register("deadline", {
                required: {
                  value: true,
                  message: "Please choose the deadline",
                },
              })}
            />
            <span className="mt-3 text-danger text-sm">
              {errors && errors["deadline"]
                ? errors["deadline"].message
                : "\u00A0"}
            </span>
          </div>

          <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
            <label htmlFor={"image"}>
              Image <small>Description or poster</small>
              <span className={"text-danger"}> * </span>
            </label>
            <Input
              id="image"
              variant="bordered"
              type={"file"}
              {...register("image", {
                required: {
                  value: true,
                  message: "Please upload an image",
                },
              })}
            />
            <span className="mt-3 text-danger text-sm">
              {errors && errors["image"] ? errors["image"].message : "\u00A0"}
            </span>
          </div>
        </div>
        <Button className={"mt-5"} size={"md"} color={"primary"} type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditVacancy;
