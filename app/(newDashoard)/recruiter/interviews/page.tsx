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
import {Bounce, toast} from "react-toastify";

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

const fetchInterviewData = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/list`)
        .then(response => {
            const data = response.data.content;
            if (!Array.isArray(data)) {
                console.error("Unexpected data format:", data);
                return [];
            }
            console.log(data)
            return data;
        })
        .catch(error => {
            console.error("Error fetching interview data:", error);
            return [];
        });
};

const fetchApplicationDetails = (applicationId:String) => {

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/view/${applicationId}`)
        .then(response => response.data.content)
        .catch(error => {
            console.error(`Error fetching company details for applicationId: ${applicationId}`, error);
            return null;
        });
};

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

    useEffect(() => {
        fetchInterviewData()
            .then(interviews => {
                const companyDetailsPromises = interviews.map((interview: any) =>
                    fetchApplicationDetails(interview.applicationId).then(companyDetails => ({
                        interview,
                        companyDetails
                    }))
                );

                // Wait for all promises to resolve
                return Promise.all(companyDetailsPromises);
            })
            .then(results => {
                const mergedData: ({
                    date: any;
                    imageUrl: any;
                    link: any;
                    interviewId:string;
                    remainingDays: any;
                    description: any;
                    location: any;
                    id: number;
                    team: any;
                    time: any;
                    type: any;
                    dressCode: any;
                    status: any
                } | null)[] = results
                    .map(({ interview, companyDetails},index) => {
                        if (companyDetails) {
                            return {

                                id: index+1,
                                interviewId:interview.id,
                                team: companyDetails.position,
                                imageUrl: companyDetails.imageUrl,
                                status:companyDetails.status,
                                type: interview.type,
                                location: interview.location,
                                link: interview.link,
                                date: interview.date,
                                time: interview.time,
                                dressCode: interview.dressCode,
                                remainingDays: interview.remainingDays,
                                description: interview.description

                            };
                        } else {
                            return null;
                        }
                    })
                    // .filter((data): data is userDetails => data !== null);

                // @ts-ignore
                setUsers(mergedData);
            });
    }, []);


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

            <InterviewListTable users={users}  popup={popupview}/>
        </div>
    )
}

export default JobList;