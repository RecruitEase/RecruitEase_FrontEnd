import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import JobOfferForm from "@/components/sendJobOffer/jobOfferForm";

const sendJobOffer = () =>{
    return(
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Create Job Offer" subtext=" Fill out the form below to create a new job offer."/>
            </header>
            <JobOfferForm />
        </div>
    )
}

export default sendJobOffer;