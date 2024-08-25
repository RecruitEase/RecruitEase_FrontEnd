"use client"
import React, {useEffect, useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { useParams } from 'next/navigation';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import EditeInterviewForm from "@/components/editInterview/EditeInterviewForm";

type interviewObj={
    id:string,
    applicationId: string,
    candidateId: string,
    type: string,
    date:string,
    time: string,
    location:string,
    link: string,
    dressCode: string,
    description: string,
    cutoffDate: string,
    cutoffTime: string,

}

const EditInterview = () =>{

    const [data,setData]= useState<interviewObj>();

    const axios=useAxiosAuth();
    const params = useParams();
    const  interviewId = params.id;
    console.log(interviewId);

    useEffect(() => {
        fetchData();
    }, [interviewId]);

    const fetchData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/${interviewId}`)
            .then(response => {
                const data = response.data.content;

                const interview: interviewObj = {
                    id: data.id,
                    applicationId: data.applicationId,
                    candidateId: data.candidateId,
                    type: data.type,
                    date: data.date,
                    time: data.time,
                    location: data.location,
                    link: data.link,
                    dressCode: data.dressCode,
                    description: data.description,
                    cutoffDate: data.cutoffDate,
                    cutoffTime: data.cutoffTime,
                };

                ;
                return setData(interview);
            })
            .catch(error => {
                console.error(`Error fetching interview details for interviewId: ${interviewId}`, error);
            });
    };




    return(
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Edit Interview" subtext="Edite interview at here."/>
            </header>
            {data ? (
                <EditeInterviewForm currentData={data} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )

}

export default EditInterview;