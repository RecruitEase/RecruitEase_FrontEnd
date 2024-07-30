"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import ApplicationComponent from "@/components/recruiter/ApplicationComponent";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import AllApplications from "@/components/recruiter/AllApplications";

const job = {
  jobTitle: "Software Engineer",
  jobType: "full time",
  locations: ["colombo", "galle"],
  fields: ["Automobile", "Insurance"],
  experienceLevel: 3,
  educationLevel: 3,
  overview: "This is a software engineer job",
  description: "This is a software engineer job",
  deadline: "2022-12-31",
  image: "https://via.placeholder.com/150",
};

const Applications = () => {
  const [selected, setSelected] = React.useState("Application Stages");

  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title={`Applications for ${job.jobTitle} `}
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
                <ApplicationComponent />
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
    </div>
  );
};

export default Applications;
