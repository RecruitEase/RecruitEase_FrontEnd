import React from "react";
import {Chip, User} from "@nextui-org/react";
import { RecruiterProp } from "@/types/users";
import { CoverLetterProps } from "@/types";

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


const HeaderDetails:React.FC<CoverLetterProps> = ({recruiter,application,job}) => {
    const userProfilePic=(recruiter?.profilePic)?process.env.NEXT_PUBLIC_S3_URL+recruiter.profilePic : "/profileImages/noImage.png";
    // @ts-ignore
    return (
        <div className={"mb-4 flex flex-wrap w-full"}>

            <div className={"flex justify-end w-full"}>
                <Chip
                    className="capitalize min-w-32 text-center "
                    style={{backgroundColor: statusColorMap[application.status], color: "#000000"}}
                    size="md"
                    variant="flat"
                    // color={"#000000"}
                >
                    {application.status}
                </Chip>
            </div>

            <div className={"w-full"}>
                <User
                    avatarProps={{radius: "lg", src: userProfilePic}}
                    description={recruiter.companyName}
                    name={recruiter.companyName + " - " + job.title}
                >
                </User>
            </div>


        </div>
    )
};

export default HeaderDetails;