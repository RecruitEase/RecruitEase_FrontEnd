"use client"
import React, {useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import {useTheme} from "next-themes";
import {useSession} from "next-auth/react";
import {Input} from "@nextui-org/input";
import {useForm} from "react-hook-form";
import CustomInput from "@/components/form_inputs/CustomInput";
import {Select, SelectItem} from "@nextui-org/react";
import {toTitleCase} from "@/utils/stringUtils";

const JobPost = () => {
    const locations = [
        { key: "work from home", label: "Work From Home" },
        { key: "island wide", label: "Island Wide" },
        { key: "ampara", label: "Ampara" },
        { key: "anuradhapura", label: "Anuradhapura" },
        { key: "badulla", label: "Badulla" },
        { key: "batticaloa", label: "Batticaloa" },
        { key: "colombo", label: "Colombo" },
        { key: "galle", label: "Galle" },
        { key: "gampaha", label: "Gampaha" },
        { key: "hambantota", label: "Hambantota" },
        { key: "jaffna", label: "Jaffna" },
        { key: "kalutara", label: "Kalutara" },
        { key: "kandy", label: "Kandy" },
        { key: "kegalle", label: "Kegalle" },
        { key: "kilinochchi", label: "Kilinochchi" },
        { key: "kurunegala", label: "Kurunegala" },
        { key: "mannar", label: "Mannar" },
        { key: "matale", label: "Matale" },
        { key: "matara", label: "Matara" },
        { key: "monaragala", label: "Monaragala" },
        { key: "mullativu", label: "Mullativu" },
        { key: "nuwara eliya", label: "Nuwara Eliya" },
        { key: "polonnaruwa", label: "Polonnaruwa" },
        { key: "puttalam", label: "Puttalam" },
        { key: "ratnapura", label: "Ratnapura" },
        { key: "trincomalee", label: "Trincomalee" },
        { key: "vavuniya", label: "Vavuniya" },
    ];
    const jobTypes = [
        { key: "full time", label: "Full-time" },
        { key: "part time", label: "Part-time" },
        { key: "contract", label: "Contract" },
        { key: "other", label: "Other" },

    ];


    const {
        register,
        watch,
        handleSubmit,
        formState: {errors, isValid},
        setError,
        clearErrors
    } = useForm({mode: "all"});

    //for user session state
    const {data: session} = useSession();
    console.log({session});

    const user = session?.user;

    const [values, setValues] = React.useState(new Set([]));
    // @ts-ignore
    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Post a New Job Vacancy"
                    user={user?.firstName || 'Guest'}
                    subtext="Create and post a new job vacancy for your company"
                />
            </header>

            <div className={"flex flex-col lg:flex-row w-full flex-wrap m-1"}>

                <CustomInput
                    className={"lg:w-[45%] w-full"}
                    name={"jobTitle"}
                    label={"Job Title"}
                    placeholder={"Enter the job title"}
                    required={true}
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
                    <label htmlFor={"locations"}>
                        Locations
                        <span className={"text-danger"}> * </span>
                    </label>
                    <Select

                        name="locations"
                        selectionMode="multiple"
                        placeholder="Select locations"
                        selectedKeys={values}
                        variant={"bordered"}
                        {...register("locations", {
                            required: {
                                value: true,
                                message: "Please choose at least one location",
                            }
                        })}
                        onSelectionChange={setValues}
                    >
                        {locations.map((location) => (
                            <SelectItem key={location.key}>
                                {location.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <p className="text-small text-default-500">Selected: {values.size === 0 ? "None" : Array.from(values).map(toTitleCase).join(", ")}</p>

                    <span className="mt-3 text-danger text-sm">
        {errors && errors["locations"] ? errors["locations"]?.message?.toString() : '\u00A0'}
             </span>
                </div>


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
                        {...register("jobType", {
                            required: {
                                value: true,
                                message: "Please choose the job type",
                            }
                        })}
                    >
                        {(jobType) => <SelectItem>{jobType.label}</SelectItem>}
                    </Select>
                    <span className="mt-3 text-danger text-sm">
        {errors && errors["jobType"] ? errors["jobType"]?.message?.toString() : '\u00A0'}
             </span>
                </div>


            </div>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>

        </div>
    );
};

export default JobPost;
