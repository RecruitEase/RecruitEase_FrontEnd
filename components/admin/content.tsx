"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { SummaryNumber } from "./SummaryNumber";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import GraphSummary from "@/components/admin/GraphSummary";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import RevenueChart from "./RevenueChart";
import TableCard from "./Table";
import BarChartCard from "./BarChart";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6  px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="gap-6 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Jobs And Applications</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <SummaryNumber
              analyticName="Total Jobs"
              amount={5679}
              percentageChange={10}
              Icon={BsFileEarmarkPostFill}
            />
            <SummaryNumber
              analyticName="Active Jobs"
              amount={2342}
              percentageChange={2.5}
              Icon={BsFileEarmarkPostFill}
            />

            <GraphSummary
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title="Top Vacancies"
              subtitle="Last Month"
              detailsLink="/"
            >
              <TableCard
                columns={[
                  { key: "position", label: "Position" },
                  { key: "recruiter", label: "Recruiter" },
                  { key: "applications", label: "Applications" },
                ]}
                rows={[
                  {
                    key: "1",
                    position: "Software Engineer",
                    recruiter: "Google",
                    applications: 100,
                  },
                  {
                    key: "2",
                    position: "Software Engineer",
                    recruiter: "Google",
                    applications: 100,
                  },
                  {
                    key: "3",
                    position: "Software Engineer",
                    recruiter: "Google",
                    applications: 100,
                  },
                ]}
              />
            </GraphSummary>

            <GraphSummary
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title="Trending Jobs"
              subtitle="Last Month"
              detailsLink="/"
            >
              <TableCard
                columns={[
                  { key: "category", label: "Category" },
                  { key: "industry", label: "Industry" },
                ]}
                rows={[
                  { key: "1", category: "Software", industry: "Tech" },
                  { key: "2", category: "Software", industry: "Tech" },
                  { key: "3", category: "Software", industry: "Tech" },
                ]}
              />
            </GraphSummary>
            <SummaryNumber
              analyticName="Applications per vacancy"
              amount={52}
              percentageChange={2.5}
              Icon={BsFileEarmarkPostFill}
            />
          </div>
        </div>

        {/* <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Chart />
          </div>
        </div> */}
      </div>

      {/* Left Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold">Finance</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <GraphSummary
            imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            title="Total Revenue"
            subtitle="From All Packages"
            detailsLink="/"
          >
            <RevenueChart />
          </GraphSummary>
          <GraphSummary
            imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            title="Total Revenue"
            subtitle="From All Packages"
            detailsLink="/"
          >
            <SummaryNumber
              analyticName="Total Revenue"
              amount={100}
              percentageChange={10}
              Icon={BsFileEarmarkPostFill}
            />
            <SummaryNumber
              analyticName="Total Revenue"
              amount={100}
              percentageChange={10}
              Icon={BsFileEarmarkPostFill}
            />
          </GraphSummary>
        </div>
      </div>
    </div>

    {/* Table Latest Users */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <div className="flex  flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold">Users</h3>
        <Link
          href="/accounts"
          as={NextLink}
          color="primary"
          className="cursor-pointer"
        >
          View All
        </Link>
      </div>
      <GraphSummary
        imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        title="User Analytics"
        subtitle="Active Users"
        detailsLink="/"
      >
        <TableCard
          columns={[
            { key: "role", label: "Role" },
            { key: "count", label: "Count" },
          ]}
          rows={[
            { key: "1", role: "Recruiters", count: 100 },
            { key: "2", role: "Candidates", count: 100 },
            { key: "3", role: "Moderators", count: 100 },
            { key: "4", role: "Admins", count: 100 },
          ]}
        />
      </GraphSummary>
      <GraphSummary
        imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        title="New Registrations"
        subtitle="Monthly"
        detailsLink="/"
      >
        <BarChartCard />
      </GraphSummary>
    </div>
  </div>
);
