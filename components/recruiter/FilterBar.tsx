import { useState } from "react";

const FilterBar = () => {
  const [job, setJob] = useState("All");
  const [type, setType] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    console.log({ job, type, fromDate, toDate });
  };

  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg">
      <select
        value={job}
        onChange={(e) => setJob(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option selected>Choose a job</option>
        <option value="all">All</option>
        <option>Software Developer</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option selected>Choose a type</option>
        <option value="all">All</option>
        <option value="full-time">Full Time</option>
        <option value="part-time">Part Time</option>
      </select>
      <label>From:</label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
      <label>To:</label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={handleApply}
        className="bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterBar;
