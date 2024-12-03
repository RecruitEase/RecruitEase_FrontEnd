"use client";
import React, { useEffect, useState } from 'react';
import ProfileImage from "@/components/candidateProfile/profileImage";
import PersonalDetails from "@/components/candidateProfile/personalDetails";
import Carousel from "@/components/carouselMulti";
import { useSession } from 'next-auth/react';
import { getCandidate } from '@/lib/api';
import { user } from '@nextui-org/react';
import { CandidateProp } from '@/types/users';
import { set } from 'react-hook-form';
import ProfileImageCard from "@/components/candidateProfileView/profileImageCard";


interface PersonalDetailsProps {
    aboutMe: string;
    skills: string[];
    experience: string[];
    education: string[];
    location: string;
    email: string;
}


const Profile = () => {
    const [userData, setUserData] = useState<CandidateProp>();
    const [profileData, setProfileData] = useState({ name: "", email: "", location: "", imageUrl: "" });
    const [data, setData] = useState<PersonalDetailsProps>({
        aboutMe: "", skills: [], experience: [], education: [], location: "", email: ""});

    const { data: session } = useSession();


    useEffect(() => {
        const res = getCandidate(session?.user.roleDetails.candidateId);
        res.then((data) => {
            setUserData(data);
        });

    }
        , []);

    useEffect(() => {
        console.log("userData://////", userData);
        setProfileData({ name: userData?.firstName + " " + userData?.lastName, email: userData?.email || "", location: userData?.city || "", imageUrl: userData?.profilePic || "" });
        setData({ aboutMe: userData?.aboutMe || "", skills: JSON.parse(userData?.skills || '[]'), experience: JSON.parse(userData?.experience || '[]'), education: JSON.parse(userData?.education || '[]'), location: userData?.address || "", email: userData?.email || ""});
    }, [userData]);

    return (
        <>
            <div className={"pb-4"}><ProfileImageCard profileData={profileData} /></div>
            <div><PersonalDetails {...data as PersonalDetailsProps}></PersonalDetails></div>
            {/* <div className={"w-full mt-4"}><Carousel images={data.carousel} visibleCount={4} /></div> */}

        </>

    )
        ;
};

export default Profile;