"use client";

import React, {Key, useState} from 'react';
import { Input, DatePicker, TimeInput, Button, Textarea } from "@nextui-org/react";
import {parseDate, Time} from "@internationalized/date";
import { ClockCircleLinearIcon } from "@nextui-org/shared-icons";
import { DateValue } from "@internationalized/date";
import Swal from "sweetalert2";
import {Bounce, toast} from "react-toastify";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const position = "Software Engineer";
const types = [
    {key:"Online", label:"Online"},
    {key:"Onsite", label:"Onsite"}
]

type DateObject = {
    calendar: any;
    era: string;
    year: number;
    month: number;
    day: number;
};

// @ts-ignore
export default function EditeInterviewForm({currentData}){

    console.log("description"+currentData.description)
    const [location, setLocation] = useState(currentData.location);
    const [date, setDate] = useState<DateValue | null>(currentData.date);
    const [time, setTime] = useState<Time | null>(currentData.time);
    const [description, setDescription] = useState("");
    const [cutoffDate, setCutoffDate] = useState<DateValue | null>(currentData.cutoffDate);
    const [cutoffTime, setCutoffTime] = useState<Time | null>(currentData.cutoffTime);
    const [type,setType] = useState<Key | null>(currentData.type);
    const [dressCode, setDressCode] = useState(currentData.dressCode);
    const [dateFormat, setDateFormat] = useState<Date | null>(null);

    function formatDate(dateObj: DateObject): string {
        const { year, month, day } = dateObj;
        const formattedMonth = month.toString().padStart(2, '0'); // Ensure month is two digits
        const formattedDay = day.toString().padStart(2, '0');     // Ensure day is two digits

        return `${year}-${formattedMonth}-${formattedDay}`;
    }

    function formatTimeToAMPM(hours: number, minutes: number): string {
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${period}`;
    }


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

            // @ts-ignore
            setDate(formatDate(date))

        }else {
            setDate(null);
        }
    }
    const timeSet = (time:Time) => {
        console.log("time:"+time)
        if (time) {
            const formattedTime = formatTimeToAMPM(time.hour, time.minute);;
            // @ts-ignore
            setTime(formattedTime);
        }else {
            setTime(null);
        }
    };
    const descriptionSet = (description: string) => {
        setDescription(description);
    };
    const cutoffDateSet = (cutoffDate: DateValue) => {
        if (cutoffDate) {
            // @ts-ignore
            setCutoffDate(formatDate(cutoffDate));
        }else {
            setCutoffDate(null);
        }
    };
    const cutoffTimeSet = (cutoffTime:Time) => {
        if (cutoffTime) {
            const formattedTime = formatTimeToAMPM(cutoffTime.hour, cutoffTime.minute);
            // @ts-ignore
            setCutoffTime(formattedTime);
            // const formattedTime = formatTimeToAMPM(cutoffTime);
        }else {
            setCutoffTime(null);
        }
    };

    const getTimeFormat=(inputTime:string)=>{
        const [time, period] = inputTime.split(' ');
        const [hours, minutes] = time.split('.');

        const hours24 = period.toUpperCase() === 'PM' ? parseInt(hours) + 12 : parseInt(hours);
        const defaultTime = new Time(hours24, parseInt(minutes));

        return defaultTime
    }
    const getDateFormat=(inputDate:string)=>{
        const defaultDate = parseDate(inputDate);
        console.log(defaultDate)
        return defaultDate
    }

    const axios=useAxiosAuth();


    const sendDetails = () => {

        return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/${currentData.id}`,{
            type:type,
            date:date,
            time:time,
            location:location,
            link:"",
            dressCode:dressCode,
            description:description,
            cutoffDate:cutoffDate,
            cutoffTime:cutoffTime,
        })
            .then(response => {
                console.log(response.status)
                if(response.status == 201){
                    toast.success('Update scheduled successfully!', {
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
                    router.push("/recruiter/interviews");


                }else{
                    toast.error('Failed!', {
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
            })
            .catch(error => {
                console.error(`Error fetching`, error);
                toast.error('Failed!', {
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
                return null;
            });

    };
    const router=useRouter();


    const conformationPop = () =>{

        Swal.fire({
            title: "Are scheduling details correct?",
            icon:"info",
            customClass: {
                confirmButton: 'bg-primary',
                cancelButton: 'bg-[#a1a1aa]'
            },

            showCancelButton: true,
            confirmButtonText: "Yes",

        }).then(() =>
            sendDetails()
        );
    }

    return (
        <div className={"flex flex-col gap-4 "}>
            <div>
                <Autocomplete
                    items={types}
                    label="Interview type"
                    placeholder="Select a type of interview"
                    className="max-w-xs"
                    // @ts-ignore
                    onSelectionChange={(key: React.Key) => typeSet(key)}
                    defaultValue={currentData.type}
                    defaultSelectedKey={currentData.type}
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
                        defaultValue={currentData.location}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-3 w-full"}>
                    <DatePicker
                        label="Date"
                        className="max-w-md w-full"
                        isRequired
                        fullWidth
                        defaultValue={getDateFormat(currentData.date)}
                        onChange={dateSet}
                    />
                </div>
                <div className={"col-span-12 sm:col-span-3 w-full"}>
                    <TimeInput
                        label="Event Time"
                        defaultValue={getTimeFormat(currentData.time)}
                        endContent={(
                            <ClockCircleLinearIcon/>
                        )}
                        fullWidth
                        // @ts-ignore
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
                        defaultValue={currentData.dressCode}
                    />
                </div>

                <div>
                    <Input
                        isDisabled
                        type="text"
                        label="Position"
                        defaultValue={position}
                        className="w-full"
                    />
                </div>
            </div>
            <div className={"w-full"}>
                <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full "
                    fullWidth
                    defaultValue={currentData.description}
                    onChange={(element) => descriptionSet(element.target.value)}
                />
            </div>


            <div className={"w-full"}>
                <DatePicker
                    label="Cutoff Date"
                    className="max-w-xs w-full"
                    isRequired
                    fullWidth
                    defaultValue={getDateFormat(currentData.cutoffDate)}
                    onChange={cutoffDateSet}
                />
            </div>
            <div className={"w-full"}>
                <TimeInput
                    label="CutOff Time"
                    defaultValue={getTimeFormat(currentData.cutoffTime)}
                    endContent={(
                        <ClockCircleLinearIcon/>
                    )}
                    className={"max-w-xs"}
                    // @ts-ignore
                    onChange={cutoffTimeSet}
                />
            </div>
            <div className={"w-full flex justify-end"}>
                <Button color="primary" onPress={conformationPop}>
                    Save
                </Button>
            </div>
        </div>
    );
};
