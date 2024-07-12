import React from 'react';
import { toTitleCase } from "@/utils/stringUtils";

const HeaderBox = ({ type = "title", title, subtext, user = "Guest" }: HeaderBoxProps) => {
    return (
        <div className="header-box mb-5">
            <h1 className="header-box-title">
                {title}
                {type === 'greeting' && (
                    <span className="text-recruitBlue">
                        &nbsp;{toTitleCase(user)}
                    </span>
                )}
            </h1>
            <p className="header-box-subtext">{subtext}</p>
        </div>
    );
};

export default HeaderBox;
