"use client";
import ProfileImageCard from "@/components/candidateProfileView/profileImageCard";
import PersonalDetails from "@/components/candidateProfileView/details";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaHistory } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCandidate } from '@/lib/api';
import { CandidateProp } from '@/types/users';

const Profile = () => {
  const params = useParams();

  const [userData, setUserData] = useState<CandidateProp>();
  const [profileData, setProfileData] = useState({ name: "", email: "", location: "", imageUrl: "" });
  const [data, setData] = useState({
    aboutMe: "", skills: [], experience: [], education: [], location: "", email: ""
  });

  const candidateId: string = (params?.id as string);

  useEffect(() => {
    const res = getCandidate(candidateId);
    res.then((data) => {
      setUserData(data);
    });
  })

  useEffect(() => {
    setProfileData({ name: userData?.firstName + " " + userData?.lastName, email: userData?.email || "", location: userData?.city || "", imageUrl: userData?.profilePic || "" });
    setData({ aboutMe: userData?.aboutMe || "", skills: JSON.parse(userData?.skills || '[]'), experience: JSON.parse(userData?.experience || '[]'), education: JSON.parse(userData?.education || '[]'), location: userData?.address || "", email: userData?.email || "" });
    // console.log("aaaaaaaaaaaaaakkkkkkkklllla", userData);
  }, [userData]);

  return (
      <><div className="flex justify-end"><Button
          color={"secondary"}
          className={"w-fit bg-gray-900 text-whiteText"}
          as={Link}
          href="/recruiter/candidate-profile/abc123/history"
      >
        Applicant History <FaHistory />
      </Button>
      </div>

        <div className={"pb-4"}><ProfileImageCard profileData={profileData} /></div>
        <div><PersonalDetails {...data}></PersonalDetails></div>
      </>


  )
      ;
};

export default Profile;