"use client";
import React from "react";
import ProfileCard from "@/components/recruiterProfile/ProfileCard";
import RecruiterJobs from "@/components/recruiterProfile/RecruiterJobs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col xl:flex-row xl:justify-center">
      {/* Main Section */}

      <div className="bg-white flex flex-col w-full xl:w-2/3 ">
        <RecruiterJobs />
      </div>

      {/* Left Section */}
      <div className="bg-white flex flex-col w-full xl:w-1/3 mt-4 xl:mt-0 xl:ml-4">
        <ProfileCard />
      </div>
    </div>
  );
}
