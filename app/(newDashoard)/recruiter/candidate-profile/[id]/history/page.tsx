"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import HistoryTimeline from "@/components/recruiter/HistoryTimeline";

const RecruiterDashboard = () => {
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Ravishan Jayathilake"
          subtext="4 Previous Interactions with this candidate"
        />
        <div className="container mx-auto ">
          <HistoryTimeline />
        </div>
      </header>
    </div>
  );
};

export default RecruiterDashboard;
