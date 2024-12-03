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
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";


const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  const [profileData, setProfileData] = useState({ name: "", email: "", location: "", imageUrl: "" });
  const [data, setData] = useState({
    aboutMe: "", skills: [], experience: [], education: [], location: "", email: ""
  });

  const candidateId: string = (params?.id as string);

  useEffect(() => {
    setError(false);
    setLoading(true);
    try {

      const res = getCandidate(candidateId);
      res.then((data) => {
        setProfileData({
          name: data?.firstName + " " + data?.lastName,
          email: data?.email || "",
          location: data?.city || "",
          imageUrl: data?.profilePic || "" });
        setData({
          aboutMe: data?.aboutMe || "",
          skills: JSON.parse(data?.skills || '[]'),
          experience: JSON.parse(data?.experience || '[]'),
          education: JSON.parse(data?.education || '[]'),
          location: data?.address || "",
          email: data?.email || ""
        });
        setLoading(false);
      });
    }catch(e){
      setLoading(false);
      console.log(e);
      setError(true);
    }
  }, [candidateId])

  return (
      (loading) ? <LoadingComponent /> :
          (error) ? <ErrorComponent /> :
              <>
                <div className="flex justify-end">
                  <Button
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
  );
};

export default Profile;