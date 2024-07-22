"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import Carousel from "@/components/carousel";
import { ScrollShadow } from "@nextui-org/react";
import carousel from "@/components/carousel";
import Calender from "./calender";

type UpcomingEvent = {
    id: string;
    type: "Job offer" | "Interview offer";
    imageUrl: string;
    companyName: string;
    position: string;
    date: string;
    time: string;
    remainingDays: string;
};



interface PersonalDetailsProps {
    aboutMe: string;
    skills: string[];
    experience: string[];
    education: string[];
    location: string;
    email: string;
    avatars: string[];
    carousel:string[];
    upcomingEvents:UpcomingEvent[];
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ aboutMe, skills, experience, education, location, email, avatars,carousel,upcomingEvents }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex gap-4 flex-col lg:flex-row">
            <div className="aboutme">
                <Card className="min-w-[400px] flex-1">
                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">About me</p>
                    </CardHeader>
                    <Divider />
                    <ScrollShadow className="w-full h-[120px] pl-4">
                        {aboutMe}
                    </ScrollShadow>
                    <Divider />
                </Card>

                <Card className="min-w-[400px] flex-1 mt-4">
                    <CardHeader>
                        <p className="text-md font-bold">Skills</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <ScrollShadow className="w-full h-[90px] pl-4">
                            <div className="flex flex-row flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Chip key={index} size="lg" className="w-2">{skill}</Chip>
                                ))}
                            </div>
                        </ScrollShadow>
                    </CardBody>
                    <Divider />

                    <CardHeader>
                        <p className="text-md font-bold">Experience</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <ScrollShadow className="w-full h-[138px] pl-4">
                            {experience.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </ScrollShadow>
                    </CardBody>
                    <Divider />

                    <CardHeader>
                        <p className="text-md font-bold">Education</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <ScrollShadow className="w-full h-[100px] pl-4">
                            {education.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </ScrollShadow>
                    </CardBody>
                    <Divider />
                </Card>
            </div>

            <div className="details">
                <Card className="min-w-[300px] flex-1">
                {/*    <CardHeader className="flex gap-3">*/}
                {/*        <p className="text-md font-bold">Location</p>*/}
                {/*    </CardHeader>*/}
                {/*    <Divider />*/}
                {/*    <CardBody>*/}
                {/*        <p>{location}</p>*/}
                {/*    </CardBody>*/}
                {/*    <Divider />*/}

                {/*    <CardHeader className="flex gap-3">*/}
                {/*        <p className="text-md font-bold">Email</p>*/}
                {/*    </CardHeader>*/}
                {/*    <Divider />*/}
                {/*    <CardBody>*/}
                {/*        <p>{email}</p>*/}
                {/*    </CardBody>*/}
                {/*    <Divider />*/}

                    <CardBody >
                        <div className="flex gap-4 items-center">
                            {avatars.map((avatar, index) => (
                                <Avatar key={index} isBordered radius="full" src={avatar} />
                            ))}
                        </div>
                    </CardBody>
                    <Divider />
                    <CardBody >
                        <div className={"w-full flex justify-center"}>
                            <Calender upcomingEvents={upcomingEvents}></Calender>
                        </div>
                    </CardBody>

                </Card>

                {/*<Card className="min-w-[400px] flex-1 mt-4">*/}
                {/*    <CardHeader className="flex gap-3">*/}
                {/*        <p className="text-md font-bold">My CV</p>*/}
                {/*    </CardHeader>*/}
                {/*    <Divider />*/}
                {/*    <CardBody>*/}
                {/*        <div>*/}
                {/*            <Carousel images={carousel}/>*/}
                {/*        </div>*/}
                {/*    </CardBody>*/}
                {/*    <Divider />*/}
                {/*</Card>*/}

            </div>
        </div>
    );
};

export default PersonalDetails;
