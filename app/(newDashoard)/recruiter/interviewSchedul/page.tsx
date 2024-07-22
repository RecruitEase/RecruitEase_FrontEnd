import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import InterviewScheduleForm from "@/components/interviewShedul/interviewSchedulForm";

const InterviewSchedule = () =>{
    return(
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Create Job Offer" subtext=" Fill out the form below to create a new job offer."/>
            </header>
            <InterviewScheduleForm />
        </div>
    )
}

export default InterviewSchedule;