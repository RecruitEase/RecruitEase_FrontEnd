"use client"
import React, {useRef, useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {EyeFilledIcon, EyeSlashFilledIcon, MailIcon} from "@/components/icons";
import {Bounce, toast} from "react-toastify";


const SignIn = () => {
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [errorText,setErrorText]=useState<string>('');
    const [value, setValue] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const validateEmail = (value:string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);
    const router = useRouter()
    const email=useRef("");
    const password=useRef("");

    const handleSubmit=async ()=>{
        setIsLoading(true);
        try{
            const result = await signIn('credentials', {
                email: email.current,
                password: password.current,
                redirect: false,
            });
            // console.log("dsdes",result);

            if (result?.status == 200) {
                toast.success('Logged in successfully!', {
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
                router.push('/');
                setIsLoading(false);
            } else {
                //not logged in
                //handle error here
                toast.error('Authentication Error!', {
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
                setErrorText(result?.error ? result?.error:"Something went wrong");
                setIsLoading(false);

            }
        }catch(error){
            // @ts-ignore
            console.log(error.message);
        }
        setIsLoading(false);

    }

    return (
        <div className="font-[sans-serif]">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center gap-4 h-full">
                <div className="max-md:order-1 lg:col-span-2 md:h-screen w-full p-4 pt-1">
                <div
                    className="max-md:order-1 lg:col-span-2 md:h-screen w-full bg-recruitBlue rounded-t-xl rounded-b-xl lg:p-12 p-4">
                    <img src="https://readymadeui.com/signin-image.webp"
                         className=" lg:w-[70%] w-full h-full object-contain block mx-auto" alt="login-image"/>
                </div>
                </div>
                <div className="w-full p-6">
                    <form>
                        <div className="mb-8">
                            <h3 className="text-primaryText text-3xl font-extrabold">Sign in</h3>
                            <p className="text-sm mt-4 text-secondaryText">Don&apos;t have an account <a
                                href="/signup"
                                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register
                                here</a></p>
                        </div>
<p className={"text-danger"}>{errorText}</p>
                        <div>
                            <label htmlFor={"email"} className="text-inputLabel text-[15px] mb-2 block">Email</label>
                            <div className="relative flex items-center">
                                <Input
                                    id={"email"}
                                    required={true}

                                    value={value}
                                    type="email"
                                    label="Email"
                                    variant="bordered"
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}

                                    errorMessage="Please enter a valid email"
                                    onValueChange={setValue}
                                    className="max-w"
                                    onChange={(e)=>(email.current=e.target.value)}
                                    endContent={
                                        <svg
                                            aria-hidden="true"
                                            fill="none"
                                            focusable="false"
                                            height="2rem"
                                            role="presentation"
                                            viewBox="0 0 25 25"
                                            width="2rem"
                                        >
                                            <path
                                                d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                                                fill="#bbb"
                                            />
                                        </svg>

                                    }
                                />
                                {/*<input name="email" type="text" required*/}
                                {/*       className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent focus:text-primaryText px-4 py-3.5 rounded-md outline-blue-600"*/}
                                {/*       placeholder="Enter email" onChange={(e)=>(email.current=e.target.value)}/>*/}
                                {/*<svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"*/}
                                {/*     className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">*/}
                                {/*    <defs>*/}
                                {/*        <clipPath id="a" clipPathUnits="userSpaceOnUse">*/}
                                {/*            <path d="M0 512h512V0H0Z" data-original="#000000"></path>*/}
                                {/*        </clipPath>*/}
                                {/*    </defs>*/}
                                {/*    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">*/}
                                {/*        <path fill="none" stroke-miterlimit="10" stroke-width="40"*/}
                                {/*              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"*/}
                                {/*              data-original="#000000"></path>*/}
                                {/*        <path*/}
                                {/*            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"*/}
                                {/*            data-original="#000000"></path>*/}
                                {/*    </g>*/}
                                {/*</svg>*/}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor={"password"} className="text-inputLabel text-[15px] mb-2 block">Password</label>
                            <div className="relative flex items-center">
                                <Input
                                    id={"password"}
                                    onChange={(e)=>(password.current=e.target.value)}
                                    required={true}
                                    label="Password"
                                    variant="bordered"
                                    // placeholder="Enter your password"

                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w"
                                />
                                {/*<input onChange={(e)=>(password.current=e.target.value)} name="password" type="password" required*/}
                                {/*       className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent focus:text-primaryText px-4 py-3.5 rounded-md outline-blue-600"*/}
                                {/*       placeholder="Enter password"/>*/}
                                {/*<svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"*/}
                                {/*     className="w-[18px] h-[18px] absolute right-4 cursor-pointer"*/}
                                {/*     viewBox="0 0 128 128">*/}
                                {/*    <path*/}
                                {/*        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"*/}
                                {/*        data-original="#000000"></path>*/}
                                {/*</svg>*/}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">

                            <div>
                                <a href="/forgotpassword"
                                   className="text-blue-600 font-semibold text-sm hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button isLoading={isLoading}  onClick={handleSubmit} color="primary" className="w-full shadow-xl py-3 px-6 text-sm tracking-wide rounded-md text-white bg-recruitBlue hover:bg-blue-700 focus:outline-none">
                                Sign in
                            </Button>

                        </div>




                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
