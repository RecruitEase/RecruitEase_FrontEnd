import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";

export default function Signup() {
    return (
        <div className="w-full h-2/3 gap-2 grid grid-cols-12  px-8 mt-12">

            <Card isFooterBlurred className="w-full col-span-6 ">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    {/*<p className="text-tiny text-white font-bold text-[1.5rem]">Register as a</p>*/}
                    <h1 className="text-black font-bold text-[2rem]">Job Seeker</h1>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-100 -translate-y-6 object-cover"
                    src="https://www.glassdoor.com/employers/app/uploads/sites/2/2020/06/employer-brand-make-or-break-hiring.png"
                />
                <CardFooter className="absolute bg-white/80 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <h1 className={"text-[1.5rem] text-"}>Register as a <span className={"text-recruitBlue"}>Job Seeker</span></h1>
                    </div>
                    <Button className="text-lg" color="primary" radius="full" size="lg" as={Link} href={"/signup/candidate"}>
                        Register
                    </Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred  className="w-full col-span-6">
                <CardHeader  className="absolute z-10 top-1 flex-col items-start">
                    {/*<p className="text-tiny text-white font-bold text-[1.5rem]">Register as a</p>*/}
                    <h1 className="text-black font-bold text-[2rem]">Recruiter</h1>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-[-5px] object-cover"
                    src="https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/employer%20branding.jpeg"
                />
                <CardFooter className="absolute bg-white/80 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <h1 className={"text-[1.5rem] text-"}>Register as a <span className={"text-recruitBlue"}>Recruiter</span></h1>
                    </div>
                    <Button className="text-lg" color="primary" radius="full" size="lg" as={Link} href={"/signup/recruiter"}>
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
