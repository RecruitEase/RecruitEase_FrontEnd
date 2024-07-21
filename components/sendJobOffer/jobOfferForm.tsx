"use client";

import React, { useState } from 'react';
import { Input, DatePicker, TimeInput, Button, Textarea } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { ClockCircleLinearIcon } from "@nextui-org/shared-icons";
import { DateValue } from "@internationalized/date";

const position = "Software Engineer";

const JobOfferForm = () => {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState<DateValue | null>(null);
    const [time, setTime] = useState<Time | null>(null);
    const [description, setDescription] = useState("");
    const [cutoffDate, setCutoffDate] = useState<DateValue | null>(null);
    const [cutoffTime, setCutoffTime] = useState<Time | null>(null);

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
        const jobDetails = {
            location:location,
            date:date,
            time:time,
            description:description,
            cutoffDate:cutoffDate,
            cutoffTime:cutoffTime,

        }

        console.log(jobDetails)
    };

    return (
        <div className={"flex flex-col gap-4 "}>
            <div>
                <Input
                    isDisabled
                    type="text"
                    label="Position"
                    defaultValue={position}
                    className="max-w-xs"
                    // onChange={(element) => locationSet(element.target.value)}
                />
            </div>
            <div className={"grid grid-cols-12 w-full gap-4"}>
                <div className={"col-span-12 sm:col-span-7 w-full"}>
                    <Input
                        type="text"
                        label="Location"
                        placeholder="Enter location"
                        onChange={(element) => descriptionSet(element.target.value)}
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
                        defaultValue={new Time(11, 59)}
                        endContent={(
                            <ClockCircleLinearIcon />
                        )}
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
                    defaultValue={new Time(11, 59)}
                    endContent={(
                        <ClockCircleLinearIcon />
                    )}
                    className={"max-w-xs"}
                    onChange={cutoffTimeSet}
                />
            </div>
            <div className={"w-full flex justify-end"}>
                <Button color="primary" onPress={sendDetails}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default JobOfferForm;
