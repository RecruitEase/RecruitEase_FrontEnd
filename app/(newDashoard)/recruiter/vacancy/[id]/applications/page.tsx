"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import ApplicationComponent from "@/components/recruiter/ApplicationComponent";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import AllApplications from "@/components/recruiter/AllApplications";
import {useParams} from "next/navigation";
import {useJob} from "@/lib/hooks/useJobs";
import {useApplicationsByJob} from "@/lib/hooks/useApplications";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import {useCandidates} from "@/lib/hooks/useCandidates";



const Applications = () => {
  const [selected, setSelected] = React.useState("Application Stages");

  const params = useParams<{ id: string }>()

  const getJobQuery=useJob(params.id)
  const fetchedJob=getJobQuery.data;

  const getApplicationsQuery=useApplicationsByJob(params.id)

  // Extract candidateIds and get unique ids
  const candidateIdList: string[] = [];

  getApplicationsQuery.data?.map(app => {
    if (candidateIdList.indexOf(app.candidateId!) === -1) {
      candidateIdList.push(app.candidateId!)
    }
  });

  const getCandidateListQuery=useCandidates(candidateIdList)


  return (
    <div>
      {
        (getJobQuery.isFetching || getApplicationsQuery.isFetching || getCandidateListQuery.isFetching) ?
            <LoadingComponent/>
            : (getJobQuery.isError || getApplicationsQuery.isError || getCandidateListQuery.isError) ?
                < ErrorComponent/>
                :<>
      <header className="home-header">
        <HeaderBox
          type="title"
          title={`Applications for ${fetchedJob!.title} `}
          subtext="Manage the applications received for the job from here"
        />
      </header>



      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="Application Stages" title="Application Stages">
            <Card className="bg-transparent shadow-none">
              <CardBody >
                <ApplicationComponent job={fetchedJob!} candidates={getCandidateListQuery.data!} applications={getApplicationsQuery.data!} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="All Applications" title="All Applications">
            <Card>
              <CardBody>
                <AllApplications />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
                </>
      }
    </div>

  );
};

export default Applications;
