"use client";

import React, {Key, useState} from 'react';
import { Input, DatePicker, TimeInput, Button, Textarea } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { ClockCircleLinearIcon } from "@nextui-org/shared-icons";
import { DateValue } from "@internationalized/date";
import Swal from "sweetalert2";
import {Bounce, toast} from "react-toastify";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const position = "Software Engineer";
const types = [
    {key:"Online", label:"Online"},
    {key:"Onsite", label:"Onsite"}
]

export default function interviewSchedule(){


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [location, setLocation] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<DateValue | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [time, setTime] = useState<Time | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [description, setDescription] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cutoffDate, setCutoffDate] = useState<DateValue | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cutoffTime, setCutoffTime] = useState<Time | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [type,setType] = useState<Key | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dressCode, setDressCode] = useState("");

    const typeSet = (type:Key) => {
        setType(type);
    };
    const dressCodeSet = (dressCodeSet: string) => {
        setDressCode(dressCodeSet);
    };
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
    const timeSet = (time: Time) => {
        if (time) {
            setTime(time);
        }else {
            setTime(null);
        }
    };
    const descriptionSet = (description: string) => {
        setLocation(description);
    };
    const cutoffDateSet = (cutoffDate: DateValue) => {
        if (cutoffDate) {
            setCutoffDate(cutoffDate);
        }else {
            setCutoffDate(null);
        }
    };
    const cutoffTimeSet = (cutoffTime: Time) => {
        if (cutoffTime) {
            setCutoffTime(cutoffTime);
        }else {
            setCutoffTime(null);
        }
    };

    const sendDetails = () => {
        const scheduleDetails = {
            type:type,
            location:location,
            date:date,
            time:time,
            description:description,
            cutoffDate:cutoffDate,
            cutoffTime:cutoffTime,
            dressCode:dressCode

        }

        console.log(scheduleDetails)
    };
    const router=useRouter();


    const conformationPop = () =>{

        Swal.fire({
            title: "Are scheduling details correct?",
            icon:"info",
            customClass: {
                confirmButton: 'bg-primary', // Custom class for confirm button
                cancelButton: 'bg-[#a1a1aa]'   // Custom class for cancel button
            },

            showCancelButton: true,
            confirmButtonText: "Yes",

        }).then(() => {
            sendDetails()
            const result = {
                status: 200
            }
            if (result?.status == 200) {
                toast.success('Scheduled successfully!', {
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
                router.push("/recruiter/vacancy/abc1/applications");

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
        });
    }

    return (
        <div className={"flex flex-col gap-4 "}>
            <div>
                <Autocomplete
                    items={types}
                    label="Interview type"
                    placeholder="Select a type of interview"
                    className="max-w-xs"
                    onSelectionChange={(key: React.Key) => typeSet(key)}
                >
                    {(types) => <AutocompleteItem key={types.key}>{types.label}</AutocompleteItem>}
                </Autocomplete>
            </div>


            <div className={"grid grid-cols-12 w-full gap-4"}>
                <div className={"col-span-12 sm:col-span-6 w-full"}>
                    <Input
                        type="text"
                        label="Location"
                        placeholder="Enter location"
                        onChange={(element) => locationSet(element.target.value)}
                        isDisabled={type === "Online" ? true : false}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-3 w-full"}>
                    <DatePicker
                        label="Date"
                        className="max-w-md w-full"
                        isRequired
                        fullWidth
                        onChange={dateSet}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-3 w-full"}>
                    <TimeInput
                        label="Event Time"
                        // defaultValue={new Time(0o0, 0o0)}
                        endContent={(
                            <ClockCircleLinearIcon/>
                        )}
                        fullWidth
                        onChange={timeSet}
                    />
                </div>
            </div>

            <div className={"grid grid-cols-2 w-full gap-4 "}>
                <div>
                    <Input
                        type="text"
                        label="Dress Code"
                        placeholder="Enter dress code"
                        onChange={(element) => dressCodeSet(element.target.value)}
                        className="w-full"
                    />
                </div>

                <div>
                    <Input
                        isDisabled
                        type="text"
                        label="Position"
                        defaultValue={position}
                        className="w-full"
                        // onChange={(element) => locationSet(element.target.value)}
                    />
                </div>
            </div>
            <div className={"w-full"}>
                <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full "
                    fullWidth
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
                    // defaultValue={new Time(0o0, 0o0)}
                    endContent={(
                        <ClockCircleLinearIcon/>
                    )}
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

// export default interviewSchedule;