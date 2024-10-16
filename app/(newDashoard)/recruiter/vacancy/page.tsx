"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import FilterBar from "@/components/recruiter/FilterBar";
import VacancyTable from "@/components/recruiter/VacancyTable";
import { Card, CardBody } from "@nextui-org/react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import {useApplications} from "@/lib/hooks/useApplications";
import {useJobsByLoggedRecruiter} from "@/lib/hooks/useJobs";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import ApplicationStatusTableFinal from "@/components/applicationStatus/ApplicationStatusTableFinal";

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

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  //fetching data
  const jobQueryByLoggedRecruiter=useJobsByLoggedRecruiter();
  console.log("logged user jobs",jobQueryByLoggedRecruiter.data)




  return (
    <div className="min-h-screen">
      <HeaderBox title="Vacancies" subtext="Manage your vacancies" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end gap-3 items-end">
            <Button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              variant="flat"
              onClick={() => {
                location.href = "/recruiter/post";
              }}
            >
              Post a Job
            </Button>
          </div>
        </div>
      </div>

      {
        (jobQueryByLoggedRecruiter.isFetching)?
            <LoadingComponent />
            :(jobQueryByLoggedRecruiter.isSuccess && jobQueryByLoggedRecruiter.data.length==0)?
                <div className="flex justify-center items-center h-96">
                  You have not posted any vacancies!
                </div>
                :(jobQueryByLoggedRecruiter.isError)?
                    < ErrorComponent />
                    :
                    <Card>
                      <CardBody className="flex flex-col gap-4">
                        <div className="container mx-auto px-4">
                          <FilterBar onFilterChange={handleFilterChange} />
                        </div>
                        <div className="container mx-auto px-4">
                          <VacancyTable vacancies={jobQueryByLoggedRecruiter.data!} filter={filter} />
                        </div>
                      </CardBody>
                    </Card>

      }


    </div>
  );
};

export default RecruiterDashboard;
