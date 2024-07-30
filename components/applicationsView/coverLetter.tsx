import React from "react";
import HeaderDetails from "@/components/applicationsView/HeaderDetails";

type CoverLetter = {
    avatar: string;
    companyName: string;
    position: string;
    date: string;
    status: string;
    letter: string;
};

type CoverLetterProps = {
    coverLetter: CoverLetter;
};


const CoverLetter:React.FC<CoverLetterProps> = ({coverLetter}) => {
    return (
        <div className={"flex flex-col"}>
            <div>
                <HeaderDetails coverLetter={coverLetter}></HeaderDetails>
            </div>
            <div>
                {coverLetter.letter}
            </div>

        </div>
    )
};

export default CoverLetter;