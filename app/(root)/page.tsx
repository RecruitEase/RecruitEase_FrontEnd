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
import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";


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
            <div className={"max-w-screen-xl mx-auto overflow-hidden shadow-none "}>
                <Card className="w-full h-fit">
                    {/*<CardHeader className="absolute z-10 top-1 flex-col items-start">*/}
                    {/*    <p className="text-tiny text-white/60 uppercase font-bold">RecruitEase</p>*/}
                    {/*    <h4 className="text-white/90 font-medium text-xl">Making Recruitment and Job Finding Easy</h4>*/}
                    {/*</CardHeader>*/}
                    <CardBody>
                        <Hero/>

                    </CardBody>


                </Card>
                <Apps/>
                <Comparison/>
                <Stats/>
                <People/>
            </div>
        </div>
    );
};

export default Home2;