"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobApplicationHistory from "@/components/recruiter/JobApplicationHistory";

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

  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Application Summary"
          subtext="Application summary of Ravishan Jayathilake for the position of Senior Frontend Developer"
        />
        <div className="container mx-auto">
          <JobApplicationHistory {...applicationStages} />
        </div>
      </header>
    </div>
  );
};

export default CandidateApplicationHistory;
