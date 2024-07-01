import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import Profile from "@/app/(dashboards)/candidate/profile/page";

// @ts-ignore
const ProfileImage=({profileData})=> {
    return (
        <div className="profile-page flex flex-row flex-wrap">
            <div className={" min-w-[50px] "}>
                <Image
                    alt="nextui logo"
                    style={{width: 120, height: 'auto', aspectRatio: 1}}
                    radius="full"
                    src={profileData.imageUrl}/>
            </div>
            <div className={"flex flex-col pl-4 justify-center"}>
                <p className="text-26">{profileData.name}</p>
                <p className="text-large text-default-500">{profileData.thumbnail}</p>
            </div>
            <div className="flex flex-row">
Sajith
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