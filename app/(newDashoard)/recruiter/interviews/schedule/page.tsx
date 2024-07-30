import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import InterviewScheduleForm from "@/components/interviewShedul/interviewSchedulForm";

const InterviewSchedule = () =>{
    return(
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Interview Schedule" subtext="Schedule you interview at here."/>
            </header>
            <InterviewScheduleForm />
        </div>
    )
}

export default InterviewSchedule;