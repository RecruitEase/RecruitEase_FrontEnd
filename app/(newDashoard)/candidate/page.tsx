"use client";
import React, { useEffect, useState } from 'react';
import PersonalDetails from "@/components/candidateProfile/personalDetails";
import { useSession } from 'next-auth/react';
import { getCandidate } from '@/lib/api';
import { CandidateProp } from '@/types/users';
import ProfileImageCard from "@/components/candidateProfileView/profileImageCard";
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';


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
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        location: "",
        imageUrl: ""
    });
    const [data, setData] = useState<PersonalDetailsProps>({
        aboutMe: "",
        skills: [],
        experience: [],
        education: [],
        location: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { data: session } = useSession();


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const candidateData = await getCandidate(session?.user.roleDetails.candidateId);
                setUserData(candidateData);
            } catch (error) {
                console.error("Error fetching candidate data:", error);
                setError(true);
            }
        };

        if (session?.user.roleDetails.candidateId) {
            fetchData();
        }
    }, [session]);

    useEffect(() => {
        if (userData) {
            setProfileData({
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email || "",
                location: userData.city || "",
                imageUrl: userData.profilePic || ""
            });

            setData({
                aboutMe: userData.aboutMe || "",
                skills: parseJSON(userData.skills, []),
                experience: parseJSON(userData.experience, []),
                education: parseJSON(userData.education, []),
                location: userData.address || "",
                email: userData.email || ""
            });
        }
        setLoading(false);
    }, [userData]);
    const parseJSON = (jsonString: string | undefined, fallback: any) => {
        try {
            return JSON.parse(jsonString || '');
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return fallback;
        }
    };

    return (
        (loading) ? <LoadingComponent /> :
        (error) ? <ErrorComponent /> :
        <>
            <div className={"pb-4"}><ProfileImageCard profileData={profileData} /></div>
            <div><PersonalDetails {...data as PersonalDetailsProps}></PersonalDetails></div>
            {/* <div className={"w-full mt-4"}><Carousel images={data.carousel} visibleCount={4} /></div> */}

        </>

    )
        ;
};

export default Profile;