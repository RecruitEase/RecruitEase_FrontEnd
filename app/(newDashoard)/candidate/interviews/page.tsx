"use client";

import React, { useState,useEffect } from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { InterviewsOffersCard } from "@/components/interviewsOffers/interviewsOffersCard";
import {Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import axios from 'axios';

const BASE_URL = "http://localhost:8222";
const token = "eyJhbGciOiJIUzM4NCJ9.eyJjcmVhdGVkQXQiOiIyMDI0LTA4LTA4VDA2OjQ4OjI0LjA2OTExOCIsInJvbGUiOiJjYW5kaWRhdGUiLCJyb2xlRGV0YWlscyI6eyJmaXJzdE5hbWUiOiJDaGF0aHVyYSIsImxhc3ROYW1lIjoiTGFrc2hhbiIsInByb2ZpbGVQaWMiOiJodHRwOi8vZXhkZWFtcGxlLmNvbS9wcm9maWxlLmpwZyIsInByb2ZpbGVTdGF0dXMiOiJDdXJyZW50bHkgV29ya2luZyIsImNhbmRpZGF0ZUlkIjoiMjgyNzc4NzktZmE1NC00ODhhLTliOTMtNWYwMDQ0NDQ5ZGFlIn0sImlkIjoiMjE0NDg3MDItMTRmOS00ZTI5LWI3YzQtYWVjYTg1M2Q1MDYxIiwiaXNBY3RpdmUiOnRydWUsImVtYWlsIjoiY2FuZGlkYXRlQHJlY3J1aXRlYXNlLmxrIiwic3ViIjoiMjE0NDg3MDItMTRmOS00ZTI5LWI3YzQtYWVjYTg1M2Q1MDYxIiwiaWF0IjoxNzIzNjQ4NTM2LCJleHAiOjE3MjM2NTIxMzZ9.Eqglff8KZHf9xWU-ygMcL7TykIPbQWmcuNHAZMlO0X1XEJFbc_Lo7qIcOl8yE_2j"
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
};

const fetchInterviewData = () => {
    return axios.get(BASE_URL+'/api/v1/interviews/list', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
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

    return axios.get(BASE_URL+`/api/v1/applications/view/${applicationId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.data.content)
        .catch(error => {
            console.error(`Error fetching company details for applicationId: ${applicationId}`, error);
            return null;
        });
};

const InterviewsOffers = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState<InterviewOfferCard | null>(null);
    const [mode,setMode]=useState("")
    const [modeName,setModeName]=useState("")
    const [interviewOfferCards, setInterviewOfferCards] = useState<InterviewOfferCard[]>([]);

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

                // Wait for all promises to resolve
                return Promise.all(companyDetailsPromises);
            })
            .then(results => {
                // Process the results and merge data
                const mergedData: InterviewOfferCard[] = results
                    .map(({ interview, companyDetails }) => {
                        if (companyDetails) {
                            return {
                                companyName: companyDetails.companyName,
                                position: companyDetails.position,
                                imageUrl: companyDetails.imageUrl,
                                type: interview.type,
                                location: interview.location,
                                link: interview.link,
                                date: interview.date,
                                time: interview.time,
                                dressCode: interview.dressCode,
                                remainingDays: interview.remainingDays,
                                description: interview.description,
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
            setMode(card.link)
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
                                <p>{mode}</p>
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
