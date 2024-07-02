import React from 'react';
import {Input, Divider,Textarea,Button,Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";


const Home = () => {
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header ">
                    <div className='flex'>
                        {/* left */}
                    <div style={{width:'70%'}} className='p-4'>
                        <h1  className='font-bold'>Apply For this Job </h1>
                        <p className='pt-4'>Please fill in your details below, then click 'Apply' button to submit your application. Your application will be treated with absolute confidentiality.</p>

                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4 pb-4">
                        <Input type="text" label="Full Name" placeholder="Enter your full name" isRequired />
                        <Input type="email" label="Email" placeholder="Enter your email" isRequired />
                        </div>

                        <Divider  />

                        <div className='flex pt-4'>
                            <div>
                                <h1>CV*</h1>
                                <p className='pt-4 pr-4'>Please note, current CV displayed on the left will be sent to the recruiter when you hit the apply button. Once the application is sent out, the CV cannot be changed or updated. Please send out the latest CV available.</p>
                            </div>
                            <div style={{width:'750px', height:'200px'}} className='border-1'>
                                
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
                   <Button className=' bg-lime-300 '>
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
                    <div style={{width:'30%'}} className='border-l-1 p-4'>
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
            </div>
        </section>
    );
};

export default Home;
