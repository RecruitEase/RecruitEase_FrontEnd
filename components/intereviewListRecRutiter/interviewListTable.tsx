"use client"
import React, {useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor, useDisclosure, Modal, ModalContent, ModalHeader, Image, ModalBody, Textarea, ModalFooter
} from "@nextui-org/react";

import {columns, statusOptions} from "./data";
import {ChevronDownIcon, SearchIcon} from "@nextui-org/shared-icons";
import {ApplicationProp} from "@/types/applications";
import {CandidateProp, RecruiterProp} from "@/types/users";
import {InterviewProp} from "@/types/interviews";
import {JobProps} from "@/types";


const capitalize=(str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    conformed: "success",
    canceled: "danger",
    hold: "warning",
};

function mapToInterviewsTableRowProps(applications:ApplicationProp[],interviews:InterviewProp[],candidates:CandidateProp[]) {
    return interviews.map(interview => {
        const application = applications.find(a => a.applicationId === interview.applicationId)|| null;
        const candidate = candidates.find(c => c.candidateId == interviews.candidateId) || null; // Find matching job

        return {
            ...interviews,
            application,
            candidate
        };
    });
}


const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "date"];

type userDetails = {
    id: number;
    name: string;
    email: string;
    role: string;
    team: string;
    status: string;
    date: string;
    time:string;
    avatar: string;
    type: string;
    location: string;
    link:string;
    description: string;
};

interface JobListTableProps {
    candidates:CandidateProp[],
    applications:ApplicationProp[],
    interviews:InterviewProp[];
    popup: (user: userDetails) => void;
}

export default function InterviewListTable({candidates,applications,interviews, popup} : JobListTableProps) {

    const users = mapToInterviewsTableRowProps(applications,interviews,candidates)
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);
    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.candidate?.firstName.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.application?.status),
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: userDetails | null, b: userDetails | null) => {
            // Handle null or undefined items
            if (!a || !b) {
                return 0;
            }

            const firstValue = a[sortDescriptor.column as keyof userDetails];
            const secondValue = b[sortDescriptor.column as keyof userDetails];

            const first = typeof firstValue === 'string' ? firstValue.toLowerCase() : firstValue;
            const second = typeof secondValue === 'string' ? secondValue.toLowerCase() : secondValue;

            if (typeof first === 'number' && typeof second === 'number') {
                const cmp = first < second ? -1 : first > second ? 1 : 0;
                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            } else if (typeof first === 'string' && typeof second === 'string') {
                const cmp = first.localeCompare(second);
                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            } else {
                return 0;
            }
        });
    }, [sortDescriptor, items]);


    const renderCell = React.useCallback((user: userDetails, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof userDetails];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "lg", src: user.avatar}}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize min-w-[100px] text-center" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        {/*<p className="text-bold text-tiny capitalize text-default-400">{user.date}</p>*/}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);


    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3 ">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users.length} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        users.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}

            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            onRowAction={(key) => {
                const user = sortedItems.find(item => item.id.toString() === key.toString());
                console.log(user);
                if (user) {
                    popup(user);
                }
            }}

        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "status" ? "center" : "start"}
                        allowsSorting={column.sortable}
                        className={column.uid === "name" ?"":"w-[200px]"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id} className={"hover:cursor-pointer hover:bg-gray-100"}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
