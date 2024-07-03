"use client";
import { useState } from 'react';

const Filter = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [isRemote, setIsRemote] = useState(false);

  const industries = ['All Industries', 'IT-Software / Internet'];
  const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];
  const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level'];
  const postedTimes = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];

  return (
    <div className="space-y-4 p-4  ">
      <div className="relative">
        <select
          className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        <div className="absolute top-0 right-0 mr-4 mt-3">
         
        </div>
      </div>

      <div>
        <select className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Job Type</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Job Level</option>
          {jobLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Posted</option>
          {postedTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="remote" className="text-secondaryText">
          Remote/Work From Home
        </label>
        <input
          type="checkbox"
          id="remote"
          className="h-6 w-6 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          checked={isRemote}
          onChange={() => setIsRemote(!isRemote)}
        />
      </div>
    </div>
  );
};

export default Filter;
