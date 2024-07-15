import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Image, RadioGroup, Radio, Switch, Textarea, Divider } from "@nextui-org/react";


const Screening = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
          <div className='flex'>
            {/* left */}
            <div style={{ width: '70%' }} className='p-4'>
              <h1 className='font-bold'>Screening Stage</h1>
              <p className='pt-4'>Please answer the below questions accurately to increase your chances of being selected (shortlisted) for an interview. Applicants providing false answers may be disqualified from applying through XpressJobs.</p>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <p className=' text-primaryText'  > 1.Are you between the age of 25-45 years?</p>
                <Switch className=' ml-auto' defaultSelected aria-label="Automatic updates" />
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <p className=' text-primaryText'  >2.Do you possess a Masters/Bachelor degree in the relevant field?</p>
                <Switch className=' ml-auto' defaultSelected aria-label="Automatic updates" />
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <RadioGroup
                  label={<span className=' text-primaryText'>3.Do you have graphic designing or Photoshop knowledge?</span>}
                  orientation="horizontal"
                >
                  <Radio value="buenos-aires">Yes</Radio>
                  <Radio value="sydney">No</Radio>
                </RadioGroup>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center m-3">
                <RadioGroup
                  label={<span className=' text-primaryText'>4.How would you rate your English communication skills?</span>}
                  orientation="horizontal"
                >
                  <Radio value="buenos-aires">Excellent</Radio>
                  <Radio value="sydney">Good</Radio>
                  <Radio value="san-francisco">Fair</Radio>
                  <Radio value="london">Poor</Radio>
                </RadioGroup>
              </div>

              <div className="border border-gray-300 p-4 rounded-lg shadow-sm  items-center m-3">
                <p className=' text-primaryText'  >5.Tell us we need to hire you.</p>
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
                <p className=' text-primaryText'  >5.What is your salary expectation?</p>
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
                <p className=' text-center text-xs pt-4'>Please make sure to complete the &apos;questionnaire&apos; at the next stage of application. We recommend the jobseekers to have two working phone numbers on the CV.</p>


                <div className='pt-4 flex justify-center gap-4'>
                  <Button className=' bg-recruitBlue'>
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
            <div style={{ width: '30%' }} className='border-l-1 p-4'>
              <div>
                <Card className="col-span-12 sm:col-span-4 h-[500px]">
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <div className='w-full h-[50px] items-center'>
                      <Image
                        src="/assets/BI.png"
                        alt="Job Image"
                        width={60}
                        height={60}
                      />
                    </div>
                    <span className=" font-medium pt-1">Sales & Marketing Assistant</span>
                    <span className='text-xs'>Gloria Travels and Tours Pvt Ltd</span>
                    <div className='text-xs'>
                      <p className='p-1'>Colombo, Western, Province</p>
                      <p className='p-1'>14 days left</p>
                      <p className='p-1'>Contract Basis</p>
                    </div>
                    <Divider className="my-4" />
                    <div className="flex h-20 space-x-4 text-xs">
                      <div>
                        <p className='p-1'>Education : Advanced Level</p>
                        <p className='p-1'>Experience : No Experience</p>
                        <p className='p-1'>Salary Range : Any</p>
                      </div>
                    </div>
                    <Divider className="my-4" />
                    <div className='pt-4 w-full'>
                      <Button className=' bg-recruitBlue text-white w-full'>
                        Apply For Job
                      </Button>
                    </div>

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
      </div >
    </section >
  );
};

export default Screening;
