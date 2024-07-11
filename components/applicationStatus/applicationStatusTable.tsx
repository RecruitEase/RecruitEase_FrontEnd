"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import "../../styles/globals.css";
import {Input} from "@nextui-org/input";
import {SearchIcon} from "@/components/icons";

type Status = "Submitted" | "Under Review" | "Interview Called" | "Selected" | "Rejected" | "Withdrawn";

interface Applicant {
    id: number;
    position: string;
    date: string;
    status: Status;
    avatar: string;
    companyName: string;
}

const statusColorMap: Record<Status, string> = {
    Submitted: "#D7F8FE",
    "Under Review": "#C9A9E9",
    "Interview Called": "#fbdba7",
    Selected: "#a2e9c1",
    Rejected: "#FAA0BF",
    Withdrawn: "#E4E4E7"
};

const columns = [
    { name: "POSITION", uid: "position" },
    { name: "DATE", uid: "date" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

interface ApplicationStatusTableProps {
    users: Applicant[];
}

const ApplicationStatusTable: React.FC<ApplicationStatusTableProps> = ({ users }) => {
    const renderCell = React.useCallback((user: Applicant, columnKey: string | number) => {
        const cellValue = user[columnKey as keyof Applicant];

        switch (columnKey) {
            case "position":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.companyName}
                        name={cellValue as string}
                    >
                        {user.companyName}
                    </User>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue as string}</p>
                        {/*<p className="text-bold text-sm capitalize text-default-400">{user.team}</p>*/}
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize min-w-32 text-center "
                        style={{ backgroundColor: statusColorMap[user.status], color:"#000000"}}
                        size="md"
                        variant="flat"
                        // color={"#000000"}
                    >
                        {cellValue as string}
                    </Chip>
                );
            case "actions":
                return (
                    user.status !== "Withdrawn" && (
                        <Button className={"bg-blue-700 h-8"} color="primary">
                            Withdraw
                        </Button>
                    )
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div>
            <div className={"mb-4 mt-4"}>
                <div className="w-1/3 ">
                    <Input
                        isClearable
                        radius="lg"
                        classNames={{
                            input: [
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                            ],
                        }}
                        placeholder="Type to search..."
                        startContent={
                            <SearchIcon
                                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 "/>
                        }
                    />
                </div>
            </div>
            <Table isStriped aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

    );
};

export default ApplicationStatusTable;