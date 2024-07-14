import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import {InterviewsOffersCard} from "@/components/interviewsOffers/interviewsOffersCard";


const interviewsOffers = () => {
    return (
        <div>
            <header className="home-header">
                <HeaderBox type="title" title="Interview Offers" subtext="Upcoming interviews list is here."/>
            </header>
            <InterviewsOffersCard />
        </div>
    );
};

export default interviewsOffers;