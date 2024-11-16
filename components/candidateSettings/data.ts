import React from "react";


const qualificationData = [
    {
        school: "University of Colombo",
        degree: "BSc in Computer Science",
        graduationYear: "2021",
    },
    {
        school: "University of Moratuwa",
        degree: "BSc in Software Engineering",
        graduationYear: "2020",
    },
    {
        school: "University of Kelaniya",
        degree: "BSc in Information Technology",
        graduationYear: "2019",
    },
    {
        school: "University of Ruhuna",
        degree: "BSc in Computer Engineering",
        graduationYear: "2018",
    },
    {
        school: "University of Jaffna",
        degree: "BSc in Information Systems",
        graduationYear: "2017",
    },
    
];

const eColumns = [
    {
        key: "company",
        name: "Company",
    },
    {
        key: "position",
        name: "Position",
        sortable: true,
    },

    {
        key: "years",
        name: "Years",
        sortable: true,
    },
    {
        key: "actions",
        name: "Actions",
    },

];

const experienceData = [
    {
        company: "Google",
        position: "Software Engineer",
        years: "2021-2022",
    },
    {
        company: "Facebook",
        position: "Frontend Developer",
        years: "2020-2021",
    },
    {
        company: "Amazon",
        position: "Software Engineer",
        years: "2019-2020",
    },
    {
        company: "Microsoft",
        position: "Backend Developer",
        years: "2018-2019",
    },
    {
        company: "Apple",
        position: "Software Engineer",
        years: "2017-2018",
    },
    
];
    
export {  qualificationData, eColumns, experienceData };