"use client";
import HeaderBox from '@/components/dashboard/HeaderBox'
import SubscriptionCards from '@/components/recruiter/SubscriptionCards'
import React from 'react'
import {useRouter} from "next/navigation";
import {Bounce, toast} from "react-toastify";

function SubscriptionPage() {
    const router=useRouter();
    toast.error('Payment cancelled!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    router.push("/recruiter");

  return (
      <>
          <div className="bg-gray-100 h-screen">
              <div className="bg-white p-6  md:mx-auto">
                  <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
                      <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                      </path>
                  </svg>
                  <div className="text-center">
                      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment
                          Cancelled!</h3>
                      <p className="text-gray-600 my-2">Try again later.</p>
                      <p> Have a great day! </p>
                      <div className="py-10 text-center">
                          <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                              GO BACK
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default SubscriptionPage