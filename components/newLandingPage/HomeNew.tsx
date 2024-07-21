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
import EmblaCarouselJobs from './EmblaCarouselJobs'
import EmblaCarouselCategories from './EmblaCarouselCategories'
import {JobProps,FieldProps} from "@/types";



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
const fieldValues: FieldProps[] = [
    {key: 1, label: "Account & Finance", id: "1", nJobs: 144},
    {key: 2, label: "Administration / Secretarial", id: "2", nJobs: 25},
    {key: 3, label: "Agriculture", id: "3", nJobs: 154},
    {key: 4, label: "Apparel", id: "4", nJobs: 159},
    {key: 5, label: "Architecture", id: "5", nJobs: 35},
    {key: 6, label: "Automobile", id: "6", nJobs: 149},
    {key: 7, label: "Banking and Financial Services", id: "7", nJobs: 80},
    {key: 8, label: "Beauty & Hairdressing", id: "8", nJobs: 68},
    {key: 9, label: "BPO/ KPO", id: "9", nJobs: 69},
    {key: 10, label: "Building & Construction", id: "10", nJobs: 132},
    {key: 11, label: "Business Management", id: "11", nJobs: 31},
    {key: 12, label: "Call Center", id: "12", nJobs: 51},
    {key: 13, label: "Charity / NGO", id: "13", nJobs: 139},
    {key: 14, label: "Customer Service", id: "14", nJobs: 24},
    {key: 15, label: "Delivery / Driving / Transport", id: "15", nJobs: 48},
    {key: 16, label: "Digital Marketing", id: "16", nJobs: 168},
    {key: 17, label: "Education / Higher Education", id: "17", nJobs: 2},
    {key: 18, label: "Electronics / Electrical", id: "18", nJobs: 93},
    {key: 19, label: "Engineering / Manufacturing", id: "19", nJobs: 80},
    {key: 20, label: "Environment/ Health & Safety", id: "20", nJobs: 43},
    {key: 21, label: "FMCG/ Food Industry", id: "21", nJobs: 60},
    {key: 23, label: "Government/ Public Sector", id: "23", nJobs: 182},
    {key: 24, label: "Hospital/ Nursing/ Healthcare", id: "24", nJobs: 124},
    {key: 25, label: "Hotel/ Hospitality/ Leisure", id: "25", nJobs: 17},
    {key: 26, label: "Human Resources / Recruitment", id: "26", nJobs: 175},
    {key: 27, label: "Insurance", id: "27", nJobs: 146},
    {key: 28, label: "Interior Design", id: "28", nJobs: 122},
    {key: 29, label: "Internship / Undergraduate", id: "29", nJobs: 13},
    {key: 30, label: "IT-HWare/ Networks/ Systems", id: "30", nJobs: 19},
    {key: 31, label: "IT-SWare / Internet", id: "31", nJobs: 127},
    {key: 32, label: "Legal / Law", id: "32", nJobs: 130},
    {key: 33, label: "Media/ Advertising/ Communication/ Design", id: "33", nJobs: 173},
    {key: 34, label: "Oil, Gas and Nuclear", id: "34", nJobs: 151},
    {key: 35, label: "Other", id: "35", nJobs: 84},
    {key: 36, label: "Pharmaceutical", id: "36", nJobs: 139},
    {key: 37, label: "Production & Operations", id: "37", nJobs: 72},
    {key: 38, label: "Project Management / Programme Management", id: "38", nJobs: 166},
    {key: 39, label: "Quality Assurance", id: "39", nJobs: 12},
    {key: 40, label: "Real Estate", id: "40", nJobs: 60},
    {key: 41, label: "Recoveries", id: "41", nJobs: 145},
    {key: 42, label: "Retail / Fashion", id: "42", nJobs: 14},
    {key: 43, label: "Sales / Marketing / New Business Development", id: "43", nJobs: 41},
    {key: 44, label: "School Leavers", id: "44", nJobs: 189},
    {key: 45, label: "Science / Research", id: "45", nJobs: 140},
    {key: 46, label: "Security/ Military", id: "46", nJobs: 13},
    {key: 47, label: "Senior Management / Directors", id: "47", nJobs: 20},
    {key: 48, label: "Sports/Fitness/Recreation", id: "48", nJobs: 186},
    {key: 49, label: "Startup/ Tech-startup", id: "49", nJobs: 10},
    {key: 50, label: "Supply Chain / Logistics / Procurement", id: "50", nJobs: 141},
    {key: 51, label: "Technical/ Mechanical", id: "51", nJobs: 23},
    {key: 52, label: "Telecommunications", id: "52", nJobs: 125},
    {key: 53, label: "Training and Development", id: "53", nJobs: 90},
    {key: 54, label: "Travel/Ticketing/Airline/Shipping", id: "54", nJobs: 28},
];
const HomeNew = () => {

    //carousel
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
    const SLIDE_COUNT = 10
    const SLIDES = jobs
    const SLIDES_CATEGORIES = fieldValues

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
                <h1 className="header-box-title">
                Recent Jobs
                </h1>
                <EmblaCarouselJobs slides={SLIDES} options={OPTIONS} />
                <h1 className="mt-6 header-box-title">
                Job Fields
                </h1>
                <EmblaCarouselCategories slides={SLIDES_CATEGORIES} options={OPTIONS} />
                <Apps/>
                <Comparison/>
                <Stats/>
                <People/>
            </div>
        </div>
    );
};

export default HomeNew;