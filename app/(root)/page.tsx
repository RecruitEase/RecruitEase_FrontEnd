"use client"
import React from 'react';
import {Button} from "@nextui-org/button";
import {signIn, signOut, useSession} from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Hero from "@/components/home/Hero";
import Apps from "@/components/home/Apps";
import Comparison from "@/components/home/Comparison";
import Stats from "@/components/home/Stats";
import People from "@/components/home/People";
import Footer from "@/components/home/Footer";

const Home2 = () => {
    const {data: session} = useSession();
    console.log({session});

    const axios = useAxiosAuth();

    const axiosTest = () => {
        axios.get('/auth/refresh').then((res) => {
            console.log(res);
        })
    }

    const notify = () => toast("Wow so easy!");
    return (
        <div className={"relative"}>
            <div className={"max-w-screen-xl mx-auto overflow-hidden"}>
                <Hero/>
                <Apps/>
                <Comparison/>
                <Stats/>
                <People/>
            </div>
            <Footer/>
            <svg className='absolute top-0 left-0 bottom-0 right-0 opacity-20 ' width="100%" height="100%">
                <pattern id="smallGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="#fff"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#smallGrid)"/>
            </svg>
        </div>
    );
};

export default Home2;