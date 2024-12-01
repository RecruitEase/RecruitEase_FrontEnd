// pages/index.jsx
import React from "react";
import { Card, CardHeader, Chip, ChipProps } from "@nextui-org/react";
import { IoLocationOutline as IoLocationOut } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import Image from "next/image";
import {daysLeft, formatDate, toTitleCase} from "@/utils/stringUtils";
import {fieldValues, jobTypes, locations} from "@/components/recruiter/data";
import { useRouter } from "next/navigation";

const jobTypeColorMatch: Record<string, ChipProps["color"]> = {
  full_time: "success",
  contract: "danger",
  other: "default",
  part_time: "warning",
};

const JobCard = ({ job,companyImg }: { job: any, companyImg:string}) => {
  const router = useRouter();

console.log("Jobsssssssss", job);
  // image URL
  const jobImg = (companyImg) ? process.env.NEXT_PUBLIC_S3_URL + companyImg : "/profileImages/noImage.png";
  return (
    // <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4 bg-white shadow-md">
    //   <img
    //     src={jobImg}
    //     alt={`${job.company} logo`}
    //     className="w-16 h-16 rounded-md mx-auto md:mx-0"
    //   />
    //   <div className="flex-1">
    //     <div className="flex justify-between items-start">
    //       <div>
    //         <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>

    //         <div className="flex items-center text-gray-500 space-x-2 mt-2">
    //           <span className="flex items-center">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-4 w-4 mr-1"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 100 10A5 5 0 0010 5zM2.293 9.293a1 1 0 011.414 0L10 15.586l6.293-6.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             {job.location}
    //           </span>
    //           <span className="flex items-center">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-4 w-4 mr-1"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M9 2a1 1 0 011-1h4a1 1 0 011 1v6h-6V2zM4 4a1 1 0 100 2h6V4H4zM3 8a1 1 0 011-1h1a1 1 0 010 2H4a1 1 0 01-1-1zm3 2a1 1 0 100 2h4a1 1 0 100-2H6zm-3 3a1 1 0 100 2h6a1 1 0 100-2H3z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             {job.type}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="flex items-center text-gray-500 space-x-1">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-4 w-4"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M8 2a1 1 0 100 2h4a1 1 0 100-2H8zM3 5a1 1 0 100 2h14a1 1 0 100-2H3zm-1 3a1 1 0 011-1h16a1 1 0 110 2H3a1 1 0 01-1-1zm1 4a1 1 0 100 2h16a1 1 0 100-2H3zm0 4a1 1 0 100 2h16a1 1 0 100-2H3z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <span>{daysLeft} days left</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="mb-4"
      key={job.jobId} // Ensure you have unique key for each item
      onClick={() => router.push(`/jobs/${job.jobId}`)}
    >
      <Card className="cursor-pointer" isHoverable>
        <CardHeader className="grid grid-cols-12 gap-2 items-center justify-center">
          <div className="relative md:col-span-1 col-span-3 flex items-center justify-center">
            <img
              alt="Job logo"
              height={65}
              src={jobImg}
              width={65}
            />
          </div>
          <div className="relative sm:col-span-6 col-span-9">
            <p className="text-md font-bold">{toTitleCase(job.title)}</p>
            {/* <p className="text-small text-default-500 font-semibold">{toTitleCase(job.companyName)}</p> */}
            <div className="inline-flex items-center mt-2 gap-2">
              <IoLocationOut className="icon" />
              <p className="font-mono">{locations.find(x => x.key === job.location)?.label}</p>
            </div>
          </div>
          <div className="relative sm:col-span-2 col-span-12 sm:col-end-13 sm:col-start-11">
            <Chip color={jobTypeColorMatch[job.type]} variant="flat">
              {jobTypes.find(x => x.key === job.type)?.label}
            </Chip>
            <div className="flex items-center gap-2">
              <MdAccessTime />
              <span>{daysLeft(job.deadline)}</span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default JobCard;
