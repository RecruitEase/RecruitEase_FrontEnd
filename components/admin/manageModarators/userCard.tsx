import React from "react";
import {Card, Chip, Image, Button} from "@nextui-org/react";
import { VscCommentDiscussion } from "react-icons/vsc";

export const UserCard = () => {
    // @ts-ignore
    return (
        <div className="relative">
            <Card className="max-w-[220px] p-2 relative">

                <div className="background h-28 bg-gray-300 rounded-t-xl p-2">
                    <div className="flex justify-end mb-4">
                        <Chip size="sm" className="bg-success-100 text-success-700 ">Active</Chip>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-10 flex justify-center mt-4">
                    <Image
                        alt="nextui logo"
                        style={{width: 100, height: 'auto', aspectRatio: 1}}
                        radius="full"
                        src={"https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7"}/>
                </div>

                <div className="flex justify-center mt-10">
                    <p className="font-bold text-lg">Sajith Bandara</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-sm text-tertiaryText font-bold">sajithbandara@gmail.com</p>
                </div>
                <div className="flex justify-center gap-2 mt-4 mb-4">
                    {/*<Button className="h-8 bg-recruitBlue text-[#FFFFFF]">Message</Button>*/}
                    {/*<Button className="h-8 bg-gray-600 text-[#FFFFFF]">Edit</Button>*/}
                    {/*<Button className="h-8 bg-[#F31260] text-[#FFFFFF]">Delete</Button>*/}

                    <Button className="bg-recruitBlue" isIconOnly variant="faded" aria-label="massage">
                        <VscCommentDiscussion color={"white"} size={25} />
                    </Button>
                    <Button className="bg-gray-600" isIconOnly  variant="faded" aria-label="edit">

                    </Button>
                    <Button className="bg-[#F31260]" isIconOnly  variant="faded" aria-label="delete">



                    </Button>


                </div>
            </Card>
        </div>
    );
};
