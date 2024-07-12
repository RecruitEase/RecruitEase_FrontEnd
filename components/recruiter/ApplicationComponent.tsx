"use client"
import React, {useEffect} from "react";
import {Tabs, Tab, SelectItem, Select} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

import {useMediaQuery} from "react-responsive";
import {FaTag} from "react-icons/fa";
import {MdOutlineMail, MdOutlineLocationOn} from "react-icons/md";
import {Button} from "@nextui-org/button";
import ApplicationTable from "@/components/recruiter/ApplicationTable";


export default function ApplicationComponent() {
    const applicant = {
        name: "Mary Jane",
        city: "Colombo",
        email: "maryjane@gmail.com",
        status: "underReview",
        appliedDate: "2024-10-10",
    }

    const [isVertical, setIsVertical] = React.useState(true);

    //to make the tabs horizontal on mobile
    const isMiddleSize = useMediaQuery({maxWidth: 768});

    useEffect(() => {
        if (isMiddleSize) {
            setIsVertical(false);
        } else {
            setIsVertical(true);
        }
    }, [isMiddleSize])

    const tabList = [
        {key: 'allApplicants', title: 'All Applicants', color: '#1E3A8A'}, // Light Blue
        {key: 'underReview', title: 'Under Review', color: '#59cfa6'}, // Light Blue
        {key: 'preScreeningPassed', title: 'Pre-Screening Passed', color: '#827717'}, // Light Green
        {key: 'preScreeningFailed', title: 'Pre-Screening Failed', color: '#B71C1C'}, // Light Red
        {key: 'shortlisted', title: 'Shortlisted', color: '#F57F17'}, // Light Yellow
        {key: 'interviewScheduled', title: 'Interview Scheduled', color: '#6A1B9A'}, // Light Purple
        {key: 'interviewed', title: 'Interviewed', color: '#006064'}, // Light Teal
        {key: 'offered', title: 'Offered', color: '#E65100'}, // Light Orange
        {key: 'hired', title: 'Hired', color: '#2E7D32'}, // Light Lime
        {key: 'rejected', title: 'Rejected', color: '#880E4F'}, // Light Pink
        {key: 'archived', title: 'Archived', color: '#424242'} // Light Grey
    ];


    return (
        <div className="flex flex-col px-4 mb-[100px]">
            <div className="flex w-full flex-col">
                <Tabs className={"mb-5"} color={"primary"} aria-label="Options" isVertical={isVertical}>

                    {tabList.map((tab) => (
                        <Tab className={"h-10 w-full"} key={tab.key}
                             title={<>{tab.title} &nbsp; <FaTag style={{"fill": tab.color, "display": "unset"}}/></>}>
                            <Card className={"w-full bg-transparent border"}>
                                <CardBody>
                                    <div
                                        className="grid grid-cols-12 gap-1 items-center justify-center">
                                        <div className="relative col-span-7 ">
                                            <ApplicationTable/>
                                        </div>
                                        <div
                                            className="relative col-span-5  bg-transparent rounded-lg overflow-hidden shadow-lg ">
                                            <div className={"flex  flex-col gap-2 justify-center items-center"}>
                                                <Select
                                                    label={"Move to"}
                                                    placeholder="Select a status"
                                                    className="max-w-xs col-span-6"
                                                    size={"sm"}
                                                    defaultSelectedKeys={["underReview"]}
                                                >
                                                    {tabList.map((tab) => (
                                                        <SelectItem key={tab.key}>
                                                            {tab.title}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <div className={"col-span-6 flex justify-end"}>
                                                    <FaTag style={{
                                                        "fill": tabList.find(obj => obj.key == applicant.status).color,
                                                        "display": "unset"
                                                    }}/>
                                                    &nbsp;
                                                    <span
                                                        className="text-sm font-semibold text-gray-800 dark:text-white">{tabList.find(obj => obj.key == applicant.status).title}</span>
                                                </div>
                                            </div>
                                            <div className="border-b px-4 pb-6">
                                                <div className={"grid grid-cols-12 gap-2 items-center justify-center"}>


                                                </div>
                                                <div className="text-center my-4">
                                                    <img
                                                        className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto "
                                                        src="https://randomuser.me/api/portraits/women/21.jpg"
                                                        alt=""/>
                                                    <div>
                                                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{applicant.name}</h3>
                                                        <div
                                                            className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                                            <MdOutlineLocationOn/>&nbsp;
                                                            {applicant.city}
                                                        </div>
                                                        <br/>
                                                        <div
                                                            className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                                            <MdOutlineMail/>
                                                            &nbsp;
                                                            {applicant.email}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 px-2">
                                                    <button
                                                        className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                                                        View CV
                                                    </button>
                                                    <button
                                                        className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black hover:bg-blue-600 hover:text-white dark:text-white px-4 py-2">
                                                        Message
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="px-4 py-4">
                                                <div
                                                    className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                                                    <div className={"w-1/2 flex flex-col justify-center items-center gap-2"}>
                                                        <Button size={"sm"} className={"w-full bg-purple-500 text-white"}>
                                                            View Answers
                                                        </Button>

                                                        <Button size={"sm"} color={"secondary"}
                                                                className={" w-full bg-purple-500 text-white"}>
                                                            Schedule Interview
                                                        </Button>

                                                        <Button size={"sm"} color={"secondary"}
                                                                className={"w-full bg-purple-500 text-white"}>
                                                            More Actions
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center flex-col justify-center">
                                                        <small>Application Date: </small>
                                                        <small><b>{ applicant.appliedDate}</b></small>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                    ))}


                </Tabs>
            </div>
        </div>
    );
}
