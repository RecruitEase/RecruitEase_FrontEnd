"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import "../../styles/globals.css";
import {Input} from "@nextui-org/input";
import {SearchIcon} from "@/components/icons";
import Swal from "sweetalert2";
import {Bounce, toast} from "react-toastify";
import Link from "next/link";
import {  JobProps } from "@/types";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {ApplicationProp} from "@/types/applications";
import {RecruiterProp} from "@/types/users";



const statusTitleMap: Record<string, string> = {
    underReview: "Under Review",
    withdrawn: "Withdrawn",
    shortlisted: "Shortlisted",
    interviewScheduled: "Interview Scheduled",
    interviewed: "Interviewed",  // You might want to assign the same color as "Shortlisted"
    offered: "Offered",
    hired: "Hired",         // Same color as "Offered"
    rejected: "Rejected",
    archived: "Archived",      // Same color as "Withdrawn"
};
const statusColorMap: Record<string, string> = {
    underReview: "#D7F8FE",
    withdrawn: "#E4E4E7",
    shortlisted: "#C9A9E9",
    interviewScheduled: "#fbdba7",
    interviewed: "#C9A9E9",  // You might want to assign the same color as "Shortlisted"
    offered: "#a2e9c1",
    hired: "#a2e9c1",         // Same color as "Offered"
    rejected: "#FAA0BF",
    archived: "#E4E4E7",      // Same color as "Withdrawn"
};

const columns = [
    { name: "POSITION", uid: "position" },
    { name: "DATE", uid: "date" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

interface ApplicationStatusTableProps {
    applications: ApplicationProp[];
    jobs: JobProps[];
    recruiters: RecruiterProp[];
}








const ApplicationStatusTable: React.FC<ApplicationStatusTableProps> = ({ applications,jobs,recruiters }) => {

    const axios=useAxiosAuth();
    const popupview = (applicationId:String) => {
        Swal.fire({
            title: "Do you want to withdraw the application?",
            icon: "warning",
            customClass: {
                confirmButton: "bg-[#f31260]", // Custom class for confirm button
                cancelButton: "bg-[#a1a1aa]" // Custom class for cancel button
            },
            showCancelButton: true,
            confirmButtonText: "Withdraw"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // Fetch application data API call
            const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/withdraw/${applicationId}`)
                if (result?.status === 200) {
                    toast.success("Withdrawn successfully!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce
                    });
                    applications[applications.findIndex(application=>application.applicationId==applicationId)].status="withdrawn";
                } else {
                    toast.error("Withdrawal failed!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce
                    });
                }
            }
        });
    };


    const renderCell = React.useCallback((application: ApplicationProp, columnKey: string | number) => {
        const cellValue = application[columnKey as keyof ApplicationProp];

        switch (columnKey) {
            case "position":
                
                    const recruiter=recruiters.find(recruiter=>recruiter.recruiterId===application.recruiterId);
                    
                    return (

                    <User
                        avatarProps={{radius: "lg", src: recruiter?.profilePic}}
                        description={recruiter?.companyName}
                        name={cellValue as string}

                    >
                        {recruiter?.companyName}
                    </User>
                );
            case "date":
                const date = new Date(application.createdAt);
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{date.toLocaleString()}</p>
                        {/*<p className="text-bold text-sm capitalize text-default-400">{user.team}</p>*/}
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize min-w-32 text-center "
                        style={{ backgroundColor: statusColorMap[application.status], color:"#000000"}}
                        size="md"
                        variant="flat"
                    >
                        {statusTitleMap[application.status]}
                    </Chip>
                );
            case "actions":
                return (
                    
                        <Button className={"bg-blue-700 h-8"} isDisabled={application.status != "underReview"} color="primary" onPress={()=>popupview(application.applicationId)}>
                            Withdraw
                        </Button>
                    
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
            <Table  aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={applications}>
                    {(item) => (
                        <TableRow key={item.applicationId} className={"hover:cursor-pointer hover:bg-gray-100"} onClick={()=>{
                            window.location.href = '/candidate/applications/'+item.applicationId;
                        }}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

    );
};

export default ApplicationStatusTable;
