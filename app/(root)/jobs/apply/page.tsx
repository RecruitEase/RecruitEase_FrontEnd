"use client";
import React,{useState }from 'react';
import { Input, Divider, Textarea, Button, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HeaderBox from "@/components/dashboard/HeaderBox";


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
                                    <div className='items-center justify-center font-extralight text-xs'>
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
                                <p className=' text-center text-xs pt-4'>Please make sure to complete the &apos;questionnaire&apos; at the next stage of application. We recommend the jobseekers to have two working phone numbers on the CV.</p>


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
                        <div  className='lg:border-l-1 p-4 w-full lg:w-[30%]'>
                            <div>
                                <Card className="col-span-12 sm:col-span-4 h-[500px]">
                                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                        <div className='w-full h-[60px] items-center'>
                                            <Image
                                                src="/assets/BI.png"
                                                alt="Job Image"
                                                width={60}
                                                height={60}
                                                className='mb-2'
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
            </div>
        </section>
    );
};

export default Apply;
