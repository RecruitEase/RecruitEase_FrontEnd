"use client"
import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Image, RadioGroup, Radio, Switch, Textarea, Divider } from "@nextui-org/react";
import {FiBriefcase, FiClock, FiMapPin} from "react-icons/fi";
import Link from "next/link";
import {Bounce, toast} from "react-toastify";
import {useRouter} from "next/navigation";

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

const Screening = () => {
  const router = useRouter()

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
          <div className='flex'>
            {/* left */}
            <div style={{width: '70%'}} className='p-4'>
              <h1 className='font-bold'>Screening Stage</h1>
              <p className='pt-4'>Please answer the below questions accurately to increase your chances of being
                selected (shortlisted) for an interview. Applicants providing false answers may be disqualified from
                applying through RecruitEase.</p>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <p className=' text-primaryText'> 1.Are you between the age of 25-45 years?</p>
                <Switch className=' ml-auto' defaultSelected aria-label="Automatic updates"/>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <p className=' text-primaryText'>2.Do you possess a Masters/Bachelor degree in the relevant field?</p>
                <Switch className=' ml-auto' defaultSelected aria-label="Automatic updates"/>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <RadioGroup
                    label={<span
                        className=' text-primaryText'>3.Do you have graphic designing or Photoshop knowledge?</span>}
                    orientation="horizontal"
                >
                  <Radio value="buenos-aires">Yes</Radio>
                  <Radio value="sydney">No</Radio>
                </RadioGroup>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <RadioGroup
                    label={<span
                        className=' text-primaryText'>4.How would you rate your English communication skills?</span>}
                    orientation="horizontal"
                >
                  <Radio value="buenos-aires">Excellent</Radio>
                  <Radio value="sydney">Good</Radio>
                  <Radio value="san-francisco">Fair</Radio>
                  <Radio value="london">Poor</Radio>
                </RadioGroup>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm  items-center m-3">
                <p className=' text-primaryText'>5.Tell us we need to hire you.</p>
                <Textarea
                    label=""
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    defaultValue=""
                    className="w-full"
                />
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm  items-center m-3">
                <p className=' text-primaryText'>5.What is your salary expectation?</p>
                <Textarea
                    label=""
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    defaultValue=""
                    className="w-full"
                />
              </div>
              <div className=' text-center'>
                <p className=' text-center text-xs pt-4'>Please make sure to complete the &apos;questionnaire&apos; at
                  the next stage of application. We recommend the jobseekers to have two working phone numbers on the
                  CV.</p>


                <div className='pt-4 flex justify-center gap-4'>
                  <Button className=' bg-recruitBlue text-whiteText' onClick={()=>{
                    toast.success('Application submitted successfully!', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      transition: Bounce,
                    });
                    router.push('/candidate/applications');
                  }}>
                    Apply For Job
                  </Button>
                  <p className='pt-2 text-xs'>Save draft</p>
                </div>

                <div className='pt-4'>
                  <Button color="primary" variant="bordered">
                    Back To Search
                  </Button>
                </div>


              </div>

            </div>
            {/* right */}
            <div className='lg:border-l-1 p-4 w-full lg:w-[30%]'>
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

export default Screening;
