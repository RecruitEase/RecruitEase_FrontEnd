"use client";
import React,{useEffect, useState }from 'react';
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
import { useSession } from 'next-auth/react';
import CustomInputWithoutValidation from "../../../../../components/form_inputs/CustomInputWithoutValidations";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {ApplicationProp} from "@/types/applications";
import {useParams,useRouter} from "next/navigation";
import {useCreateApplication} from "../../../../../lib/hooks/useApplications";
import {Bounce, toast} from "react-toastify";
import {useJob} from "@/lib/hooks/useJobs";
import {useRecruiter} from "@/lib/hooks/useRecruiters";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import {educationLevelTypes, experienceLevelTypes, jobTypes, locations} from "@/components/recruiter/data";
import {daysLeft, toTitleCase, truncateString} from "@/utils/stringUtils";
const job =
    {
        recruiterId: "82a28181-3944-47ee-ba1a-9da0572e441a",
        id:"1",
        logo: "/assets/temporary/01.jpg",
        title: "Executive - Maintenance",
        company: "PizzaHut Sri Lanka",
        location: "Colombo, Western Province",
        type: "Full-Time",
        daysLeft: "8",
        overview:"BSc in Engineering with at least 5 years of experience or HND/NDES/NDT with at least 10 years of experience in Mechanical/Electrical/Mechatronic fields. Please refer to the job advert for further information.",
        description: <div className="jobviewDescription">
            <div><font size="3">Gamma Pizzakraft Lanka (Pvt) Ltd is the single franchisee for Pizza Hut and Taco Bell in
                Sri Lanka with a spread of over 100+ outlets and a human capital of over 2500+ individuals. In line with
                our upcoming expansions, we are in look out for passionate individuals to join the Commissary Team.</font>
            </div>
            <div><font size="3"><br/></font></div>
            <div><b><font size="5">Executive - Maintenance</font></b></div>
            <div><font size="3"><br/></font></div>
            <div><font size="3"><b>Job Profile</b></font></div>
            <div>
                <ul className={"list-disc"}>
                    <li><font size="3">Plan and execute preventive and corrective maintenance of premises, plant, and
                        machinery with minimum supervision.</font></li>
                    <li><font size="3">Liaise with external parties.</font></li>
                    <li><font size="3">Maintain spare parts stock records.</font></li>
                    <li><font size="3">Handle insurance processes.</font></li>
                    <li><font size="3">Maintain records of all maintenance work.</font></li>
                    <li><font size="3">Prepare work rosters and schedule subordinates.</font></li>
                    <li><font size="3">Work under high factory safety conditions</font></li>
                </ul>
            </div>
            <div><font size="3"><br/></font></div>
            <div><font size="3"><b>Candidate Profile</b></font></div>
            <div>
                <ul className={"list-disc"}>
                    <li><font size="3">BSc in Engineering with at least 5 years of experience or HND/NDES/NDT with at
                        least 10 years of experience in Mechanical/Electrical/Mechatronic fields.</font></li>
                    <li><font size="3">Candidate should be below 30 years of age.</font></li>
                    <li><font size="3">Experience in a food production facility at a supervisory level would be an added
                        advantage.</font></li>
                    <li><font size="3">Sound knowledge of mechanical, electrical, and refrigeration systems.</font></li>
                    <li><font size="3">Knowledge of networking, CCTV, and computer software is an additional
                        qualification.</font></li>
                    <li><font size="3">Willingness to work extended hours when required.</font></li>
                    <li><font size="3">Strong leadership and analytical skills.</font></li>
                    <li><font size="3">Excellent written and verbal communication skills in English and Sinhala.</font>
                    </li>
                </ul>
            </div>
            <div><font size="3"><br/></font></div>
            <div><b ><font size="5">PLEASE CLICK THE APPLY BUTTON TO SEND YOUR CV VIA RecruitEase&nbsp;</font></b>
            </div>
        </div>,
        education:"Bachelor's Degree",
        experience:"5 Years",

    };

const Apply = () => {

    const [selectedCv, setSelectedCv] = useState('');

    //react-quill
    const [value, setValue] = useState('');


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
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
    const { data: session } = useSession();

    const user=session!.user;
    const { isOpen, onOpen, onClose } = useDisclosure();

    //todo: fetch cvs
    const cvs = [
        { key: 1, name: 'CV1', image: '/assets/cv.png',id:'1' },
        { key: 2, name: 'CV2', image: '/assets/cv.png',id:'2'  },
        { key: 3, name: 'CV3', image: '/assets/cv.png',id:'3'  },
        { key: 4, name: 'CV4', image: '/assets/cv.png',id:'4'  },
        { key: 5, name: 'CV5', image: '/assets/cv.png',id:'5'  },

    ]

    // useEffect(() => {
    //     console.log(selectedCv)
    // }, [selectedCv]);
    const params = useParams<{ id: string }>()
    const jobQuery=useJob(params.id);

    const recruitersQuery=useRecruiter(jobQuery.data?.recruiterId);


    const createApplicationMutation=useCreateApplication();
    const submitApplication=()=>{
        if(selectedCv!='' && params.id!=null && value!='') {
            const application: ApplicationProp = {
                candidateId: user.roleDetails.candidateId,
                jobId: params.id,
                cvId: selectedCv,
                recruiterId: job.recruiterId,
                coverLetter: value,
            };

            createApplicationMutation.mutate(application);

        }else{
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
                <header className="home-header ">
                    <div className='flex flex-col lg:flex-row'>
                        {/* left */}
                        <div  className='p-4 w-full lg:w-[70%]'>
                        <HeaderBox
                    type="title"
                    title="Apply for this Job "
                    subtext="Please fill in your details below, then click &apos;Apply&apos; button to submit your application. Your application will be treated with absolute confidentiality."
                />
                        </div>
                        </div>
                </header>
                            <div className="flex w-full flex-wrap lg:flex-nowrap gap-4 pt-4 pb-4">
                                <Input type="text" label="Full Name" placeholder="Enter your full name" value={user.roleDetails.firstName+" "+user.roleDetails.lastName} disabled />
                                <Input type="email" label="Email" placeholder="Enter your email" value={user.email} disabled />
                            </div>

                            <Divider />

                            {
                                (jobQuery.isFetching || recruitersQuery.isFetching)?
                                    <LoadingComponent />
                                    :(jobQuery.isError || recruitersQuery.isError)?
                                        < ErrorComponent />
                                        :
                        <>
                            <div className='flex pt-4'>
                                <div>
                                    <h1>CV*</h1>
                                    <p className='pt-4 pr-4'>Please note, current CV displayed on the left will be sent
                                        to the recruiter when you hit the apply button. Once the application is sent
                                        out, the CV cannot be changed or updated. Please send out the latest CV
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
                                                                <Button className=' bg-recruitBlue text-whiteText '
                                                                        as={Link}
                                                                        href={"/candidate/cvs"}>
                                                                    Manage my CVs
                                                                </Button>
                                                            </div>
                                                            {cvs && cvs.map((item) => (
                                                                <div key={"cv" + item.id} id={"cv" + item.id}
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
                                                                            src={item.image}
                                                                        />
                                                                        <CardHeader
                                                                            className="absolute z-10 top-0 left-0 right-0 bottom-0  items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
                                                                            {/* Added hover effect for the button */}
                                                                            <div className={"flex flex-col gap-2"}>
                                                                                <Button
                                                                                    className=' bg-recruitBlue text-white'
                                                                                    as={Link}
                                                                                    href={"/candidate/cvs/" + item.id}>
                                                                                    View CV
                                                                                </Button>
                                                                                <Button
                                                                                    className=' bg-recruitBlue text-white'
                                                                                    onClick={() => {
                                                                                        setSelectedCv(item.id);
                                                                                        onClose();
                                                                                    }}>
                                                                                    Select this CV
                                                                                </Button>
                                                                            </div>
                                                                        </CardHeader>
                                                                    </Card>
                                                                    <div
                                                                        className=' text-center font-bold'> {item.name}</div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="danger" variant="light" onClick={onClose}>
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
                                <div style={{width: '750px', height: '200px'}} className="border border-dashed border-gray-500 grid grid-cols-2 gap-4">
                                    <div className="break-words overflow-y-hidden h-full ml-2 mt-2 font-bold">
                                        Selected CV: {
                                        (selectedCv!='')?(
                                            cvs.filter(item=>item.id==selectedCv)[0].name
                                        )
                                            :"No CV is selected"
                                    }
                                    </div>
                                    {selectedCv!='' &&
                                    <div key={"cv" + cvs.find(cv => cv.id === selectedCv)?.id} id={"cv" + cvs.find(cv => cv.id === selectedCv)?.id} className={"h-full mr-2 flex items-center justify-end align-middle "}>
                                        <Card
                                            className="col-span-12 sm:col-span-4 h-[175px] w-[100px] ">
                                            <CardHeader
                                                className="absolute z-10 top-1 flex-col !items-start">
                                            </CardHeader>
                                            <Image
                                                removeWrapper
                                                alt="Card background"
                                                className="z-0 w-full h-full object-cover "
                                                src={cvs.find(cv => cv.id === selectedCv)?.image}
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

                            <div className=' text-center'>
                                <p className=' text-center text-sm pt-4'>Please make sure to complete
                                    the &apos;questionnaire&apos; at the next stage of application. We recommend the
                                    jobseekers to have two working phone numbers on the CV.</p>


                                <div className='pt-4 flex justify-center gap-4'>
                                    {/*//todo :screening quiz
                                    <Button as={Link} href={`/jobs/${job.id}/apply/screening`}
                                            className=' bg-recruitBlue text-white'>
                                        Apply For Job
                                    </Button>
                                    */}
                                    <Button onClick={submitApplication}
                                            className=' bg-recruitBlue text-white'>
                                        Apply For Job
                                    </Button>
                                </div>

                                <div className='pt-4'>
                                    <Button as={Link} href={"/jobs"} color="primary" variant="bordered">
                                        Back To Search
                                    </Button>
                                </div>


                            </div>
                        </>
                            }

                        </div>
                        {/* right */}
                        <div className='lg:border-l-1 p-4 w-full lg:w-[30%]'>
                            <div>
                                <Card className="col-span-12 sm:col-span-4 h-[500px]">
                                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                        <div className='w-full h-[60px] items-center'>
                                            <Image
                                                src={(recruitersQuery.data?.profilePic)?process.env.NEXT_PUBLIC_S3_URL+recruitersQuery.data.profilePic : "/profileImages/noImage.png"}
                                                alt="Job Image"
                                                width={60}
                                                height={60}
                                                className='mb-2'
                                            />
                                        </div>
                                        <span className=" font-medium pt-1">{truncateString(toTitleCase(jobQuery.data!.title!),25)}</span>
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

        </section>
    );
};

export default Apply;
