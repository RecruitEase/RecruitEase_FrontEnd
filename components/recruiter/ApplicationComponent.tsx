"use client";
import React, { Key, useEffect } from "react";
import { Tabs, Tab, SelectItem, Select } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { useMediaQuery } from "react-responsive";
import { FaTag } from "react-icons/fa";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { Button } from "@nextui-org/button";
import ApplicationTable from "@/components/recruiter/ApplicationTable";
import ViewCvPopup from "./ViewCvPopup";
import ViewAnswersPopup from "./ViewAnswersPopup";
import { MdOutlineQuiz } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPaste } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { ApplicationProp } from "@/types/applications";
import { CandidateProp, RecruiterProp } from "@/types/users";
import { Job } from "@/types/job";
import { toTitleCase } from "@/lib/utils";
import { formatDate } from "@/utils/stringUtils";
import { useApplicationStatusChange } from "@/lib/hooks/useApplications";
import { applicationStatusChange } from "@/lib/api";

declare interface ApplicationsPerJobComponentProps {
  applications: ApplicationProp[];
  job: Job;
  candidates: CandidateProp[];
}
export default function ApplicationComponent({
  applications,
  candidates,
  job,
}: ApplicationsPerJobComponentProps) {
  console.log("apps", applications);
  console.log("cands", candidates);

  // const applicant: ApplicationProps = {
  //   name: "David Eliot",
  //   city: "Colombo",
  //   email: "davideliot@gmail.com",
  //   status: "underReview",
  //   appliedDate: "2024-10-10",
  //   cv: {
  //     cvId: "1",
  //     cvName: "CV1",
  //     file: "/assets/cv.pdf",
  //     modifiedDate: "2021-09-01",
  //     type: "uploaded",
  //   },
  // };

  //cv popup
  const [isOpenCV, setIsOpenCV] = React.useState(false);
  const [isOpenAnswers, setIsOpenAnswers] = React.useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    React.useState<CandidateProp | null>(null);
  const [selectedApplicantion, setSelectedApplicantion] =
    React.useState<ApplicationProp | null>(null);

  const handleOpenChangeCV = (open) => {
    setIsOpenCV(open);
  };

  const handleOpenChangeAnswers = (open) => {
    setIsOpenAnswers(open);
  };

  const handleViewCvClick = (applicant: ApplicationProp) => {
    setSelectedApplicant(selectedApplicant);
    setIsOpenCV(true);
  };

  const handleViewAnswersClick = () => {
    setIsOpenAnswers(true);
  };

  const [isVertical, setIsVertical] = React.useState(true);

  const isMiddleSize = useMediaQuery({ maxWidth: 768 });
  const [selectedTab, setSelectedTab] = React.useState<Key>("all");
  const [tabFilteredApplications, setTabFilteredApplications] =
    React.useState(applications);

  useEffect(() => {
    if (isMiddleSize) {
      setIsVertical(false);
    } else {
      setIsVertical(true);
    }
    if (selectedTab == "all") {
      setTabFilteredApplications(applications);
    } else {
      setTabFilteredApplications(
        applications.filter((app) => app.status == selectedTab)
      );
    }
    //set the candidate for the selected application
    if (selectedApplicantion)
      setSelectedApplicant(
        candidates.find(
          (x) => x.candidateId == selectedApplicantion?.candidateId
        )!
      );
    else setSelectedApplicant(null);
  }, [isMiddleSize, selectedApplicantion, selectedTab]);

  const tabList = [
    {
      key: "all",
      title: "All",
      color: "#6A1B9A",
    }, // Light Purple,
    { key: "underReview", title: "Under Review", color: "#59cfa6" }, // Light Blue
    {
      key: "shortlisted",
      title: "Shortlisted",
      color: "#827717",
    }, // Light Green
    {
      key: "interviewScheduled",
      title: "Interview Scheduled",
      color: "#B71C1C",
    }, // Light Red

    { key: "interviewed", title: "Interviewed", color: "#006064" }, // Light Teal
    { key: "offered", title: "Offered", color: "#E65100" }, // Light Orange
    { key: "hired", title: "Hired", color: "#2E7D32" }, // Light Lime
    { key: "rejected", title: "Rejected", color: "#880E4F" }, // Light Pink
    { key: "archived", title: "Archived", color: "#424242" }, // Light Grey
  ];

  const router = useRouter();
  const statusChangeQuery = useApplicationStatusChange();

  const handleSelectionChange = (keys) => {
    const newSeletedKey: string = Array.from(keys)[0];
    console.log("new tab keys", newSeletedKey);
    statusChangeQuery.mutate({
      applicationId: selectedApplicantion?.applicationId,
      status: newSeletedKey,
      jobId: selectedApplicantion?.jobId,
    });
    if (statusChangeQuery.isSuccess) {
      let copy = {
        ...selectedApplicantion,
        status: newSeletedKey,
      };

      setSelectedApplicantion(copy);
    }
  };

  return (
    <div className="flex flex-col px-4 mb-[200px]">
      <ViewCvPopup
        isOpen={isOpenCV}
        onOpenChange={handleOpenChangeCV}
        candidate={selectedApplicant!}
        cvID={selectedApplicantion?.cvId!}
      />
      {job.questions && selectedApplicantion && (
        <ViewAnswersPopup
          isOpen={isOpenAnswers}
          onOpenChange={handleOpenChangeAnswers}
          applicant={selectedApplicant}
          questions={JSON.parse(job.questions!)}
          userAnswers={JSON.parse(selectedApplicantion?.answers!)}
        />
      )}
      <div className="flex w-full flex-col">
        <Tabs
          className={"mb-5"}
          color={"primary"}
          aria-label="Options"
          isVertical={isVertical}
          onSelectionChange={setSelectedTab}
        >
          {tabList.map((tab) => (
            <Tab
              className={"h-10 w-full"}
              key={tab.key}
              title={
                <>
                  {tab.title} &nbsp;{" "}
                  <FaTag style={{ fill: tab.color, display: "unset" }} />
                </>
              }
            >
              <Card className={"w-full bg-transparent border h-[655px]"}>
                <CardBody>
                  <div className="grid grid-cols-12 gap-1 items-center justify-center h-full">
                    <div className="relative col-span-7 self-start">
                      <ApplicationTable
                        applications={tabFilteredApplications}
                        candidates={candidates}
                        setSelectedApplication={setSelectedApplicantion}
                      />
                    </div>
                    {selectedApplicantion && selectedApplicant ? (
                      <div className="relative col-span-5  bg-transparent rounded-lg overflow-hidden shadow-lg ">
                        <div
                          className={
                            "flex  flex-col gap-2 justify-center items-center"
                          }
                        >
                          <Select
                            label={"Move to"}
                            placeholder="Select a status"
                            className="max-w-xs col-span-6"
                            size={"sm"}
                            selectedKeys={[selectedApplicantion!.status!]}
                            selectionMode={"single"}
                            onSelectionChange={handleSelectionChange}
                          >
                            {tabList
                              .filter((tab) => tab.key != "all")
                              .map((tab) => (
                                <SelectItem key={tab.key}>
                                  {tab.title}
                                </SelectItem>
                              ))}
                          </Select>
                          <div className={"col-span-6 flex justify-end"}>
                            <FaTag
                              style={{
                                fill: tabList.find(
                                  (obj) =>
                                    obj.key == selectedApplicantion!.status
                                )!.color,
                                display: "unset",
                              }}
                            />
                            &nbsp;
                            <span className="text-sm font-semibold text-gray-800 dark:text-white">
                              {
                                tabList.find(
                                  (obj) =>
                                    obj.key == selectedApplicantion!.status
                                )!.title
                              }
                            </span>
                          </div>
                        </div>
                        <div className="border-b px-4 pb-6">
                          <div
                            className={
                              "grid grid-cols-12 gap-2 items-center justify-center"
                            }
                          ></div>
                          <div className="text-center my-4">
                            <img
                              className="h-32 w-32 rounded-full border-4 border-primary dark:border-gray-800 mx-auto object-contain"
                              src={
                                selectedApplicant?.profilePic
                                  ? process.env.NEXT_PUBLIC_S3_URL +
                                    selectedApplicant.profilePic
                                  : "/profileImages/noImage.png"
                              }
                              alt={toTitleCase(
                                selectedApplicant?.firstName +
                                  " " +
                                  selectedApplicant?.lastName
                              )}
                            />
                            <div>
                              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                {toTitleCase(
                                  selectedApplicant?.firstName +
                                    " " +
                                    selectedApplicant?.lastName
                                )}
                              </h3>
                              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                <MdOutlineLocationOn />
                                &nbsp;
                                {toTitleCase(selectedApplicant?.city!)}
                              </div>
                              <br />
                              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                <MdOutlineMail />
                                &nbsp;
                                {selectedApplicant?.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 px-2">
                            <button
                              onClick={() =>
                                handleViewCvClick(selectedApplicantion!)
                              }
                              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                            >
                              View CV
                            </button>
                            <button
                              onClick={() => {
                                router.push(
                                  "/recruiter/chat/candidate/" +
                                    selectedApplicant?.candidateId
                                );
                              }}
                              className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black hover:bg-blue-600 hover:text-white dark:text-white px-4 py-2"
                            >
                              Message
                            </button>
                          </div>
                        </div>
                        <div className="px-4 py-4">
                          <div className="flex gap-2 items-start text-gray-800 dark:text-gray-300 mb-4">
                            <div
                              className={
                                "w-1/2 flex flex-col justify-center items-start gap-2"
                              }
                            >
                              <Button
                                isDisabled={!job.questions}
                                onClick={() => handleViewAnswersClick()}
                                className={"w-full bg-gray-900 text-whiteText"}
                              >
                                View Answers <MdOutlineQuiz />
                              </Button>

                              <Button
                                className={"w-full bg-gray-900 text-whiteText"}
                              >
                                Notes <MdOutlineQuiz />
                              </Button>
                              <Button
                                color={"secondary"}
                                className={" w-full bg-gray-900 text-whiteText"}
                                as={Link}
                                href={
                                  "/recruiter/interviews/schedule/" +
                                  selectedApplicantion?.applicationId
                                }
                              >
                                Schedule Interview <FaPeopleArrows />
                              </Button>
                            </div>
                            <div
                              className={
                                "w-1/2 flex flex-col justify-center items-start gap-2"
                              }
                            >
                              <Button
                                color={"secondary"}
                                className={" w-full bg-gray-900 text-whiteText"}
                                as={Link}
                                href={`/recruiter/joboffers/create/${selectedApplicantion?.applicationId}`}
                              >
                                Create Job Offer <FaPenToSquare />
                              </Button>
                              <Button
                                color={"secondary"}
                                className={"w-full bg-gray-900 text-whiteText"}
                                as={Link}
                                href={`/recruiter/candidate-profile/${selectedApplicant?.candidateId}/history`}
                              >
                                Applicant History <FaHistory />
                              </Button>
                              <Button
                                color={"secondary"}
                                className={"w-full bg-gray-900 text-whiteText"}
                                as={Link}
                                href="/recruiter/candidate-profile/abc123"
                              >
                                Applicant Profile <FaPaste />
                              </Button>
                              <div className="flex items-center flex-col justify-center w-full">
                                <small>Application Date: </small>
                                <small>
                                  <b>
                                    {formatDate(
                                      selectedApplicantion!.createdAt!
                                    )}
                                  </b>
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative col-span-5  bg-transparent rounded-lg overflow-hidden shadow-lg "></div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
