import React from 'react';
import { Card, CardHeader, Image } from "@nextui-org/react";
import {Button} from "@chakra-ui/react";

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

interface InterviewOfferCardProps {
    card: InterviewOfferCard;
    popup: () => void;
}

export const InterviewsOffersCard = ({ card, popup }: InterviewOfferCardProps) => {
    return (
        <div>
            <Card className="main w-full grid grid-cols-12 gap-4 p-2 hover:bg-gray-200 cursor-pointer mb-4 h-24" onClick={popup}>
                <div className="col-span-12 sm:col-span-8">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="company logo"
                            height={32}
                            radius="sm"
                            src={card.imageUrl}
                            width={64}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{card.companyName} - {card.position}</p>
                            <p className="text-small text-default-500">{card.type}</p>
                        </div>
                    </CardHeader>
                </div>
                <div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4">
                    <p className="text-md">{card.date}</p>
                    <p className="text-small text-default-500">{card.time}</p>
                </div>
                <div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4">
                    <p className="text-md text-blue-900">{card.remainingDays} days left</p>
                    <Button className={"hover:text-default-500 flex justify-end"} onClick={popup}>more...</Button>
                </div>

            </Card>
        </div>
    );
};
