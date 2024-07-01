import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function Signup() {
    return (
        <div className="w-full gap-2 grid grid-cols-12  px-8 mt-12">

            <Card isFooterBlurred className="w-full col-span-6 ">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Register as</p>
                    <h1 className="text-black font-medium text-2xl">Candidate</h1>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="hhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hrreporter.com%2Ffocus-areas%2Frecruitment-and-staffing%2Fjob-ads-for-hr-positions-continue-to-soar%2F365414&psig=AOvVaw1BVYTanvuo3d_oFB5UB5UO&ust=1719902462720000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjDm5mehYcDFQAAAAAdAAAAABAV"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Available soon.</p>
                        <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Notify Me
                    </Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full col-span-6">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Register as</p>
                    <h4 className="text-black font-medium text-2xl">Recruiter</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="https://nextui.org/images/card-example-6.jpeg"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Available soon.</p>
                        <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Notify Me
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
