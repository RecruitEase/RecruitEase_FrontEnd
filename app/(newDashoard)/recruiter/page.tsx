"use client";
import React from "react";
import HeaderBox from "@/components/dashboard/HeaderBox";
import TotalVacacies from "@/components/dashboard/TotalVacacies";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import FilterBar from "@/components/recruiter/FilterBar";
import DashboardCards from "@/components/recruiter/DashboardCards";
import StatTable from "@/components/recruiter/StatTable";

const RecruiterDashboard = () => {
  const { theme, setTheme } = useTheme();

  //for user session state
  const { data: session } = useSession();
  console.log({ session });

  const user = session?.user;

  const isLoggedIn = !!session?.user;

  const totalJobs = 10;
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Dashboard"
          subtext="Centralizing your hiring workflow"
        />
          <div className="container mx-auto ">
          <FilterBar />
        </div>
        <div className="container mx-auto ">
          <DashboardCards />
        </div>
      

        <div className="container mx-auto ">
          <StatTable />
        </div>
      </header>
    </div>
  );
};

export default RecruiterDashboard;
