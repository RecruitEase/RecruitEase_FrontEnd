"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import {useSession} from "next-auth/react";
import {toTitleCase} from "@/utils/stringUtils";


// @ts-ignore
const ProfileImage=({profileData})=> {
    const {data: session} = useSession();

    const user = session!.user;
    const userProfilePic=(user.roleDetails.profilePic)?process.env.NEXT_PUBLIC_S3_URL+user.roleDetails.profilePic : "/profileImages/noImage.png";
    return (
        <div className="profile-page flex flex-row flex-wrap">
            <div className={" min-w-[50px] "}>
                <Image
                    alt={user.roleDetails.firstName+' '+user.roleDetails.lastName}
                    style={{width: 120, height: 'auto', aspectRatio: 1}}
                    radius="full"
                    className={"object-contain"}
                    src={userProfilePic}/>
            </div>
            <div className={"flex flex-col pl-4 justify-center"}>

                <div><p className="text-26">{toTitleCase(user.roleDetails.firstName+' '+user.roleDetails.lastName)}</p></div>
                <div className={"flex gap-1"}>
                    <HiOutlineMail className={"text-gray-500 h-full flex flex-col justify-center"}/>
                    <p className="text-sm text-default-500">{user.email}</p>
                </div>

                <div className={"flex gap-1"}>
                <MdOutlineLocationOn className={"text-gray-500"}/>
                    <p className="text-sm text-default-500">{user.roleDetails.city}</p>
                </div>

            </div>

            {/*<Card className="w-full min-w-[400px] shadow-none p-0">*/}
            {/*    <CardHeader className="flex gap-3 pl-0">*/}
            {/*        <Image*/}
            {/*            alt="nextui logo"*/}
            {/*            style={{ width: 120, height: 'auto', aspectRatio: 1 }}*/}
            {/*            radius="full"*/}
            {/*            src={profileData.imageUrl}*/}

            {/*        />*/}
            {/*        <div className="flex flex-col pl-4">*/}
            {/*            <p className="text-26">{profileData.name}</p>*/}
            {/*            <p className="text-large text-default-500">{profileData.thumbnail}</p>*/}
            {/*        </div>*/}
            {/*    </CardHeader>*/}
            {/*</Card>*/}

        </div>
    );
}

export default ProfileImage;