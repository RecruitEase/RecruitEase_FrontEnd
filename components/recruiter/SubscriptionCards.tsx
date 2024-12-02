"use client";
import { Button } from '@nextui-org/react';
import React, {useState} from 'react'
import {paymentQuery} from "@/lib/api";
import {useRouter} from "next/navigation";

const includedIcon = <span
    className="w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                 className="w-3 h-3" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>;

const excludedIcon = <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2.2" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
  <path d="M18 6L6 18M6 6l12 12"></path>
</svg>;


function SubscriptionCards() {
  const router=useRouter();

  const [isLoading,setIsLoading]=useState(false)
  const handleClick=()=>{
    setIsLoading(true);

    paymentQuery({
      name:"Pro Subscription",
      quantity:1,
      amount:1000000,
      currency:"LKR"
    }).then((res)=>{
      console.log(res.sessionUrl)
      router.push(res.sessionUrl)
    }).catch((e)=>{
      console.log(e)
    })


    setIsLoading(false);

  }

  return (
      <section className="text-gray-700 body-font overflow-hidden border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/4 mt-48 hidden lg:block">
            <div
                className="mt-px border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
              <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start">Job
                Posting</p>
              <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">CV Bulk Download</p>
              <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start">CV
                Filtering &Shortlisting</p>
              <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">CV Parser and
                Recommendations</p>
              <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start">Applicant
                Tracking System (ATS)</p>
              <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">Interview
                Scheduling</p>

              <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start">Interview
                Streaming</p>
              <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">Interview
                Notes</p>
              <p className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start">Job Offer Management</p>

            </div>
          </div>
          <div className="flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg">
            <div
                className="lg:w-1/2 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
              <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                <h3 className="tracking-widest">STARTER</h3>
                <h2 className="text-5xl text-gray-900 font-medium leading-none mb-4 mt-2">One-time Payment</h2>
                <span className="text-sm text-gray-600">Per Job Vacancy</span>
              </div>
              <p className="bg-gray-100 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">
                {includedIcon}
              </p>
              <p className="text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {excludedIcon}
              </p>
              <p className="h-12 text-gray-600 px-6 text-center leading-relaxed flex items-center justify-center">{excludedIcon}</p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {excludedIcon}
              </p>
              <p className="text-gray-600 text-center h-12 flex items-center justify-center">
                {excludedIcon}
              </p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {excludedIcon}
              </p>
              <p className="text-gray-600 text-center h-12 flex items-center justify-center">
                {excludedIcon}
              </p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {excludedIcon}
              </p>
              <div className="border-t border-gray-300 p-6 text-center rounded-bl-lg">

                <p className="text-xs text-gray-500 mt-3">You will be asked to make the payment when posting a job vacancy if you don&apos;t have a subscription plan.</p>
              </div>
            </div>
            <div className="lg:w-1/2 lg:-mt-px w-full mb-10 lg:mb-0 border-2 rounded-lg border-indigo-500 relative">
              <span
                  className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
              <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                <h3 className="tracking-widest">PRO</h3>
                <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">LKR
                  10000
                  <span className="text-gray-600 text-base ml-1">/mo</span>
                </h2>
                <span className="text-sm text-gray-600">Charging LKR120000 per year</span>
              </div>
              <p className="bg-gray-100 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">{includedIcon}</p>
              <p className="text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="h-12 text-gray-600 text-center leading-relaxed flex items-center justify-center">{includedIcon}</p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <p className="bg-gray-100 text-gray-600 text-center h-12 flex items-center justify-center">
                {includedIcon}
              </p>
              <div className="p-6 text-center border-t border-gray-300">

                <Button color="primary" onPress={handleClick} isLoading={isLoading}>
                  Try PRO
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                       className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default SubscriptionCards