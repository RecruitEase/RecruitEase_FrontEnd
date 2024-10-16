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
import {Bounce, toast} from "react-toastify";
import {useParams, useRouter} from "next/navigation";
import {useJob} from "@/lib/hooks/useJobs";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
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


  //for user session state
  const {data: session} = useSession();
  console.log({session});

  const user = session?.user;

  const [values, setValues] = React.useState(new Set([]));
  const [fields, setFields] = React.useState(new Set([]));


  const router=useRouter();
  const params = useParams<{ id: string }>()

  const getJobQuery=useJob(params.id)
const fetchedJob=getJobQuery.data;
  // if(getJobQuery.isSuccess)setValue(fetchedJob?.description);
  console.log("fetchedjob",fetchedJob)

  useEffect(() => {
    setValue(fetchedJob?.description!)
    const keys=new Set(fetchedJob?.fields!.map(field=>field.key));
    console.log("field keys: ",keys)
    setFields(keys)
  }, [fetchedJob]);

  //react-quill
  const [value, setValue] = useState('');


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];



  const {
    register,
      watch,
    handleSubmit,
    formState: { errors,isValid },
    setValue: setFormValue,
  } = useForm({
    mode: "all"
  });

  const handleJobEdit=()=>{

  }
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

      {
        (getJobQuery.isFetching) ?
            <LoadingComponent/>
            : (getJobQuery.isError) ?
                    < ErrorComponent/>
                    :
                <>
                <div className={"flex flex-col lg:flex-row w-full flex-wrap m-1"}>

                  <CustomInput
                      className={"lg:w-[45%] w-full"}
                      name={"title"}
                      label={"Job Title"}
                      placeholder={"Enter the job title"}
                      required={true}
                      defaultValue={fetchedJob?.title}
                      register={register}
                      errors={errors}
                      validationSchema={
                        {
                          required: {
                            value: true,
                            message: "Please enter a job title",
                          }
                        }
                      }/>


                  <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
                    <label htmlFor={"type"}>
                      Job Type
                      <span className={"text-danger"}> * </span>
                    </label>
                    <Select
                        name={"type"}
                        items={jobTypes}
                        defaultSelectedKeys={[fetchedJob?.type]}
                        placeholder="Select the job type"
                        variant={"bordered"}
                        {...register("type", {
                          required: {
                            value: true,
                            message: "Please choose the job type",
                          }
                        })}
                    >
                      {(jobType) => <SelectItem key={jobType.key}>{jobType.label}</SelectItem>}
                    </Select>
                    <span className="mt-3 text-danger text-sm">
        {errors && errors["type"] ? errors["type"]?.message?.toString() : '\u00A0'}
             </span>
                  </div>


                  <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
                    <label htmlFor={"location"}>
                      Location
                      <span className={"text-danger"}> * </span>
                    </label>

                    <Select
                        name={"location"}
                        items={locations}
                        placeholder="Select the location"
                        variant={"bordered"}
                        defaultSelectedKeys={[fetchedJob?.location]}
                        {...register("location", {
                          required: {
                            value: true,
                            message: "Please choose the location",
                          }
                        })}
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <span className="mt-3 text-danger text-sm">
        {errors && errors["location"] ? errors["location"]?.message?.toString() : '\u00A0'}
             </span>


                    {/*            <Select*/}

                    {/*                name="location"*/}
                    {/*                selectionMode="single"*/}
                    {/*                placeholder="Select the location"*/}
                    {/*                selectedKeys={values}*/}
                    {/*                variant={"bordered"}*/}

                    {/*                onSelectionChange={setValues}*/}
                    {/*            >*/}
                    {/*                {locations.map((location) => (*/}
                    {/*                    <SelectItem key={location.key}>*/}
                    {/*                        {location.label}*/}
                    {/*                    </SelectItem>*/}
                    {/*                ))}*/}
                    {/*            </Select>*/}

                    {/*            <span className="mt-3 text-danger text-sm">*/}
                    {/*{errors && errors["location"] ? errors["location"]?.message?.toString() : '\u00A0'}*/}
                    {/*     </span>*/}
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
                        defaultSelectedKeys={fields}
                        variant={"bordered"}

                        onSelectionChange={setFields}
                    >
                      {fieldValues.map((field) => (
                          <SelectItem key={field.key}>
                            {field.label}
                          </SelectItem>
                      ))}
                    </Select>
                    <p className="text-small text-default-500">Selected: {fields.size === 0 ? "None" : Array.from(fields).map(key => toTitleCase(fieldValues[key-1].label)).join(", ")}</p>

                    <span className="mt-3 text-danger text-sm">
        {errors && errors["fields"] ? errors["fields"]?.message?.toString() : '\u00A0'}
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
                        placeholder="Select the experience level"
                        variant={"bordered"}
                        defaultSelectedKeys={[fetchedJob?.experienceLevel.toString()!]}
                        {...register("experienceLevel", {
                          required: {
                            value: true,
                            message: "Please choose the experience level",
                          }
                        })}
                    >
                      {(experienceLevelType) => <SelectItem key={experienceLevelType.key}>{experienceLevelType.label}</SelectItem>}
                    </Select>
                    <span className="mt-3 text-danger text-sm">
        {errors && errors["experienceLevel"] ? errors["experienceLevel"]?.message?.toString() : '\u00A0'}

             </span>
                  </div>
                  <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
                    <label htmlFor={"educationLevel"}>
                      Education Level
                      <span className={"text-danger"}> * </span>
                    </label>
                    <Select
                        name={"educationLevel"}
                        items={educationLevelTypes}
                        placeholder="Select the education level"
                        variant={"bordered"}
                        defaultSelectedKeys={[fetchedJob?.educationLevel.toString()!]}
                        {...register("educationLevel", {
                          required: {
                            value: true,
                            message: "Please choose the education level",
                          }
                        })}
                    >
                      {(educationLevelType) => <SelectItem key={educationLevelType.key}>{educationLevelType.label}</SelectItem>}
                    </Select>
                    <span className="mt-3 text-danger text-sm">
        {errors && errors["educationLevel"] ? errors["educationLevel"]?.message?.toString() : '\u00A0'}
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
                      defaultValue={fetchedJob?.overview}
                      validationSchema={
                        {
                          required: {
                            value: true,
                            message: "Please enter a job overview",
                          }
                        }
                      }/>
                  <div className={"mb-1 mx-2 w-full"}>
                    <label htmlFor={"description"}>
                      Description <small>( Format options are available)</small>
                      <span className={"text-danger"}> * </span>
                    </label>
                    <ReactQuill modules={modules} formats={formats} theme="snow" value={value} onChange={setValue} className='h-96 ' />

                    <span className="mt-3 text-danger text-sm">
        {'\u00A0'}
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
                        value={fetchedJob?.deadline}
                        {...register('deadline', {
                          required: {
                            value: true,
                            message: "Please choose the deadline",
                          },
                        })}/>

                    <span className="mt-3 text-danger text-sm">
        {errors && errors["deadline"] ? errors["deadline"]?.message?.toString() : '\u00A0'}
             </span>
                  </div>

                  {/*todo: image and quiz*/}
                  {/*        <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>*/}
                  {/*            <label htmlFor={"image"}>*/}
                  {/*                Image <small>Description or poster</small>*/}
                  {/*                <span className={"text-danger"}> * </span>*/}
                  {/*            </label>*/}
                  {/*            <Input*/}
                  {/*                id="image"*/}
                  {/*                variant="bordered"*/}
                  {/*                type={"file"}*/}

                  {/*            />*/}

                  {/*            <span className="mt-3 text-danger text-sm">*/}
                  {/*{errors && errors["image"] ? errors["image"]?.message?.toString() : '\u00A0'}*/}
                  {/*     </span>*/}
                  {/*        </div>*/}


                  {/*        <Switch onChange={handleSwitchChange}>*/}
                  {/*            Pre-Screening Quiz*/}
                  {/*        </Switch>*/}


                </div>

  <Button  disabled={!isValid || value=='' || fields.size==0} size={"md"} color={"primary"} onClick={handleJobEdit} className="mt-6 bg-recruitBlue text-white rounded px-8 py-6 disabled:bg-gray-400" >Create job vacancy</Button>

  <pre>{JSON.stringify(watch(), null, 2)}{fields}</pre>
  </>
      }

    </div>
  );
};

export default EditVacancy;
