"use client"
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
  SortDescriptor, Card, CardHeader, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import { PlusIcon } from "@/components/recruiter/PlusIcon";
import { VerticalDotsIcon } from "@/components/recruiter/VerticalDotsIcon";
import { ChevronDownIcon } from "@/components/recruiter/ChevronDownIcon";
import { toTitleCase as capitalize } from "@/lib/utils";
import { SearchIcon } from "@/components/recruiter/SearchIcon";
import Link from "next/link";

const columns = [
  { name: "Ticket Id", uid: "ticketId" },
  { name: "Subject", uid: "subject" },
  { name: "Type", uid: "type" },
  { name: "Date", uid: "date", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Under Review", uid: "underReview" },
  { name: "Rejected", uid: "rejected" },
  { name: "Resolved", uid: "resolved" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  resolved: "success",
  rejected: "danger",
  underReview: "warning"
};


const users = [
  {
    id: 1,
    ticketId: 11212121,
    subject: "Payment Issue",
    type: "Job Offer",
    date: "2024/12/12",
    status: "underReview"
  },
  {
    id: 2,
    ticketId: 34567231,
    subject: "Software Bug",
    type: "Support",
    date: "2024/03/05",
    status: "rejected"
  },
  {
    id: 3,
    ticketId: 98234765,
    subject: "New Feature Request",
    type: "Feature",
    date: "2024/06/10",
    status: "resolved"
  },
  {
    id: 4,
    ticketId: 45671234,
    subject: "Marketing Campaign",
    type: "Inquiry",
    date: "2024/07/15",
    status: "underReview"
  },
  {
    id: 5,
    ticketId: 78923456,
    subject: "Sales Performance",
    type: "Report",
    date: "2024/02/20",
    status: "resolved"
  },
  {
    id: 6,
    ticketId: 12347890,
    subject: "Product Launch",
    type: "Update",
    date: "2024/05/25",
    status: "resolved"
  },
  {
    id: 7,
    ticketId: 98765432,
    subject: "Design Approval",
    type: "Approval",
    date: "2024/04/30",
    status: "underReview"
  },
  {
    id: 8,
    ticketId: 23456789,
    subject: "HR Policies",
    type: "Inquiry",
    date: "2024/01/12",
    status: "resolved"
  },
  {
    id: 9,
    ticketId: 87654321,
    subject: "Budget Planning",
    type: "Report",
    date: "2024/09/14",
    status: "rejected"
  },
  {
    id: 10,
    ticketId: 19283746,
    subject: "Operational Efficiency",
    type: "Report",
    date: "2024/11/19",
    status: "resolved"
  },
  {
    id: 11,
    ticketId: 56789012,
    subject: "Development Update",
    type: "Update",
    date: "2024/08/08",
    status: "resolved"
  },
  {
    id: 12,
    ticketId: 34567890,
    subject: "Product Review",
    type: "Review",
    date: "2024/07/22",
    status: "underReview"
  },
  {
    id: 13,
    ticketId: 90817234,
    subject: "Security Audit",
    type: "Audit",
    date: "2024/03/14",
    status: "resolved"
  },
  {
    id: 14,
    ticketId: 31415926,
    subject: "Marketing Strategy",
    type: "Plan",
    date: "2024/10/01",
    status: "resolved"
  },
  {
    id: 15,
    ticketId: 27182818,
    subject: "IT Infrastructure",
    type: "Support",
    date: "2024/11/15",
    status: "underReview"
  },
  {
    id: 16,
    ticketId: 16180339,
    subject: "Sales Targets",
    type: "Report",
    date: "2024/12/05",
    status: "resolved"
  },
  {
    id: 17,
    ticketId: 70710678,
    subject: "Data Analysis",
    type: "Report",
    date: "2024/08/26",
    status: "resolved"
  },
  {
    id: 18,
    ticketId: 14142135,
    subject: "Quality Assurance",
    type: "Report",
    date: "2024/09/09",
    status: "resolved"
  },
  {
    id: 19,
    ticketId: 57721566,
    subject: "System Administration",
    type: "Support",
    date: "2024/10/18",
    status: "underReview"
  },
  {
    id: 20,
    ticketId: 98765432,
    subject: "Operations Coordination",
    type: "Task",
    date: "2024/11/22",
    status: "resolved"
  }
];

const ticketDetails = [{ type: "Job offer", jobTitle: "Software Engineer", subject: "Payment Issue", description: "Payment issue with the job offer. I am experiencing a problem with the user login functionality on our website. After entering valid credentials and clicking the button, the page attempts to load but eventually times out, returning a  error. " }];

const INITIAL_VISIBLE_COLUMNS = ["ticketId", "subject", "date", "status", "type"];

type User = typeof users[0];

export default function TicketTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
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
        user.subject.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      console.log(filteredUsers);
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
      case "status":
        return (
          <Chip className="capitalize min-w-24 text-center" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
            placeholder="Search by subject..."
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
                    {capitalize(status.name)}
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
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} as={Link} href={"/candidate/tickets/create"}>
              Add New
            </Button>
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
    <>
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
        // onSelectionChange={setSelectedKeys}
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
            <TableRow key={item.id} className="cursor-pointer hover:bg-gray-200" onClick={onOpen}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-extrabold">Ticket Details</ModalHeader>
              <ModalBody>
                {ticketDetails.map((item) => (
                  <div>
                    <div className="mb-2 font-bold">Subject : {item.subject}</div>
                    <div className="flex mb-2 w-full">
                      <div><p className="font-semibold">Ticket Type:</p>{item.type}</div>
                      <div className=" ml-4"><p className="font-semibold">Job Title:</p>{item.jobTitle}</div>
                    </div>
                    <div><p className=" font-semibold">Description:</p></div>
                    <div>{item.description}</div>
                    {/* <div><p className=" font-semibold">Resolved Note:</p></div>
                    <div>{item.note}</div> */}
                  </div>
                ))}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  );



}
