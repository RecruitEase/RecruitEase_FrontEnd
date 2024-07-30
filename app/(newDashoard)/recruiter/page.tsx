"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import FilterBar from "@/components/recruiter/FilterBar";
import DashboardCards from "@/components/recruiter/DashboardCards";
import VacancyTable from "@/components/recruiter/VacancyTable";
import { Card, CardBody } from "@nextui-org/react";
import { MdOutlinePostAdd } from "react-icons/md";

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
    <div className="min-h-screen">
      <header className="home-header py-4">
        <div className="container mx-auto px-4">
          {/* <div className="flex flex-col gap-4">
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
          </div> */}

          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Welcome UCSC!
            </h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              Looking for a person to fill a vacancy? Post a job now!
            </p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <a
                href="/recruiter/post"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <MdOutlinePostAdd />
                <div className="text-left rtl:text-right">
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    &nbsp; Create a Vacancy
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <DashboardCards />
        </div>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <div className="container mx-auto px-4">
              <FilterBar onFilterChange={handleFilterChange} />
            </div>
            <div className="container mx-auto px-4">
              <VacancyTable filter={filter} />
            </div>
          </CardBody>
        </Card>
      </header>
    </div>
  );
};

export default RecruiterDashboard;
