"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import Carousel from "@/components/carousel";
import {ScrollShadow} from "@nextui-org/react";


const PersonalDetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={"flex gap-4"}>
            <div className={"aboutme"}>
                <Card className="min-w-[400px] flex-1">

                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">About me</p>
                    </CardHeader>
                    <Divider/>

                    <ScrollShadow className="w-full h-[120px] pl-4">
                        I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and
                                code development. I'm always striving to grow and learn something new, trying to do stuff that is
                                outside my comfort zone.
                                My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin,
                                and Editor X.
                                I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and
                                code development. I'm always striving to grow and learn something new, trying to do stuff that is
                                outside my comfort zone.
                                My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin,
                              and Editor X.
                    </ScrollShadow>
                    <Divider/>

                </Card>
                <Card className="min-w-[400px] flex-1 mt-4">
                    <CardHeader >
                        <p className="text-md font-bold">Skills</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ScrollShadow className="w-full h-[90px] pl-4">
                            <div className="flex flex-row flex-wrap gap-2">
                                <Chip size="lg" className={"w-2"}>UX Design</Chip>
                                <Chip size="lg" className={"max-w-2"}>Product Design</Chip>
                                <Chip size="lg">Figma</Chip>
                                <Chip size="lg">Web flow</Chip>
                                <Chip size="lg">Web flow</Chip>
                                <Chip size="lg">Web flow</Chip>
                                <Chip size="lg">Web flow</Chip>
                                <Chip size="lg">Web flow</Chip>

                            </div>
                        </ScrollShadow>
                    </CardBody>
                    <Divider/>

                    <CardHeader >
                        <p className="text-md font-bold">Experience</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ScrollShadow className="w-full h-[138px] pl-4">
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>

                        </ScrollShadow>
                    </CardBody>
                    <Divider/>

                    <CardHeader >
                        <p className="text-md font-bold">Education</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ScrollShadow className="w-full h-[100px] pl-4">
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>
                            <p>I specialise in UX/ Ul design, product design and no-code development.</p>
                        </ScrollShadow>
                    </CardBody>
                    <Divider/>


                </Card>
            </div>
            <div className={"details"}>
                <Card className="min-w-[400px] flex-1">
                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">Location</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <p>Udugampola, Gampaha</p>
                    </CardBody>
                    <Divider/>

                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">Email</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <p>sajithbandara@gmail.com</p>
                    </CardBody>
                    <Divider/>

                    <CardBody>
                        <div className="flex gap-4 items-center ">
                            <Avatar isBordered radius="full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVsHgTWMCMNXjzm54tNMtwsXMQwe0Hej-t0arbxvcXtQxbh7hlxRdmJtOvFg&s" />
                            <Avatar isBordered radius="full" src="https://cdn-icons-png.freepik.com/256/3955/3955056.png" />
                            <Avatar isBordered radius="full" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" />
                            <Avatar isBordered radius="full" src="https://png.pngtree.com/png-vector/20190319/ourmid/pngtree-vector-web-icon-png-image_848026.jpg" />
                        </div>


                    </CardBody>

                    <Divider/>
                </Card>
                <Card className="min-w-[400px] flex-1 mt-4">
                    <CardHeader className="flex gap-3">
                        <p className="text-md font-bold">My CV</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div >
                            <Carousel/>
                        </div>
                    </CardBody>
                    <Divider/>

                </Card>
            </div>
        </div>
    );
};

export default PersonalDetails;