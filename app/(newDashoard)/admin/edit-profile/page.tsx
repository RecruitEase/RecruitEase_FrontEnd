import React from 'react'
import EditProfile from "@/components/moderator/editProfile/editProfileDetails";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import HeaderBox from "@/components/dashboard/HeaderBox";


const page = () => {
    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Edit Profile"
                    subtext="Edit your profile details here."
                />
            </header>
            <Button as={Link} href={"/admin/edit-profile/change-password"}>
                Change Password
            </Button>
            <EditProfile/>

        </div>
    );
}

export default page
