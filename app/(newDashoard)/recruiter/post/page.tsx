"use client"
import React, {useEffect, useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import {useTheme} from "next-themes";
import {useSession} from "next-auth/react";
import {Input} from "@nextui-org/input";
import {useForm} from "react-hook-form";
import CustomInput from "@/components/form_inputs/CustomInput";
import {Select, SelectItem, Switch, Link} from "@nextui-org/react";
import {toTitleCase} from "@/utils/stringUtils";
import CustomTextArea from "@/components/form_inputs/CustomTextArea";
import {Button} from "@nextui-org/button";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import {Bounce, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useCreateApplication} from "@/lib/hooks/useApplications";
import {useCreateJob} from "@/lib/hooks/useJobs";
import {ApplicationProp} from "@/types/applications";
import {Job} from "@/types/job";
import {educationLevelTypes, experienceLevelTypes, fieldValues, jobTypes, locations} from '@/components/recruiter/data';
import {QuestionCreator} from "@/components/Jobs/QuestionComponent";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});

const JobPost = () => {
    const router = useRouter();
    //react-quill
    const [value, setValue] = useState('');


    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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


    const {theme, setTheme} = useTheme();

    const [isQuizCreationEnabled, setIsQuizCreationEnabled] = useState(false);

    // @ts-ignore
    const handleSwitchChange = (event) => {
        setIsQuizCreationEnabled(!isQuizCreationEnabled);
    };


    const questionTypes = [
        {key: 1, label: "Single Choice"},
        {key: 2, label: "Multiple Choice"},
        {key: 3, label: "Open"},
    ]


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
    const [fields, setFields] = React.useState(new Set([]));


    //quiz
    const [questions, setQuestions] = useState([]);


    const createJobMutation = useCreateJob();

    const handleCreateJob = () => {
            // console.log("newjobquiz", questions)
        if(isQuizCreationEnabled && questions.length==0){
            toast.error('If quiz is enabled, add at least one question! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }else {
            const newJob: Job = {
                title: watch().title,
                type: watch().type,
                experienceLevel: Number(watch().experienceLevel),
                educationLevel: Number(watch().educationLevel),
                overview: watch().overview,
                deadline: watch().deadline,
                location: watch().location,
                description: value,
                questions:JSON.stringify(questions),
                fields: Array.from(fields, Number)
            };
            console.log("newjob", newJob)
            createJobMutation.mutate(newJob);
        }

    }

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
                    name={"title"}
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
                    <label htmlFor={"type"}>
                        Job Type
                        <span className={"text-danger"}> * </span>
                    </label>
                    <Select
                        name={"type"}
                        items={jobTypes}
                        defaultSelectedKeys={['full_time']}
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
                        defaultSelectedKeys={['work_from_home']}
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
                        selectedKeys={fields}
                        variant={"bordered"}

                        onSelectionChange={setFields}
                    >
                        {fieldValues.map((field) => (
                            <SelectItem key={field.key}>
                                {field.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <p className="text-small text-default-500">Selected: {fields.size === 0 ? "None" : Array.from(fields).map(key => toTitleCase(fieldValues[key - 1].label)).join(", ")}</p>

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
                        defaultSelectedKeys={['1']}
                        {...register("experienceLevel", {
                            required: {
                                value: true,
                                message: "Please choose the experience level",
                            }
                        })}
                    >
                        {(experienceLevelType) => <SelectItem
                            key={experienceLevelType.key}>{experienceLevelType.label}</SelectItem>}
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
                        defaultSelectedKeys={['1']}
                        {...register("educationLevel", {
                            required: {
                                value: true,
                                message: "Please choose the education level",
                            }
                        })}
                    >
                        {(educationLevelType) => <SelectItem
                            key={educationLevelType.key}>{educationLevelType.label}</SelectItem>}
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
                    <ReactQuill modules={modules} formats={formats} theme="snow" value={value} onChange={setValue}
                                className='h-96 '/>

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

            </div>
            <div className={"flex flex-col"}>
            <Switch className={"mb-2"} onChange={handleSwitchChange}>
                Pre-Screening Quiz
            </Switch>


            {isQuizCreationEnabled && <QuestionCreator draftQuestions={questions}
                                                       setDraftQuestions={setQuestions}/>
            }
            <Button disabled={!isValid || value == '' || fields.size == 0} size={"md"} color={"primary"}
                    onClick={handleCreateJob}
                    className="mt-6 bg-recruitBlue text-white rounded px-8 py-6 disabled:bg-gray-400">Create job
                vacancy</Button>
            </div>
            {/*<pre>{JSON.stringify(watch(), null, 2)}</pre>*/}

        </div>
    );
};

export default JobPost;
