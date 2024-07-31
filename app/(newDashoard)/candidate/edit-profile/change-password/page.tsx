import React from 'react'
import ChangePassword from "@/components/candidateSettings/changePassword";
import HeaderBox from "@/components/dashboard/HeaderBox";
import {Button} from "@nextui-org/button";
import Link from "next/link";


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
            <Button as={Link} href={"/candidate/edit-profile/change-password"}>
                Change Password
            </Button>
            <ChangePassword/>

        </div>
    );
}

export default page

