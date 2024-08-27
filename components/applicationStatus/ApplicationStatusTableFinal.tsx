import React from "react";
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
import { VerticalDotsIcon } from "../recruiter/VerticalDotsIcon";
import { SearchIcon } from "../icons";
import { ChevronDownIcon } from "../recruiter/ChevronDownIcon";
import { toTitleCase } from "@/lib/utils";
import { PlusIcon } from "../recruiter/PlusIcon";
import {  JobProps } from "@/types";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import {ApplicationProp} from "@/types/applications";
import {RecruiterProp} from "@/types/users";
import { useWithdrawApplication } from "@/lib/hooks/useApplications";




const columns = [
  {name: "RECRUITER", uid: "recruiter", sortable: true},
  {name: "POSITION", uid: "title", sortable: true},
  {name: "DATE", uid: "date", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];


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


const statusOptions = [
  { name: "Under Review", uid: "underReview" },
  { name: "Withdrawn", uid: "withdrawn" },
  { name: "Shortlisted", uid: "shortlisted" },
  { name: "Interview Scheduled", uid: "interviewScheduled" },
  { name: "Interviewed", uid: "interviewed" },  // You might want to assign the same color as "Shortlisted"
  { name: "Offered", uid: "offered" },
  { name: "Hired", uid: "hired" },         // Same color as "Offered"
  { name: "Rejected", uid: "rejected" },
  { name: "Archived", uid: "archived" },
];

const INITIAL_VISIBLE_COLUMNS = ["recruiter", "status", "actions","date","title"];

type User = ApplicationTableRowProp;
interface ApplicationStatusTableProps {
  applications: ApplicationProp[];
  jobs: JobProps[];
  recruiters: RecruiterProp[];
}


interface ApplicationTableRowProp extends ApplicationProp {
  recruiter:RecruiterProp | null;
  job:JobProps | null;
}


function mapToApplicationTableRowProps(applications:ApplicationProp[],jobs:JobProps[],recruiters:RecruiterProp[]): ApplicationTableRowProp[] {
  return applications.map(application => {
    const recruiter = recruiters.find(r => r.recruiterId === application.recruiterId)|| null; // Find matching recruiter
    const job = jobs.find(j => j.jobId == application.jobId) || null; // Find matching job

    return {
      ...application,
      recruiter,
      job
    };
  });
}

export default function ApplicationStatusTableFinal({ applications,jobs,recruiters }:ApplicationStatusTableProps) {
  const users= mapToApplicationTableRowProps(applications,jobs,recruiters);

  const withdrawApplicationMutation=useWithdrawApplication();
  const popupview = (applicationId:string) => {
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
              withdrawApplicationMutation.mutate(applicationId);
              
          }
      });
  };

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
        user.job?.title.toLowerCase().includes(filterValue.toLowerCase()),
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

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "recruiter":
        return (
          <User
            avatarProps={{radius: "lg", src: user.recruiter?.profilePic}}
            description={user.recruiter?.email}
            name={user.recruiter?.companyName}
          />
        );
        case "title":

        return (
          <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{toTitleCase(user.job?.title || "")}</p>
            </div>
        );
      case "date":
        const date = new Date(user.createdAt);

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
              style={{ backgroundColor: statusColorMap[user.status], color:"#000000"}}
              size="md"
              variant="flat"
          >
              {statusTitleMap[user.status]}
          </Chip>
      );
      case "actions":
          return (
              
          <div>
            <Button className={"bg-blue-700 h-8 mx-1"} isDisabled={user.status != "underReview"} color="primary" onPress={()=>popupview(user.applicationId)}>
                Withdraw
            </Button>
                        <Button className={"bg-blue-700 h-8 mx-1"}  color="primary" as={Link} href={`/candidate/applications/${user.applicationId}`} >
                        View
                    </Button>
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
            placeholder="Search by position..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
                    {toTitleCase(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {toTitleCase(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button> */}
          </div>
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
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {/* {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`} */}
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
      selectedKeys={selectedKeys}
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
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.applicationId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
