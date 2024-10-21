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
    SortDescriptor, useDisclosure, Modal, ModalContent, ModalHeader, Image, ModalBody, Textarea, ModalFooter, Tooltip
} from "@nextui-org/react";

// import { user} from "./data";
import {ChevronDownIcon, DeleteIcon, SearchIcon} from "@nextui-org/shared-icons";
import {Job} from "@/types/job";
import {JobListTableProps, OfferProps, RowProp, statusColorMap, statusOptions} from "@/types/offers";
import {CandidateProp, RecruiterProp} from "@/types/users";
import {ApplicationProp} from "@/types/applications";
import { toTitleCase } from "@/lib/utils";
import {formatDate, truncateString} from "@/utils/stringUtils";
import { VerticalDotsIcon } from "../recruiter/VerticalDotsIcon";
import { EyeIcon } from "../icons/settings/eyeIcon";
import { EditIcon } from "../icons/settings/editIcon";
import {IoNewspaperSharp} from "react-icons/io5";
import {MdOutlineGroupWork} from "react-icons/md";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "CANDIDATE NAME", uid: "name", sortable: true},
    {name: "JOB TITLE", uid: "title"},
    {name: "EMAIL", uid: "email"},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "OFFERED DATE", uid: "offeredDate", sortable: true },
    {name: "ACTIONS", uid: "actions"},

];

const capitalize=(str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const INITIAL_VISIBLE_COLUMNS = ["name", "title", "status", "offeredDate","actions"];


// type JobListTableProps={
//     users:User[];
// }



function mapToOfferTableRowProps(jobs,candidates:CandidateProp[],offers:OfferProps[]):RowProp[] {
    return offers.map(offer => {
        const candidate = candidates.find(r => r.candidateId === offer.candidateId)|| null; // Find matching recruiter
        const job = jobs.find(j => j.data.jobId == offer.jobId).data || null; // Find matching job
        const name=toTitleCase(candidate?.firstName+" "+candidate?.lastName)

        return {
            ...offer,
            name,
            candidate,
            job
        };
    });
}
type User = RowProp;

export default function jobListTable({offers,candidates,jobs, popup} : JobListTableProps) {
    const users=mapToOfferTableRowProps(jobs,candidates,offers);
    
    const [filterValue, setFilterValue] = React.useState("");
    
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
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
                user.name!.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
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
        return [...items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as number;
            const second = b[sortDescriptor.column as keyof User] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);


    
    const renderCell = React.useCallback((user: RowProp, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof RowProp];

        const profilePic=(user.candidate?.profilePic)?process.env.NEXT_PUBLIC_S3_URL+user.candidate?.profilePic : "/profileImages/noImage.png";

        function handleView(data: RowProp) {
            popup(data)
        }

        function handleEdit(offerId: string) {
            return undefined;
        }

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "lg", src: profilePic}}
                        description={user.candidate?.email}
                        name={user.name}
                    >
                        {user.candidate?.email}
                    </User>
                );
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{user.offerId}</p>
                    </div>
                );
            case "title":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{truncateString(toTitleCase(user.job!.title!),25)}</p>
                    </div>
                );
            case "email":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{user.candidate?.email}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize min-w-32 text-center "
                          style={{ backgroundColor: statusColorMap[user.status], color:"#000000"}}
                          size="md"
                          variant="flat">
                        {statusOptions.find(s=>s.uid==user.status)!.name}
                    </Chip>
                );
            case "offeredDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{formatDate(user.createdAt)}</p>
                        {/*<p className="text-bold text-tiny capitalize text-default-400">{user.date}</p>*/}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">


                        <Tooltip content="View the offer">
                            <div className="flex gap-4 items-center">
                                <Button  onPress={()=>handleView(user)} size={"md"} color="primary" aria-label="Like">
                                    <EyeIcon/> View
                                </Button>

                            </div>
                        </Tooltip>
                        <Tooltip content="Withdraw the offer">
                            <div className="flex gap-4 items-center">
                                <Button  onClick={()=>handleEdit(user)} size={"md"} color="primary" aria-label="Like">
                                    <EditIcon/> Withdraw
                                </Button>

                            </div>
                        </Tooltip>
                        <Tooltip content="View Application">
                            <div className="flex gap-4 items-center">
                                <Button onClick={() =>
                                    (location.href = `/recruiter/vacancy/${user.job?.jobId}/applications?applicationId=${user.application.applicationId}`)
                                } size={"md"} color="primary" aria-label="Like">
                                    <IoNewspaperSharp/> Application
                                </Button>

                            </div>
                        </Tooltip>
                        <Tooltip content="View Job Vacancy">
                            <div className="flex gap-4 items-center">
                                <Button onClick={() =>
                                    (location.href = `/jobs/${user.job?.jobId}`)
                                } size={"md"} color="primary" aria-label="Like">
                                    <MdOutlineGroupWork /> Vacancy
                                </Button>

                            </div>
                        </Tooltip>
                    </div>
                );
            default:
                return "cellValue";
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


    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])


    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
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
                        {/*<Dropdown>*/}
                        {/*    <DropdownTrigger className="hidden sm:flex">*/}
                        {/*        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">*/}
                        {/*            Columns*/}
                        {/*        </Button>*/}
                        {/*    </DropdownTrigger>*/}
                        {/*    <DropdownMenu*/}
                        {/*        disallowEmptySelection*/}
                        {/*        aria-label="Table Columns"*/}
                        {/*        closeOnSelect={false}*/}
                        {/*        selectedKeys={visibleColumns}*/}
                        {/*        selectionMode="multiple"*/}
                        {/*        onSelectionChange={setVisibleColumns}*/}
                        {/*    >*/}
                        {/*        {columns.map((column) => (*/}
                        {/*            <DropdownItem key={column.uid} className="capitalize">*/}
                        {/*                {capitalize(column.name)}*/}
                        {/*            </DropdownItem>*/}
                        {/*        ))}*/}
                        {/*    </DropdownMenu>*/}
                        {/*</Dropdown>*/}
                        {/*<Button color="primary" endContent={<PlusIcon />}>*/}
                        {/*    Add New*/}
                        {/*</Button>*/}
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
            // selectedKeys={selectedKeys}
            // selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}


        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                        className={column.uid === "date" ?"w-[100px]":""}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.offerId} >
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
