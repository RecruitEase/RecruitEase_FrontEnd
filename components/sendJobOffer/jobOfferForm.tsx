"use client";

import React, { useState } from 'react';
import { Input, DatePicker, TimeInput, Button, Textarea } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { ClockCircleLinearIcon } from "@nextui-org/shared-icons";
import { DateValue } from "@internationalized/date";
import Swal from "sweetalert2";
import {Bounce, toast} from "react-toastify";
import { useRouter } from 'next/navigation';
import {Job} from "@/types/job";
import {CandidateProp} from "@/types/users";
import {ApplicationProp} from "@/types/applications";
import {toTitleCase} from "@/lib/utils";
import {OfferCreationProps} from "@/types/offers";
import {TimeValue} from "@react-types/datepicker";
import {dateAndTimeToLocalDateTimeString} from "@/utils/stringUtils";
import {useCreateOffer} from "@/lib/hooks/useOffers";


export interface JobOfferFormProps{
    job:Job;
    candidate:CandidateProp;
    application:ApplicationProp;
}

const JobOfferForm = ({job,candidate,application}:JobOfferFormProps) => {

    const router=useRouter();

    const [location, setLocation] = useState("");
    const [date, setDate] = useState<DateValue | null>(null);
    const [time, setTime] = useState<TimeValue | null>(null);
    const [description, setDescription] = useState("");
    const [cutoffDate, setCutoffDate] = useState<DateValue | null>(null);
    const [cutoffTime, setCutoffTime] = useState<TimeValue | null>(null);

    const locationSet = (location: string) => {
        setLocation(location);
    };
    const dateSet = (date: DateValue) => {
        if (date) {
            setDate(date);
        }else {
            setDate(null);
        }
    }
    const timeSet = (time: TimeValue) => {
        if (time) {
            setTime(time);
        }else {
            setTime(null);
        }
    };
    const descriptionSet = (description: string) => {
        setDescription(description);
    };
    const cutoffDateSet = (cutoffDate: DateValue) => {
        if (cutoffDate) {
            setCutoffDate(cutoffDate);
        }else {
            setCutoffDate(null);
        }
    };
    const cutoffTimeSet = (cutoffTime: TimeValue) => {
        if (cutoffTime) {
            setCutoffTime(cutoffTime);
        }else {
            setCutoffTime(null);
        }
    };

    const createOfferQuery=useCreateOffer()
    const sendDetails = () => {
        const jobDetails:OfferCreationProps = {
            location:location,
            description:description,
            jobId:application.jobId,
            candidateId:application.candidateId,
            applicationId:application.applicationId!,
            recruiterId:application.recruiterId,
            finalAcceptanceDateTime:dateAndTimeToLocalDateTimeString(cutoffDate!,cutoffTime!),
            startDateTime:dateAndTimeToLocalDateTimeString(date!,time!)
        }

        createOfferQuery.mutate(jobDetails)

    };

    const conformationPop = () =>{
        console.log(cutoffTime)
        console.log(cutoffDate)
        console.log(time)
        console.log(date)
        console.log(description)
        console.log(location)
        if(cutoffTime==null || cutoffDate==null || time==null || date==null || description=="" || location==""){
            toast.error('Please fill all the required fields!', {
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
        }else {

            Swal.fire({
                title: "Are you sure about sending the job offer?",
                icon: "info",
                customClass: {
                    confirmButton: 'bg-primary', // Custom class for confirm button
                    cancelButton: 'bg-[#a1a1aa]'   // Custom class for cancel button
                },

                showCancelButton: true,
                confirmButtonText: "Yes",

            }).then(async (result) => {
                if (result.isConfirmed) {

                    sendDetails()


                }
            });
        }
    }

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
                    defaultValue={toTitleCase(candidate.firstName+" "+candidate.lastName)}
                    className="max-w-xs"
                    // onChange={(element) => locationSet(element.target.value)}
                />
            </div>
            <div className={"grid grid-cols-12 w-full gap-4"}>
                <div className={"col-span-12 sm:col-span-7 w-full"}>
                    <Input
                        type="text"
                        label="Location"
                        isRequired
                        placeholder="Enter location"
                        onChange={(element) => locationSet(element.target.value)}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-3 w-full"}>
                    <DatePicker
                        label="Date"
                        className="max-w-[284px] w-full"
                        isRequired
                        fullWidth
                        onChange={dateSet}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-2 w-full"}>
                    <TimeInput
                        label="Event Time"
                        endContent={(
                            <ClockCircleLinearIcon/>
                        )}
                        isRequired
                        fullWidth
                        onChange={timeSet}
                    />
                </div>
            </div>
            <div className={"w-full"}>
                <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full "
                    fullWidth
                    isRequired
                    onChange={(element) => descriptionSet(element.target.value)}
                />
            </div>
            <div className={"w-full"}>
                <DatePicker
                    label="Cutoff Date"
                    className="max-w-xs w-full"
                    isRequired
                    fullWidth
                    onChange={cutoffDateSet}
                />
            </div>
            <div className={"w-full"}>
                <TimeInput
                    label="CutOff Time"
                    endContent={(
                        <ClockCircleLinearIcon/>
                    )}
                    isRequired
                    className={"max-w-xs"}
                    onChange={cutoffTimeSet}
                />
            </div>
            <div className={"w-full flex justify-end"}>
                <Button color="primary" onPress={conformationPop}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default JobOfferForm;
