// components/moderatorProfile/CustomCalendar.tsx
import React from 'react';
import { Calendar } from '@nextui-org/react';

export default function CustomCalendar() {
    return (
        <div className="flex justify-end p-4">
            <div className="w-full max-w-md"> {/* Adjust width as needed */}
                <Calendar aria-label="Date (No Selection)" />
            </div>
        </div>
    );
}
