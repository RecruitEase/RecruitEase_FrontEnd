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
    useDisclosure
} from "@nextui-org/react";

import {Button} from "@nextui-org/button";
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import {useRouter} from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent";

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

    const [selectedCard, setSelectedCard] = useState<userDetails | null>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [text ,setText]=useState("")
    const [mode,setMode]=useState("")
    const [modeName,setModeName]=useState("")
    const [users, setUsers] = useState<userDetails[]>([]);
    const[isLording,setIsLording]=useState(false);


    const router = useRouter();
    const handleEdit = (interviewId:any) => {
        console.log("handleEdit", interviewId);
        router.push(`interviews/editInterview/${interviewId}`);
    }

    const fetchInterviewData = () => {
        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/list`)
            .then(response => {
                const data = response.data.content;
                console.log(data)
                if (!Array.isArray(data)) {
                    console.error("Unexpected data format:", data);
                    return [];
                }
                return data;
            })
            .catch(error => {
                console.error("Error fetching interview data:", error);
                return [];
            });


    };

    const fetchApplicationDetails = (applicationId:String) => {

        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/view/${applicationId}`)
            .then(response => {
                const data =response.data.content
                return data;
            })
            .catch(error => {
                console.error(`Error fetching company details for applicationId: ${applicationId}`, error);
                return null;
            });
    };
    const fetchJobDetails = (jobId:String) => {
        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/view/${jobId}`)
            .then(response => {
                const data =response.data.content
                
                return data;
            })
            .catch(error => {
                console.error( error);
                return null;
            });
    };
    const fetchCandidateDetails = (candidateId:String) => {
        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/candidate/${candidateId}`)
            .then(response => {
                const data =response.data.content
                return data;
            })
            .catch(error => {
                console.error( error);
                return null;
            });
    };

    useEffect(() => {
        setIsLording(true)
        fetchInterviewData()
            .then(interviews => {
                const companyDetailsPromises = interviews.map((interview: any) =>
                    fetchApplicationDetails(interview.applicationId)
                        .then((companyDetails) =>
                            Promise.all([
                                fetchJobDetails(companyDetails.jobId),
                                fetchCandidateDetails(interview.candidateId)
                            ]).then(([jobDetails, candidateDetails]) => ({
                                interview,
                                companyDetails,
                                jobDetails,
                                candidateDetails,
                            }))
                        )
                );

                // Wait for all promises to resolve
                return Promise.all(companyDetailsPromises);
            })
            .then(results => {
                const mergedData: ({
                    date: any;
                    imageUrl: any;
                    link: any;
                    remainingDays: any;
                    description: any;
                    location: any;
                    id: number;
                    team: any;
                    time: any;
                    type: any;
                    dressCode: any;
                    status: any,
                    role:any,
                    avatar:any,
                    name:any,
                    email:any,
                    interviewId:any
                } | null)[] = results
                    .map(({ interview, companyDetails,jobDetails,candidateDetails},index) => {
                        if (companyDetails) {
                            return {

                                id: index+1,
                                interviewId:interview.id,
                                team: companyDetails.position,
                                imageUrl: process.env.NEXT_PUBLIC_API_URL+candidateDetails.imageUrl,
                                status:companyDetails.status,
                                type: interview.type,
                                location: interview.location,
                                link: interview.link,
                                date: interview.date,
                                time: interview.time,
                                dressCode: interview.dressCode,
                                remainingDays: interview.remainingDays,
                                description: interview.description,
                                role:jobDetails.title,
                                avatar:(candidateDetails.profilePic)?process.env.NEXT_PUBLIC_S3_URL+candidateDetails.profilePic: "/profileImages/noImage.png",
                                name:candidateDetails.firstName+" "+candidateDetails.lastName,
                                email:candidateDetails.email

                            };
                        } else {
                            return null;
                        }
                    })
                .filter((data): data is userDetails => data !== null);

                // @ts-ignore
                setUsers(mergedData);
                setIsLording(false)
            });
    }, []);


    const setModes=(card: userDetails)=>{
        if(card.type=="Online"){
            // setMode(card.link)
            let url = "/room/"+card.interviewId
            setMode( url);
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
                                    <p className={"text-blue-800"}>{modeName === "Link" ?<a href={mode}>{"Start here"}</a>:mode}</p>
                                </div>

                            </div>
                            <div className={"mb-4"}><p>{selectedCard?.description}</p></div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={()=>{handleEdit(selectedCard?.interviewId)}}>
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
            {isLording ? (
                    <LoadingComponent/>
            ) : (
                <InterviewListTable users={users} popup={popupview}/>
            )}


        </div>
    )
}

export default JobList;