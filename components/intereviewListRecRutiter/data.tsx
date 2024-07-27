import React from "react";
const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    // {name: "AGE", uid: "age", sortable: true},
    {name: "ROLE", uid: "role", sortable: true},
    {name: "TEAM", uid: "team"},
    {name: "EMAIL", uid: "email"},
    // {name: "STATUS", uid: "status", sortable: true},
    {name: "Interview Date", uid: "date", sortable: true },
    // {name: "ACTIONS", uid: "actions"},

];

const statusOptions = [
    {name: "Conformed", uid: "conformed"},
    {name: "Hold", uid: "hold"},
    {name: "Canceled", uid: "canceled"},
];

const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
        date:"2024/10/05"
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
        date:"2024/10/05"
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
        date:"2024/10/05"
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "canceled",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
        date:"2024/10/05"
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
        date:"2024/10/05"
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        status: "conformed",
        date:"2024/10/05"
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
        date:"2024/10/05"
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
        email: "samantha.brooks@example.com",
        date:"2024/10/05"
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "canceled",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "frank.harrison@example.com",
        date:"2024/10/05"
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "emma.adams@example.com",
        date:"2024/10/05"
    },
    {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "brandon.stevens@example.com",
        date:"2024/10/05"
    },
    {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?img=10",
        email: "megan.richards@example.com",
        date:"2024/10/05"
    },
    {
        id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=12",
        email: "oliver.scott@example.com",
        date:"2024/10/05"
    },
    {
        id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=16",
        email: "grace.allen@example.com",
        date:"2024/10/05"
    },
    {
        id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?img=15",
        email: "noah.carter@example.com",
        date:"2024/10/05"
    },
    {
        id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=20",
        email: "ava.perez@example.com",
        date:"2024/10/05"
    },
    {
        id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=33",
        email: "liam.johnson@example.com",
        date:"2024/10/05"
    },
    {
        id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=29",
        email: "sophia.taylor@example.com",
        date:"2024/10/05"
    },
    {
        id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "hold",
        avatar: "https://i.pravatar.cc/150?img=50",
        email: "lucas.harris@example.com",
        date:"2024/10/05"
    },
    {
        id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "conformed",
        avatar: "https://i.pravatar.cc/150?img=45",
        email: "mia.robinson@example.com",
        date:"2024/10/05"
    },
];

export {columns, users, statusOptions};
