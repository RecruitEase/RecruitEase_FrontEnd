import React from "react";
const columns = [
  {name: "Job ID", uid: "id", sortable: true},
  {name: "Job Title", uid: "title"},
    {name: "Created Date", uid: "createdDate", sortable: true},
    {name: "CV/CV Less", uid: "cv"},
    {name: "Total Applications", uid: "totalApplications"},
    {name: "Opened Applications", uid: "openedApplications"},

];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

const jobStats = [
    {
        id: 1,
        title: "Software Engineer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 2,
        title: "Frontend Developer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 3,
        title: "Backend Developer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 4,
        title: "DevOps Engineer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 5,
        title: "Software Engineer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 6,
        title: "Frontend Developer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 7,
        title: "Backend Developer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    {
        id: 8,
        title: "DevOps Engineer",
        createdDate: "2021-10-01",
        cv: "CV",
        totalApplications: 100,
        openedApplications: 50,
    },
    ];
export {columns, statusOptions, jobStats};
