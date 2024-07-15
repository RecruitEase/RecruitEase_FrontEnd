// pages/index.jsx
"use client";
import React from "react";
import Filter from "../../../components/Jobs/Filter";
import JobCard from "../../../components/Jobs/JobCard";
import JobResultsHeader from "../../../components/Jobs/JobResultsHeader";

const jobs = [
  {
    logo: "https://dummyimage.com/100x100/000/fff&text=Outer+Space",
    title: "Assistant Operations Manager | On Site - Colombo",
    company: "Outer Space (Private) Limited",
    location: "Colombo, Western Province",
    type: "Full-Time",
    daysLeft: "4 days left",
  },
  {
    logo: "https://dummyimage.com/100x100/000/fff&text=Dewan+Consultants",
    title: "Digital Media / Administration Executive",
    company: "Dewan Consultants Sri Lanka",
    location: "Colombo, Western Province",
    type: "Full-Time",
    daysLeft: "4 days left",
  },
  {
    logo: "https://dummyimage.com/100x100/000/fff&text=Anunine+Holdings",
    title: "Manager - Talent Development | Colombo",
    company: "Anunine Holdings",
    location: "Colombo, Western Province",
    type: "Full-Time",
    daysLeft: "5 days left",
  },
  // Add more job entries as needed
];

const Home = () => {
  return (
    <div className="min-h-screen  p-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden  px-6 py-20 text-center sm:px-16 ">
          <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primaryText sm:text-4xl">
            Need our recommendations?
          </p>

          <form action="">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={"search-bar"} className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
              <input
                id="search-bar"
                placeholder="I'm looking for...   (Eg : Job title, Position, Company)"
                name="q"
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white text-black"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
              >
                <div className="flex items-center transition-all opacity-1">
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </button>
            </label>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 bg-greybg p-4 rounded-lg shadow-lg">
          <Filter />
        </div>
        <div className="md:col-span-3 space-y-4">
          {/* <div className="text-secondaryText text-sm">
            <span>333 Jobs Found</span>
          </div> */}
          <JobResultsHeader totalJobs={jobs.length} />
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
