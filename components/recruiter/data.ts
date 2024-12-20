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
    {key: "work_from_home", label: "Work From Home"},
    {key: "island_wide", label: "Island Wide"},
    {key: "ampara", label: "Ampara, Eastern Province"},
    {key: "anuradhapura", label: "Anuradhapura, North Central Province"},
    {key: "badulla", label: "Badulla, Uva Province"},
    {key: "batticaloa", label: "Batticaloa, Eastern Province"},
    {key: "colombo", label: "Colombo, Western Province"},
    {key: "galle", label: "Galle, Southern Province"},
    {key: "gampaha", label: "Gampaha, Western Province"},
    {key: "hambantota", label: "Hambantota, Southern Province"},
    {key: "jaffna", label: "Jaffna, Northern Province"},
    {key: "kalutara", label: "Kalutara, Western Province"},
    {key: "kandy", label: "Kandy, Central Province"},
    {key: "kegalle", label: "Kegalle, Sabaragamuwa Province"},
    {key: "kilinochchi", label: "Kilinochchi, Northern Province"},
    {key: "kurunegala", label: "Kurunegala, North Western Province"},
    {key: "mannar", label: "Mannar, Northern Province"},
    {key: "matale", label: "Matale, Central Province"},
    {key: "matara", label: "Matara, Southern Province"},
    {key: "monaragala", label: "Monaragala, Uva Province"},
    {key: "mullativu", label: "Mullativu, Northern Province"},
    {key: "nuwara_eliya", label: "Nuwara Eliya, Central Province"},
    {key: "polonnaruwa", label: "Polonnaruwa, North Central Province"},
    {key: "puttalam", label: "Puttalam, North Western Province"},
    {key: "ratnapura", label: "Ratnapura, Sabaragamuwa Province"},
    {key: "trincomalee", label: "Trincomalee, Eastern Province"},
    {key: "vavuniya", label: "Vavuniya, Northern Province"},
];

const jobTypes = [
    {key: "full_time", label: "Full-time"},
    {key: "part_time", label: "Part-time"},
    {key: "contract", label: "Contract"},
    {key: "other", label: "Other"},

];

const experienceLevelTypes = [
    {key: 1, label: "Entry Level"},
    {key: 2, label: "6 Months"},
    {key: 3, label: "1-2 Years"},
    {key: 4, label: "2-3 Years"},
    {key: 5, label: "3-5 Years"},
    {key: 6, label: "5+ Years"},
]
const fieldValues = [
    {key: 1, label: "Account & Finance"},
    {key: 2, label: "Administration / Secretarial"},
    {key: 3, label: "Agriculture"},
    {key: 4, label: "Apparel"},
    {key: 5, label: "Architecture"},
    {key: 6, label: "Automobile"},
    {key: 7, label: "Banking and Financial Services"},
    {key: 8, label: "Beauty & Hairdressing"},
    {key: 9, label: "BPO/ KPO"},
    {key: 10, label: "Building & Construction"},
    {key: 11, label: "Business Management"},
    {key: 12, label: "Call Center"},
    {key: 13, label: "Charity / NGO"},
    {key: 14, label: "Customer Service"},
    {key: 15, label: "Delivery / Driving / Transport"},
    {key: 16, label: "Digital Marketing"},
    {key: 17, label: "Education / Higher Education"},
    {key: 18, label: "Electronics / Electrical"},
    {key: 19, label: "Engineering / Manufacturing"},
    {key: 20, label: "Environment/ Health & Safety"},
    {key: 21, label: "FMCG/ Food Industry"},
    {key: 23, label: "Government/ Public Sector"},
    {key: 24, label: "Hospital/ Nursing/ Healthcare"},
    {key: 25, label: "Hotel/ Hospitality/ Leisure"},
    {key: 26, label: "Human Resources / Recruitment"},
    {key: 27, label: "Insurance"},
    {key: 28, label: "Interior Design"},
    {key: 29, label: "Internship / Undergraduate"},
    {key: 30, label: "IT-HWare/ Networks/ Systems"},
    {key: 31, label: "IT-SWare / Internet"},
    {key: 32, label: "Legal / Law"},
    {key: 33, label: "Media/ Advertising/ Communication/ Design"},
    {key: 34, label: "Oil, Gas and Nuclear"},
    {key: 35, label: "Other"},
    {key: 36, label: "Pharmaceutical"},
    {key: 37, label: "Production & Operations"},
    {key: 38, label: "Project Management / Programme Management"},
    {key: 39, label: "Quality Assurance"},
    {key: 40, label: "Real Estate"},
    {key: 41, label: "Recoveries"},
    {key: 42, label: "Retail / Fashion"},
    {key: 43, label: "Sales / Marketing / New Business Development"},
    {key: 44, label: "School Leavers"},
    {key: 45, label: "Science / Research"},
    {key: 46, label: "Security/ Military"},
    {key: 47, label: "Senior Management / Directors"},
    {key: 48, label: "Sports/Fitness/Recreation"},
    {key: 49, label: "Startup/ Tech-startup"},
    {key: 50, label: "Supply Chain / Logistics / Procurement"},
    {key: 51, label: "Technical/ Mechanical"},
    {key: 52, label: "Telecommunications"},
    {key: 53, label: "Training and Development"},
    {key: 54, label: "Travel/Ticketing/Airline/Shipping"},
];
const educationLevelTypes = [
    {key: 1, label: "Ordinary Level"},
    {key: 2, label: "Advanced Level"},
    {key: 3, label: "Bachelor’s Degree"},
    {key: 4, label: "Masters Degree"},
    {key: 5, label: "PhD"},
    {key: 6, label: "Diploma/HND"},
    {key: 7, label: "Certificate"},
]
const vacancies = [
    {
        jobId: 1,
        title: "Software Engineer",
        location: "ampara",
        createdAt: "2024-09-20",
        status: "LIVE",
    },
    {
        jobId: 2,
        title: "Product Manager",
        location: "ampara",
        createdAt: "2024-08-15",
        status: "ARCHIVED",
    },
    {
        jobId: 3,
        title: "UI/UX Designer",
        location: "ampara",
        createdAt: "2024-07-30",
        status: "FILLED",
    }
];
export {columns, statusOptions, jobStats, modules, formats, locations, jobTypes, experienceLevelTypes, educationLevelTypes, fieldValues,vacancies};
