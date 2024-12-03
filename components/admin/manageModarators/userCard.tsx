import React from "react";
import { Card, Chip, Image, Button } from "@nextui-org/react";
import { BiEdit, BiMessageRounded } from "react-icons/bi";
import { RiEdit2Line } from "react-icons/ri";

declare type ModeratorCard = {
    id:string ,
    email:string ,
    role:string,
    isActive: true,
    createdAt: string,
    firstName: string,
    lastName: string,
    city: string,
    gender: string,
    profilePic: string,
    moderatorId:string,
    mobileNumber:string
};

declare interface UserCardProps {
    user: ModeratorCard;
    onEdit: () => void;
    onDelete: (id:string) => void;
    onActive: (id:string) => void;
}

function emailLength(email: string) {
    if (email.length <= 22) {
        return email;
    }
    return email.substring(0, 20) + '...';
}

export const UserCard = ({ user, onEdit, onDelete,onActive }: UserCardProps) => {

    return (
        <div className="relative">
            <Card className="min-w-[198.5px] p-2 relative">
                <div
                    className=" background h-28 bg-gray-300 rounded-t-xl p-2 "
                    // style={{
                    //     backgroundImage: `url(${user.profilePic})`,
                    //     backgroundSize: 'cover',
                    //     backgroundPosition: 'center',
                    //     filter: 'blur(8px)', // Apply blur effect here
                    //     WebkitFilter: 'blur(8px)', // For Safari
                    // }}
                >

                    <div className=" flex justify-end mb-4">
                        <Chip
                            size="sm"
                            className={`${
                                user.isActive ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                            }`}

                        >
                            {user.isActive ? "Active" : "Disable"}
                        </Chip>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-10 flex justify-center mt-4">
                    <Image
                        alt="nextui logo"
                        style={{width: 100, height: "auto", aspectRatio: 1}}
                        radius="full"
                        src={user.profilePic}
                    />
                </div>

                <div className="flex justify-center mt-10">
                    <p className="font-bold text-lg">{user.firstName + " " + user.lastName}</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-sm text-tertiaryText font-bold">{emailLength(user.email)}</p>
                </div>
                {user.mobileNumber &&
                    <div className="flex justify-center">
                        <p className="text-sm text-tertiaryText font-bold">{user.mobileNumber}</p>
                    </div>
                }

                <div className="flex justify-center gap-2 mt-4 mb-4">
                    {
                        user.isActive ?
                            <Button onClick={() => onDelete(user.id)}
                                    className="bg-[#F31260] text-white font-bold w-full">
                                Deactivate
                            </Button> :
                            <Button onClick={() => onActive(user.id)}
                                    className="bg-recruitBlue text-white font-bold w-full">
                                Activate
                            </Button>
                    }
                    {/*<Button className="bg-gray-600 w-1/2" isIconOnly variant="faded" aria-label="edit" onPress={onEdit}>*/}
                    {/*    /!*<BiEdit color={"white"} size={25} />*!/*/}
                    {/*    <RiEdit2Line color={"white"} size={25}/>                    </Button>*/}
                    {/*<Button className="bg-[#F31260]" isIconOnly variant="faded" aria-label="delete" onPress={onDelete}>*/}
                    {/*    <RiDeleteBin5Line color={"white"} size={25} />*/}
                    {/*</Button>*/}
                </div>
            </Card>
        </div>
    );
};
