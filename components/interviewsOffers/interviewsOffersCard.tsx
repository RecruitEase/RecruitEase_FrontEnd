import React from 'react';
import { Card, CardHeader, Image } from "@nextui-org/react";
import { Button } from '@nextui-org/button';

type InterviewOfferCard = {
    companyName: string;
    position: string;
    imageUrl: string;
    type: string;
    location: string;
    link:string
    date: string;
    time: string;
    dressCode:string
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
            <Card className="main w-full grid grid-cols-12 gap-4 p-2 hover:bg-gray-200 cursor-pointer mb-4 h-24" isPressable onPress={popup} >
                <div className="col-span-12 sm:col-span-8 flex flex-col justify-center h-full">
                    <CardHeader className="flex gap-3 h-full pt-0 pb-0">
                        <Image
                            alt="company logo"
                            height={64}
                            radius="sm"
                            src={card.imageUrl}
                            width={64}
                        />
                        <div className="flex flex-col">
                            <p className="text-md flex justify-start">{card.companyName}</p>
                            <p className="text-small text-default-500 flex justify-start">{card.type}</p>
                        </div>
                    </CardHeader>
                </div>
                <div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4 h-full">
                    <p className="text-md">{card.date}</p>
                    <p className="text-small text-default-500">{card.time}</p>
                </div>
                <div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4 h-full">
                    <p className="text-md text-blue-900">{card.remainingDays}</p>
                    {/*<div className={"w-full flex justify-center"}><Button*/}
                    {/*    className={" justify-end bg-primary w-1/2 rounded text-[#FFFFFF]"}*/}
                    {/*    onClick={popup}>more...</Button>*/}
                    {/*</div>*/}

                </div>

            </Card>
        </div>
    );
};
