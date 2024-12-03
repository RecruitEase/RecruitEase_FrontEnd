import React from 'react'
import ChangeProfile from "@/components/recruiterSetting/changeProfile";
import HeaderBox from "@/components/dashboard/HeaderBox";


const page = () => {
    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Edit Profile"
                    subtext="Edit and change your profile here"
                />
            </header>
            <ChangeProfile/>

        </div>
    );
}

export default page
