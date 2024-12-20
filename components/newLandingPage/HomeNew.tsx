"use client";
import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "@/components/home/Hero";
import Apps from "@/components/home/Apps";
import Comparison from "@/components/home/Comparison";
import Footer from "@/components/home/Footer";
import Stats from "@/components/home/Stats";
import People from "@/components/home/People";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import React, {useCallback, useState} from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import EmblaCarouselJobs from "./EmblaCarouselJobs";
import EmblaCarouselCategories from "./EmblaCarouselCategories";
import { JobProps, FieldProps } from "@/types";
import Create from "@/app/(newDashoard)/candidate/cvs/create/page";
import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";
import { motion, useScroll } from "framer-motion";
import man from '@/public/assets/man.png';
import searchIcon from '@/public/assets/search.png';
import {useLiveJobs} from "@/lib/hooks/useJobs";
import {useRecruiters} from "@/lib/hooks/useRecruiters";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import {useRouter} from "next/navigation";

const wrapper = {
  hidden:{
      opacity:0
  },
  visible:{
      opacity:1,
      transition:{
          staggerChildren:0.25,
      }
  }
}

const container = {
  visible:{
      transition:{
          staggerChildren:0.025
      }
  }
}

const list = {
  hidden:{opacity:0, x:-100},
  visible:{
      opacity:1,
      x:0,
      transition:{duration:0.5 , ease:[0.455, 0.03, 0.515, 0.955], delay:1}
  }
}
// const jobs: JobProps[] = [
//   {
//     key: 1,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/1.jpg",
//     title: "Officer - Customer Verification",
//     company: "Dialog Finance PLC",
//     location: "Colombo, Western Province",
//     type: "Full-Time",
//     daysLeft: "7",
//   },
//   {
//     key: 2,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/2.gif",
//     title: "Field Audit Assistant",
//     company: "Lanka Canneries (Pvt) Ltd",
//     location: "Colombo, Western Province",
//     type: "Full-Time",
//     daysLeft: "14",
//   },
//   {
//     key: 3,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/3.jpg",
//     title: "Recovery Officers / Trainees",
//     company: "Asia Asset Finance PLC",
//     location: "Colombo, Western Province",
//     type: "Full-Time",
//     daysLeft: "14",
//   },
//   {
//     key: 4,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/4.jpg",
//     title: "Finance & Admin Executive",
//     company: "Kelly Felder",
//     location: "Colombo, Western Province",
//     type: "Full-Time",
//     daysLeft: "4",
//   },
//   {
//     key: 5,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/5.jpg",
//     title: "Executive - Maintenance",
//     company: "PizzaHut Sri Lanka",
//     location: "Colombo, Western Province",
//     type: "Full-Time",
//     daysLeft: "10",
//   },
//   {
//     key: 6,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/6.jpg",
//     title: "Shift Manager",
//     company: "Fab",
//     location: "Kandy, Central Province",
//     type: "Full-Time",
//     daysLeft: "4",
//   },
//   {
//     key: 7,
//     id: "mdwlmdwmmom",
//     logo: "/assets/landing/7.jpg",
//     title: "Senior Manager",
//     company: "LOLC Holdings",
//     location: "Colombo, Western Province",
//     type: "Full-Time",
//     daysLeft: "4",
//   },
// ];
const fieldValues: FieldProps[] = [
  { key: 1, label: "Account & Finance", id: "1", nJobs: 144 },
  { key: 2, label: "Administration / Secretarial", id: "2", nJobs: 25 },
  { key: 3, label: "Agriculture", id: "3", nJobs: 154 },
  { key: 4, label: "Apparel", id: "4", nJobs: 159 },
  { key: 5, label: "Architecture", id: "5", nJobs: 35 },
  { key: 6, label: "Automobile", id: "6", nJobs: 149 },
  { key: 7, label: "Banking and Financial Services", id: "7", nJobs: 80 },
  { key: 8, label: "Beauty & Hairdressing", id: "8", nJobs: 68 },
  { key: 9, label: "BPO/ KPO", id: "9", nJobs: 69 },
  { key: 10, label: "Building & Construction", id: "10", nJobs: 132 },
  { key: 11, label: "Business Management", id: "11", nJobs: 31 },
  { key: 12, label: "Call Center", id: "12", nJobs: 51 },
  { key: 13, label: "Charity / NGO", id: "13", nJobs: 139 },
  { key: 14, label: "Customer Service", id: "14", nJobs: 24 },
  { key: 15, label: "Delivery / Driving / Transport", id: "15", nJobs: 48 },
  { key: 16, label: "Digital Marketing", id: "16", nJobs: 168 },
  { key: 17, label: "Education / Higher Education", id: "17", nJobs: 2 },
  { key: 18, label: "Electronics / Electrical", id: "18", nJobs: 93 },
  { key: 19, label: "Engineering / Manufacturing", id: "19", nJobs: 80 },
  { key: 20, label: "Environment/ Health & Safety", id: "20", nJobs: 43 },
  { key: 21, label: "FMCG/ Food Industry", id: "21", nJobs: 60 },
  { key: 23, label: "Government/ Public Sector", id: "23", nJobs: 182 },
  { key: 24, label: "Hospital/ Nursing/ Healthcare", id: "24", nJobs: 124 },
  { key: 25, label: "Hotel/ Hospitality/ Leisure", id: "25", nJobs: 17 },
  { key: 26, label: "Human Resources / Recruitment", id: "26", nJobs: 175 },
  { key: 27, label: "Insurance", id: "27", nJobs: 146 },
  { key: 28, label: "Interior Design", id: "28", nJobs: 122 },
  { key: 29, label: "Internship / Undergraduate", id: "29", nJobs: 13 },
  { key: 30, label: "IT-HWare/ Networks/ Systems", id: "30", nJobs: 19 },
  { key: 31, label: "IT-SWare / Internet", id: "31", nJobs: 127 },
  { key: 32, label: "Legal / Law", id: "32", nJobs: 130 },
  {
    key: 33,
    label: "Media/ Advertising/ Communication/ Design",
    id: "33",
    nJobs: 173,
  },
  { key: 34, label: "Oil, Gas and Nuclear", id: "34", nJobs: 151 },
  { key: 35, label: "Other", id: "35", nJobs: 84 },
  { key: 36, label: "Pharmaceutical", id: "36", nJobs: 139 },
  { key: 37, label: "Production & Operations", id: "37", nJobs: 72 },
  {
    key: 38,
    label: "Project Management / Programme Management",
    id: "38",
    nJobs: 166,
  },
  { key: 39, label: "Quality Assurance", id: "39", nJobs: 12 },
  { key: 40, label: "Real Estate", id: "40", nJobs: 60 },
  { key: 41, label: "Recoveries", id: "41", nJobs: 145 },
  { key: 42, label: "Retail / Fashion", id: "42", nJobs: 14 },
  {
    key: 43,
    label: "Sales / Marketing / New Business Development",
    id: "43",
    nJobs: 41,
  },
  { key: 44, label: "School Leavers", id: "44", nJobs: 189 },
  { key: 45, label: "Science / Research", id: "45", nJobs: 140 },
  { key: 46, label: "Security/ Military", id: "46", nJobs: 13 },
  { key: 47, label: "Senior Management / Directors", id: "47", nJobs: 20 },
  { key: 48, label: "Sports/Fitness/Recreation", id: "48", nJobs: 186 },
  { key: 49, label: "Startup/ Tech-startup", id: "49", nJobs: 10 },
  {
    key: 50,
    label: "Supply Chain / Logistics / Procurement",
    id: "50",
    nJobs: 141,
  },
  { key: 51, label: "Technical/ Mechanical", id: "51", nJobs: 23 },
  { key: 52, label: "Telecommunications", id: "52", nJobs: 125 },
  { key: 53, label: "Training and Development", id: "53", nJobs: 90 },
  { key: 54, label: "Travel/Ticketing/Airline/Shipping", id: "54", nJobs: 28 },
];
const HomeNew = () => {
  const [searchVal,setSearchVal]=useState('');
  const router=useRouter()

  const handleSearch=()=>{
    console.log("adseadewdew ",searchVal)
    window.location.href = '/jobs?q='+searchVal;
  }


  const jobQuery=useLiveJobs();
  const recruiterIdList:string[] = [];

  jobQuery.data?.map(app => {
    if (recruiterIdList.indexOf(app.recruiterId!) === -1) {
      recruiterIdList.push(app.recruiterId!)
    }
  });
  const recruiterQuery=useRecruiters(recruiterIdList)

  const { scrollYProgress } = useScroll();
  //carousel
  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
  const SLIDE_COUNT = 10;
  const SLIDES = jobQuery.data;
  const SLIDES_CATEGORIES = fieldValues;

  const { data: session } = useSession();
  console.log({ session });

  const axios = useAxiosAuth();

  const axiosTest = () => {
    axios.get("/auth/refresh").then((res) => {
      console.log(res);
    });
  };

  const notify = () => toast("Wow so easy!");



  return (
    <div className={"relative"}>
      <div className={"max-w-screen-2xl mx-auto overflow-hidden shadow-none "}>
        <div className="px-10 flex justify-center h-[600px] bg-recruitBlue text-white">
          <div className="w-[1400px] flex items-center">
            <div className="flex flex-col gap-[30px]">
              <motion.h1 initial='hidden' animate='visible' variants={wrapper} className="text-[50px]">
                Find the perfect <i className="font-light"> job opportunities </i> for your career growth
              </motion.h1>
              <div className="flex items-center justify-between bg-white rounded-md">
                <div className="flex items-center w-full gap-[10px]">
                  <img src="/assets/search.png" alt="search image" className="w-[20px] h-[20px] m-[10px]"/>
                  <input
                      type="text"
                      placeholder='Try "software developer"'
                      className="text-black border-none outline-none w-full"
                      onChange={(e)=>setSearchVal(e.target.value)}
                  />
                </div>
                <button
                    onClick={handleSearch}
                    className="w-[120px] h-[50px] bg-success text-white border-none rounded-tr-md rounded-br-md cursor-pointer">
                  Search
                </button>
              </div>
              <div className="flex items-center gap-[10px]">
                <span>Popular: </span>
                <button
                    className="text-white bg-transparent border border-white px-[10px] py-[5px] rounded-full text-[14px] cursor-pointer hover:bg-white hover:text-primaryText">Software
                  Engineer
                </button>
                <button
                    className="text-white bg-transparent border border-white px-[10px] py-[5px] rounded-full text-[14px] cursor-pointer hover:bg-white hover:text-primaryText">FrontEnd
                  Dev
                </button>
                <button
                    className="text-white bg-transparent border border-white px-[10px] py-[5px] rounded-full text-[14px] cursor-pointer hover:bg-white hover:text-primaryText">Sales
                  Executive
                </button>
                <button
                    className="text-white bg-transparent border border-white px-[10px] py-[5px] rounded-full text-[14px] cursor-pointer hover:bg-white hover:text-primaryText">Project
                  Manager
                </button>
              </div>
              <motion.ul initial='hidden' animate='visible' variants={wrapper} className='text-white space-y-2'>
                <motion.li variants={list} className='flex gap-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                       className="fill-current h-5 shrink-0 mt-0.5">
                    <path
                        d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span>Apply for jobs with ease</span>
                </motion.li>
                <motion.li variants={list} className='flex gap-3 '>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                       className="fill-current h-5 shrink-0 mt-0.5">
                    <path
                        d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span>Receive personalized job recommendations</span>
                </motion.li>
                <motion.li variants={list} className='flex gap-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                       className="fill-current h-5 shrink-0 mt-0.5">
                    <path
                        d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span>Create and manage your CV and portfolio</span>
                </motion.li>
                <motion.li variants={list} className='flex gap-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                       className="fill-current h-5 shrink-0 mt-0.5">
                    <path
                        d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span>Participate in online interviews through the platform </span>
                </motion.li>
              </motion.ul>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, delay: 1.5}}
                          className=' flex flex-col items-center sm:flex-row gap-3'>
                <Button color={"success"} href={"/jobs"} as={Link}>
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                       className="fill-current h-3.5 ">
                    <path
                        d="M429.8 273l17-17-17-17L276.2 85.4l-17-17-33.9 33.9 17 17L354.9 232 24 232 0 232l0 48 24 0 330.8 0L242.2 392.6l-17 17 33.9 33.9 17-17L429.8 273z"></path>
                  </svg>
                </Button>

              </motion.div>
            </div>
            <motion.div initial={{opacity: 0, x: -300}} animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 1.5}} className='h-full lg:block hidden'>
              <img src="/assets/woman-bg.png" alt="man image" className="h-full max-w-max"/>
            </motion.div>
          </div>
        </div>


        {/* <Card className="w-full h-fit mt-3 shadow-none">
          <CardBody>
            <Hero/>
          </CardBody>
        </Card> */}
        <h1 className="header-box-title mt-5">Recent Jobs</h1>
        {(jobQuery.isFetching || recruiterQuery.isFetching) ?
            <LoadingComponent/> : (jobQuery.isError || recruiterQuery.isError) ? <ErrorComponent/> :
                <>
                  <EmblaCarouselJobs slides={SLIDES!} options={OPTIONS} recruiters={recruiterQuery.data!}/>
                  <h1 className="mt-6 header-box-title">Job Fields</h1>
                  <EmblaCarouselCategories slides={SLIDES_CATEGORIES} options={OPTIONS}/>
                </>
        }

        <Apps/>

        <section className="text-gray-700 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div
                className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Don&apos;t have a CV?
                <br/>
                We got you!
              </h1>
              <p className="mb-8 leading-relaxed">
                Create a professional CV effortlessly with our customizable
                templates. Our system allows you to select from a variety of
                designs and formats, making it easy to tailor your CV to suit
                your unique style and needs. Whether you're starting from
                scratch or updating an existing resume, our user-friendly
                platform ensures you create a polished and professional document
                in no time. Let us help you make a lasting impression with a CV
                that stands out.
              </p>
              <div className="flex justify-center">
                <Button
                    as={Link}
                    href="/candidate/cv/create"
                    className="inline-flex text-white bg-recruitBlue border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Create CV Now
                </Button>
              </div>
            </div>
            <div className="lg:w-full md:w-1/2 w-5/6">
              <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="/assets/landing/cv2.png"
              />
            </div>
          </div>
        </section>

        <h1 className="text-center text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">
          Not Just for Job Seekers, but Also a Powerful Tool for <span className="text-recruitBlue">Recruiters</span>!
        </h1>

        <motion.section
            initial={{opacity: 0, scale: 0.7}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{delay: 0.5, duration: 0.5}}
            className='"pt-12 pb-12 sm:pb-16 lg:pt-8'
        >
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
                className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-pj">
                    Tired of the Hiring Headache? We Have the Solution!
                  </h1>
                  <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
                    Say goodbye to the stress of hiring with our comprehensive
                    applicant tracking system. Designed to simplify every step
                    of the recruitment process, our platform offers seamless job
                    posting, easy resume parsing, and intuitive candidate
                    management. Keep track of applicants effortlessly,
                    streamline communication, and make informed hiring decisions
                    with our powerful analytics. Let us take the headache out of
                    hiring so you can focus on finding the perfect candidate.
                  </p>
                </div>

                <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">
                      <AnimatedCounter end={1000} duration={3}/>+
                    </p>
                    <p className="ml-3 text-sm text-gray-900 font-pj">
                      Recruiters
                      <br/>
                      Registered
                    </p>
                  </div>

                  <div className="hidden sm:block">
                    <svg
                        className="text-gray-400"
                        width="16"
                        height="39"
                        viewBox="0 0 16 39"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                          x1="0.72265"
                          y1="10.584"
                          x2="15.7226"
                          y2="0.583975"
                      ></line>
                      <line
                          x1="0.72265"
                          y1="17.584"
                          x2="15.7226"
                          y2="7.58398"
                      ></line>
                      <line
                          x1="0.72265"
                          y1="24.584"
                          x2="15.7226"
                          y2="14.584"
                      ></line>
                      <line
                          x1="0.72265"
                          y1="31.584"
                          x2="15.7226"
                          y2="21.584"
                      ></line>
                      <line
                          x1="0.72265"
                          y1="38.584"
                          x2="15.7226"
                          y2="28.584"
                      ></line>
                    </svg>
                  </div>

                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">
                      <AnimatedCounter end={20000} duration={3}/>+
                    </p>
                    <p className="ml-3 text-sm text-gray-900 font-pj">
                      Job Positions
                      <br/>
                      Filled
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <img
                    className="w-full"
                    src="/assets/landing/illustration.png"
                    alt=""
                />
              </div>
            </div>
          </div>
        </motion.section>
        <Comparison/>
        <Footer/>
      </div>
    </div>
  );
};

export default HomeNew;
