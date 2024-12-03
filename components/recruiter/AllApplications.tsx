import React, { useState } from "react";
import ApplicationTable from "./ApplicationTable";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdOutlineQuiz,
} from "react-icons/md";
import { Button } from "@nextui-org/react";
import { FaPeopleArrows, FaHistory } from "react-icons/fa";
import { Spinner ,Select,SelectItem} from "@nextui-org/react";
import RecommendBtn from "./RecommendBtn";
import { FaTag } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPaste } from "react-icons/fa";
import ViewCvPopup from "./ViewCvPopup";
import ViewAnswersPopup from "./ViewAnswersPopup";
const tabList = [
  { key: "underReview", title: "Under Review", color: "#59cfa6" }, // Light Blue
  {
    key: "preScreeningPassed",
    title: "Pre-Screening Passed",
    color: "#827717",
  }, // Light Green
  {
    key: "preScreeningFailed",
    title: "Pre-Screening Failed",
    color: "#B71C1C",
  }, // Light Red
  { key: "shortlisted", title: "Shortlisted", color: "#F57F17" }, // Light Yellow
  {
    key: "interviewScheduled",
    title: "Interview Scheduled",
    color: "#6A1B9A",
  }, // Light Purple
  { key: "interviewed", title: "Interviewed", color: "#006064" }, // Light Teal
  { key: "offered", title: "Offered", color: "#E65100" }, // Light Orange
  { key: "hired", title: "Hired", color: "#2E7D32" }, // Light Lime
  { key: "rejected", title: "Rejected", color: "#880E4F" }, // Light Pink
  { key: "archived", title: "Archived", color: "#424242" }, // Light Grey
];


interface ApplicationProps {
  name: string;
  city: string;
  email: string;
  status: string;
  appliedDate: string;
  cv: {
    cvId: string;
    cvName: string;
    file: string;
    modifiedDate: string;
    type: string;
  };
}

export default function AllApplications() {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const applicant: ApplicationProps = {
    name: "David Eliot",
    city: "Colombo",
    email: "davideliot@gmail.com",
    status: "underReview",
    appliedDate: "2024-10-10",
    cv: {
      cvId: "1",
      cvName: "CV1",
      file: "/assets/cv.pdf",
      modifiedDate: "2021-09-01",
      type: "uploaded",
    },
  };

  //cv popup
  const [isOpenCV, setIsOpenCV] = React.useState(false);
  const [isOpenAnswers, setIsOpenAnswers] = React.useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    React.useState<ApplicationProps | null>(null);
  const handleOpenChangeCV = (open) => {
    setIsOpenCV(open);
  };

  const handleOpenChangeAnswers = (open) => {
    setIsOpenAnswers(open);
  };

  const handleViewCvClick = (applicant: ApplicationProps) => {
    setSelectedApplicant(applicant);
    setIsOpenCV(true);
  };

  const handleViewAnswersClick = (applicant: ApplicationProps) => {
    setSelectedApplicant(applicant);
    setIsOpenAnswers(true);
  };

  const handleGetRecommendationsClick = () => {
    setLoading(true);
    setShowTable(false);
    setTimeout(() => {
      setLoading(false);
      setShowTable(true);
    }, 2000);
  };

  const router=useRouter();

  return (
    <div className="grid grid-cols-12 gap-1 items-center justify-center">

      <div className="relative col-span-7">
        <div className="relative inline-flex group p-4 w-full items-center justify-center text-center">
          {/* <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={handleGetRecommendationsClick}
            className="relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Get Intelligent Recommendations
          </button> */}
          <div onClick={handleGetRecommendationsClick}>
            <RecommendBtn />
          </div>
        </div>

        {loading && (
          <div
            id="loading"
            className="flex gap-4 h-lvh items-center justify-center"
          >
            <Spinner size="lg" />
          </div>
        )}
        {showTable && (
          <div id="table">
            {/*<ApplicationTable />*/}
          </div>
        )}
      </div>
      <div className="relative col-span-5 bg-transparent rounded-lg overflow-hidden shadow-lg">
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
                          defaultSelectedKeys={["underReview"]}
                        >
                          {tabList.map((tab) => (
                            <SelectItem key={tab.key}>{tab.title}</SelectItem>
                          ))}
                        </Select>
                        <div className={"col-span-6 flex justify-end"}>
                          <FaTag
                            style={{
                              fill: tabList.find(
                                (obj) => obj.key == applicant.status
                              ).color,
                              display: "unset",
                            }}
                          />
                          &nbsp;
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">
                            {
                              tabList.find((obj) => obj.key == applicant.status)
                                .title
                            }
                          </span>
                        </div>
                      </div>
        <div className="border-b px-4 pb-6">
          <div className="grid grid-cols-12 gap-2 items-center justify-center"></div>
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto"
              src="/assets/temporary/girl.jpg"
              alt=""
            />
            <div>
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {applicant.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <MdOutlineLocationOn />
                &nbsp;
                {applicant.city}
              </div>
              <br />
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <MdOutlineMail />
                &nbsp;
                {applicant.email}
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-2">
          <button
                            onClick={() => handleViewCvClick(applicant)}
                            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
                          >
                            View CV
                          </button>
                          <button onClick={()=>{
                            router.push("/recruiter/chat")
                          }} className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black hover:bg-blue-600 hover:text-white dark:text-white px-4 py-2">
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
                              onClick={() => handleViewAnswersClick(applicant)}
                              className={"w-full bg-gray-900 text-whiteText"}
                            >
                              View Answers <MdOutlineQuiz />
                            </Button>

                            <Button
                              color={"secondary"}
                              className={" w-full bg-gray-900 text-whiteText"}
                              as={Link}
                              href="/recruiter/interviews/schedule"
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
                              className={"w-full bg-gray-900 text-whiteText"}
                              as={Link}
                              href="/recruiter/candidate-profile/abc123/history"
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
                              <b>{applicant.appliedDate}</b>
                            </small>
                          </div>
                          </div>

                        </div>
        </div>
      </div>
    </div>
  );
}
