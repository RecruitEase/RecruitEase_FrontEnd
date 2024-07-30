"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import { useSession } from "next-auth/react";
import FilterBar from "@/components/recruiter/FilterBar";
import DashboardCards from "@/components/recruiter/DashboardCards";
import VacancyTable from "@/components/recruiter/VacancyTable";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const vacancies = () => {
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Vacancies"
          subtext="Manage your job vacancies"
        />
        <div className="container mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-3 items-end">
              <Button
                href={"/recruiter/post"}
                as={Link}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                variant="flat"
              >
                Post a Job
              </Button>
              <Button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                variant="flat"
              >
                Download
              </Button>
              <Button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                variant="flat"
              >
                Statistics
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto ">
          <VacancyTable />
        </div>
      </header>
    </div>
  );
};

export default vacancies;
