import React from 'react';
import ProfileImage from "@/components/candidateProfile/profileImage";
import PersonalDetails from "@/components/candidateProfile/personalDetails";
import {CardBalance1} from "@/components/admin/card-balance1";
import {CardBalance2} from "@/components/admin/card-balance2";
import {CardBalance3} from "@/components/admin/card-balance3";
import {CardAgents} from "@/components/admin/card-agents";
import {CardTransactions} from "@/components/admin/card-transactions";
import {Link} from "@nextui-org/react";
import NextLink from "next/link";
import {TableWrapper} from "@/components/table/table";


const profileData = {
    name: "Sajith Bandara",
    thumbnail: "I'm c Product Designer based in Dallas.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpaY0tF99xM90L3_GHqKLapOUSu70Nu3iozdE20Qdvo7aHF5P65_nb2n2Ww&s"
}

const data = {
    aboutMe: "I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X.",
    skills: ["UX Design", "Product Design", "Figma", "Webflow"],
    experience: ["Experience 1", "Experience 2"],
    education: ["Education 1", "Education 2"],
    location: "Udugampola, Gampaha",
    email: "sajithbandara@gmail.com",
    avatars: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVsHgTWMCMNXjzm54tNMtwsXMQwe0Hej-t0arbxvcXtQxbh7hlxRdmJtOvFg&s",
        "https://cdn-icons-png.freepik.com/256/3955/3955056.png",
        "https://www.vectorlogo.zone/logos/github/github-tile.svg",
        "https://png.pngtree.com/png-vector/20190319/ourmid/pngtree-vector-web-icon-png-image_848026.jpg"
    ],
    carousel:[
        'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/79e09a107825591.5fafef7735182.png',
        'https://th.bing.com/th/id/R.7bc77e35761679a63b8eed1612d83e16?rik=Fd8Guusz74GhKw&pid=ImgRaw&r=0',
    ]
};


const Profile = () => {
    return (
        <>
                <div className={"pb-4"}><ProfileImage profileData={profileData}/></div>
                <div><PersonalDetails {...data}></PersonalDetails></div>
            </>


    )
        ;
};

export default Profile;