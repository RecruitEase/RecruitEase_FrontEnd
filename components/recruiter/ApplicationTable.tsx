import React, { useEffect } from "react";
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
    SortDescriptor
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {toTitleCase as capitalize, toTitleCase} from "@/lib/utils";
import {SearchIcon} from "@/components/recruiter/SearchIcon";
import {ApplicationProp} from "@/types/applications";
import {Job} from "@/types/job";
import {CandidateProp, RecruiterProp} from "@/types/users";
import {formatDate} from "@/utils/stringUtils";

//data....................................................

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: true},
    // {name: "EMAIL", uid: "email"},
    {name: "APPLIED DATE", uid: "appliedDate"},
];

const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];

function mapToApplicationTableRowProps(applications:ApplicationProp[],candidates:CandidateProp[]) {
    return applications.map(application => {
        const candidate = candidates.find(r => r.candidateId === application.candidateId)|| null; // Find matching recruiter

        return {
            ...application,
            candidate
        };
    });
}

// const users = [
//     {
//         id: 1,
//         name: "Tony Reichert",
//         role: "CEO",
//         team: "Management",
//         status: "active",
//         age: "29",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//         email: "tony.reichert@example.com",
//     },
//     {
//         id: 2,
//         name: "Zoey Lang",
//         role: "Tech Lead",
//         team: "Development",
//         status: "paused",
//         age: "25",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//         email: "zoey.lang@example.com",
//     },
//     {
//         id: 3,
//         name: "Jane Fisher",
//         role: "Sr. Dev",
//         team: "Development",
//         status: "active",
//         age: "22",
//         avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//         email: "jane.fisher@example.com",
//     },
//     {
//         id: 4,
//         name: "William Howard",
//         role: "C.M.",
//         team: "Marketing",
//         status: "vacation",
//         age: "28",
//         avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//         email: "william.howard@example.com",
//     },
//     {
//         id: 5,
//         name: "Kristen Copper",
//         role: "S. Manager",
//         team: "Sales",
//         status: "active",
//         age: "24",
//         avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//         email: "kristen.cooper@example.com",
//     },
//     {
//         id: 6,
//         name: "Brian Kim",
//         role: "P. Manager",
//         team: "Management",
//         age: "29",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//         email: "brian.kim@example.com",
//         status: "Active",
//     },
//     {
//         id: 7,
//         name: "Michael Hunt",
//         role: "Designer",
//         team: "Design",
//         status: "paused",
//         age: "27",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
//         email: "michael.hunt@example.com",
//     },
//     {
//         id: 8,
//         name: "Samantha Brooks",
//         role: "HR Manager",
//         team: "HR",
//         status: "active",
//         age: "31",
//         avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
//         email: "samantha.brooks@example.com",
//     },
//     {
//         id: 9,
//         name: "Frank Harrison",
//         role: "F. Manager",
//         team: "Finance",
//         status: "vacation",
//         age: "33",
//         avatar: "https://i.pravatar.cc/150?img=4",
//         email: "frank.harrison@example.com",
//     },
//     {
//         id: 10,
//         name: "Emma Adams",
//         role: "Ops Manager",
//         team: "Operations",
//         status: "active",
//         age: "35",
//         avatar: "https://i.pravatar.cc/150?img=5",
//         email: "emma.adams@example.com",
//     },
//     {
//         id: 11,
//         name: "Brandon Stevens",
//         role: "Jr. Dev",
//         team: "Development",
//         status: "active",
//         age: "22",
//         avatar: "https://i.pravatar.cc/150?img=8",
//         email: "brandon.stevens@example.com",
//     },
//     {
//         id: 12,
//         name: "Megan Richards",
//         role: "P. Manager",
//         team: "Product",
//         status: "paused",
//         age: "28",
//         avatar: "https://i.pravatar.cc/150?img=10",
//         email: "megan.richards@example.com",
//     },
//     {
//         id: 13,
//         name: "Oliver Scott",
//         role: "S. Manager",
//         team: "Security",
//         status: "active",
//         age: "37",
//         avatar: "https://i.pravatar.cc/150?img=12",
//         email: "oliver.scott@example.com",
//     },
//     {
//         id: 14,
//         name: "Grace Allen",
//         role: "M. Specialist",
//         team: "Marketing",
//         status: "active",
//         age: "30",
//         avatar: "https://i.pravatar.cc/150?img=16",
//         email: "grace.allen@example.com",
//     },
//     {
//         id: 15,
//         name: "Noah Carter",
//         role: "IT Specialist",
//         team: "I. Technology",
//         status: "paused",
//         age: "31",
//         avatar: "https://i.pravatar.cc/150?img=15",
//         email: "noah.carter@example.com",
//     },
//     {
//         id: 16,
//         name: "Ava Perez",
//         role: "Manager",
//         team: "Sales",
//         status: "active",
//         age: "29",
//         avatar: "https://i.pravatar.cc/150?img=20",
//         email: "ava.perez@example.com",
//     },
//     {
//         id: 17,
//         name: "Liam Johnson",
//         role: "Data Analyst",
//         team: "Analysis",
//         status: "active",
//         age: "28",
//         avatar: "https://i.pravatar.cc/150?img=33",
//         email: "liam.johnson@example.com",
//     },
//     {
//         id: 18,
//         name: "Sophia Taylor",
//         role: "QA Analyst",
//         team: "Testing",
//         status: "active",
//         age: "27",
//         avatar: "https://i.pravatar.cc/150?img=29",
//         email: "sophia.taylor@example.com",
//     },
//     {
//         id: 19,
//         name: "Lucas Harris",
//         role: "Administrator",
//         team: "Information Technology",
//         status: "paused",
//         age: "32",
//         avatar: "https://i.pravatar.cc/150?img=50",
//         email: "lucas.harris@example.com",
//     },
//     {
//         id: 20,
//         name: "Mia Robinson",
//         role: "Coordinator",
//         team: "Operations",
//         status: "active",
//         age: "26",
//         avatar: "https://i.pravatar.cc/150?img=45",
//         email: "mia.robinson@example.com",
//     },
// ];


//data end.......................................


const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};


const INITIAL_VISIBLE_COLUMNS = ["name", "appliedDate"];


export default function ApplicationTable({applications,candidates,setSelectedApplication}:{  applications: ApplicationProp[],candidates: CandidateProp[],setSelectedApplication:React.Dispatch<React.SetStateAction<ApplicationProp | null>>}) {

    const users=mapToApplicationTableRowProps(applications,candidates)
    type User = typeof users[0];

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
                user.candidate!.firstName.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status!),
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

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];
        const profilePic=(user.candidate!.profilePic)?process.env.NEXT_PUBLIC_S3_URL+user.candidate!.profilePic : "/profileImages/noImage.png"
        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "lg", src: profilePic}}
                        description={user.candidate!.email}
                        name={toTitleCase(user.candidate!.firstName+" "+user.candidate!.lastName)}
                    >
                        {user.candidate!.email}
                    </User>
                );
            case "appliedDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{formatDate(user.createdAt!)}</p>
                    </div>
                );
            // case "status":
            //     return (
            //         <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            //             {cellValue}
            //         </Chip>
            //     );

            default:
                return "";
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
                    {/*<div className="flex gap-3">*/}
                    {/*    <Dropdown>*/}
                    {/*        <DropdownTrigger className="hidden sm:flex">*/}
                    {/*            <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">*/}
                    {/*                Status*/}
                    {/*            </Button>*/}
                    {/*        </DropdownTrigger>*/}
                    {/*        <DropdownMenu*/}
                    {/*            disallowEmptySelection*/}
                    {/*            aria-label="Table Columns"*/}
                    {/*            closeOnSelect={false}*/}
                    {/*            selectedKeys={statusFilter}*/}
                    {/*            selectionMode="multiple"*/}
                    {/*            onSelectionChange={setStatusFilter}*/}
                    {/*        >*/}
                    {/*            {statusOptions.map((status) => (*/}
                    {/*                <DropdownItem key={status.uid} className="capitalize">*/}
                    {/*                    {capitalize(status.name)}*/}
                    {/*                </DropdownItem>*/}
                    {/*            ))}*/}
                    {/*        </DropdownMenu>*/}
                    {/*    </Dropdown>*/}
                    {/*    <Dropdown>*/}
                    {/*        <DropdownTrigger className="hidden sm:flex">*/}
                    {/*            <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">*/}
                    {/*                Columns*/}
                    {/*            </Button>*/}
                    {/*        </DropdownTrigger>*/}
                    {/*        <DropdownMenu*/}
                    {/*            disallowEmptySelection*/}
                    {/*            aria-label="Table Columns"*/}
                    {/*            closeOnSelect={false}*/}
                    {/*            selectedKeys={visibleColumns}*/}
                    {/*            selectionMode="multiple"*/}
                    {/*            onSelectionChange={setVisibleColumns}*/}
                    {/*        >*/}
                    {/*            {columns.map((column) => (*/}
                    {/*                <DropdownItem key={column.uid} className="capitalize">*/}
                    {/*                    {capitalize(column.name)}*/}
                    {/*                </DropdownItem>*/}
                    {/*            ))}*/}
                    {/*        </DropdownMenu>*/}
                    {/*    </Dropdown>*/}

                    {/*</div>*/}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users.length} applications</span>
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
            <div className="py-2 px-2 flex flex-col justify-between items-center">
        <span className="w-[100%] text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
                <div className={"py-2 px-2 flex justify-between items-center"}>
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
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    useEffect(() => {
        console.log("selected",Array.from(selectedKeys)[0])
        const selectedApp=applications.find(app=>app.applicationId==Array.from(selectedKeys)[0])
        setSelectedApplication(selectedApp||null)
    }, [selectedKeys]);
    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="single"
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
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No applications found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.applicationId}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
