"use client";
import React from "react";
import { SummaryNumber } from "./SummaryNumber";
import { Link, Tab } from "@nextui-org/react";
import NextLink from "next/link";
import GraphSummary from "@/components/admin/GraphSummary";
import RevenueChart from "./RevenueChart";
import TableCard from "./Table";
import BarChartCard from "./BarChart";
import Table2 from "./Table2";

export default function content() {
  return (
    <div className="h-full">
      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-6 px-4 lg:px-0 sm:pt-10 max-w-[90rem] mx-auto w-full">
        {/* Main Section */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col gap-6 w-full xl:max-w-4xl">
          {/* Card Section Top */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Jobs And Applications</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5 w-full">
              <SummaryNumber
                analyticName="Total Jobs"
                amount={5679}
                percentageChange={10}
              />
              <SummaryNumber
                analyticName="Active Jobs"
                amount={2342}
                percentageChange={2.5}
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
              />
              <SummaryNumber
                analyticName="Average time to hire"
                amount={52}
                percentageChange={-2.5}
              />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col gap-6 w-full xl:max-w-md">
          <h3 className="text-xl font-semibold">Finance</h3>
          <div className="flex flex-col gap-6">
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
              />
              <SummaryNumber
                analyticName="Total Revenue"
                amount={100}
                percentageChange={10}
              />
              <SummaryNumber
                analyticName="Total Revenue"
                amount={100}
                percentageChange={10}
              />
            </GraphSummary>
          </div>
        </div>
      </div>

      {/* Table Latest Users */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col gap-6 w-full max-w-[90rem] mx-auto mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Users</h3>
          <Link
            href="/accounts"
            as={NextLink}
            color="primary"
            className="cursor-pointer"
          >
            View More
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
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
          <GraphSummary
            imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            title="User Engagement"
            subtitle="Monthly"
            detailsLink="/"
          >
            <TableCard
              columns={[
                { key: "criteria", label: "Criteria" },
                { key: "Value", label: "Value" },
              ]}
              rows={[
                { key: "1", criteria: "Active Users", Value: 100 },
                { key: "2", criteria: "Inactive Users", Value: 100 },
                { key: "3", criteria: "Users Online", Value: 100 },
                { key: "4", criteria: "Average Session Time", Value: 100 },
              ]}
            />
          </GraphSummary>
        </div>

        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Candidates
          </h5>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            <GraphSummary
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title="Top Skills"
              subtitle="All time"
              detailsLink="/"
            >
              <TableCard
                columns={[
                  { key: "skill", label: "Skill" },
                  { key: "percentage", label: "Percentage" },
                ]}
                rows={[
                  { key: "1", skill: "React", percentage: 100 },
                  { key: "2", skill: "React", percentage: 100 },
                  { key: "3", skill: "React", percentage: 100 },
                  { key: "4", skill: "React", percentage: 100 },
                  { key: "5", skill: "React", percentage: 100 },
                  { key: "6", skill: "React", percentage: 100 },
                  { key: "7", skill: "React", percentage: 100 },
                  { key: "8", skill: "React", percentage: 100 },
                ]}
              />
            </GraphSummary>
            <div className="flex flex-col gap-3">
              <SummaryNumber
                analyticName="Total Profiles"
                amount={100}
                percentageChange={10}
              />

              <SummaryNumber
                analyticName="Tickets Open"
                amount={100}
                percentageChange={10}
              />
              <GraphSummary
                imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                title="Top Profiles"
                subtitle=""
                detailsLink="/"
              >
                <TableCard
                  columns={[
                    { key: "rank", label: "Rank" },
                    { key: "name", label: "Name" },
                  ]}
                  rows={[
                    { key: "1", rank: "1", name: "John Doe" },
                    { key: "2", rank: "2", name: "John Doe" },
                    { key: "3", rank: "3", name: "John Doe" },
                  ]}
                />
              </GraphSummary>
            </div>
            <div className="flex flex-col gap-6">
              <GraphSummary
                imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                title="Demographics"
                subtitle="Location"
                detailsLink="/"
              >
                <RevenueChart />
              </GraphSummary>
              <GraphSummary
                imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                title="Demographics"
                subtitle="Industry"
                detailsLink="/"
              >
                <RevenueChart />
              </GraphSummary>
            </div>
            <div className="flex flex-col gap-6">
              <GraphSummary
                imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                title="Profiles"
                subtitle="Profile Status"
                detailsLink="/"
              >
                <RevenueChart />
              </GraphSummary>
              <GraphSummary
                imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                title="Demographics"
                subtitle="Industry"
                detailsLink="/"
              >
                <RevenueChart />
              </GraphSummary>
            </div>
          </div>
        </div>

        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recruiters
          </h5>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            <div className="col-span-2">
              <Table2
                Title="Top Recruiters"
                Rows={[
                  {
                    id: 1,
                    name: "99x",
                    email: "99x@gmail.com",
                    value: "100 Vacancies",
                    image:
                      "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
                  },
                  {
                    id: 2,
                    name: "Virtusa",
                    email: "virtusa@gmail.com",
                    value: "100 Vacancies",
                    image:
                      "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
                  },
                  {
                    id: 3,
                    name: "CodeLabs",
                    email: "codelabs@gmail.com",
                    value: "100 Vacancies",
                    image:
                      "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
                  },
                ]}
              />
            </div>

            <GraphSummary
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title="Subscriptions"
              subtitle="Count per Package"
              detailsLink="/"
            >
              <RevenueChart />
            </GraphSummary>
            <div className="flex flex-col gap-2">
              <SummaryNumber
                analyticName="Total Interviews"
                amount={100}
                percentageChange={10}
              />
              <SummaryNumber
                analyticName="Shortlisted"
                amount={100}
                percentageChange={10}
              />
              <SummaryNumber
                analyticName="Tickets Open"
                amount={100}
                percentageChange={10}
              />
            </div>
          </div>
        </div>

        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Moderators
          </h5>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            <GraphSummary
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title="Top Contributers"
              subtitle="All time"
              detailsLink="/"
            >
              <TableCard
                columns={[
                  { key: "name", label: "Name" },
                  { key: "completedtickets", label: "Completed Tickets" },
                ]}
                rows={[
                  { key: "1", name: "John Doe", completedtickets: 100 },
                  { key: "2", name: "John Doe", completedtickets: 100 },
                  { key: "3", name: "John Doe", completedtickets: 100 },
                  { key: "4", name: "John Doe", completedtickets: 100 },
                ]}
              />
            </GraphSummary>
            <div className="flex flex-col gap-6">
              <SummaryNumber
                analyticName="Open Tickets"
                amount={100}
                percentageChange={10}
              />
              <SummaryNumber
                analyticName="Completed Tickets"
                amount={100}
                percentageChange={10}
              />
              <SummaryNumber
                analyticName="Complaints"
                amount={100}
                percentageChange={10}
              />
            </div>

            <GraphSummary
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title="Support tickets"
              subtitle=""
              detailsLink="/"
            >
              <RevenueChart />
            </GraphSummary>
          </div>
        </div>
      </div>
    </div>
  );
}
