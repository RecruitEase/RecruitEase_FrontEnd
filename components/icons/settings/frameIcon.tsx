import React from "react";

export const FrameIcon = () => {
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
                d="M3 3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3ZM4 4V20H20V4H4ZM5 6H19V18H5V6Z"
                fill="#969696" // Default fill color
            />
        </svg>
    );
};
