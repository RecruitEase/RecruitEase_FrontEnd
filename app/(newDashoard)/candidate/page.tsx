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



// const profileData = {
//     name: "Sajith Bandara",
//     email: "sajithbandara@gamil.com",
//     location: "Pallebedda, Ratnapura",
//     imageUrl: "avatar2.webp"
// }

//     const data = {
//     aboutMe: "I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X.",
//     skills: ["UX Design", "Product Design", "Figma", "Webflow"],
//     experience: ["Experience 1", "Experience 2"],
//     education: ["Education 1", "Education 2"],
//     location: "Udugampola, Gampaha",
//     email: "sajithbandara@gmail.com",
//     avatars: [
//         "/icons/socialMedia/Facebook.png",
//         "/icons/socialMedia/linkedin.webp",
//         "/icons/socialMedia/github.svg",
//         "/icons/socialMedia/web.jpg"
//     ],
//     carousel: [
//         'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/79e09a107825591.5fafef7735182.png',
//         'https://th.bing.com/th/id/R.7bc77e35761679a63b8eed1612d83e16?rik=Fd8Guusz74GhKw&pid=ImgRaw&r=0',
//         'https://th.bing.com/th/id/OIP.hWEobj_lmMrfbXmD1VCIawHaKd?rs=1&pid=ImgDetMain',
//         'https://th.bing.com/th/id/OIP.KMYSpXXpZJwxe5qyl8c9lwAAAA?w=350&h=495&rs=1&pid=ImgDetMain',
//         'https://th.bing.com/th/id/OIP.jahxFhfGR1mw0vTX9MUExQAAAA?w=456&h=646&rs=1&pid=ImgDetMain',
//     ],
//     upcomingEvents: [
//         {
//             id: "1",
//             type: "Job offer",
//             imageUrl: "https://th.bing.com/th/id/OIP.CT-RIB4bV10w5GBDD7_KpAHaHa?rs=1&pid=ImgDetMain",
//             companyName: "IFS",
//             position: "Software Engineer",
//             date: "2024-07-21",
//             time: "10.30am",
//             remainingDays: "1 days left"

//         },
//         {
//             id: "2",
//             type: "Interview offer",
//             imageUrl: "https://th.bing.com/th/id/OIP.CT-RIB4bV10w5GBDD7_KpAHaHa?rs=1&pid=ImgDetMain",
//             companyName: "IFS",
//             position: "Software Engineer",
//             date: "2024-07-21",
//             time: "10.30am",
//             remainingDays: "1 days left"

//         }
//         ,
//         {
//             id: "3",
//             type: "Interview offer",
//             imageUrl: "https://th.bing.com/th/id/OIP.CT-RIB4bV10w5GBDD7_KpAHaHa?rs=1&pid=ImgDetMain",
//             companyName: "IFS",
//             position: "Software Engineer",
//             date: "2024-07-21",
//             time: "10.30am",
//             remainingDays: "1 days left"

//         }
//     ]
// };

// type UpcomingEvent = {
//     id: string;
//     type: "Job offer" | "Interview offer";
//     imageUrl: string;
//     companyName: string;
//     position: string;
//     date: string;
//     time: string;
//     remainingDays: string;
// };



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