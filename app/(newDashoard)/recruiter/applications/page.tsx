import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import ApplicationComponent from '@/components/recruiter/ApplicationComponent';

const Applications = () => {

    // @ts-ignore
    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Applications"
                    subtext="Manage the applications received for the job from here"
                />
            </header>
            
            <ApplicationComponent/>

        </div>
    );
};

export default Applications;
