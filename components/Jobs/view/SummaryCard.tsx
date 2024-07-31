import React from "react";
import { FiMapPin, FiClock, FiBriefcase, FiBookmark } from "react-icons/fi";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/react";

const SummaryCard = ({job}) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full py-20 flex flex-wrap justify-center items-center gap-2">
        <div className="w-[20rem] mx-auto flex flex-col gap-2 px-4 border border-gray-300 border-gray-300 rounded-lg bg-greybg">
          <div className="w-full flex justify-center items-center">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              className="w-[8rem] h-[8rem] rounded-lg outline outline-offset-2 outline-1 outline-blue-400 shadow-lg relative -top-[2rem]"
              src={job.logo}
              alt="Profile Image"
            />
          </div>

          <div >

          <h2 className="text-xl font-semibold text-primaryText">
            {job.title}
          </h2>
          <p className="text-secondaryText">
            {job.company}
          </p>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiMapPin className="mr-2" />
            <p>{job.location}</p>
          </div>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiClock className="mr-2" />
            <p>{job.daysLeft}</p>
          </div>
          <div className="flex items-center mt-2 text-secondaryText">
            <FiBriefcase className="mr-2" />
            <p>{job.type}</p>
          </div>
          <hr className="h-px bg-graybg"></hr>
          <div className="mt-4">
            <p className="text-tertiaryText">
              {job.overview}
            </p>
            <div className="mt-2 text-secondaryText">
              <p>
                <strong>Education:</strong> {job.education}
              </p>
              <p>
                <strong>Experience:</strong>  {job.experience}
              </p>
              <p>
                <strong>Salary Range:</strong> Any
              </p>
            </div>
          </div>
    
          </div>

          <div className="flex w-full justify-around p-4  border-t">
            <Button   className="bg-green-500 text-white px-4 py-2 rounded" as={Link} href={`/jobs/${job.id}/apply`}>Apply for Job</Button>
            <Button className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300">Save
              Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
