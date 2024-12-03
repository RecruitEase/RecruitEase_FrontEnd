import React from "react";

interface AtsResponse {
  applicationId: string;
  status: string;
  updatedAt: string; // ISO string or Date
}

interface JobApplicationHistoryProps {
  history: AtsResponse[];
}

const JobApplicationHistory: React.FC<JobApplicationHistoryProps> = ({
  history,
}) => {
  return (
    <div>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {history.map((item) => (
          <li key={item.applicationId} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {new Date(item.updatedAt).toLocaleString()}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.status}
            </h3>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default JobApplicationHistory;
