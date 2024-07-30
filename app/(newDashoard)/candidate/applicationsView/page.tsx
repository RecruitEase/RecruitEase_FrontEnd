"use client";

import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import CoverLetter from "@/components/applicationsView/coverLetter";
import CV from "@/components/applicationsView/cv";
import { Button } from "@nextui-org/button";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

const data = {
    coverLetter: {
        avatar: "",
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

const popup = () => {
    Swal.fire({
        title: "Do you want to withdraw the application?",
        icon: "warning",
        customClass: {
            confirmButton: "bg-[#f31260]", // Custom class for confirm button
            cancelButton: "bg-[#a1a1aa]" // Custom class for cancel button
        },
        showCancelButton: true,
        confirmButtonText: "Withdraw"
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate a successful withdrawal response
            const result = {
                status: 200
            };
            if (result?.status == 200) {
                toast.success("Withdrawn successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            } else {
                toast.error("Withdrawal failed!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            }
        }
    });
};

const withdrawButton = () => {
    popup();
};

const ApplicationView = () => {
    return (
        <div>
            <HeaderBox
                type="title"
                title="Application View"
                subtext="Manage your submitted applications from here"
            />
            <div className={"w-full grid grid-cols-12 gap-8"}>
                <div className={"col-span-12 sm:col-span-8"}>
                    <CoverLetter coverLetter={data.coverLetter} />
                </div>
                <div className={"col-span-12 sm:col-span-4"}>
                    <CV cvImage={data.cvImage} />
                </div>
            </div>
            <div className={"flex w-full justify-end gap-4 mt-4"}>
                <Button className={"bg-recruitBlue text-white font-bold"}>Show Job</Button>
                <Button className={"bg-warning text-white font-bold"} onClick={withdrawButton}>
                    Withdraw
                </Button>
            </div>
        </div>
    );
};

export default ApplicationView;
