import React from "react";
const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    {name: "ROLE", uid: "role", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "Interview Date", uid: "date", sortable: true }
];

const statusOptions = [
    {name: "Conformed", uid: "conformed"},
    {name: "Hold", uid: "hold"},
    {name: "Canceled", uid: "canceled"},
];

export {columns, statusOptions};
