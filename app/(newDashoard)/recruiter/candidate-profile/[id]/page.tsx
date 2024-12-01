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

// const profileData = {
//     name: "Sajith Bandara",
//     email: "sajithbandara@gamil.com",
//     location: "Pallebedda, Ratnapura",
//     imageUrl: "/avatar2.webp"
// }

// const data = {
//     aboutMe: "I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X.",
//     skills: ["UX Design", "Product Design", "Figma", "Webflow"],
//     experience: ["Product Designer at ABC Corp (2018-2021) - Led the design team in creating user-centered designs, improving the user experience across all digital platforms.", "UX/UI Designer at XYZ Solutions (2021-Present) - Spearheaded the redesign of the company's main product, resulting in a 20% increase in user engagement."],
//     education: ["Bachelor of Fine Arts in Graphic Design from University of Texas at Austin (2014-2018)", "Certification in UX Design from Interaction Design Foundation (2020)"],
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
//     ]
// };

// {
//     {
//         "aboutMe": "I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X.",
//         "skills": ["UX Design", "Product Design", "Figma", "Webflow"],
//         "experience": [
//             "Product Designer at ABC Corp (2018-2021) - Led the design team in creating user-centered designs, improving the user experience across all digital platforms.",
//             "UX/UI Designer at XYZ Solutions (2021-Present) - Spearheaded the redesign of the company's main product, resulting in a 20% increase in user engagement."
//         ],
//         "education": [
//             "Bachelor of Fine Arts in Graphic Design from University of Texas at Austin (2014-2018)",
//             "Certification in UX Design from Interaction Design Foundation (2020)"
//         ],
//         "location": "Udugampola, Gampaha",
//         "email": "sajithbandara@gmail.com",
//         "avatars": [
//             "/icons/socialMedia/Facebook.png",
//             "/icons/socialMedia/linkedin.webp",
//             "/icons/socialMedia/github.svg",
//             "/icons/socialMedia/web.jpg"
//         ],
//         "carousel": [
//             "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/79e09a107825591.5fafef7735182.png",
//             "https://th.bing.com/th/id/R.7bc77e35761679a63b8eed1612d83e16?rik=Fd8Guusz74GhKw&pid=ImgRaw&r=0"
//         ]
//     }

// }


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