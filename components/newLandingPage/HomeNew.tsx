"use client"
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
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import EmblaCarousel from './EmblaCarousel'
import {JobProps} from "@/types";



const jobs:JobProps[] = [
    {
        key: 1,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/1.jpg',
        title: 'Officer - Customer Verification',
        company: 'Dialog Finance PLC',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '7',
    },
    {
        key: 2,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/2.gif',
        title: 'Field Audit Assistant',
        company: 'Lanka Canneries (Pvt) Ltd',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '14',
    },
    {
        key: 3,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/3.jpg',
        title: 'Recovery Officers / Trainees',
        company: 'Asia Asset Finance PLC',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '14',
    },
    {
        key: 4,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/4.jpg',
        title: 'Finance & Admin Executive',
        company: 'Kelly Felder',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '4',
    },
    {
        key: 5,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/5.jpg',
        title: 'Executive - Maintenance',
        company: 'PizzaHut Sri Lanka',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '10',
    },
    {
        key: 6,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/6.jpg',
        title: 'Shift Manager',
        company: 'Fab',
        location: 'Kandy, Central Province',
        type: 'Full-Time',
        daysLeft: '4',
    },
    {
        key: 7,
        id:'mdwlmdwmmom',
        logo: '/assets/landing/7.jpg',
        title: 'Senior Manager',
        company: 'LOLC Holdings',
        location: 'Colombo, Western Province',
        type: 'Full-Time',
        daysLeft: '4',
    },
];


const HomeNew = () => {

    //carousel
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
    const SLIDE_COUNT = 10
    const SLIDES = jobs

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
            <div className={"max-w-screen-2xl mx-auto overflow-hidden shadow-none "}>
                <Card className="w-full h-fit mt-3 shadow-none">
                    {/*<CardHeader className="absolute z-10 top-1 flex-col items-start">*/}
                    {/*    <p className="text-tiny text-white/60 uppercase font-bold">RecruitEase</p>*/}
                    {/*    <h4 className="text-white/90 font-medium text-xl">Making Recruitment and Job Finding Easy</h4>*/}
                    {/*</CardHeader>*/}
                    <CardBody>
                        <Hero/>

                    </CardBody>


                </Card>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                <Apps/>
                <Comparison/>
                <Stats/>
                <People/>
            </div>
        </div>
    );
};

export default HomeNew;