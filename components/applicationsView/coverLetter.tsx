import React from "react";
import HeaderDetails from "@/components/applicationsView/HeaderDetails";
import { ApplicationIcon } from "../icons/sidebar/application-icon";
import { ApplicationProp } from '../../types/applications';
import { CoverLetterProps } from "@/types";
import ReactQuillReadOnly from "../ReactQuillReadOnly";




const CoverLetter:React.FC<CoverLetterProps> = ({application,recruiter,job}) => {
    return (
        <div className={"flex flex-col"}>
            <div>
                <HeaderDetails job={job} application={application} recruiter={recruiter}/>
            </div>
            <div>
                <div className={"mb-2 mt-4 text-2xl font-bold"}>Cover Letter</div>
                <ReactQuillReadOnly classNameProps={"h-96"} content={application.coverLetter} />

            </div>

        </div>
    )
};

export default CoverLetter;