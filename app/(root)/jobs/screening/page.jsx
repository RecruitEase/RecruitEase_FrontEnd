import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Image, RadioGroup, Radio, Switch, Textarea } from "@nextui-org/react";


const Home = () => {
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
                <p className=' text-center text-xs pt-4'>Please make sure to complete the 'questionnaire' at the next stage of application. We recommend the jobseekers to have two working phone numbers on the CV.</p>


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

                <Card className="col-span-12 sm:col-span-4 h-[600px]">
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny  uppercase font-bold">What to watch</p>
                    <h4 className="font-medium text-large">Stream the Acme event</h4>
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

export default Home;
