"use client";
import React, {useEffect, useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import InterviewListTable from "@/components/intereviewListRecRutiter/interviewListTable";
import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";

import {Button} from "@nextui-org/button";
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useRouter } from 'next/navigation';
import {useInterviews} from "@/lib/hooks/useInterviews";
import {useApplicationsByList} from "@/lib/hooks/useApplications";
import {useCandidates} from "@/lib/hooks/useCandidates";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import {InterviewProp} from "@/types/interviews";
import {CandidateProp} from "@/types/users";
import {ApplicationProp} from "@/types/applications";

type userDetails = {
    id: number,
    interviewId:string,
    name: string,
    role:string,
    team:string,
    status:string,
    avatar:string,
    email:string,
    date:string,
    time:string,
    type: string,
    location: string,
    link:string,
    description: string
}

const JobList = () =>{

    const axios=useAxiosAuth();
    const router=useRouter();

const editInterview = (interviewId: string | undefined) =>{
    if (interviewId) {
        router.push(`/recruiter/interviews/editInterview/${interviewId}`)
    } else {
        console.error('Interview ID is undefined. Cannot navigate to edit page.');
    }
}

    const [selectedCard, setSelectedCard] = useState<userDetails | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [text ,setText]=useState("")
    const [mode,setMode]=useState("")
    const [modeName,setModeName]=useState("")
    const [users, setUsers] = useState<userDetails[]>([]);
    const applicationSet = new Set<string>();


    const interviewQuery=useInterviews();
    // Extract applicationIds and candidateIds
    const applicationIdList:string[] = [];
    const candidateIdList:string[] = [];
    interviewQuery.data?.map(interview => {
        applicationIdList.push(interview.applicationId)
        candidateIdList.push(interview.candidateId)
    });

    const applicationQuery=useApplicationsByList(applicationIdList)
    const candidateQuery=useCandidates(candidateIdList)

    const applicationList:ApplicationProp[]=[]

    applicationQuery.map(application => applicationList.push(application.data as ApplicationProp))
    const setModes=(card: userDetails)=>{
        if(card.type=="Online"){
            setMode(card.link)
            setModeName("Link")
        }else if(card.type=="Onsite"){
            setMode(card.location)
            setModeName("Location")
        }
    }

    const popupview = (card: userDetails) => {
        console.log("Card clicked:", card);
        setSelectedCard(card);
        setModes(card);
        onOpen();
    };

    const myPopUp = (
        <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-row gap-2">
                            <div>
                                <Image
                                    alt="company logo"
                                    height={30}
                                    radius="sm"
                                    src={selectedCard?.avatar}
                                    width={30}
                                />
                            </div>
                            <div className={"flex flex-col justify-center"}>{selectedCard?.name} </div>

                        </ModalHeader>
                        <ModalBody className={"gap-0"}>
                            <div className={"flex flex-row gap-2 mb-4 text-sm font-bold text-gray-600"}>
                                <div className={"flex flex-col"}>
                                    <p>Date:</p>
                                    <p>Time:</p>
                                    <p>{modeName}</p>

                                </div>
                                <div className={"flex flex-col"}>
                                    <p>{selectedCard?.date}</p>
                                    <p>{selectedCard?.time}</p>
                                    <p>{mode}</p>
                                </div>

                            </div>
                            <div className={"mb-4"}><p>{selectedCard?.description}</p></div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={()=>editInterview(selectedCard?.interviewId)}>
                                Edit
                            </Button>
                            <Button startContent={"<>"} color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );


    return (
        <div>
        {myPopUp}
            <header className="home-header">
                <HeaderBox type="title" title="Interview Schedule List" subtext="Current interview list is here."/>
            </header>
            {
                (interviewQuery.isFetching || candidateQuery.isFetching)?
                    <LoadingComponent />
                    :
                    (interviewQuery.isError || candidateQuery.isError)?
                        <ErrorComponent />
                    :<InterviewListTable interviews={interviewQuery.data} aplications={applicationList} candidates={candidateIdList} popup={popupview}/>

            }
        </div>
    )
}

export default JobList;