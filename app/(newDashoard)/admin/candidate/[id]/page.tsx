"use client";
import React, { useEffect, useState } from 'react';
import PersonalDetails from "@/components/candidateProfile/personalDetails";
import { getCandidate } from '@/lib/api';
import { CandidateProp } from '@/types/users';
import ProfileImageCard from "@/components/candidateProfileView/profileImageCard";
import { useParams } from 'next/navigation';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';

interface Experience {
  title: string;
  company: string;
  experience: Experience[];
  endDate: string;
}

interface PersonalDetailsProps {
  aboutMe: string;
  skills: string[];
  experience: string[];
  education: string[];
  location: string;
  email: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<CandidateProp | null>(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    location: "",
    imageUrl: "",
  });
  const [data, setData] = useState<PersonalDetailsProps>({
    aboutMe: "",
    skills: [],
    experience: [],
    education: [],
    location: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();
  const candidateId: string = params?.id as string;

  useEffect(() => {
    const fetchCandidateData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await getCandidate(candidateId);

          experience: JSON.parse(response.experience || "[]").map((exp: any) => ({
            title: exp.title || "",
            company: exp.company || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
          })),
        setUserData(response);

        // Transform data for PersonalDetails
        setData({
          aboutMe: response.aboutMe || "",
          skills: JSON.parse(response.skills || "[]"),
          experience: JSON.parse(response.experience || "[]"),
          education: JSON.parse(response.education || "[]"),
          location: response.address || "",
          email: response.email || "",
        });

        // Transform data for ProfileImageCard
        setProfileData({
          name: `${response.firstName} ${response.lastName}`,
          email: response.email || "",
          location: response.city || "",
          imageUrl: response.profilePic || "",
        });
      } catch (err) {
        console.error("Error fetching candidate data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchCandidateData();
    }
  }, [candidateId]);

 

  return (
    (loading)? <LoadingComponent /> :
    (error)? <ErrorComponent /> :
    <>
    <div className={"pb-4"}>
      <ProfileImageCard profileData={profileData} />
    </div>
    <div>
      <PersonalDetails {...data} />
    </div>
  </>
  );
};

export default Profile;
