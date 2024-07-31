"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobApplicationHistory from "@/components/recruiter/JobApplicationHistory";
import { Button } from "@nextui-org/react";
import ProfileSummaryCard from "@/components/recruiter/ProfileSummaryCard";
import { RiProfileFill } from "react-icons/ri";
import { CiViewTimeline } from "react-icons/ci";
import { useRouter } from "next/navigation";
const CandidateApplicationHistory = () => {
  const applicationStages = {
    applied: {
      date: "January 13th, 2022",
      link: "#",
      linkText: "View Application",
    },
    preScreening: {
      date: "January 13th, 2022",
      score: "80%",
      link: "#",
      linkText: "View Answers",
    },
    shortListed: null,
    interviewScheduled: { date: "January 13th, 2022", status: "Accepted" },
    interview: {
      date: "January 13th, 2022",
      status: "Selected",
      link: "#",
      linkText: "View Notes",
    },
    offered: {
      companyName: "Company XYZ",
      position: "Senior Frontend Developer",
      imageUrl: "/path/to/logo.png",
      type: "Full-time",
      location: "Remote",
      link: "#",
      date: "January 20th, 2022",
      linkText: "View Offer Note",
      time: "10:00 AM",
      dressCode: "Business Casual",
      remainingDays: "5 days",
      description:
        "Congratulations! You have been offered a position at Company XYZ.",
    },
    rejected: { date: "January 13th, 2022", link: "#", linkText: "View Notes" },
  };

  const router=useRouter();

  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Application Summary"
          subtext="Application summary of Ravishan Jayathilake for the position of Senior Frontend Developer"
        />
      </header>

      <div className="inline-flex rounded-md shadow-sm mb-5" role="group">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <RiProfileFill />
          <span>&nbsp;&nbsp;</span> Download Applied CV
        </button>

        <button
        onClick={()=>{
          router.push("/jobs/abc123")
        }}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <CiViewTimeline /> <span>&nbsp;&nbsp;</span>View Vacancy
        </button>
      </div>

      <div className="container mx-auto grid grid-cols-2 gap-4">
        <JobApplicationHistory {...applicationStages} />
        <ProfileSummaryCard />
      </div>
    </div>
  );
};

export default CandidateApplicationHistory;
