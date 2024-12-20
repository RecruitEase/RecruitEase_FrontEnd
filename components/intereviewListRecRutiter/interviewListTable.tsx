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
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor
} from "@nextui-org/react";

import {columns, statusOptions} from "./data";
import {ChevronDownIcon, SearchIcon} from "@nextui-org/shared-icons";


const capitalize=(str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    conformed: "success",
    canceled: "danger",
    hold: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "date"];

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
    users: userDetails[];
    popup: (user: userDetails) => void;
}

export default function interviewListTable({users, popup} : JobListTableProps) {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [filterValue, setFilterValue] = React.useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rowsPerPage, setRowsPerPage] =useState(5);
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "date",
        direction: "ascending",
    });
        // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = React.useState(1);



    const hasSearchFilter = Boolean(filterValue);
        // eslint-disable-next-line react-hooks/rules-of-hooks
    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
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

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: userDetails, b: userDetails) => {
            const first = a[sortDescriptor.column as keyof userDetails] as number;
            const second = b[sortDescriptor.column as keyof userDetails] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
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

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

        // eslint-disable-next-line react-hooks/rules-of-hooks
    const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

        // eslint-disable-next-line react-hooks/rules-of-hooks
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

        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                        allowsSorting={column.sortable}
                        className={column.uid === "date" ?"w-[100px]":""}
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
