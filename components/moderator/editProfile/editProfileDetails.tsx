"use client";

import React from 'react';
import { Card, Image, Button, Input } from "@nextui-org/react";
import { CameraIcon } from "@/components/icons/settings/cameraIcon";
import { DeleteIcon } from "@/components/icons/settings/deleteIcon";
import { FrameIcon } from "@/components/icons/settings/frameIcon";
import { EditIcon } from "@/components/icons/settings/editIcon"; // Import the EditIcon

const EditProfileCard = () => {
    const handleImageUpload = () => {
        alert('Upload new profile image');
        // Add your logic here for uploading a new image
    };

    const handleDeleteIconClick = () => {
        alert('Delete photo clicked');
        // Add your logic here for deleting the photo
    };

    const handleFrameIconClick = () => {
        alert('Add frame clicked');
        // Add your logic here for adding a frame
    };

    return (
        <div className="flex justify-center items-start min-h-screen p-4 mt-8">
            <Card radius="lg" className="border-none p-8 w-[40rem]">
                <div className="flex flex-col items-center">
                    {/* Profile Image and Icons */}
                    <div className="flex flex-col items-center">
                        <Image
                            alt="Profile Photo"
                            className="rounded-full object-cover"
                            height={150}
                            src="https://nextui.org/images/hero-card.jpeg"
                            width={150}
                        />
                        <div className="flex flex-row space-x-4 mt-4">
                            <Button
                                isIconOnly
                                color="warning"
                                variant="faded"
                                aria-label="Change profile photo"
                                className="text-xs w-8 h-8"
                                onClick={handleImageUpload}
                            >
                                <CameraIcon />
                            </Button>
                            <Button
                                isIconOnly
                                color="warning"
                                variant="faded"
                                aria-label="Add frame"
                                className="text-xs w-8 h-8"
                                onClick={handleFrameIconClick}
                            >
                                <FrameIcon />
                            </Button>
                            <Button
                                isIconOnly
                                color="warning"
                                variant="faded"
                                aria-label="Delete photo"
                                className="text-xs w-8 h-8"
                                onClick={handleDeleteIconClick}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col space-y-4 mt-8 w-full max-w-md">
                        <Input
                            type="text"
                            label="Name"
                            defaultValue="Kusal Mendis"
                            className="w-full"
                            endContent={<EditIcon className="text-2xl text-default-400" />}
                        />
                        <Input
                            type="text"
                            label="Address"
                            defaultValue="123 Main St, Springfield, Sri Lanka"
                            className="w-full"
                            endContent={<EditIcon className="text-2xl text-default-400" />}
                        />
                        <Input
                            type="text"
                            label="Phone Number"
                            defaultValue="123-456-7890"
                            className="w-full"
                            endContent={<EditIcon className="text-2xl text-default-400" />}
                        />
                        <Input
                            type="email"
                            label="Email Address"
                            defaultValue="junior@nextui.org"
                            className="w-full"
                            isReadOnly
                            endContent={<EditIcon className="text-2xl text-default-400" />}
                        />
                        <Button className="w-24 mt-4" size="sm" color="danger" variant="bordered">Save Changes</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EditProfileCard;
