// pages/index.jsx
"use client";
import React from "react";
import JobCard from "./JobCard";
import JobResultsHeader from "./JobResultsHeader";

const jobs = [
  {
    logo: "https://dummyimage.com/100x100/000/fff&text=Outer+Space",
    title: "Assistant Operations Manager | Colombo",
    company: "Outer Space (Private) Limited",
    location: "Colombo, Western Province",
    type: "Full-Time",
    daysLeft: "4 days left",
  },
  {
    logo: "https://dummyimage.com/100x100/000/fff&text=Dewan+Consultants",
    title: "Digital Media / Administration Executive",
    company: "Dewan Consultants Sri Lanka",
    location: "Colombo, Western Province",
    type: "Full-Time",
    daysLeft: "4 days left",
  },
  {
    logo: "https://dummyimage.com/100x100/000/fff&text=Anunine+Holdings",
    title: "Manager - Talent Development | Colombo",
    company: "Anunine Holdings",
    location: "Colombo, Western Province",
    type: "Full-Time",
    daysLeft: "5 days left",
  },
  // Add more job entries as needed
];

const RecruiterJobs = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid grid-cols-1 gap-8">
        <div className="md:col-span-3 space-y-4">
          <JobResultsHeader
            totalJobs={jobs.length}
            company="Dialog Axiata PLC"
          />
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobs;
