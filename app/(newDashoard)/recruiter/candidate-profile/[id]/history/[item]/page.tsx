"use client";
import React, { useEffect, useState } from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobApplicationHistory from "@/components/recruiter/JobApplicationHistory";
import ProfileSummaryCard from "@/components/recruiter/ProfileSummaryCard";
import { RiProfileFill } from "react-icons/ri";
import { CiViewTimeline } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { CandidateProp } from "@/types/users";
import {
  getHistoryPerApplication,
  getApplication,
  getJobById,
  getCandidate,
} from "@/lib/api";

interface AtsResponse {
  applicationId: string;
  status: string;
  updatedAt: string; // ISO string or Date
}

const CandidateApplicationHistory = () => {
  const params = useParams();
  const applicationId: string = params?.item as string;
  const candidateId: string = params?.id as string;
  const [userData, setUserData] = useState<CandidateProp>();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    location: "",
    imageUrl: "",
    city: "",
    status: "",
    profilePic: "",
  });
  const router = useRouter();
  const [historyData, setHistoryData] = useState<AtsResponse[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch application details
        const application = await getApplication(applicationId);

        // Fetch job details using jobId
        const job = await getJobById(application.jobId);

        // Set job title
        setJobTitle(job.title);

        // Fetch history data
        const history = await getHistoryPerApplication(applicationId);
        setHistoryData(history);
      } catch (error) {
        console.error("Failed to fetch application or job details:", error);
      }
    };

    fetchDetails();
  }, [applicationId]);

  useEffect(() => {
    const res = getCandidate(candidateId);
    res.then((data) => {
      setUserData(data);
    });
  });

  useEffect(() => {
    setProfileData({
      name: userData?.firstName + " " + userData?.lastName,
      email: userData?.email || "",
      location: userData?.city || "",
      imageUrl: userData?.profilePic || "",
      city: userData?.city || "",
      status: userData?.profileStatus || "",
      profilePic: userData?.profilePic || "",
    });
  }, [userData]);

  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Application Summary"
          subtext={`Application summary of ${profileData.name} for the position of ${jobTitle}`}
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
          onClick={() => {
            router.push(`/jobs/${applicationId}`);
          }}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <CiViewTimeline /> <span>&nbsp;&nbsp;</span>View Vacancy
        </button>
      </div>

      <div className="container mx-auto grid grid-cols-2 gap-4">
        <JobApplicationHistory history={historyData} />
        <ProfileSummaryCard profile={profileData} />
      </div>
    </div>
  );
};

export default CandidateApplicationHistory;
