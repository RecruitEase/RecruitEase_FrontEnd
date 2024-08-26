"use client"
import React, {useEffect, useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import {useTheme} from "next-themes";
import {useSession} from "next-auth/react";
import {Input} from "@nextui-org/input";
import {useForm} from "react-hook-form";
import CustomInput from "@/components/form_inputs/CustomInput";
import { Select, SelectItem, Switch,Link} from "@nextui-org/react";
import {toTitleCase} from "@/utils/stringUtils";
import CustomTextArea from "@/components/form_inputs/CustomTextArea";
import {Button} from "@nextui-org/button";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import {Bounce, toast} from "react-toastify";
import {useRouter} from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const JobPost = () => {
    const router=useRouter();
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


    const {theme, setTheme} = useTheme();

    const [isQuizCreationEnabled, setIsQuizCreationEnabled] = useState(false);

    // @ts-ignore
    const handleSwitchChange = (event) => {
        setIsQuizCreationEnabled(!isQuizCreationEnabled);
    };

    const locations = [
        {key: "work from home", label: "Work From Home"},
        {key: "island wide", label: "Island Wide"},
        {key: "ampara", label: "Ampara"},
        {key: "anuradhapura", label: "Anuradhapura"},
        {key: "badulla", label: "Badulla"},
        {key: "batticaloa", label: "Batticaloa"},
        {key: "colombo", label: "Colombo"},
        {key: "galle", label: "Galle"},
        {key: "gampaha", label: "Gampaha"},
        {key: "hambantota", label: "Hambantota"},
        {key: "jaffna", label: "Jaffna"},
        {key: "kalutara", label: "Kalutara"},
        {key: "kandy", label: "Kandy"},
        {key: "kegalle", label: "Kegalle"},
        {key: "kilinochchi", label: "Kilinochchi"},
        {key: "kurunegala", label: "Kurunegala"},
        {key: "mannar", label: "Mannar"},
        {key: "matale", label: "Matale"},
        {key: "matara", label: "Matara"},
        {key: "monaragala", label: "Monaragala"},
        {key: "mullativu", label: "Mullativu"},
        {key: "nuwara eliya", label: "Nuwara Eliya"},
        {key: "polonnaruwa", label: "Polonnaruwa"},
        {key: "puttalam", label: "Puttalam"},
        {key: "ratnapura", label: "Ratnapura"},
        {key: "trincomalee", label: "Trincomalee"},
        {key: "vavuniya", label: "Vavuniya"},
    ];
    const jobTypes = [
        {key: "full time", label: "Full-time"},
        {key: "part time", label: "Part-time"},
        {key: "contract", label: "Contract"},
        {key: "other", label: "Other"},

    ];

    const experienceLevelTypes = [
        {key: 1, label: "6 Months"},
        {key: 2, label: "1-2 Years"},
        {key: 3, label: "2-3 Years"},
        {key: 4, label: "3-5 Years"},
    ]

    const questionTypes = [
        {key: 1, label: "Single Choice"},
        {key: 2, label: "Multiple Choice"},
        {key: 3, label: "Open"},
    ]

    const educationLevelTypes = [
        {key: 1, label: "Ordinary Level"},
        {key: 2, label: "Advanced Level"},
        {key: 3, label: "Bachelor’s Degree"},
        {key: 4, label: "Masters Degree"},
        {key: 5, label: "PhD"},
        {key: 6, label: "Diploma/HND"},
        {key: 7, label: "Certificate"},
    ]

    const fieldValues = [
        {key: 1, label: "Account & Finance"},
        {key: 2, label: "Administration / Secretarial"},
        {key: 3, label: "Agriculture"},
        {key: 4, label: "Apparel"},
        {key: 5, label: "Architecture"},
        {key: 6, label: "Automobile"},
        {key: 7, label: "Banking and Financial Services"},
        {key: 8, label: "Beauty & Hairdressing"},
        {key: 9, label: "BPO/ KPO"},
        {key: 10, label: "Building & Construction"},
        {key: 11, label: "Business Management"},
        {key: 12, label: "Call Center"},
        {key: 13, label: "Charity / NGO"},
        {key: 14, label: "Customer Service"},
        {key: 15, label: "Delivery / Driving / Transport"},
        {key: 16, label: "Digital Marketing"},
        {key: 17, label: "Education / Higher Education"},
        {key: 18, label: "Electronics / Electrical"},
        {key: 19, label: "Engineering / Manufacturing"},
        {key: 20, label: "Environment/ Health & Safety"},
        {key: 21, label: "FMCG/ Food Industry"},
        {key: 23, label: "Government/ Public Sector"},
        {key: 24, label: "Hospital/ Nursing/ Healthcare"},
        {key: 25, label: "Hotel/ Hospitality/ Leisure"},
        {key: 26, label: "Human Resources / Recruitment"},
        {key: 27, label: "Insurance"},
        {key: 28, label: "Interior Design"},
        {key: 29, label: "Internship / Undergraduate"},
        {key: 30, label: "IT-HWare/ Networks/ Systems"},
        {key: 31, label: "IT-SWare / Internet"},
        {key: 32, label: "Legal / Law"},
        {key: 33, label: "Media/ Advertising/ Communication/ Design"},
        {key: 34, label: "Oil, Gas and Nuclear"},
        {key: 35, label: "Other"},
        {key: 36, label: "Pharmaceutical"},
        {key: 37, label: "Production & Operations"},
        {key: 38, label: "Project Management / Programme Management"},
        {key: 39, label: "Quality Assurance"},
        {key: 40, label: "Real Estate"},
        {key: 41, label: "Recoveries"},
        {key: 42, label: "Retail / Fashion"},
        {key: 43, label: "Sales / Marketing / New Business Development"},
        {key: 44, label: "School Leavers"},
        {key: 45, label: "Science / Research"},
        {key: 46, label: "Security/ Military"},
        {key: 47, label: "Senior Management / Directors"},
        {key: 48, label: "Sports/Fitness/Recreation"},
        {key: 49, label: "Startup/ Tech-startup"},
        {key: 50, label: "Supply Chain / Logistics / Procurement"},
        {key: 51, label: "Technical/ Mechanical"},
        {key: 52, label: "Telecommunications"},
        {key: 53, label: "Training and Development"},
        {key: 54, label: "Travel/Ticketing/Airline/Shipping"},
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
    const [fields, setFields] = React.useState(new Set([]));


    const [qType, setQType] = useState(1);
    const handleQuestionType = (event) => {
        //check the question type selected and render accordingly
        console.log(event.target.value)
        setQType(event.target.value)
    }

    const handleSingleChoiceAnswer = () => {
        //Todo
    }
    const handleMultipleChoiceAnswer = () => {
        //Todo
    }
    const handleOpenAnswer = () => {
        //Todo
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
                    <p className="text-small text-default-500">Selected: {fields.size === 0 ? "None" : Array.from(fields).map(key => toTitleCase(fieldValues[key].label)).join(", ")}</p>

                    <span className="mt-3 text-danger text-sm">
        {errors && errors["fields"] ? errors["fields"]?.message?.toString() : '\u00A0'}
             </span>
                </div>


                <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
                    <label htmlFor={"educationLevel"}>
                        Experience Level
                        <span className={"text-danger"}> * </span>
                    </label>
                    <Select
                        name={"experienceLevel"}
                        items={experienceLevelTypes}
                        placeholder="Select the experience level"
                        variant={"bordered"}
                        {...register("experienceLevel", {
                            required: {
                                value: true,
                                message: "Please choose the experience level",
                            }
                        })}
                    >
                        {(experienceLevelType) => <SelectItem>{experienceLevelType.label}</SelectItem>}
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
                        {...register("educationLevel", {
                            required: {
                                value: true,
                                message: "Please choose the education level",
                            }
                        })}
                    >
                        {(educationLevelType) => <SelectItem>{educationLevelType.label}</SelectItem>}
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
                        <ReactQuill modules={modules} formats={formats} theme="snow" value={value} onChange={setValue} className='h-96' />
                        
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

                <div className={"mb-1 mx-2 lg:w-[45%] w-full"}>
                    <label htmlFor={"image"}>
                        Image <small>Description or poster</small>
                        <span className={"text-danger"}> * </span>
                    </label>
                    <Input
                        id="image"
                        variant="bordered"
                        type={"file"}

                    />

                    <span className="mt-3 text-danger text-sm">
        {errors && errors["image"] ? errors["image"]?.message?.toString() : '\u00A0'}
             </span>
                </div>


                <Switch onChange={handleSwitchChange}>
                    Pre-Screening Quiz
                </Switch>


            </div>
            <div
                className={isQuizCreationEnabled ? 'flex flex-col lg:flex-row w-full flex-wrap m-1 border-1 rounded-md p-3' : 'hidden'}>
                <div className={"mb-1 mx-2 lg:w-[45%] w-[90%]"}>
                    <label htmlFor={"questionType"}>
                        Question Type
                        <span className={"text-danger"}> * </span>
                    </label>
                    <Select
                        id={"questionType"}
                        name={"questionType"}
                        items={questionTypes}
                        placeholder="Select the question type"
                        variant={"bordered"}
                        onChange={handleQuestionType}
                        defaultSelectedKeys={[1]}
                    >
                        {(questionType) => <SelectItem>{questionType.label}</SelectItem>}
                    </Select>


                </div>

                <div className={"mb-1 mx-2 lg:w-[45%] w-[90%]"}>
                    <label htmlFor={"question"}>
                        Question
                        <span className={"text-danger"}> * </span>
                    </label>
                    <Input
                        id={"question"}
                        name={"question"}
                        type={"text"}
                        variant={"bordered"}
                        placeholder={"Enter the question"}
                    />
                </div>


                {qType == 1 && <div className={"w-full flex-col"}>
                    <div>
                        <label htmlFor={"answers"}>
                            Answers:
                            <span className={"text-danger"}> * </span>
                        </label>
                        <div>

                        </div>
                    </div>
                    <div className={"mb-1 mx-2 lg:w-[45%] w-[90%] flex gap-2  items-center"}>
                        <label htmlFor={"answer"}>
                            Answer
                        </label>
                        <Input
                            id={"answer"}
                            name={"answer"}
                            type={"text"}
                            variant={"bordered"}
                            placeholder={"Enter the answer"}
                        />
                        <Button onClick={handleSingleChoiceAnswer} size={"sm"} color={"success"}>Add</Button>
                    </div>

                </div>}
                {qType == 2 && <div className={"w-full flex-col"}>
                    <div>
                        <label htmlFor={"answers"}>
                            Answers:
                            <span className={"text-danger"}> * </span>
                        </label>
                        <div>

                        </div>
                    </div>
                    <div className={"mb-1 mx-2 lg:w-[45%] w-[90%] flex gap-2  items-center"}>
                        <label htmlFor={"answer"}>
                            Answer
                        </label>
                        <Input
                            id={"answer"}
                            name={"answer"}
                            type={"text"}
                            variant={"bordered"}
                            placeholder={"Enter the answer"}
                        />
                        <Button onClick={handleMultipleChoiceAnswer} size={"sm"} color={"success"}>Add</Button>
                    </div>

                </div>}
                {qType == 3 && <div className={"w-full flex-col"}>

                    <div className={"mb-1 mx-2 lg:w-[45%] w-[90%] flex gap-2  items-center"}>
                        <Button onClick={handleOpenAnswer} size={"sm"} color={"success"}>Add</Button>
                    </div>

                </div>}
            </div>
            <Button className={"mt-5"} size={"md"} color={"primary"} onClick={()=>{
                    toast.success('Vacancy posted successfully!', {
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
                    router.push('/recruiter/vacancy');
                  }} >Create job vacancy</Button>

            {/*<pre>{JSON.stringify(watch(), null, 2)}</pre>*/}

        </div>
    );
};

export default JobPost;
