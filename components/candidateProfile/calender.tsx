import React, { useState } from "react";
import { Calendar, Radio, RadioGroup, Button, ButtonGroup, cn } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { today, getLocalTimeZone, startOfWeek, startOfMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { Cards } from "./card";
import { ScrollShadow } from "@nextui-org/react";

type UpcomingEvent = {
    id: string;
    type: "Job offer" | "Interview offer";
    imageUrl: string;
    companyName: string;
    position: string;
    date: string;  // Ensure this is in the format YYYY-MM-DD
    time: string;
    remainingDays: string;
};

interface CalendarComponentProps {
    upcomingEvents: UpcomingEvent[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ upcomingEvents }) => {
    let defaultDate = today(getLocalTimeZone());
    let [value, setValue] = useState<DateValue>(defaultDate);
    let [selectedDateEvents, setSelectedDateEvents] = useState<UpcomingEvent[]>([]);
    let { locale } = useLocale();

    let now = today(getLocalTimeZone());
    let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
    let nextMonth = startOfMonth(now.add({ months: 1 }));

    const formatDate = (date: DateValue) => {
        const d = new Date(date.toString());
        return d.toISOString().split('T')[0];  // Formats to YYYY-MM-DD
    };

    const handleDateClick = (selectedDate: DateValue) => {
        const formattedDate = formatDate(selectedDate);
        const events = upcomingEvents.filter(event => event.date === formattedDate);
        setSelectedDateEvents(events);
    };

    const eventDates = upcomingEvents.map(event => event.date);

    return (
        <div className="flex flex-col gap-4">
            <Calendar
                aria-label="Date (Presets)"
                bottomContent={
                    <RadioGroup
                        aria-label="Date precision"
                        classNames={{
                            base: "w-full pb-2",
                            wrapper: "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-scroll"
                        }}
                        defaultValue="exact_dates"
                        orientation="horizontal"
                    >
                        {/*<CustomRadio value="exact_dates">Exact dates</CustomRadio>*/}
                        {/*<CustomRadio value="1_day">1 day</CustomRadio>*/}
                        {/*<CustomRadio value="2_days">2 days</CustomRadio>*/}
                        {/*<CustomRadio value="3 days">3 days</CustomRadio>*/}
                        {/*<CustomRadio value="7_days">7 days</CustomRadio>*/}
                        {/*<CustomRadio value="14_days">14 days</CustomRadio>*/}
                    </RadioGroup>
                }
                classNames={{
                    content: "w-full"
                }}
                focusedValue={value}
                nextButtonProps={{
                    variant: "bordered"
                }}
                prevButtonProps={{
                    variant: "bordered"
                }}
                topContent={
                    <ButtonGroup
                        fullWidth
                        className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                        radius="full"
                        size="sm"
                        variant="bordered"
                    >
                        <Button onPress={() => setValue(now)}>Today</Button>
                        <Button onPress={() => setValue(nextWeek)}>Next week</Button>
                        <Button onPress={() => setValue(nextMonth)}>Next month</Button>
                    </ButtonGroup>
                }
                value={value}
                onChange={setValue}

                onFocusChange={(date) => {
                    setValue(date);
                    handleDateClick(date);
                }}
                // renderDay={(date: DateValue) => {
                //     const dateStr = formatDate(date);
                //     if (eventDates.includes(dateStr)) {
                //         return (
                //             <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }}>
                //                 {date.getDate()}
                //             </div>
                //         );
                //     }
                //     return <div>{date.getDate()}</div>;
                // }}
            />
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <ScrollShadow className="w-full h-[284px]">
                <div className="mt-4">
                    {selectedDateEvents.map(event => {
                        if (event.type === "Job offer" || event.type === "Interview offer") {
                            return <Cards key={event.id} card={event} />;
                        }
                        return null;
                    })}
                </div>
            </ScrollShadow>
        </div>
    );
};

export default CalendarComponent;
