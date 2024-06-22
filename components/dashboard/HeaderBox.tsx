import React from 'react';
import {toTitleCase} from "@/utils/stringUtils";

const HeaderBox = ({type="title",title,subtext,user="Guest"}:HeaderBoxProps) => {
    return (
        <div className="header-box">
            <h1 className="header-box-title text-primary">
                {title}
                {type==='greeting' && (
                    <span className="text-recruitBlue">
                        &nbsp;{toTitleCase(user)}
                    </span>
                )}
            </h1>
            <p className="header-box-subtext text-subtext">{subtext}</p>
        </div>
    );
};

export default HeaderBox;
