import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";

interface FilterBarProps {
  onFilterChange: (filter: {
    job: string;
    type: string;
    fromDate: string;
    toDate: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [job, setJob] = useState("All");
  const [type, setType] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    onFilterChange({ job, type, fromDate, toDate });
  };

  return (
    <Card>
      <CardBody className="flex flex-row gap-4 flex-wrap">
        <select
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">Choose a job</option>
          <option value="all">All</option>
          <option value="Software Engineer">Software Engineer</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">Choose a type</option>
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
      </CardBody>
    </Card>
  );
};

export default FilterBar;
