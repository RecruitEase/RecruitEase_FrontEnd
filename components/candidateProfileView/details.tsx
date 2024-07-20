"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import Carousel from "@/components/carousel";
import { ScrollShadow } from "@nextui-org/react";


interface PersonalDetailsProps {
    aboutMe: string;
    skills: string[];
    experience: string[];
    education: string[];
    location: string;
    email: string;
    avatars: string[];
    carousel:string[];
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ aboutMe, skills, experience, education, location, email, avatars,carousel }) => {
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
                        <p className="text-md font-bold">Experience</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <ScrollShadow className="w-full h-[116px] pl-4">
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
                        <ScrollShadow className="w-full h-[80px] pl-4">
                            {education.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </ScrollShadow>
                    </CardBody>
                    <Divider />
                </Card>
            </div>

            <div className="details">
                <Card className="min-w-[400px] flex-1">
                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">Location</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>{location}</p>
                    </CardBody>
                    <Divider />

                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">Email</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>{email}</p>
                    </CardBody>
                    <Divider />

                    <CardBody>
                        <div className="flex gap-4 items-center">
                            {avatars.map((avatar, index) => (
                                <Avatar key={index} isBordered radius="full" src={avatar} />
                            ))}
                        </div>
                    </CardBody>
                    <Divider />
                </Card>

                <Card className=" flex-1 mt-4">
                    {/*<CardHeader className="flex gap-3">*/}
                    {/*    <p className="text-md font-bold">My CV</p>*/}
                    {/*</CardHeader>*/}
                    {/*<Divider />*/}
                    {/*<CardBody>*/}
                    {/*    <div>*/}
                    {/*        <Carousel images={carousel}/>*/}
                    {/*    </div>*/}
                    {/*</CardBody>*/}
                    {/*<Divider />*/}

                    <CardHeader>
                        <p className="text-md font-bold">Skills</p>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <ScrollShadow className="w-full h-[180px] pl-4">
                            <div className="flex flex-col flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Chip key={index} size="lg" className="w-2">{skill}</Chip>
                                ))}
                            </div>
                        </ScrollShadow>
                    </CardBody>
                    <Divider />
                </Card>
            </div>
        </div>
    );
};

export default PersonalDetails;
