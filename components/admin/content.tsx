"use client";
import React from "react";
import { SummaryNumber } from "./SummaryNumber";
import { Link, Tab } from "@nextui-org/react";
import NextLink from "next/link";
import GraphSummary from "@/components/admin/GraphSummary";
import ChartPie from "./PieChart";
import TableCard from "./Table";
import BarChartCard from "./BarChart";
import Table2 from "./Table2";
import PieChart2 from "./PieChart2";

const revenuePackages = [
  { name: "Gold", value: 10000 },
  { name: "Silver", value: 20000 },
  { name: "Diamond", value: 30000 },
];

const subscriptionCount = [
  { name: "Gold", value: 100 },
  { name: "Silver", value: 200 },
  { name: "Diamond", value: 300 },
];

const locationCount = [
  { name: "Colombo", value: 100 },
  { name: "Kandy", value: 200 },
  { name: "Galle", value: 300 },
  { name: "Jaffna", value: 400 },
];

const monthlyRegestration = [
  { name: "January", value: 100 },
  { name: "February", value: 200 },
  { name: "March", value: 300 },
  { name: "April", value: 400 },
  { name: "May", value: 500 },
  { name: "June", value: 600 },
  { name: "July", value: 700 },
  { name: "August", value: 800 },
  { name: "September", value: 900 },
  { name: "October", value: 1000 },
  { name: "November", value: 1100 },
  { name: "December", value: 1200 },
];

const profileStatusCount = [
  { name: "Working", value: 100 },
  { name: "Looking for a job", value: 200 },
];

const industryCount = [
  { name: "Tech", value: 100 },
  { name: "Finance", value: 200 },
  { name: "Health", value: 300 },
  { name: "Education", value: 400 },
];

const supportTickets = [
  { name: "Candidates", value: 100 },
  { name: "Recruiters", value: 200 },
];
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
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDny5LgTXEfQulSukmbz8WJQM4mh5y3KwIUg&s"
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
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7ingZ9m0FmDDViQOe3esskvKd0g4Hq4MaA&s"
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
                analyticName="Average time to hire (days)"
                amount={5}
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
              imageUrl="https://as1.ftcdn.net/v2/jpg/04/39/28/40/1000_F_439284072_V9Dd6z7HQLhNjEcmu6zzVKTzlVwlC3IX.jpg"
              title="Total Revenue"
              subtitle="From All Packages"
              detailsLink="/"
            >
              <div style={{ width: "100%", height: "230px" }}>
                <ChartPie data={revenuePackages} unit="LKR" />
              </div>
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
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDqxlUenIX49Qm2JR8-qfu7_VnIwAuIYLp5w&s"
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
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt34Erp1EJzpOT9fznrG0AdAb0-AbuWLkKw&s"
            title="New Registrations"
            subtitle="Monthly"
            detailsLink="/"
          >
            <BarChartCard data={monthlyRegestration} units="" />
          </GraphSummary>
          <GraphSummary
            imageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fvnmanpower.com%2Fen%2Fhow-understanding-user-engagement-can-lead-to-success-bl1436.html&psig=AOvVaw1cRwyksqMekhZbNpCc1Xiu&ust=1722195695424000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCM94b9x4cDFQAAAAAdAAAAABAE"
            title="User Engagement"
            subtitle="Last Year"
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
              imageUrl="https://www.mckinsey.com/~/media/mckinsey/mckinsey%20quarterly/the%20five%20fifty/soft-skills-1536x1536.png"
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
              <GraphSummary
                imageUrl="https://media.mktg.workday.com/is/image/workday/illustration-industries-1?fmt=png-alpha&wid=1000"
                title="Demographics"
                subtitle="Industry"
                detailsLink="/"
              >
                <div style={{ width: "100%", height: "230px" }}>
                  <PieChart2 data={industryCount} unit="" />
                </div>
              </GraphSummary>

              <GraphSummary
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcCuCOisgxyOypyBi-hRYYV2Onv7KVI6QTVA&s"
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
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2kTMtKVCzDp1Hy3IMzUl9bWfGi9L0mytQKA&s"
                title="Demographics"
                subtitle="Location"
                detailsLink="/"
              >
                <div style={{ width: "100%", height: "230px" }}>
                  <PieChart2 data={locationCount} unit="" />
                </div>
              </GraphSummary>
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
            </div>
            <div className="flex flex-col gap-6">
              <GraphSummary
                imageUrl="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                title="Profiles"
                subtitle="Profile Status"
                detailsLink="/"
              >
                <div style={{ width: "100%", height: "230px" }}>
                  <PieChart2 data={profileStatusCount} unit="" />
                </div>
              </GraphSummary>
              <GraphSummary
                imageUrl="https://wkdigital.com.au/wp-content/uploads/2017/01/optimized-keywords.jpg"
                title="Top Keywords"
                subtitle=""
                detailsLink="/"
              >
                <TableCard
                  columns={[
                    { key: "rank", label: "Rank" },
                    { key: "keyword", label: "Keyword" },
                  ]}
                  rows={[
                    { key: "1", rank: "1", keyword: "React" },
                    { key: "2", rank: "2", keyword: "React" },
                    { key: "3", rank: "3", keyword: "React" },
                  ]}
                />
              </GraphSummary>
            </div>
          </div>
        </div>

        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recruiters
          </h5>
          <div className="grid md:grid-cols-5 grid-cols-1 gap-6">
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
            <div className="col-span-2">
              <GraphSummary
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSDoQD2e0dca-IdK7l72wyTSdtrnK92Fyew&s"
                title="Subscriptions"
                subtitle="Count per Package"
                detailsLink="/"
              >
                <div style={{ width: "100%", height: "220px" }}>
                  <ChartPie data={subscriptionCount} unit="" />
                </div>
              </GraphSummary>
            </div>
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
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwswrfrZ-ABGTRlvfsWwwwS6anN99GFRpGvw&s"
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
              imageUrl="https://cdn4.vectorstock.com/i/1000x1000/45/08/support-ticket-icon-simple-element-from-web-vector-27744508.jpg"
              title="Support tickets"
              subtitle=""
              detailsLink="/"
            >
              <div style={{ width: "100%", height: "230px" }}>
                <PieChart2 data={supportTickets} unit="" />
              </div>
            </GraphSummary>
          </div>
        </div>
      </div>
    </div>
  );
}
