"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import FilterBar from "@/components/recruiter/FilterBar";
import DashboardCards from "@/components/recruiter/DashboardCards";
import VacancyTable from "@/components/recruiter/VacancyTable";

const RecruiterDashboard = () => {
  const { theme, setTheme } = useTheme();

  // For user session state
  const { data: session } = useSession();
  console.log({ session });

  const [filter, setFilter] = useState({
    job: "All",
    type: "All",
    fromDate: "",
    toDate: "",
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="home-header py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-3 items-end">
              <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                variant="flat"
              >
                Post a Job
              </Button>
              <Button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                variant="flat"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <DashboardCards />
        </div>
        <div className="container mx-auto px-4">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        <div className="container mx-auto px-4">
          <VacancyTable filter={filter} />
        </div>
      </header>
    </div>
  );
};

export default RecruiterDashboard;
