import React from "react";

export const DeleteIcon = () => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="fill-default-400" // Add this class for styling if needed
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6C3 5.44772 3.44772 5 4 5H5V4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V5H20C20.5523 5 21 5.44772 21 6V7H3V6ZM6 6V5H18V6H6ZM5 9H19V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V9ZM6 20V10H18V20H6Z"
                fill="#969696" // Default fill color
            />
        </svg>
    );
};
