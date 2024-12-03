"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import HistoryTimeline from "@/components/recruiter/HistoryTimeline";
import { useParams } from "next/navigation";
import { getHistory, getJobById } from "@/lib/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCandidate } from "@/lib/api";
import { CandidateProp } from "@/types/users";
interface JobSummary {
  title: string;
  status: string;
  createdAt: string;
  id: string;
  candidateId: string;
}

const RecruiterDashboard = () => {
  const params = useParams();
  const candidateId: string = params?.id as string;
  const { data: session } = useSession();
  const recruiterId = session?.user.roleDetails.recruiterId;
  const candidateNRecruiterIds = { candidateId, recruiterId };
  const [userData, setUserData] = useState<CandidateProp>();
  const [profileData, setProfileData] = useState({
    name: "",
  });

  const [jobSummaries, setJobSummaries] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobSummaries = async () => {
      try {
        const history = await getHistory(candidateNRecruiterIds); // Fetch history

        // Map through the history and fetch job details for each jobId
        const summaries = await Promise.all(
          history.map(async (application: any) => {
            const jobResponse = await getJobById(application.jobId); // Fetch job details by jobId
            return {
              title: jobResponse.title,
              status: application.status,
              createdAt: jobResponse.createdAt,
              id: application.applicationId,
              candidateId: application.candidateId,
            };
          })
        );

        setJobSummaries(summaries);
      } catch (error) {
        console.error("Error fetching job summaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobSummaries();
  }, [candidateNRecruiterIds]);

  const noOfInteractions = jobSummaries.length;

  useEffect(() => {
    const res = getCandidate(candidateId);
    res.then((data) => {
      setUserData(data);
    });
  });

  useEffect(() => {
    setProfileData({
      name: userData?.firstName + " " + userData?.lastName,
    });
  }, [userData]);
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title={`History for ${profileData.name}`}
          subtext={`${noOfInteractions} Previous Interactions with this candidate`}
        />
        <div className="container mx-auto ">
          <HistoryTimeline history={jobSummaries} />
        </div>
      </header>
    </div>
  );
};

export default RecruiterDashboard;
