"use client";
import React from "react";
import {Card, Input,Button} from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/icons/settings/eyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/settings/eyeSlashFilledIcon";


export default function App() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex items-center justify-center">
            <Card radius="lg"
                  className="border-none flex flex-col p-8 w-[40rem] gap-8">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <hr className="border-t-2 border-gray-300 w-full my-2"/>

                <Input type="email" label="Email" placeholder="Enter your email" />
                <Input type="text" label="Username" placeholder="Enter your username" />

                <Input
                    label="Old Password"
                    variant="bordered"
                    placeholder=" Enter your old password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />

                <Input
                    label="New Password"
                    variant="bordered"
                    placeholder=" Enter your new password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />

                <Input
                    label="Confirm New Password"
                    variant="bordered"
                    placeholder=" Enter your new password again"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />
                <Button className="w-20 font-bold" size="sm" color="danger" variant="bordered">Update</Button>
            </Card>
        </div>
    );
}

