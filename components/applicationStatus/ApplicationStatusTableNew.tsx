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
import { title } from '../primitives';
import {ApplicationProp} from "@/types/applications";
import {RecruiterProp} from "@/types/users";



interface ApplicationStatusTableProps {
  applications: ApplicationProp[];
  jobs: JobProps[];
  recruiters: RecruiterProp[];
}



const columns = [
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





















const INITIAL_VISIBLE_COLUMNS:string[] = ["title","date"];

// type User = typeof users[0];
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
export default function ApplicationStatusTableNew({ applications,jobs,recruiters }:ApplicationStatusTableProps) {
  const combinedList:ApplicationTableRowProp[] =[
    {
        "applicationId": "3d0ff653-7efe-4843-bc1c-b74bd7cb3f4b",
        "candidateId": "3b0334d9-4464-4e7d-9d05-a2859a5a583a",
        "jobId": "xyz",
        "cvId": "zyx",
        "recruiterId": "33d27ee6-86e8-4a13-b6ae-1ff8fb51daba",
        "status": "archived",
        "coverLetter": "I am excited to apply for this position because...",
        "score": 85,
        "answers": "answer1, answer2, answer3",
        "createdAt": "2024-08-18T17:02:42.248331",
        "recruiter": {
            "id": "e7984f26-9ea7-43e7-84c0-50ab4942f8ca",
            "email": "recruiter@recruitease.lk",
            "role": "recruiter",
            "isActive": true,
            "createdAt": "2024-08-18T14:14:13.975163",
            "firstName": "Chathura",
            "lastName": "Lakshan",
            "profilePic": "/profileImages/noImage.png",
            "recruiterId": "33d27ee6-86e8-4a13-b6ae-1ff8fb51daba",
            "companyName": "ChathuraLakshan Inc.",
            "city": "Colombo",
            "gender": "Male",
            "address": "456 Corporate Ave, Business City, USA",
            "businessRegistrationNumber": "abc123",
            "website": null
        },
        "job": {
            "jobId": "xyz",
            "logo": "https://example.com/logo.png",
            "title": "Software Engineer",
            "company": "TechCorp",
            "location": "New York, NY",
            "type": "Full-time",
            "daysLeft": "5 days left"
        }
    },
    {
        "applicationId": "92f80e05-2ed7-4af3-bf53-13123846275e",
        "candidateId": "3b0334d9-4464-4e7d-9d05-a2859a5a583a",
        "jobId": "zxyz",
        "cvId": "zyxz",
        "recruiterId": "33d27ee6-86e8-4a13-b6ae-1ff8fb51daba",
        "status": "withdrawn",
        "coverLetter": "I am excited to apply for this position because...",
        "score": 85,
        "answers": "answer1, answer2, answer3",
        "createdAt": "2024-08-18T18:43:27.419755",
        "recruiter": {
            "id": "e7984f26-9ea7-43e7-84c0-50ab4942f8ca",
            "email": "recruiter@recruitease.lk",
            "role": "recruiter",
            "isActive": true,
            "createdAt": "2024-08-18T14:14:13.975163",
            "firstName": "Chathura",
            "lastName": "Lakshan",
            "profilePic": "/profileImages/noImage.png",
            "recruiterId": "33d27ee6-86e8-4a13-b6ae-1ff8fb51daba",
            "companyName": "ChathuraLakshan Inc.",
            "city": "Colombo",
            "gender": "Male",
            "address": "456 Corporate Ave, Business City, USA",
            "businessRegistrationNumber": "abc123",
            "website": null
        },
        "job": {
            "jobId": "zxyz",
            "logo": "https://example.com/logo.png",
            "title": "Software Engineer",
            "company": "TechCorp",
            "location": "New York, NY",
            "type": "Full-time",
            "daysLeft": "5 days left"
        }
    }
]
  // const combinedList:ApplicationTableRowProp[] = mapToApplicationTableRowProps(applications,jobs,recruiters);
  console.log("csdes",combinedList)
  


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
    let filteredUsers = [...combinedList];

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
  }, [applications, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ApplicationTableRowProp, b: ApplicationTableRowProp) => {
      const first = a[sortDescriptor.column as keyof ApplicationTableRowProp] as string;
      const second = b[sortDescriptor.column as keyof ApplicationTableRowProp] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((application: ApplicationTableRowProp, columnKey: React.Key) => {
    const cellValue = application[columnKey as keyof ApplicationTableRowProp];

    switch (columnKey) {
      case "position":
                
                    
                    return (

                    <User
                        avatarProps={{radius: "lg", src: application.recruiter?.profilePic}}
                        description={application.recruiter?.companyName}
                        name={cellValue as string}

                    >
                        {application.recruiter?.companyName}
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
            placeholder="Search by name..."
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
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {applications.length} applications</span>
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
    applications.length,
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
      selectedKeys={selectedKeys}
      selectionMode="none"
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
      <TableBody emptyContent={"No users found"} items={combinedList}>
        {(item) => (
          <TableRow key={item.applicationId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
