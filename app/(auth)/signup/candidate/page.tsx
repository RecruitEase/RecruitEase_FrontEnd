"use client";
import React from 'react';
import {useForm, FieldValues} from "react-hook-form";
import {Input} from "@nextui-org/input";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@/components/icons";
import {DatePicker} from "@nextui-org/date-picker";
import {CalendarDate, DateInput} from "@nextui-org/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {Button} from "@nextui-org/button";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Bounce, toast} from "react-toastify";
import {Link} from "@nextui-org/link";

const MAX_STEPS = 3;

const CandidateSignUp: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors, isValid},
        setError,
        clearErrors
    } = useForm({mode: "all"});
    const [formStep, setFormStep] = React.useState(0);

    const handleStepCompletion = () => {
        isValid && setFormStep(cur => cur + 1);
    };

    const axios = useAxiosAuth();

    const [axiosLoading, setAxiosLoading] = React.useState(false);

    const registeredFields = [
        "email",
        "password",
        "firstName",
        "lastName",
        "address",
        "mobileNumber",
        "nic",
        "dob"
    ];
    const handleFormCompletion = async (values: FieldValues) => {
        //show loading spinner
        setAxiosLoading(true);

        //clearing errors
        for (const valuesKey in registeredFields) {
            clearErrors(valuesKey)
        }

        await axios.post('/auth/register-candidate', JSON.stringify(values, null, 2)).then((res) => {
            setFormStep(cur => cur + 1);
            setAxiosLoading(false);
            toast.success('Registration Successful!', {
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

        })
            .catch((error) => {
                    console.log("error", error.response.data)
                    let errorObj = error.response.data;
                    let fieldErrors = error.response.data.errors;

                    let isEmailError = false;
                    // Iterate through each attribute in the JSON object
                    for (const key in fieldErrors) {
                        if (fieldErrors.hasOwnProperty(key)) {
                            setError(key, {type: 'custom', message: fieldErrors[key]});
                            if (key == 'email') {
                                isEmailError = true;
                            }
                            // console.log(`${key}: ${fieldErrors[key]}`);
                        }
                    }
                    if (isEmailError) {
                        setFormStep(0);
                    } else {
                        setFormStep(1);
                    }
                    setAxiosLoading(false);
                toast.error('Error occurred while registration! ', {
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
                }
            )

        // window.alert(JSON.stringify(values, null, 2));
    };

    return (
        <div className=" bg-recruitBlue flex flex-col items-start text-gray-900 antialiased relative">
            <div
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
                    height: "34rem",
                }}
                className="absolute bg-blue-950 inset-x-0 top-0"
            ></div>
            <div className="mx-auto z-10 mt-24 text-center">
                <h1 className="text-white text-5xl font-semibold">
                    Welcome to <span className="text-yellow-500">RecruitEase</span>
                </h1>
                <h2 className="text-white mt-2 text-lg ">
                    Job Seeker Registration
                </h2>
            </div>
            <div
                className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-gray-25 mx-auto overflow-hidden z-10"
            >
                {formStep < 3 && (
                    <div className="h-2 w-full bg-gray-400">
                        <div
                            style={{width: `${((formStep + 1) / MAX_STEPS) * 100}%`}}
                            className="h-full bg-recruitBlue"
                        ></div>
                    </div>
                )}
                <div className="px-16 py-10">
                    {formStep < 3 && (
                        <div
                            className={`flex ${formStep === 0 ? "justify-end" : "justify-between"} items-center mb-6 font-medium text-sm`}
                        >
                            {formStep > 0 && (
                                <button
                                    onClick={() => setFormStep(cur => cur - 1)}
                                    className="flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    Previous
                                </button>
                            )}
                            <p>Step {formStep + 1} of {MAX_STEPS}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(handleFormCompletion)}>
                        {formStep >= 0 && (
                            <section className={formStep === 0 ? "block" : "hidden"}>
                                <h2 className="font-semibold text-3xl mb-8">Account Information</h2>
                                <div className={"m-1 p-2"}>
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        placeholder={"Enter your email address"}
                                        type="email"
                                        id="email"
                                        variant="bordered"
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message: "Please enter your email address",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.email?.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"m-1 p-2"}>
                                    <label htmlFor="password">Password</label>

                                    <Input
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: "Please enter a password",
                                            },
                                        })}
                                        id={"password"}
                                        variant="bordered"
                                        placeholder="Enter your password"
                                        endContent={
                                            <button className="focus:outline-none" type="button"
                                                    onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon
                                                        className="text-2xl text-default-400 pointer-events-none"/>
                                                ) : (
                                                    <EyeFilledIcon
                                                        className="text-2xl text-default-400 pointer-events-none"/>
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        className="max-w"
                                    />
                                    {errors.password && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.password?.message}
                                        </p>
                                    )}
                                </div>

                            </section>
                        )}
                        {formStep >= 1 && (
                            <section className={formStep === 1 ? "block" : "hidden"}>
                                <h2 className="font-semibold text-3xl mb-8">Personal Information</h2>
                                <div className={"m-1 p-2"}>
                                    <label htmlFor="firstName">First Name</label>
                                    <Input
                                        placeholder={"Enter your first name"}
                                        type="text"
                                        id="firstName"
                                        variant="bordered"
                                        {...register('firstName', {
                                            required: {
                                                value: true,
                                                message: "Please enter your first name",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z]+(?:['-][A-Za-z]+)*$/,
                                                message: "Invalid first name"
                                            }
                                        })}
                                    />
                                    {errors.firstName && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.firstName?.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"m-1 p-2"}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Input
                                        placeholder={"Enter your last name"}
                                        type="text"
                                        id="lastName"
                                        variant="bordered"
                                        {...register('lastName', {
                                            required: {
                                                value: true,
                                                message: "Please enter your last name",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z]+(?:['-][A-Za-z]+)*$/,
                                                message: "Invalid last name"
                                            }
                                        })}
                                    />
                                    {errors.lastName && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.lastName?.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"m-1 p-2"}>
                                    <label htmlFor="address">Address</label>
                                    <Input
                                        placeholder={"Enter your address"}
                                        type="text"
                                        id="address"
                                        variant="bordered"
                                        {...register('address', {
                                            required: {
                                                value: true,
                                                message: "Please enter your address",
                                            },
                                        })}
                                    />
                                    {errors.address && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.address?.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"m-1 p-2"}>
                                    <label htmlFor="mobileNumber">Mobile Number</label>
                                    <Input
                                        placeholder={"Enter your mobile number"}
                                        type="text"
                                        id="mobileNumber"
                                        variant="bordered"
                                        {...register('mobileNumber', {
                                            required: {
                                                value: true,
                                                message: "Please enter your mobile number",
                                            },
                                            pattern: {
                                                value: /^(070|071|072|075|076|077|078|074)\d{7}$/,
                                                message: "Invalid Sri Lankan mobile number"
                                            }
                                        })}
                                    />
                                    {errors.mobileNumber && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.mobileNumber?.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"m-1 p-2"}>
                                    <label htmlFor="nic">NIC no.</label>
                                    <Input
                                        placeholder={"Enter your NIC number"}
                                        type="text"
                                        id="nic"
                                        variant="bordered"
                                        {...register('nic', {
                                            required: {
                                                value: true,
                                                message: "Please enter your NIC number",
                                            },
                                            pattern: {
                                                value: /^(?:\d{9}[VvXx]|\d{12})$/,
                                                message: "Invalid Sri Lankan NIC number"
                                            }
                                        })}
                                    />
                                    {errors.nic && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.nic?.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"m-1 p-2"}>
                                    <label htmlFor="dob">Date of Birth.</label>
                                    <Input className="max-w"
                                           label="Birth date" id="dob"
                                           variant="bordered"
                                           type={"date"}
                                           {...register('dob', {
                                               required: {
                                                   value: true,
                                                   message: "Please enter your date of birth",
                                               },
                                           })}/>


                                    {errors.dob && (
                                        <p className="text-danger text-sm mt-2">
                                            {errors.dob?.message}
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}
                        {formStep >= 2 && (
                            <section className={formStep === 2 ? "block" : "hidden"}>
                                <h2 className="font-semibold text-3xl mb-8">Terms and Conditions</h2>
                                <div className="block mt-6">
                                    <input
                                        name="toc"
                                        className="p-3 text-green-600 rounded mr-3 border-2 border-gray-300 ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 cursor-pointer"
                                        type="checkbox"
                                        {...register('toc', {required: true})}
                                    />
                                    <span>
                                        I accept the{" "}
                                        <a className="text-blue-400 underline" href="/public">
                                            Terms and Conditions
                                        </a>
                                        .
                                    </span>
                                </div>
                                <div className="block mt-6">
                                    <input
                                        name="pp"
                                        className="p-3 text-green-600 rounded mr-3 border-2 border-gray-300 ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 cursor-pointer"
                                        type="checkbox"
                                        {...register('pp', {required: true})}
                                    />
                                    <span>
                                        I accept the{" "}
                                        <a className="text-blue-400 underline" href="/public">
                                            Privacy Policy
                                        </a>
                                        .
                                    </span>
                                </div>
                            </section>
                        )}
                        {formStep >= 3 && (
                            <section>
                                <h2 className="font-semibold text-3xl mb-8">Thank you for signing up!</h2>
                                <p>You can now log in with your new account</p>
                                <Button href={"/signin"}
                                        as={Link}
                                        className="mt-6 bg-recruitBlue text-white rounded px-8 py-6 w-full disabled:bg-gray-400"
                                >
                                   Log in
                                </Button>
                            </section>
                        )}
                        {formStep < 3 && (
                            <Button isLoading={axiosLoading}
                                    disabled={!isValid}
                                    onClick={formStep === 2 ? undefined : handleStepCompletion}
                                    type={formStep === 2 ? "submit" : "button"}
                                    className="mt-6 bg-recruitBlue text-white rounded px-8 py-6 w-full disabled:bg-gray-400"
                            >
                                {formStep === 2 ? "Register" : "Next"}
                            </Button>
                        )}
                        {
                            formStep==0 && (
                                <h3 className={"mt-4"}>Want to register as a recruiter? <Link href={"/signup/recruiter"}>Signup
                                    as a Recruiter</Link></h3>
                            )
                        }
                        {/*<pre>{JSON.stringify(watch(), null, 2)}</pre>*/}
                        {/*<pre>{formStep}</pre>*/}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CandidateSignUp;
