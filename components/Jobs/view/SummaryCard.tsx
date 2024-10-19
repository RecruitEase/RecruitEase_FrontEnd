import React from "react";
import { FiMapPin, FiClock, FiBriefcase, FiBookmark } from "react-icons/fi";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/react";
import {Job} from "@/types/job";
import {RecruiterProp} from "@/types/users";
import {daysLeft, toTitleCase, truncateString} from "@/utils/stringUtils";
import {educationLevelTypes, experienceLevelTypes, jobTypes, locations} from "@/components/recruiter/data";

const SummaryCard = ({job,recruiter}:{job:Job,recruiter:RecruiterProp}) => {
  const userProfilePic=(recruiter?.profilePic)?process.env.NEXT_PUBLIC_S3_URL+recruiter.profilePic : "/profileImages/noImage.png";
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full py-20 flex flex-wrap justify-center items-center gap-2">
        <div className="w-[20rem] mx-auto flex flex-col gap-2 px-4 border border-gray-300 border-gray-300 rounded-lg bg-greybg">
          <div className="w-full flex justify-center items-center">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              className="w-[8rem] h-[8rem] rounded-lg outline outline-offset-2 outline-1 outline-blue-400 shadow-lg relative -top-[2rem]"
              src={userProfilePic}
              alt="Profile Image"
            />
          </div>

          <div >

          <h2 className="text-xl font-semibold text-primaryText">
            {truncateString(toTitleCase(job.title),18)}
          </h2>
          <p className="text-secondaryText">
            {toTitleCase(recruiter.companyName)}
          </p>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiMapPin className="mr-2" />
            <p>{locations.find(x => x.key == job.location)?.label}</p>
          </div>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiClock className="mr-2" />
            <p>{daysLeft(job.deadline)}</p>
          </div>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiBriefcase className="mr-2" />
            <p>{jobTypes.find(x => x.key == job.type)?.label}</p>
          </div>
          <hr className="h-px bg-graybg"></hr>
          <div className="mt-4">
            <p className="text-tertiaryText">
              {job.overview}
            </p>
            <div className="mt-2 text-secondaryText">
              <p>
                <strong>Education:</strong> {educationLevelTypes.find(x => x.key == job.educationLevel)?.label}
              </p>
              <p>
                <strong>Experience:</strong>  {experienceLevelTypes.find(x => x.key == job.experienceLevel)?.label}
              </p>
            </div>
          </div>
    
          </div>

          <div className="flex w-full justify-around p-4  border-t">
            <Button   className="bg-green-500 text-white px-4 py-2 rounded" as={Link} href={`/jobs/${job.jobId}/apply`}>Apply for Job</Button>
            {/*<Button className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300">Save*/}
            {/*  Job*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
