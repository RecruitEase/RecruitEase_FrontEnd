"use client";

import React, { useState } from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { InterviewsOffersCard } from "@/components/interviewsOffers/interviewsOffersCard";
import {Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

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

const data: InterviewOfferCard[] = [
    {
        companyName: "IFS",
        position: "Software Engineer",
        imageUrl: "https://th.bing.com/th/id/OIP.CT-RIB4bV10w5GBDD7_KpAHaHa?rs=1&pid=ImgDetMain",
        type: "Online",
        location: "",
        link:"https://www.youtube.com/#!",
        date: "2021/02/05",
        time: "10.30am",
        dressCode:"Smart Casual",
        remainingDays: "3 days left",
        description: "With any interview question you answer, tie your background" +
            " to the job by providing examples of solutions and results " +
            "you’ve achieved in your career.",
    },
    {
        companyName: "AWS",
        position: "Quality Assurance Engineer",
        imageUrl: "https://i1.wp.com/blog.devget.net/wp-content/uploads/2020/04/aws-logo-100584713-orig.png?fit=2048%2C2048&ssl=1",
        type: "Onsite",
        location: "15/1A, 1st lane, Jambugasmulla Road, Nugegoda ",
        link:"",
        date: "2021/03/05",
        time: "10.30am",
        dressCode:"Smart Casual",
        remainingDays: "3 days left",
        description: "With any interview question you answer, tie your background" +
            " to the job by providing examples of solutions and results " +
            "you’ve achieved in your career.",
    }
];

const InterviewsOffers = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState<InterviewOfferCard | null>(null);
    const [mode,setMode]=useState("")
    const [modeName,setModeName]=useState("")

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
                                        height={15}
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
                <HeaderBox type="title" title="Interview Offers" subtext="Upcoming interviews list is here." />
            </header>

            {/*<Button onPress={popupview}> ll</Button>*/}

            <div>
                {data && data.map((item, index) => (
                    <InterviewsOffersCard key={index} card={item}  popup={() => popupview(item)} />
                ))}
            </div>
        </div>
    );
};

export default InterviewsOffers;
