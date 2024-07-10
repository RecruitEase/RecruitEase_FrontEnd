"use client"
import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import TotalVacacies from "@/components/dashboard/TotalVacacies";
import {useTheme} from "next-themes";
import {useSession} from "next-auth/react";

const RecruiterDashboard = () => {
    const {theme,setTheme}=useTheme();


    //for user session state
    const { data: session } = useSession();
    console.log({ session });

    const user=session?.user;

    const isLoggedIn=!!session?.user

    const activeVacancies=25;
    const filledVacancies=5;
    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={user?.firstName || 'Guest'}
                    subtext="Access and manage your account and listing efficiently"
                />


                <TotalVacacies
                    activeVacancies={activeVacancies ? activeVacancies : 0}
                    filledVacancies={filledVacancies ? filledVacancies : 0}
                />
            </header>
        </div>
    );
};

export default RecruiterDashboard;
