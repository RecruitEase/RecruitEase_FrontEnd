// components/ModeratorProfile.js
import React from 'react';
import PersonalDetails from '@/components/moderator/profile/personalDetails';
import CustomCalendar from '@/components/moderator/profile/calendar';
import Task from '@/components/moderator/profile/task';


const moderatorData = {
    name: "Kusal Mendis",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield, Sri Lanka",
    phoneNumber: "123-456-7890",
    imageUrl: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
};

const tasks = [
    { id: 1, task: "Verify user payments", completed: false },
    { id: 2, task: "Handle user complaints", completed: false },
    { id: 3, task: "Update advertisement settings", completed: true },
];

// const calendarEvents = [
//     { id: 1, title: "Team Meeting", date: "2024-08-01" },
//     { id: 2, title: "Verification Deadline", date: "2024-08-02" },
// ];

const ModeratorProfile: React.FC = () => {
    return (
        //
        <div className="container mx-auto p-4 flex flex-col md:flex-row">
            <div className="flex-1 md:w-1/2">
                <PersonalDetails moderatorData={moderatorData} />
            </div>
            <div className="flex-1 md:w-1/2 md:ml-4 flex flex-col gap-4">
                <div className="pb-4">
                    <CustomCalendar />
                </div>
                <div className="pb-2 pl-8">
                    <Task tasks={tasks} />
                </div>
            </div>
        </div>
    );
};

export default ModeratorProfile;
