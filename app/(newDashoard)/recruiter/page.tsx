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
import Link from "next/link";
import NextLink from "next/link";

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
      <div className="container mx-auto px-4 py-6">
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome UCSC!
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Looking for a person to fill a vacancy? Post a job now!
          </p>
          <div className="flex items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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

      <div className="container mx-auto px-4 py-6">
        <DashboardCards />
      </div>

      <div className="container mx-auto px-4 py-6">
        <Card className="w-full">
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4">
              <h3 className="text-xl font-semibold mb-4 sm:mb-0">
                Last Vacancies
              </h3>
              <Link
                href="/recruiter/vacancy"
                as={NextLink}
                className="text-primary-500 dark:text-primary-400 cursor-pointer"
              >
                View All
              </Link>
            </div>
            <FilterBar onFilterChange={handleFilterChange} />
            <VacancyTable filter={filter} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
