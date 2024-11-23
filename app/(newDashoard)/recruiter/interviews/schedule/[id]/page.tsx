"use client"
import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import InterviewScheduleForm from "@/components/interviewShedul/interviewSchedulForm";
import {useParams} from "next/navigation";

const InterviewSchedule = () =>{
    const params = useParams<{id:string}>()
    const id = params.id;
    return(
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Interview Schedule" subtext="Schedule you interview at here."/>
            </header>
            <InterviewScheduleForm id={id}/>
        </div>
    )
}

export default InterviewSchedule;