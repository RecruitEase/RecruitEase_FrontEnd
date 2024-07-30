// components/moderator/profile/PersonalDetails.tsx
import React from 'react';
import { Image, Card, Divider } from '@nextui-org/react';

interface ModeratorData {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    imageUrl: string;
}

interface PersonalDetailsProps {
    moderatorData: ModeratorData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ moderatorData }) => (
    <Card className="w-full md:w-full lg:w-full p-6 shadow-lg">
        <div className="flex flex-col items-center">
            <Image
                width={150}
                height={150}
                alt="Profile Image"
                src={moderatorData.imageUrl}
                className="rounded-full mb-6"
            />
        </div>
        <Divider />
        <div className="flex flex-col items-start mt-4">
            <div className="w-full mb-4">
                <label className="block text-gray-700 font-semibold">Name</label>
                <p className="text-md py-2">{moderatorData.name}</p>
            </div>
            <Divider />
            <div className="w-full mb-4">
                <label className="block text-gray-700 font-semibold">Address</label>
                <p className="text-md py-2">{moderatorData.address}</p>
            </div>
            <Divider />
            <div className="w-full mb-4">
                <label className="block text-gray-700 font-semibold">Email</label>
                <p className="text-md py-2">{moderatorData.email}</p>
            </div>
            <Divider />
            <div className="w-full mb-4">
                <label className="block text-gray-700 font-semibold">Phone Number</label>
                <p className="text-md py-2">{moderatorData.phoneNumber}</p>
            </div>
        </div>
    </Card>
);

export default PersonalDetails;
