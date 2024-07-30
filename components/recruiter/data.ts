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

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      };
    
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ];
    
      const locations = [
        { key: "work from home", label: "Work From Home" },
        { key: "island wide", label: "Island Wide" },
        { key: "ampara", label: "Ampara" },
        { key: "anuradhapura", label: "Anuradhapura" },
        { key: "badulla", label: "Badulla" },
        { key: "batticaloa", label: "Batticaloa" },
        { key: "colombo", label: "Colombo" },
        { key: "galle", label: "Galle" },
        { key: "gampaha", label: "Gampaha" },
        { key: "hambantota", label: "Hambantota" },
        { key: "jaffna", label: "Jaffna" },
        { key: "kalutara", label: "Kalutara" },
        { key: "kandy", label: "Kandy" },
        { key: "kegalle", label: "Kegalle" },
        { key: "kilinochchi", label: "Kilinochchi" },
        { key: "kurunegala", label: "Kurunegala" },
        { key: "mannar", label: "Mannar" },
        { key: "matale", label: "Matale" },
        { key: "matara", label: "Matara" },
        { key: "monaragala", label: "Monaragala" },
        { key: "mullativu", label: "Mullativu" },
        { key: "nuwara eliya", label: "Nuwara Eliya" },
        { key: "polonnaruwa", label: "Polonnaruwa" },
        { key: "puttalam", label: "Puttalam" },
        { key: "ratnapura", label: "Ratnapura" },
        { key: "trincomalee", label: "Trincomalee" },
        { key: "vavuniya", label: "Vavuniya" },
      ];
      const jobTypes = [
        { key: "full time", label: "Full-time" },
        { key: "part time", label: "Part-time" },
        { key: "contract", label: "Contract" },
        { key: "other", label: "Other" },
      ];
    
      const experienceLevelTypes = [
        { key: 1, label: "6 Months" },
        { key: 2, label: "1-2 Years" },
        { key: 3, label: "2-3 Years" },
        { key: 4, label: "3-5 Years" },
      ];
    
    
      const educationLevelTypes = [
        { key: 1, label: "Ordinary Level" },
        { key: 2, label: "Advanced Level" },
        { key: 3, label: "Bachelor’s Degree" },
        { key: 4, label: "Masters Degree" },
        { key: 5, label: "PhD" },
        { key: 6, label: "Diploma/HND" },
        { key: 7, label: "Certificate" },
      ];
    
      const fieldValues = [
        { key: 1, label: "Account & Finance" },
        { key: 2, label: "Administration / Secretarial" },
        { key: 3, label: "Agriculture" },
        { key: 4, label: "Apparel" },
        { key: 5, label: "Architecture" },
        { key: 6, label: "Automobile" },
        { key: 7, label: "Banking and Financial Services" },
        { key: 8, label: "Beauty & Hairdressing" },
        { key: 9, label: "BPO/ KPO" },
        { key: 10, label: "Building & Construction" },
        { key: 11, label: "Business Management" },
        { key: 12, label: "Call Center" },
        { key: 13, label: "Charity / NGO" },
        { key: 14, label: "Customer Service" },
        { key: 15, label: "Delivery / Driving / Transport" },
        { key: 16, label: "Digital Marketing" },
        { key: 17, label: "Education / Higher Education" },
        { key: 18, label: "Electronics / Electrical" },
        { key: 19, label: "Engineering / Manufacturing" },
        { key: 20, label: "Environment/ Health & Safety" },
        { key: 21, label: "FMCG/ Food Industry" },
        { key: 23, label: "Government/ Public Sector" },
        { key: 24, label: "Hospital/ Nursing/ Healthcare" },
        { key: 25, label: "Hotel/ Hospitality/ Leisure" },
        { key: 26, label: "Human Resources / Recruitment" },
        { key: 27, label: "Insurance" },
        { key: 28, label: "Interior Design" },
        { key: 29, label: "Internship / Undergraduate" },
        { key: 30, label: "IT-HWare/ Networks/ Systems" },
        { key: 31, label: "IT-SWare / Internet" },
        { key: 32, label: "Legal / Law" },
        { key: 33, label: "Media/ Advertising/ Communication/ Design" },
        { key: 34, label: "Oil, Gas and Nuclear" },
        { key: 35, label: "Other" },
        { key: 36, label: "Pharmaceutical" },
        { key: 37, label: "Production & Operations" },
        { key: 38, label: "Project Management / Programme Management" },
        { key: 39, label: "Quality Assurance" },
        { key: 40, label: "Real Estate" },
        { key: 41, label: "Recoveries" },
        { key: 42, label: "Retail / Fashion" },
        { key: 43, label: "Sales / Marketing / New Business Development" },
        { key: 44, label: "School Leavers" },
        { key: 45, label: "Science / Research" },
        { key: 46, label: "Security/ Military" },
        { key: 47, label: "Senior Management / Directors" },
        { key: 48, label: "Sports/Fitness/Recreation" },
        { key: 49, label: "Startup/ Tech-startup" },
        { key: 50, label: "Supply Chain / Logistics / Procurement" },
        { key: 51, label: "Technical/ Mechanical" },
        { key: 52, label: "Telecommunications" },
        { key: 53, label: "Training and Development" },
        { key: 54, label: "Travel/Ticketing/Airline/Shipping" },
      ];

      const vacancyColumns = [
        { name: "Job ID", uid: "id", sortable: true },
        { name: "Vacancy Title", uid: "title" },
        { name: "Applications", uid: "applications" },
        { name: "Created Date", uid: "createdDate", sortable: true },
        { name: "Last Updated", uid: "lastUpdated", sortable: true },
        { name: "Status", uid: "status" },
        { name: "Actions", uid: "actions" },
        ];

        const vacancyStatusOptions = [
            { key: "all", label: "All" },
            { key: "live", label: "Live" },
            { key: "archived", label: "Archived" },

        ];

        const vacancies = [
            {
                id: 1,
                title: "Software Engineer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "Live",
            },
            {
                id: 2,
                title: "Frontend Developer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "archived",
            },
            {
                id: 3,
                title: "Backend Developer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "Live",
            },
            {
                id: 4,
                title: "DevOps Engineer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "archived",
            },
            {
                id: 5,
                title: "Software Engineer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "Live",
            },
            {
                id: 6,
                title: "Frontend Developer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "Live",
            },
            {
                id: 7,
                title: "Backend Developer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "Live",
            },
            {
                id: 8,
                title: "DevOps Engineer",
                applications: 100,
                createdDate: "2021-10-01",
                lastUpdated: "2021-10-01",
                status: "Live",
            },
        ];
      


export {columns, statusOptions, jobStats, modules, formats, locations, jobTypes, experienceLevelTypes, educationLevelTypes, fieldValues, vacancyColumns, vacancyStatusOptions, vacancies};
