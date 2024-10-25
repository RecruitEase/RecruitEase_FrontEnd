"use client";
import React, {useEffect, useState} from 'react';
import {
    Input,
    Divider,
    Textarea,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Link,
    ModalContent, ModalHeader, ModalBody, ModalFooter, Modal, useDisclosure
} from "@nextui-org/react";
import 'react-quill/dist/quill.snow.css';
import HeaderBox from "@/components/dashboard/HeaderBox";
import dynamic from 'next/dynamic'
import {FiBriefcase, FiClock, FiMapPin} from "react-icons/fi";
import {useSession} from 'next-auth/react';
import CustomInputWithoutValidation from "../../../../../components/form_inputs/CustomInputWithoutValidations";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});
import {ApplicationProp} from "@/types/applications";
import {useParams, useRouter} from "next/navigation";
import {useCreateApplication} from "../../../../../lib/hooks/useApplications";
import {Bounce, toast} from "react-toastify";
import {useJob} from "@/lib/hooks/useJobs";
import {useRecruiter} from "@/lib/hooks/useRecruiters";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import {educationLevelTypes, experienceLevelTypes, jobTypes, locations} from "@/components/recruiter/data";
import {daysLeft, toTitleCase, truncateString} from "@/utils/stringUtils";
import {useCvByCandidateId} from "@/lib/hooks/useCvs";
import {QuizTaker} from "@/components/Jobs/QuestionComponent";
import {MCQProp} from "@/types/job";

function calculateScore(questions:MCQProp[], currentAnswers:any) {
    let score = 0;

    questions.forEach((question, index) => {
        const correctAnswer = question.correctAnswer;
        const userAnswer = currentAnswers[index];

        if (userAnswer === correctAnswer) {
            score += 1;
        }
    });


    return score;
}


const Apply = () => {
    const [page, setPage] = useState('apply');//apply or screening
    const [selectedCv, setSelectedCv] = useState('');
    const [currentAnswers, setCurrentAnswers] = useState({});

    //react-quill
    const [value, setValue] = useState('');


    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    //for user session state
    const {data: session} = useSession();

    const user = session!.user;
    const {isOpen, onOpen, onClose} = useDisclosure();

    const cvQuery = useCvByCandidateId(user.roleDetails.candidateId)


    // useEffect(() => {
    //     console.log(selectedCv)
    // }, [selectedCv]);
    const params = useParams<{ id: string }>()
    const jobQuery = useJob(params.id);

    const recruitersQuery = useRecruiter(jobQuery.data?.recruiterId);


    const createApplicationMutation = useCreateApplication();
    const submitApplication = () => {
        if (selectedCv != '' && params.id != null && value != '') {

            if(jobQuery.data!.questions){
                console.log("currentAns", currentAnswers)
                console.log("score", calculateScore(JSON.parse(jobQuery.data!.questions), currentAnswers))
                const application: ApplicationProp = {
                    candidateId: user.roleDetails.candidateId,
                    jobId: params.id,
                    cvId: selectedCv,
                    recruiterId: jobQuery.data!.recruiterId!,
                    coverLetter: value,
                    answers:JSON.stringify(currentAnswers),
                    score:calculateScore(JSON.parse(jobQuery.data!.questions), currentAnswers)
                };

                createApplicationMutation.mutate(application);
            }else{
                const application: ApplicationProp = {
                    candidateId: user.roleDetails.candidateId,
                    jobId: params.id,
                    cvId: selectedCv,
                    recruiterId: jobQuery.data!.recruiterId!,
                    coverLetter: value,
                };

                createApplicationMutation.mutate(application);
            }



        } else {
            toast.error("Please fill all required fields!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        }
    }


    return (
        <section className="home">
            <div className="home-content">
                {page == 'apply' && <>
                    <header className="home-header ">
                        <div className='flex flex-col lg:flex-row'>
                            {/* left */}
                            <div className='p-4 w-full lg:w-[70%]'>
                                <HeaderBox
                                    type="title"
                                    title="Apply for this Job "
                                    subtext="Please fill in your details below, then click &apos;Apply&apos; button to submit your application. Your application will be treated with absolute confidentiality."
                                />
                            </div>
                        </div>
                    </header>
                    <div className="flex w-full flex-wrap lg:flex-nowrap gap-4 pt-4 pb-4">
                        <Input type="text" label="Full Name" placeholder="Enter your full name"
                               value={user.roleDetails.firstName + " " + user.roleDetails.lastName} disabled/>
                        <Input type="email" label="Email" placeholder="Enter your email" value={user.email} disabled/>
                    </div>
                </>
                }
                {page == 'quiz' && <>
                    <header className="home-header ">
                        <div className='flex flex-col lg:flex-row'>
                            {/* left */}
                            <div className='p-4 w-full lg:w-[70%]'>
                                <HeaderBox
                                    type="title"
                                    title="Pre-Screening Quiz "
                                    subtext="Please fill the following quiz for pre-screening."
                                />
                            </div>
                        </div>
                    </header>

                </>
                }
                <Divider/>

                {
                    (jobQuery.isFetching || recruitersQuery.isFetching || cvQuery.isFetching) ?
                        <LoadingComponent/>
                        : (jobQuery.isError || recruitersQuery.isError || cvQuery.isError) ?
                            < ErrorComponent/>
                            :
                            <>{page == 'apply' && <>
                                <div className='flex pt-4'>
                                    <div>

                                        <h1>CV*</h1>
                                        <p className='pt-4 pr-4'>Please note, current CV displayed on the left
                                            will be sent
                                            to the recruiter when you hit the apply button. Once the application
                                            is sent
                                            out, the CV cannot be changed or updated. Please send out the latest
                                            CV
                                            available.</p>
                                        <Button onClick={onOpen} className=' bg-recruitBlue text-white'>
                                            Select a CV
                                        </Button>

                                        <Modal style={{"height": "75%"}} isOpen={isOpen} onOpenChange={onClose}
                                               scrollBehavior="inside" size={"3xl"}>
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">Select a
                                                            CV</ModalHeader>
                                                        <ModalBody>
                                                            <div
                                                                className='flex flex-row  w-full flex-wrap place-content-around'>
                                                                <div className={"w-full"}>
                                                                    <Button
                                                                        className=' bg-recruitBlue text-whiteText '
                                                                        as={Link}
                                                                        href={"/candidate/cvs"}>
                                                                        Manage My CVs
                                                                    </Button>
                                                                </div>
                                                                {(cvQuery.data!.length > 0) ? cvQuery.data!.map((item) => (
                                                                        <div key={"cv" + item.cvId}
                                                                             id={"cv" + item.cvId}
                                                                             className=' relative group'>
                                                                            <Card
                                                                                className="col-span-12 sm:col-span-4 h-[350px] w-[200px] m-2 mt-2 transition duration-300 ease-in-out">
                                                                                <CardHeader
                                                                                    className="absolute z-10 top-1 flex-col !items-start">
                                                                                </CardHeader>
                                                                                <Image
                                                                                    removeWrapper
                                                                                    alt="Card background"
                                                                                    className="z-0 w-full h-full object-cover duration-300 ease-in-out group-hover:blur-sm"
                                                                                    src={item.cvImage}
                                                                                />
                                                                                <CardHeader
                                                                                    className="absolute z-10 top-0 left-0 right-0 bottom-0  items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
                                                                                    {/* Added hover effect for the button */}
                                                                                    <div
                                                                                        className={"flex flex-col gap-2"}>
                                                                                        <Button
                                                                                            className=' bg-recruitBlue text-white'
                                                                                            as={Link}
                                                                                            href={"/candidate/cvs/" + item.cvId}>
                                                                                            View CV
                                                                                        </Button>
                                                                                        <Button
                                                                                            className=' bg-recruitBlue text-white'
                                                                                            onClick={() => {
                                                                                                setSelectedCv(item.cvId);
                                                                                                onClose();
                                                                                            }}>
                                                                                            Select this CV
                                                                                        </Button>
                                                                                    </div>
                                                                                </CardHeader>
                                                                            </Card>
                                                                            <div
                                                                                className=' text-center font-bold'> {item.cvName}</div>
                                                                        </div>
                                                                    ))
                                                                    : <div
                                                                        className={"w-full h-full flex justify-center items-center "}>You
                                                                        have not uploaded any CVs. Please click
                                                                        on "Manage My CVs to upload"</div>
                                                                }
                                                            </div>

                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="danger" variant="light"
                                                                    onClick={onClose}>
                                                                Close
                                                            </Button>
                                                            {/*<Button color="primary" onClick={onClose}>*/}
                                                            {/*    Action*/}
                                                            {/*</Button>*/}
                                                        </ModalFooter>
                                                    </>
                                                )}
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                    <div style={{width: '750px', height: '200px'}}
                                         className="border border-dashed border-gray-500 grid grid-cols-2 gap-4">
                                        <div
                                            className="break-words overflow-y-hidden h-full ml-2 mt-2 font-bold">
                                            Selected CV: {
                                            (selectedCv != '') ? (
                                                    cvQuery.data!.filter(item => item.cvId == selectedCv)[0].cvName
                                                )
                                                : "No CV is selected"
                                        }
                                        </div>
                                        {selectedCv != '' &&
                                            <div
                                                key={"cv" + cvQuery.data!.find(cv => cv.cvId === selectedCv)?.cvId}
                                                id={"cv" + cvQuery.data!.find(cv => cv.cvId === selectedCv)?.cvId}
                                                className={"h-full mr-2 flex items-center justify-end align-middle "}>
                                                <Card
                                                    className="col-span-12 sm:col-span-4 h-[175px] w-[100px] ">
                                                    <CardHeader
                                                        className="absolute z-10 top-1 flex-col !items-start">
                                                    </CardHeader>
                                                    <Image
                                                        removeWrapper
                                                        alt="Card background"
                                                        className="z-0 w-full h-full object-cover "
                                                        src={cvQuery.data!.find(cv => cv.cvId === selectedCv)?.cvImage}
                                                    />

                                                </Card>
                                            </div>
                                        }
                                    </div>

                                </div>

                                <div className={"mb-1 mx-2 w-full"}>
                                    <label htmlFor={"description"}>
                                        Cover Letter <small>( Format options are available)</small>
                                        <span className={"text-danger"}> * </span>
                                    </label>
                                    <ReactQuill modules={modules} formats={formats} theme="snow" value={value}
                                                onChange={setValue} className='h-96'/>
                                    <span className="mt-3 text-danger text-sm">
        {'\u00A0'}
             </span>
                                </div>


                                {/* <Textarea
                                label="Cover Letter*"
                                placeholder="Enter your cover letter here"
                                className="w-full pt-4"
                            /> */}

                                {/*<div className=' text-center'>*/}
                                {/*    <p className=' text-center text-sm pt-4'>Please make sure to complete*/}
                                {/*        the &apos;questionnaire&apos; at the next stage of application. We*/}
                                {/*        recommend the*/}
                                {/*        jobseekers to have two working phone numbers on the CV.</p>*/}

                                {/*</div>*/}
                            </>}
                                {jobQuery.data!.questions && page == 'quiz' && <div>
                                    <QuizTaker questions={JSON.parse(jobQuery.data!.questions)} currentAnswers={currentAnswers} setCurrentAnswers={setCurrentAnswers} />
                                </div>
                                }

                                <div className='pt-4 flex justify-center gap-4'>
                                    {(!jobQuery.data!.questions && page == 'apply') &&
                                        <>


                                            <div className='pt-4'>
                                                <Button onClick={submitApplication}
                                                        className=' bg-recruitBlue text-white'>
                                                    Submit
                                                </Button>
                                            </div>
                                        </>

                                    }
                                    {(jobQuery.data!.questions && page == 'apply') &&
                                        <div className='pt-4'>
                                            <Button onClick={() => {
                                                console.log(jobQuery.data)
                                                setPage('quiz')
                                            }}
                                                    className=' bg-recruitBlue text-white'>
                                                Go to quiz
                                            </Button>
                                        </div>

                                    }

                                    {(jobQuery.data!.questions && page == 'quiz') &&
                                        <>
                                            <div className='pt-4'>
                                                <Button onClick={() => {
                                                    setPage('apply')
                                                }}
                                                        color="primary"
                                                        variant="bordered">
                                                    Prev Page
                                                </Button>
                                            </div>

                                            <div className='pt-4'>
                                                <Button onClick={submitApplication}
                                                        className=' bg-recruitBlue text-white'>
                                                    Submit
                                                </Button>
                                            </div>
                                        </>

                                    }

                                    <div className='pt-4'>
                                        <Button as={Link} href={"/jobs"} color="primary"
                                                variant="bordered">
                                            Back To Search
                                        </Button>
                                    </div>
                                </div>


                            </>
                }

            </div>
            {/* right */}
            {jobQuery.isSuccess && recruitersQuery.isSuccess &&
                <div className='lg:border-l-1 p-4 w-full lg:w-[30%]'>
                    <div>
                        <Card className="col-span-12 sm:col-span-4 h-[500px]">
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <div className='w-full h-[60px] items-center'>
                                    <Image
                                        src={(recruitersQuery.data?.profilePic) ? process.env.NEXT_PUBLIC_S3_URL + recruitersQuery.data.profilePic : "/profileImages/noImage.png"}
                                        alt="Job Image"
                                        width={60}
                                        height={60}
                                        className='mb-2'
                                    />
                                </div>
                                <span
                                    className=" font-medium pt-1">{truncateString(toTitleCase(jobQuery.data?.title!), 25)}</span>
                                <span className='text-sm'>{toTitleCase(recruitersQuery.data!.companyName!)}</span>
                                <div className='text-sm'>
                                    <div className="flex items-center mt-2 text-secondaryText">
                                        <FiMapPin className="mr-2"/>
                                        <p>{locations.find(x => x.key == jobQuery.data?.location)?.label}</p>
                                    </div>
                                    <div className="flex items-center mt-2 text-secondaryText">
                                        <FiClock className="mr-2"/>
                                        <p>{daysLeft(jobQuery.data?.deadline)}</p>
                                    </div>
                                    <div className="flex items-center mt-2 text-secondaryText">
                                        <FiBriefcase className="mr-2"/>
                                        <p>{jobTypes.find(x => x.key == jobQuery.data?.type)?.label}</p>
                                    </div>
                                </div>
                                <Divider className="my-4"/>
                                <div className="flex h-20 space-x-4 text-sm">
                                    <div>
                                        <p className={"p-1"}>
                                            <strong>Education:</strong> {educationLevelTypes.find(x => x.key == jobQuery.data?.educationLevel)?.label}
                                        </p>
                                        <p className={"p-1"}>
                                            <strong>Experience:</strong> {experienceLevelTypes.find(x => x.key == jobQuery.data?.experienceLevel)?.label}
                                        </p>

                                    </div>
                                </div>
                                <Divider className="my-4"/>


                                <div className='pt-4 w-full'>
                                    <Button className='w-full' color="primary" variant="bordered">
                                        Save Job
                                    </Button>
                                </div>
                            </CardHeader>

                        </Card>

                    </div>
                </div>
            }

        </section>
    );
};

export default Apply;
