"use client";

import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import CoverLetter from "@/components/applicationsView/coverLetter";
import CV from "@/components/applicationsView/cv";
import { Button } from "@nextui-org/button";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import Questions from "@/components/applicationsView/Questions";
import { Link } from "@nextui-org/react";
import {useApplication, useWithdrawApplication} from "@/lib/hooks/useApplications";
import {useParams} from "next/navigation";
import { useRecruiter } from "@/lib/hooks/useRecruiters";
import LoadingComponent from "@/components/LoadingComponent";

const data = {
    coverLetter: {
        avatar: "/assets/companyLogos/IFS.jpg",
        companyName: "IFS",
        position: "Software Engineer",
        date: "2024/08/20",
        status: "Submitted",
        letter:
            "I am writing to express my interest in the [Job Title] position at [Company Name] as advertised on [Where You Found the Job Posting]. With my background in [Your Field or Major], I am confident in my ability to contribute effectively to your team.\n" +
            "I have [Number] years of experience in [Your Industry or Field], where I have developed skills in [Key Skills or Competencies]. In my previous role at [Previous Company], I successfully [Brief Description of a Key Achievement or Responsibility]. My ability to [Relevant Skill or Competency] has prepared me well for the challenges of the [Job Title] position.\n" +
            "I am particularly drawn to [Company Name] because of [Specific Reason Related to the Company]. I am excited about the opportunity to bring my unique skills to your team and contribute to [Specific Project or Goal of the Company].\n" +
            "Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and certifications will be a perfect fit for the [Job Title] position at [Company Name]. Please feel free to contact me at [Your Phone Number] or [Your Email Address] to schedule an interview.\n"
    },
    cvImage: "https://th.bing.com/th/id/OIP.gG3HC4XzyF9gMXoL9dM4lQHaKe?rs=1&pid=ImgDetMain"
};

const questions:Question[] = [
    {
        id: 1,
        type: "single", // type can be 'single' or 'multiple'
        text: "Which of the following is a version control system?",
        options: [
            { id: "a", text: "Git" },
            { id: "b", text: "JIRA" },
            { id: "c", text: "Confluence" },
            { id: "d", text: "Slack" },
        ],
        userAnswers: ["b"],
    },
    {
        id: 2,
        type: "multiple", // type can be 'single' or 'multiple'
        text: "Select the front-end frameworks/libraries you have experience with:",
        options: [
            { id: "a", text: "React" },
            { id: "b", text: "Angular" },
            { id: "c", text: "Vue" },
            { id: "d", text: "Django" },
        ],
        userAnswers: ["a", "d"],
    },
    {
        id: 3,
        type: "single", // type can be 'single' or 'multiple'
        text: "Which language is primarily used for Android app development?",
        options: [
            { id: "a", text: "Swift" },
            { id: "b", text: "Kotlin" },
            { id: "c", text: "JavaScript" },
            { id: "d", text: "Python" },
        ],
        userAnswers: ["b"],
    },
    {
        id: 4,
        type: "multiple", // type can be 'single' or 'multiple'
        text: "Which of the following are database management systems?",
        options: [
            { id: "a", text: "MySQL" },
            { id: "b", text: "MongoDB" },
            { id: "c", text: "PostgreSQL" },
            { id: "d", text: "Docker" },
        ],
        userAnswers: ["a", "b", "d"],
    },
];

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: number;
    type: "single" | "multiple";
    text: string;
    options: Option[];
    userAnswers: string[];
}




const job = {
    jobId: "001",
    logo: "https://example.com/logo1.png",
    title: "Software Engineer",
    company: "Tech Innovations Inc.",
    location: "New York, NY",
    type: "Full-time",
    daysLeft: "10 days left",
  };    
const ApplicationView: React.FC = () => {

    const params = useParams<{id:string}>()

    const withdrawApplicationMutation=useWithdrawApplication();
    const popupview = () => {
        Swal.fire({
            title: "Do you want to withdraw the application?",
            icon: "warning",
            customClass: {
                confirmButton: "bg-[#f31260]", // Custom class for confirm button
                cancelButton: "bg-[#a1a1aa]" // Custom class for cancel button
            },
            showCancelButton: true,
            confirmButtonText: "Withdraw"
        }).then(async (result) => {
            if (result.isConfirmed) {
  
                // Fetch application data API call
                withdrawApplicationMutation.mutate(params.id);
                
            }
        });
    };


    const applicationQuery=useApplication(params.id)
    const recruiterQuery=useRecruiter(applicationQuery.data?.recruiterId)
    //todo:fetch job


    return (
        <div>
            <HeaderBox
                type="title"
                title="Application Details"
                subtext="Application details when you click"
            />
            <div className={"w-full grid grid-cols-12 gap-8"}>
                <div className={"col-span-12 sm:col-span-8"}>
                    {(applicationQuery.data && recruiterQuery.data)? <CoverLetter job={job} application={applicationQuery.data!} recruiter={recruiterQuery.data!} /> : <LoadingComponent/>}
                </div>
                <div className={"col-span-12 sm:col-span-4"}>
                    <CV cvImage={data.cvImage} />
                </div>
            </div>

            <div>
                <Questions  questions={questions}>

                </Questions>
            </div>
            <div className={"flex w-full justify-end gap-4 mt-4"}>
                <Button className={"bg-recruitBlue text-white font-bold"} as={Link} href={"/jobs/1"}>Show Job</Button>
                <Button className={"bg-danger text-white font-bold"} onClick={popupview}>
                    Withdraw
                </Button>
            </div>
        </div>
    );
};

export default ApplicationView;
