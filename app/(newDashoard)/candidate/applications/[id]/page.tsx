"use client";

import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import CoverLetter from "@/components/applicationsView/coverLetter";
import CV from "@/components/applicationsView/cv";
import {Button} from "@nextui-org/button";
import Swal from "sweetalert2";
import Questions from "@/components/applicationsView/Questions";
import {Card, CardHeader, Image, Link} from "@nextui-org/react";
import {useApplication, useWithdrawApplication} from "@/lib/hooks/useApplications";
import {useParams} from "next/navigation";
import {useRecruiter} from "@/lib/hooks/useRecruiters";
import LoadingComponent from "@/components/LoadingComponent";
import {useJob} from "@/lib/hooks/useJobs";
import {useCv} from "@/lib/hooks/useCvs";
import ErrorComponent from "@/components/ErrorComponent";
import ShowAnswers from "@/components/Jobs/ShowAnswers";
import ShowAnswersForCandidate from "@/components/Jobs/ShowAnswersForCandidate";

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: number;
    type: "single" | "multiple";
    text: string;
    options: Option[];
    userAnswers: string[];
}


const ApplicationView: React.FC = () => {

    const params = useParams<{ id: string }>()

    const withdrawApplicationMutation = useWithdrawApplication();
    const popupview = () => {
        Swal.fire({
            title: "Do you want to withdraw the application?",
            icon: "warning",
            customClass: {
                confirmButton: "bg-[#f31260]", // Custom class for confirm button
                cancelButton: "bg-[#a1a1aa]" // Custom class for cancel button
            },
            showCancelButton: true,
            confirmButtonText: "Withdraw"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Fetch application data API call
                withdrawApplicationMutation.mutate(params.id);
            }
        });
    };


    const applicationQuery = useApplication(params.id)
    const recruiterQuery = useRecruiter(applicationQuery.data?.recruiterId)
    const jobQuery=useJob(applicationQuery.data?.jobId!)
    const cvQuery=useCv(applicationQuery.data?.cvId!)


    return (
        <div>
            <HeaderBox
                type="title"
                title="Application Details"
                subtext="Details of your submitted application"
            />
            {(applicationQuery.isFetching || recruiterQuery.isFetching || jobQuery.isFetching || cvQuery.isFetching)? <LoadingComponent/>
                :(applicationQuery.isError || recruiterQuery.isError || jobQuery.isError || cvQuery.isError)? <ErrorComponent /> :
                    <>
                    <div className={"flex w-full justify-end gap-4 mt-4"}>
                        <Button className={"bg-recruitBlue text-white font-bold"} as={Link}
                                href={"/jobs/" + applicationQuery.data!.jobId}>Show Job</Button>
                        <Button isDisabled={applicationQuery.data!.status != "underReview"} className={"bg-danger text-white font-bold"} onClick={popupview}>
                            Withdraw
                        </Button>
                    </div>
                        <div className={"w-full grid grid-cols-12 gap-8"}>
                            <div className={"col-span-12 sm:col-span-8"}>
                                <CoverLetter job={jobQuery.data!} application={applicationQuery.data!}
                                             recruiter={recruiterQuery.data!}/>
                            </div>
                            <div
                                key={"cv" + cvQuery.data!.cvId}
                                id={"cv" + cvQuery.data!.cvId}
                                className=" col-span-12 sm:col-span-4 relative group"
                            >
                                <Card
                                    className="w-full m-2 mt-2 transition duration-300 ease-in-out">
                                    <CardHeader className="absolute z-10 top-1 flex-col !items-start"></CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card background"
                                        className="z-0 w-full h-full object-cover duration-300 ease-in-out group-hover:blur-sm"
                                        src={cvQuery.data!.cvImage}
                                    />
                                    <CardHeader
                                        className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
                                        {/* Added hover effect for the button */}
                                        <Button
                                            className=" bg-recruitBlue text-white"
                                            as={Link}
                                            href={"/candidate/cvs/" + cvQuery.data!.cvId}
                                        >
                                            View CV
                                        </Button>
                                    </CardHeader>
                                </Card>
                                <div className=" text-center font-bold"> {cvQuery.data!.cvName}</div>
                            </div>
                            {/*<div className={"col-span-12 sm:col-span-4"}>*/}
                            {/*    <CV cvImage={cvQuery.data!.cvImage}/>*/}
                            {/*</div>*/}
                        </div>


                        {applicationQuery.data!.answers && jobQuery.data!.questions &&
                            <div>
                                <div className={"mb-2 mt-4 text-2xl font-bold"}>Your answers for the quiz: </div>
                                <ShowAnswersForCandidate questions={JSON.parse(jobQuery.data!.questions)}
                                             userAnswers={JSON.parse(applicationQuery.data!.answers)}
                                            />

                            </div>
                        }

                    </>
            }
        </div>
    );
};

export default ApplicationView;
