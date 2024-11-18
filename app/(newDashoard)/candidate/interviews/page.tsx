"use client";

import React, { useState,useEffect } from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { InterviewsOffersCard } from "@/components/interviewsOffers/interviewsOffersCard";
import {Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

   type InterviewOfferCard = {
    companyName: string;
    position: string;
    imageUrl: string;
    type: string;
    location: string;
    link:string
    date: string;
    time: string;
    dressCode:string;
    remainingDays: string;
    description: string;
    interviewId:string;
};

const InterviewsOffers = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState<InterviewOfferCard | null>(null);
    const [mode,setMode]=useState("")
    const [modeName,setModeName]=useState("")
    const [interviewOfferCards, setInterviewOfferCards] = useState<InterviewOfferCard[]>([]);


    const axios=useAxiosAuth();

    const fetchInterviewData = () => {

        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/list`)
            .then(response => {
                const data = response.data.content;
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
            .then(response => response.data.content)
            .catch(error => {
                console.error(`Error fetching company details for applicationId: ${applicationId}`, error);
                return null;
            });
    };


    useEffect(() => {
        // Fetch interviews first
        fetchInterviewData()
            .then(interviews => {
                // Fetch company details for each interview
                const companyDetailsPromises = interviews.map((interview: any) =>
                    fetchApplicationDetails(interview.applicationId).then(companyDetails => ({
                        interview,
                        companyDetails
                    }))
                );

                return Promise.all(companyDetailsPromises);
            })
            .then(results => {
                const mergedData: InterviewOfferCard[] = results
                    .map(({ interview, companyDetails }) => {
                        if (companyDetails) {
                            console.log(companyDetails)
                            return {
                                companyName: companyDetails.companyName,
                                position: companyDetails.position,
                                imageUrl: process.env.NEXT_PUBLIC_S3_URL+companyDetails.imageUrl,
                                type: interview.type,
                                location: interview.location,
                                link: interview.link,
                                date: interview.date,
                                time: interview.time,
                                dressCode: interview.dressCode,
                                remainingDays: interview.remainingDays,
                                description: interview.description,
                                interviewId:interview.id
                            };
                        } else {
                            return null;
                        }
                    })
                    .filter((data): data is InterviewOfferCard => data !== null);

                setInterviewOfferCards(mergedData);
            });
    }, []);


    const setModes=(card: InterviewOfferCard)=>{
        if(card.type=="Online"){
            // setMode(card.link)
            let url = process.env.NEXT_PUBLIC_API_URL+"/room/"+card.interviewId
            setMode( url);
            setModeName("Link")
        }else if(card.type=="Onsite"){
            setMode(card.location)
            setModeName("Location")
        }
    }

    const popupview = (card: InterviewOfferCard) => {
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

                        <ModalHeader className="flex flex-col gap-1">
                            <div className={"flex gap-2"}>
                                <div>
                                    <Image
                                        alt="company logo"
                                        height={30}
                                        radius="sm"
                                        src={selectedCard?.imageUrl}
                                        width={30}
                                    />
                                </div>
                                <div>
                                    {selectedCard?.companyName} - {selectedCard?.position}
                                </div>

                            </div>

                        </ModalHeader>
                        <ModalBody className={"gap-0"}>
                        {/*<div className={"mb-4 font-bold"}> {selectedCard?.type}</div>*/}
                        <div className={"flex flex-row gap-2 mb-4 text-sm font-bold text-gray-600"}>
                            <div className={"flex flex-col"}>
                                <p>Date:</p>
                                <p>Time:</p>
                                <p>Dress Code:</p>
                                <p>{modeName}</p>

                            </div>
                            <div className={"flex flex-col"}>
                                <p>{selectedCard?.date}</p>
                                <p>{selectedCard?.time}</p>
                                <p>{selectedCard?.dressCode}</p>
                                <p>{modeName === "Link" ?<a href={mode}>{mode}</a>:mode}</p>
                            </div>

                        </div>
                        <p>{selectedCard?.description}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
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
                <HeaderBox type="title" title="Scheduled Interviews" subtext="Upcoming interviews list is here." />
            </header>

            {/*<Button onPress={popupview}> ll</Button>*/}

            <div>
                {interviewOfferCards && interviewOfferCards.map((item, index) => (
                    <InterviewsOffersCard key={index} card={item}  popup={() => popupview(item)} />
                ))}
            </div>
        </div>
    );
};

export default InterviewsOffers;
