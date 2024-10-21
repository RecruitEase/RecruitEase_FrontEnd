import React from 'react';
import { Card, CardHeader, Image } from "@nextui-org/react";
import {Button} from "@chakra-ui/react";
import {OfferProps} from "@/types/offers";
import {RecruiterProp} from "@/types/users";
import {Job} from "@/types/job";
import {daysLeft, formatDate, formattedDateAndTime, toTitleCase} from '@/utils/stringUtils';

type InterviewOfferCard = {
    companyName: string;
    position: string;
    imageUrl: string;
    location: string;
    date:string;
    time:string;
    dressCode:string;
    cutoffDate: string;
    cutoffTime: string;
    remainingDays: string;
    description: string;
};

interface InterviewOfferCardProps {
    offer:OfferProps;
    recruiter:RecruiterProp;
    job:Job
    popup: () => void;
}

export const InterviewsOffersCard = ({ offer,recruiter,job, popup }: InterviewOfferCardProps) => {
    const profilePic=(recruiter.profilePic)?process.env.NEXT_PUBLIC_S3_URL+recruiter.profilePic : "/profileImages/noImage.png";
    return (
        <div>
            <Card className="main w-full grid grid-cols-12 gap-4 p-2 hover:bg-gray-200 cursor-pointer mb-4 h-24"   isPressable
                  onPress={popup} >
                <div className="col-span-12 sm:col-span-8">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="company logo"
                            height={64}
                            radius="sm"
                            src={profilePic}
                            width={64}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{recruiter.companyName} -{'>'} {toTitleCase(job.title)}</p>
                        </div>
                    </CardHeader>
                </div>
                <div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4 h-full">
                    <p className="text-md">{formattedDateAndTime(offer.finalAcceptanceDateTime)}</p>
                </div>
                <div className="col-span-6 sm:col-span-2 flex flex-col justify-center pl-4 h-full">
                    <p className="text-md text-blue-900">{daysLeft(formatDate(offer.finalAcceptanceDateTime))}</p>
                    {/*<div className={"w-full flex justify-center"}><Button className={" justify-end bg-primary w-1/2 rounded text-[#FFFFFF]"} onClick={popup}>more...</Button></div>*/}

                </div>

            </Card>
        </div>
    );
};
