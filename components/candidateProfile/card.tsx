import React from 'react';
import { Card, CardHeader, Image } from "@nextui-org/react";

type InterviewOfferCard = {
    companyName: string;
    position: string;
    imageUrl: string;
    date:string;
    time:string;
    remainingDays: string;
    type:string;

};

interface InterviewOfferCardProps {
    card: InterviewOfferCard;
    // popup: () => void;
}

export const Cards = ({card}: InterviewOfferCardProps) => {
    return (
        <div>
            <Card className="main w-full grid grid-cols-12 gap-4 p-2 hover:bg-gray-200 cursor-pointer mb-4 h-24">
                <div className="col-span-7 sm:col-span-7">
                    <CardHeader className="flex gap-3">
                        {/*<Image*/}
                        {/*    alt="company logo"*/}
                        {/*    height={64}*/}
                        {/*    radius="sm"*/}
                        {/*    src={card.imageUrl}*/}
                        {/*    width={64}*/}
                        {/*/>*/}
                        <div className="flex flex-col">
                            <p className="text-md font-bold">{card.type}</p>
                            <p className="text-sm text-gray-500 font-bold">{card.companyName}</p>
                        </div>
                    </CardHeader>
                </div>
                <div className="col-span-5 sm:col-span-5 flex flex-col justify-center pl-4 h-full">
                    {/*<p className="text-md">{card.date}</p>*/}
                    <p className="text-small text-default-500">{card.time}</p>
                </div>
                {/*<div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4 h-full">*/}
                {/*    <p className="text-md text-blue-900">{card.remainingDays}</p>*/}
                {/*    /!*<div className={"w-full flex justify-center"}><Button className={" justify-end bg-primary w-1/2 rounded text-[#FFFFFF]"} onClick={popup}>more...</Button></div>*!/*/}

                {/*</div>*/}

            </Card>
        </div>
    );
};
