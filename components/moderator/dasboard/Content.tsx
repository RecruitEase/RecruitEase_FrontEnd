"use client";
import React from "react";
import { Link, Tab } from "@nextui-org/react";
import NextLink from "next/link";
import CircularProgressCard from "./CircularProgressCard";
import { DataCard2 } from "./DataCard2";
import DataCard from "./DataCard";
import PieChartCard from "./PieChart";
import TableCard from "./TableCard";
import MTicketsTable from "./LatestRequests";

const requestsFromUsers = [
  {
    name: "Candidates",
    value: 400,
  },
  {
    name: "Recruiters",
    value: 300,
  },
];

const tickets = [
  {
    name: "Underreview",
    value: 1000,
  },
  {
    name: "Resolved",
    value: 1000,
  },
  {
    name: "Rejected",
    value: 1000,
  },
];

export default function Content() {
  return (
    <div className="h-full">
      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-6 px-4 lg:px-0 sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <CircularProgressCard
              progressValue={75}
              dataPoints="75% Response Rate"
            />
            <div className="col-span-1 sm:col-span-2">
              <DataCard
                logoSrc="https://cdn-icons-png.flaticon.com/512/6070/6070926.png"
                logoAlt="Customer Support Analytics"
                title="Customer Support Analytics"
                subtitle="All time"
                footerLink="https://nextui.org"
                footerLinkText="View All"
              >
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex flex-row gap-3">
                    <DataCard2
                      analyticName="Under Review"
                      amount={1000}
                      percentageChange={10}
                    />
                    <DataCard2
                      analyticName="Rejected"
                      amount={1000}
                      percentageChange={10}
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <DataCard2
                      analyticName="Rejected"
                      amount={1000}
                      percentageChange={10}
                    />
                    <DataCard2
                      analyticName="Resolve Rate"
                      amount={12 + "%"}
                      percentageChange={0}
                    />
                  </div>
                </div>
              </DataCard>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <DataCard
                logoSrc="https://cdn-icons-png.flaticon.com/512/6070/6070926.png"
                logoAlt="Customer Support Analytics"
                title="Customer Support Analytics"
                subtitle="Requests from Users"
                footerLink="https://nextui.org"
                footerLinkText="View All"
              >
                <div style={{ width: "100%", height: "230px" }}>
                  <PieChartCard
                    data={requestsFromUsers}
                    dataKey="value"
                    unit="requests"
                  />
                </div>
              </DataCard>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col gap-6 w-full max-w-[90rem] mx-auto mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Latest Support Requests</h3>
          <Link
            href="/accounts"
            as={NextLink}
            color="primary"
            className="cursor-pointer"
          >
            View All
          </Link>
        </div>
        <MTicketsTable />
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col gap-6 w-full max-w-[90rem] mx-auto mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Candidates</h3>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <DataCard
            logoSrc="https://cdn-icons-png.flaticon.com/512/6070/6070926.png"
            logoAlt="Customer Support Analytics"
            title="Frequently contacted"
            subtitle=""
            footerLink="https://nextui.org"
            footerLinkText="View All"
          >
            <TableCard
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "frequency", label: "Frequency" },
              ]}
              rows={[
                {
                  key: "1",
                  name: "John Doe",
                  email: "john@gmail.com",
                  frequency: "10",
                },
                {
                  key: "2",
                  name: "Jane Doe",
                  email: "jane@gmail.com",
                  frequency: "20",
                },
                {
                  key: "3",
                  name: "John Doe",
                  email: "doe@gmail.com",
                  frequency: "30",
                },
              ]}
            />
          </DataCard>
          <DataCard
            logoSrc="https://cdn-icons-png.flaticon.com/512/6070/6070926.png"
            logoAlt="Support Requests"
            title="Support Requests"
            subtitle=""
            footerLink="https://nextui.org"
            footerLinkText="View All"
          >
            <div style={{ width: "100%", height: "230px" }}>
              <PieChartCard data={tickets} dataKey="value" unit="requests" />
            </div>
          </DataCard>
          <div className="grid grid-cols-1 gap-3">
            <DataCard2
              analyticName="Total"
              amount={1000 + " Profiles"}
              percentageChange={10}
            />
            <DataCard2
              analyticName="Under Review Tickets"
              amount={1000 + " Tickets"}
              percentageChange={10}
            />
            <DataCard2
              analyticName="Resolved Tickets"
              amount={1000 + " Tickets"}
              percentageChange={10}
            />
            <DataCard2
              analyticName="Rejected Tickets"
              amount={1000 + " Tickets"}
              percentageChange={10}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col gap-6 w-full max-w-[90rem] mx-auto mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Recruiters</h3>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <DataCard
            logoSrc="https://cdn-icons-png.flaticon.com/512/6070/6070926.png"
            logoAlt="Customer Support Analytics"
            title="Frequently contacted"
            subtitle=""
            footerLink="https://nextui.org"
            footerLinkText="View All"
          >
            <TableCard
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "frequency", label: "Frequency" },
              ]}
              rows={[
                {
                  key: "1",
                  name: "John Doe",
                  email: "john@gmail.com",
                  frequency: "10",
                },
                {
                  key: "2",
                  name: "Jane Doe",
                  email: "jane@gmail.com",
                  frequency: "20",
                },
                {
                  key: "3",
                  name: "John Doe",
                  email: "doe@gmail.com",
                  frequency: "30",
                },
              ]}
            />
          </DataCard>
          <DataCard
            logoSrc="https://cdn-icons-png.flaticon.com/512/6070/6070926.png"
            logoAlt="Support Requests"
            title="Support Requests"
            subtitle=""
            footerLink="https://nextui.org"
            footerLinkText="View All"
          >
            <div style={{ width: "100%", height: "230px" }}>
              <PieChartCard data={tickets} dataKey="value" unit="requests" />
            </div>
          </DataCard>
          <div className="grid grid-cols-1 gap-3">
            <DataCard2
              analyticName="Total"
              amount={1000 + " Recruiters"}
              percentageChange={10}
            />
            <DataCard2
              analyticName="Underreview Tickets"
              amount={1000 + " Tickets"}
              percentageChange={10}
            />
            <DataCard2
              analyticName="Resolved Tickets"
              amount={1000 + " Tickets"}
              percentageChange={10}
            />
            <DataCard2
              analyticName="Rejected Tickets"
              amount={1000 + " Tickets"}
              percentageChange={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
