"use client";
import React,{useState }from 'react';
import { Input, Divider, Textarea, Button, Card, CardHeader, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import 'react-quill/dist/quill.snow.css';
import HeaderBox from "@/components/dashboard/HeaderBox";
import dynamic from 'next/dynamic'
import {FiBriefcase, FiClock, FiMapPin} from "react-icons/fi";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const job =
    {
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
    //react-quill
    const [value, setValue] = useState('');

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

                            <div className="flex w-full flex-wrap lg:flex-nowrap gap-4 pt-4 pb-4">
                                <Input type="text" label="Full Name" placeholder="Enter your full name" isRequired />
                                <Input type="email" label="Email" placeholder="Enter your email" isRequired />
                            </div>

                            <Divider />

                            <div className='flex pt-4'>
                                <div>
                                    <h1>CV*</h1>
                                    <p className='pt-4 pr-4'>Please note, current CV displayed on the left will be sent to the recruiter when you hit the apply button. Once the application is sent out, the CV cannot be changed or updated. Please send out the latest CV available.</p>
                                </div>
                                <div style={{ width: '750px', height: '200px' }} className='border border-dashed border-gray-500 p-4 mb-4'>
                                    <div className='items-center justify-center font-extralight text-sm'>
                                        Drag and drop
                                        your CV here</div>
                                </div>
                            </div>

                            <div className={"mb-1 mx-2 w-full"}>
                    <label htmlFor={"description"}>
                    Cover Letter <small>( Format options are available)</small>
                        <span className={"text-danger"}> * </span>
                    </label>
                        <ReactQuill theme="snow" value={value} onChange={setValue} className='h-96' />
                        
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
                                <p className=' text-center text-sm pt-4'>Please make sure to complete the &apos;questionnaire&apos; at the next stage of application. We recommend the jobseekers to have two working phone numbers on the CV.</p>


                                <div className='pt-4 flex justify-center gap-4'>
                                    <Button as={Link} href={`/jobs/${job.id}/apply/screening`} className=' bg-recruitBlue text-white'>
                                        Apply For Job
                                    </Button>
                                    <p className='pt-2 text-sm'>Save draft</p>
                                </div>

                                <div className='pt-4'>
                                    <Button as={Link} href={"/jobs"} color="primary" variant="bordered">
                                        Back To Search
                                    </Button>
                                </div>


                            </div>

                        </div>
                        {/* right */}
                        <div  className='lg:border-l-1 p-4 w-full lg:w-[30%]'>
                            <div>
                                <Card className="col-span-12 sm:col-span-4 h-[500px]">
                                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                        <div className='w-full h-[60px] items-center'>
                                            <Image
                                                src={job.logo}
                                                alt="Job Image"
                                                width={60}
                                                height={60}
                                                className='mb-2'
                                            />
                                        </div>
                                        <span className=" font-medium pt-1">{job.title}</span>
                                        <span className='text-sm'>{job.company}</span>
                                        <div className='text-sm'>
                                            <div className="flex items-center mt-2 text-secondaryText">
                                                <FiMapPin className="mr-2"/>
                                                <p>{job.location}</p>
                                            </div>
                                            <div className="flex items-center mt-2 text-secondaryText">
                                                <FiClock className="mr-2"/>
                                                <p>{job.daysLeft} days left</p>
                                            </div>
                                            <div className="flex items-center mt-2 text-secondaryText">
                                                <FiBriefcase className="mr-2"/>
                                                <p>{job.type}</p>
                                            </div>
                                        </div>
                                        <Divider className="my-4"/>
                                        <div className="flex h-20 space-x-4 text-sm">
                                            <div>
                                                <p className={"p-1"}>
                                                    <strong>Education:</strong> {job.education}
                                                </p>
                                                <p className={"p-1"}>
                                                    <strong>Experience:</strong> {job.experience}
                                                </p>
                                                <p className={"p-1"}>
                                                    <strong>Salary Range:</strong> Any
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
                    </div>
                </header>
            </div>
        </section>
    );
};

export default Apply;
