"use client";

import React, {useEffect, useState} from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { InterviewsOffersCard } from "@/components/jobOffers/jobOffersCard";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure} from "@nextui-org/react";
import { Button, } from "@nextui-org/button";
import {Image } from "@nextui-org/react";
import {Bounce, toast} from "react-toastify";
import Swal from 'sweetalert2';

type InterviewOfferCard = {
    companyName: string;
    position: string;
    imageUrl: string;
    // type: string;
    location: string;
    date:string;
    time:string;
    dressCode:string;
    cutoffDate: string;
    cutoffTime: string;
    remainingDays: string;
    description: string;
};

const data: InterviewOfferCard[] = [
    {
        companyName: "IFS",
        position: "Software Engineer",
        imageUrl: "/assets/companyLogos/IFS.jpg",
        // type: "Online",
        location: "14th floor, Orient city, Colombo 09",
        date:"2021/03/10",
        time:"09.00am",
        dressCode:"Smart Casual",
        cutoffDate: "2021/02/05",
        cutoffTime: "11.59pm",
        remainingDays: "3 days left",
        description: "With any interview question you answer, tie your background" +
            " to the job by providing examples of solutions and results " +
            "you’ve achieved in your career.",
    },
    {
        companyName: "AWS",
        position: "Quality Assurance Engineer",
        imageUrl: "/assets/companyLogos/aws.jpeg",
        // type: "Online",
        location: "10th floor, Orient city, Colombo 09",

        date:"2021/03/10",
        time:"09.00am",
        dressCode:"Smart Casual",
        cutoffDate: "2021/03/05",
        cutoffTime: "11.59pm",
        remainingDays: "3 days left",
        description: "With any interview question you answer, tie your background" +
            " to the job by providing examples of solutions and results " +
            "you’ve achieved in your career.",
    }
];

const InterviewsOffers = () => {

    const [selectedCard, setSelectedCard] = useState<InterviewOfferCard | null>(null);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [text ,setText]=useState("")

    // Accept Button Handle-----------------------------------------------
    const acceptButtonHandle = ()=>{
        confomationPoup("Are you accept that offer?","info")
        onClose()
    }
    // Decline Button Handle--------------------------------------
    const declineButtonHandle = ()=>{
        confomationPoup("Are you decline that offer?","warning")
        onClose()
    }

    const confomationPoup = (massage:string,icon:string) =>{

        Swal.fire({
            title: massage,
            icon:"info",
            customClass: {
                confirmButton: 'bg-primary', // Custom class for confirm button
                cancelButton: 'bg-[#a1a1aa]'   // Custom class for cancel button
            },

            showCancelButton: true,
            confirmButtonText: "Yes",

        }).then(() => {
            console.log(text)
            const result = {
                status: 200
            }
            if (result?.status == 200) {
                toast.success('Deleted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });

            } else {
                //not logged in
                //handle error here
                toast.error('Delete failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }

            setText("")
        });
    }



    const popupview = (card: InterviewOfferCard) => {
        console.log("Card clicked:", card);
        setSelectedCard(card);
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
                                    src={selectedCard?.imageUrl}
                                    width={30}
                                />
                            </div>
                            <div className={"flex flex-col justify-center"}>{selectedCard?.companyName} - {selectedCard?.position}</div>

                        </ModalHeader>
                        <ModalBody className={"gap-0"}>
                            <div className={"mb-4 text-warningText"}><p>This job offer is accept or decline on or before {selectedCard?.cutoffTime} {selectedCard?.cutoffDate}</p></div>
                            <div className={"flex gap-4"}>
                                <div className={"flex flex-col mb-4 text-sm font-bold text-gray-600"}>
                                    <div><p>Date:</p></div>
                                    <div><p>Time:</p></div>
                                    <div><p>Dress Code:</p></div>
                                    <div><p>Location:</p></div>
                                </div>
                                <div className={"flex flex-col mb-4 text-sm font-bold text-gray-600"}>
                                    <div><p>{selectedCard?.date}</p></div>
                                    <div><p>{selectedCard?.time}</p></div>
                                    <div><p>{selectedCard?.dressCode}</p></div>
                                    <div><p>{selectedCard?.location}</p></div>
                                </div>
                            </div>
                            <div className={"mb-4"}><p>{selectedCard?.description}</p></div>

                            <div className={"flex flex-col gap-2"}>

                                <div className={"gap-2 text-md font-bold  flex justify-start"}><p>Add Note</p></div>
                                <div className={"ml-0"}>
                                    <Textarea
                                        className={"w-full ml-0"}
                                        name={"overview"}
                                        label={""}
                                        value={text}
                                        onChange={(element)=>setText(element.target.value)}
                                        placeholder={"Enter some note"}
                                        required={false}
                                        />
                                </div>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary"  onPress={acceptButtonHandle}>
                                Accept
                            </Button>
                            <Button color="danger" variant={"flat"} onPress={declineButtonHandle}>
                                Decline
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
                <HeaderBox type="title" title="Job Offers" subtext="Current job offers list is here." />
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
