"use client"
import React from 'react';
import {Button} from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "@/components/cvBuilder/Pages/Home/Home";
import ResumeState from "@/components/cvBuilder/Context/ResumeState";
import {ChakraProvider} from "@chakra-ui/react";

const Home2 = () => {
    const { data: session } = useSession();
    console.log({ session });

    const axios=useAxiosAuth();

    const axiosTest=()=>{
        axios.get('/auth/refresh').then((res)=>{
            console.log(res);
        })
    }

    const notify = () => toast("Wow so easy!");
    return (
        <ChakraProvider >

        <ResumeState>
        <Home/>
        </ResumeState>
        </ChakraProvider>
    );
};

export default Home2;
