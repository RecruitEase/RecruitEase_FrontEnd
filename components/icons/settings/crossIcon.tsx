import React from "react";

export const CrossIcon = ({ color = "#D1E9FF", className, onClick }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer ${className}`} // Allows passing custom class names
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L12 9.586l4.293-4.293a1 1 0 111.414 1.414L13.414 11l4.293 4.293a1 1 0 01-1.414 1.414L12 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z"
                fill="currentColor" // Use currentColor to apply text color
            />
        </svg>
    );
};
