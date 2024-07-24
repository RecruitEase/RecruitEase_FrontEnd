import React from "react";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

interface JobApplicationHistoryProps {
  applied: any;
  preScreening: any;
  shortListed: any;
  interviewScheduled: any;
  interview: any;
  offered: any;
  rejected: any;
}

const JobApplicationHistory = ({
  applied,
  preScreening,
  shortListed,
  interviewScheduled,
  interview,
  offered,
  rejected,
}: JobApplicationHistoryProps) => {
  const stages = [
    { name: "Applied", data: applied },
    { name: "Pre-Screening", data: preScreening },
    { name: "Short Listed", data: shortListed },
    { name: "Interview Scheduled", data: interviewScheduled },
    { name: "Interview", data: interview },
    { name: "Offered", data: offered },
    { name: "Rejected", data: rejected },
  ];

  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {stages.map((stage, index) => (
        <li
          className={`mb-10 ms-6 ${!stage.data ? "opacity-50" : ""}`}
          key={index}
        >
          <span
            className={`absolute flex items-center justify-center w-6 h-6 ${
              stage.data ? "bg-blue-100" : "bg-red-100"
            } rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ${
              stage.data ? "dark:bg-blue-900" : "dark:bg-red-900"
            }`}
          >
            {stage.data ? <TiTick /> : <MdCancel />}
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {stage.name}
            {stage.data?.score && (
              <button className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                Score: {stage.data.score}
              </button>
            )}
            {stage.data?.status && (
              <button className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                {stage.data.status}
              </button>
            )}
          </h3>
          {stage.data?.date && (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              on {stage.data.date}
            </time>
          )}
          {stage.data?.link && (
            <a
              href={stage.data.link}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              {stage.data.linkText}
            </a>
          )}
        </li>
      ))}
    </ol>
  );
};

export default JobApplicationHistory;
