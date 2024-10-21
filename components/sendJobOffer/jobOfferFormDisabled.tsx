"use client";

import React from 'react';
import { Input, Textarea } from "@nextui-org/react";
import {Job} from "@/types/job";
import {CandidateProp} from "@/types/users";
import {toTitleCase} from "@/lib/utils";
import { OfferProps} from "@/types/offers";
import { formattedDateAndTime} from "@/utils/stringUtils";


export interface JobOfferFormDisabledProps{
    job:Job;
    candidate:CandidateProp;
    offer:OfferProps;
}

const JobOfferFormDisabled = ({job,candidate,offer}:JobOfferFormDisabledProps) => {



    return (
        <div className={"flex flex-col gap-4 "}>
            <div>
                <Input
                    isDisabled
                    type="text"
                    label="Job Title"
                    defaultValue={toTitleCase(job.title)}
                    className="max-w-xs"
                    // onChange={(element) => locationSet(element.target.value)}
                />
            </div>
            <div>
                <Input
                    isDisabled
                    type="text"
                    label="Candidate Name"
                    defaultValue={toTitleCase(candidate.firstName + " " + candidate.lastName)}
                    className="max-w-xs"
                    // onChange={(element) => locationSet(element.target.value)}
                />
            </div>
            <div className={"grid grid-cols-12 w-full gap-4"}>
                <div className={"col-span-12 sm:col-span-7 w-full"}>
                    <Input
                        isDisabled
                        type="text"
                        label="Location"
                        isRequired
                        placeholder="Enter location"
                        value={offer.location}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-7 w-full"}>
                    <Input
                        isDisabled
                        type="text"
                        label="Start Date and Time"
                        isRequired
                        value={formattedDateAndTime(offer.startDateTime)}
                    />
                </div>

            </div>
            <div className={"w-full"}>
                <Textarea
                    isDisabled
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full "
                    fullWidth
                    isRequired
                    value={offer.description}
                />
            </div>
            <div className={"col-span-12 sm:col-span-7 w-full"}>
                <Input
                    isDisabled
                    type="text"
                    label="CutOff Date and Time"
                    isRequired
                    value={formattedDateAndTime(offer.finalAcceptanceDateTime)}
                />
            </div>

        </div>
    );
};

export default JobOfferFormDisabled;
