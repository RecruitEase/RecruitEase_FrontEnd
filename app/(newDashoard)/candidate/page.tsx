import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";

const CandidateDashboard = () => {
    return (
        <div>
            <header className="home-header">
                <HeaderBox
                    type="title"
                    title="Dashboard"
                    subtext="Navigate your career journey with ease"
                />
            </header>
        </div>
    );
};

export default CandidateDashboard;
