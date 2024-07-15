"use client";

import React, { useState } from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import { InterviewsOffersCard } from "@/components/interviewsOffers/interviewsOffersCard";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

type InterviewOfferCard = {
    companyName: string;
    position: string;
    imageUrl: string;
    type: string;
    location: string;
    date: string;
    time: string;
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
        date: "2021/02/05",
        time: "10.30am",
        remainingDays: "3",
        description: "With any interview question you answer, tie your background" +
            " to the job by providing examples of solutions and results " +
            "you’ve achieved in your career.",
    },
    {
        companyName: "AWS",
        position: "Quality Assurance Engineer",
        imageUrl: "https://i1.wp.com/blog.devget.net/wp-content/uploads/2020/04/aws-logo-100584713-orig.png?fit=2048%2C2048&ssl=1",
        type: "Online",
        location: "",
        date: "2021/03/05",
        time: "10.30am",
        remainingDays: "3",
        description: "With any interview question you answer, tie your background" +
            " to the job by providing examples of solutions and results " +
            "you’ve achieved in your career.",
    }
];

const InterviewsOffers = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState<InterviewOfferCard | null>(null);

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
                        <ModalHeader className="flex flex-col gap-1">
                            {selectedCard?.companyName} - {selectedCard?.position}
                        </ModalHeader>
                        <ModalBody className={"gap-0"}>
                            <div className={"mb-4"}> {selectedCard?.type}</div>
                            <div className={"flex flex-col mb-4"}>
                                <div>
                                    {selectedCard?.date}
                                </div>
                                <div>
                                    {selectedCard?.time}
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
