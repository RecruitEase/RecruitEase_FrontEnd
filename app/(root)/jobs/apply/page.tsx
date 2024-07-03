import React from 'react';
import { Input, Divider, Textarea, Button, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import './apply.css';


const Home = () => {
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header ">
                    <div className='flex'>
                        {/* left */}
                        <div style={{ width: '70%' }} className='p-4'>
                            <h1 className='font-bold'>Apply For this Job </h1>
                            <p className='pt-4'>Please fill in your details below, then click 'Apply' button to submit your application. Your application will be treated with absolute confidentiality.</p>

                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4 pb-4">
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
                                    <div className='items-center justify-center font-extralight text-xs'>
                                        Drag and drop
                                        your CV here</div>
                                </div>
                            </div>

                            <Textarea
                                label="Cover Letter*"
                                placeholder="Enter your cover letter here"
                                className="w-full pt-4"
                            />

                            <div className=' text-center'>
                                <p className=' text-center text-xs pt-4'>Please make sure to complete the 'questionnaire' at the next stage of application. We recommend the jobseekers to have two working phone numbers on the CV.</p>


                                <div className='pt-4 flex justify-center gap-4'>
                                    <Button className=' bg-recruitBlue text-white'>
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
                                        <div className='w-full h-[50px]'></div>
                                        <span className=" font-medium">Sales & Marketing Assistant</span>
                                        <span className='text-xs'>Gloria Travels and Tours Pvt Ltd</span>
                                        {/* <div className=' border-2 rounded-3xl'>
        <svg xmlns="http://www.w3.org/2000/svg" width='50' height='50' viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
    </div> */}
                                        <div className=' text-xs'>
                                            <p>Colombo, Western, Province</p>
                                            <p>14 days left</p>
                                            <p>Contract Basis</p>
                                        </div>
                                        <Divider className="my-4" />
                                        <div className="flex h-20 space-x-4 text-xs">
                                            <div>
                                                <p>Education</p>
                                                <p>Experience</p>
                                                <p>Salary Range</p>
                                            </div>
                                            <Divider orientation="vertical" className='' />
                                            <div className='font-semibold'>
                                                <p>Advanced Level</p>
                                                <p>No Experience</p>
                                                <p>Any</p>
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
            </div>
        </section>
    );
};

export default Home;
