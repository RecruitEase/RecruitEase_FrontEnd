"use client";
import React from 'react';
import { Card, Image, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { CameraIcon } from "@/components/icons/settings/cameraIcon";
import { DeleteIcon } from "@/components/icons/settings/deleteIcon";
import { FrameIcon } from "@/components/icons/settings/frameIcon";
import { EyeIcon } from "@/components/icons/settings/eyeIcon";
import { EditIcon } from "@/components/icons/settings/editIcon";
import { CrossIcon } from "@/components/icons/settings/crossIcon";


const ChangeProfilePhoto = () => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Anyone"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    const handleSelectionChange = (keys: Set<string>) => {
        setSelectedKeys(keys);
    };

    const handleCrossIconClick = () => {
        alert('Cross icon clicked!');
        // Add your logic here
    };

    return (
        <div className="flex flex-col items-center space-y-8">
            {/* First Card */}
            <Card
                radius="lg"
                className="border-none flex flex-row p-8 w-[60rem] gap-12"
            >
                {/* Left Column */}
                <div className="flex flex-col items-center pl-4">
                    <div className="flex items-center space-x-2">
                        <p className="mr-6">Who can see your profile photo</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize h-8"
                                    startContent={
                                        <EyeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                >
                                    {selectedValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem key="My Network">My Network</DropdownItem>
                                <DropdownItem key="All Recruitease members">All Recruitease members</DropdownItem>
                                <DropdownItem key="Anyone">Anyone</DropdownItem>
                                <DropdownItem key="Only me">Only me</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Image
                        alt="Profile Photo"
                        className="rounded-full object-cover pt-4"
                        height={150}
                        src="https://nextui.org/images/hero-card.jpeg"
                        width={150}
                    />
                    <div className="flex flex-row items-center space-x-4 pt-4">
                        <div className="flex flex-col items-center space-y-1">
                            <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo" className="text-xs w-8 h-8">
                                <CameraIcon />
                            </Button>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <Button isIconOnly color="warning" variant="faded" aria-label="Delete photo" className="text-xs w-8 h-8">
                                <DeleteIcon />
                            </Button>
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                            <Button isIconOnly color="warning" variant="faded" aria-label="Add frame" className="text-xs w-8 h-8">
                                <FrameIcon />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col space-y-4 flex-grow ml-8 pt-8">
                    <Input
                        type="text"
                        label="Name"
                        defaultValue="Sajith Bandara"
                        className="w-full max-w-xs"
                    />
                    <Input
                        type="text"
                        label="Bio"
                        defaultValue="I'm a Product Designer based in Dallas"
                        className="w-full max-w-xs"
                    />
                    <div className="flex flex-col items-center pt-8 pr-32">
                        <Button className="w-24" size="sm" color="danger" variant="bordered">Update</Button>
                    </div>
                </div>
            </Card>

            {/* Second Card */}
            <Card
                radius="lg"
                className="border-none flex flex-col p-8 w-[60rem] gap-12"
            >
                <div className="flex flex-col space-y-4">
                    <Input
                        type="text"
                        startContent={
                            <EditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="About me"
                        defaultValue="I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X."
                        className="h-full w-auto"
                    />
                    <Input
                        type="text"
                        startContent={
                            <EditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Location"
                        defaultValue="I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product "

                    />
                    <Input
                        isReadOnly
                        type="email"
                        label="Email"
                        defaultValue="junior@nextui.org"
                        className="max-w-xs"
                    />
                    <Button className="w-24" size="sm" color="danger" variant="bordered">Update</Button>
                </div>
            </Card>

            {/* 3rd Card */}
            <Card radius="lg" className="border-none flex flex-col p-8 w-[60rem] gap-8">

                <h3 className="text-lg font-semibold">Skills</h3>

                <hr className="border-t-2 border-gray-300 w-full" />

                <div className="flex gap-8">
                    {/* Left Column */}
                    <div className="flex flex-col flex-grow">
                        <ul className="list-none pl-0 space-y-2">
                            <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                <CrossIcon onClick={handleCrossIconClick} className="text-custom-blue mr-2" />
                                <span>UX Design</span>
                            </li>

                            <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                <CrossIcon onClick={handleCrossIconClick} className="text-custom-blue mr-2" />
                                <span>Product Design</span>
                            </li>

                            <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                <CrossIcon onClick={handleCrossIconClick} className="text-custom-blue mr-2" />
                                <span>Figma Design</span>
                            </li>

                            <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                <CrossIcon onClick={handleCrossIconClick} className="text-custom-blue mr-2" />
                                <span>Dataflow</span>
                            </li>
                        </ul>

                        <Button className="w-24 mt-4" size="sm" color="danger" variant="bordered">Add Skills</Button>

                        <div className="flex items-center space-x-2 mt-4">
                            <Input className="max-w-xs" type="text" size="sm" label="Add Skills" />
                            <Button className="w-8 h-8 text-lg p-0 font-bold" size="sm" color="danger" variant="bordered">+</Button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col flex-grow">
                        <div className="border border-gray-300 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4">Suggested based on your Profile</h3>

                            <ul className="list-none pl-0 space-y-2">
                                <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                    <span className="pr-4 font-bold text-xl text-custom-danger">+</span>Front-End Developer
                                </li>

                                <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                    <span className="pr-4 font-bold text-xl text-custom-danger">+</span>Front-End Developer
                                </li>

                                <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                    <span className="pr-4 font-bold text-xl text-custom-danger">+</span>Front-End Developer
                                </li>

                                <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                    <span className="pr-4 font-bold text-xl text-custom-danger">+</span>Front-End Developer
                                </li>

                                <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-2xl max-w-xs">
                                    <span className="pr-4 font-bold text-xl text-custom-danger">+</span>Front-End Developer
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>

            {/*4th card*/}
            <div className="flex gap-4">
                <Card
                    radius="lg"
                    className="border-none flex flex-col p-8 w-[30rem] gap-8"
                >
                    <h3 className="text-lg font-semibold">Education</h3>
                    <hr className="border-t-2 border-gray-300 w-full my-2"/>

                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-xl max-w-xs">
                            Education 1
                        </li>

                        <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-xl max-w-xs">
                            Education 2
                        </li>

                        <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-xl max-w-xs">
                            Education 3
                        </li>

                    </ul>

                    <Button className="w-32" size="sm" color="danger" variant="bordered">Add New Education</Button>

                    <div className="flex items-center space-x-2">
                        <Input className="max-w-xs" type="text" size="sm" label="add education" />
                        <Button className="w-8 h-8 text-lg p-0 font-bold" size="sm" color="danger" variant="bordered">+</Button>
                    </div>
                </Card>

                <Card
                    radius="lg"
                    className="border-none flex flex-col p-8 w-[30rem] gap-8"
                >
                    <h3 className="text-lg font-semibold">Experience</h3>
                    <hr className="border-t-2 border-gray-300 w-full my-2"/>

                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-xl max-w-xs">
                            Experience 1
                        </li>

                        <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-xl max-w-xs">
                            Experience 2
                        </li>

                        <li className="flex items-center space-x-2 p-2 border border-gray-300 rounded-xl max-w-xs">
                            Experience 3
                        </li>

                    </ul>

                    <Button className="w-32" size="sm" color="danger" variant="bordered">Add New Experience</Button>

                    <div className="flex items-center space-x-2">
                        <Input className="max-w-xs" type="text" size="sm" label="add experience" />
                        <Button className="w-8 h-8 text-lg p-0 font-bold" size="sm" color="danger" variant="bordered">+</Button>
                    </div>
                </Card>

            </div>

        </div>
    );
}

export default ChangeProfilePhoto;
