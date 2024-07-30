import React from "react";
import {Chip, User} from "@nextui-org/react";

interface details{}
type Status = "Submitted" | "Under Review" | "Interview Called" | "Selected" | "Rejected" | "Withdrawn";


const statusColorMap: Record<Status, string> = {
    Submitted: "#D7F8FE",
    "Under Review": "#C9A9E9",
    "Interview Called": "#fbdba7",
    Selected: "#a2e9c1",
    Rejected: "#FAA0BF",
    Withdrawn: "#E4E4E7"
};

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


const HeaderDetails:React.FC<CoverLetterProps> = ({coverLetter}) => {
    // @ts-ignore
    return (
        <div className={"mb-4 flex flex-wrap w-full"}>

            <div className={"flex justify-end w-full"}>
                <Chip
                    className="capitalize min-w-32 text-center "
                    style={{backgroundColor: statusColorMap[coverLetter.status], color: "#000000"}}
                    size="md"
                    variant="flat"
                    // color={"#000000"}
                >
                    {coverLetter.status}
                </Chip>
            </div>

            <div className={"w-full"}>
                <User
                    avatarProps={{radius: "lg", src: coverLetter.avatar}}
                    description={coverLetter.date}
                    name={coverLetter.companyName + "-" + coverLetter.position}
                >
                </User>
            </div>


        </div>
    )
};

export default HeaderDetails;