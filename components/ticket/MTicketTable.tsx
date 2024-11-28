"use client";
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
  SortDescriptor,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/recruiter/PlusIcon";
import { VerticalDotsIcon } from "@/components/recruiter/VerticalDotsIcon";
import { ChevronDownIcon } from "@/components/recruiter/ChevronDownIcon";
import { toTitleCase as capitalize } from "@/lib/utils";
import { SearchIcon } from "@/components/recruiter/SearchIcon";
import Link from "next/link";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { formatDate } from "@/utils/stringUtils";
import LoadingComponent from "@/components/LoadingComponent";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DELAY", uid: "delay", sortable: true },
  { name: "TICKET ID", uid: "ticketId", sortable: true },
  { name: "SUBJECT", uid: "subject" },
  { name: "TYPE", uid: "type" },
  { name: "DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
];

const statusOptions = [
  { name: "Resolved", uid: "Resolved" },
  { name: "Rejected", uid: "Rejected" },
  { name: "UnderReview", uid: "UnderReview" },
];

interface UserData {
  id: number;
  delay: string;
  ticketId: string;
  subject: string;
  type: string;
  date: string;
  status: string;
  name: string;
  avatar: string;
  description: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  RESOLVED: "success",
  REJECTED: "danger",
  UNDER_REVIEW: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "ticketId", "date", "status"];

export default function MTicketsTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
      new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "delay",
    direction: "ascending",
  });
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [lording,setLording] = React.useState(false)

  const axios = useAxiosAuth();


  function getTickets() {
    return axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticket/getall`)
        .then((response) => response.data.content)
        .catch((error) => {
          console.error("Error fetching tickets", error);
          return [];
        });
  }

  function getUserData(userId: string, role: string) {
    const url =
        role === "RECRUITER"
            ? `${process.env.NEXT_PUBLIC_API_URL}/user/recruiter/${userId}`
            : `${process.env.NEXT_PUBLIC_API_URL}/user/candidate/${userId}`;
    return axios
        .get(url)
        .then((response) => response.data.content)
        .catch((error) => {
          console.error("Error fetching user data", error);
          return null;
        });
  }

  React.useEffect(() => {
    setLording(true)
    getTickets()
        .then((tickets) => {
          const userData = tickets.map((ticket: any) =>
              getUserData(ticket.creatorId, ticket.creatorRole).then((userDetails) => ({
                ticket,
                userDetails,
              }))
          );
          return Promise.all(userData);
        })
        .then((results) => {
          const mergedData: UserData[] = results
              .map(({ ticket, userDetails },index) => {
                if (!userDetails) return null;
                return {
                  id: index,
                  delay: "", // Adjust with proper logic for delay calculation
                  ticketId: ticket.ticketId,
                  subject: ticket.subject,
                  type: ticket.type,
                  date: ticket.createdAt,
                  status: ticket.status,
                  name: `${userDetails.firstName} ${userDetails.lastName}`,
                  avatar: userDetails.profilePic !=""?process.env.NEXT_PUBLIC_S3_URL+userDetails.profilePic : "/profileImages/noImage.png",
                  description: ticket.description,
                };
              })
              .filter((data): data is UserData => data !== null);
          setUsers(mergedData);
          setLording(false)
        });
  }, []);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = users || [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.status)
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
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof UserData] as string | number;
      const second = b[sortDescriptor.column as keyof UserData] as string | number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: UserData, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserData];

    switch (columnKey) {
      case "name":
        return (
            <User avatarProps={{ radius: "lg", src: user.avatar }} name={cellValue}>
              {/* Additional info if needed */}
            </User>
        );
      case "status":
        return (
            <Chip
                className="capitalize min-w-24 text-center"
                color={statusColorMap[user.status]}
                size="sm"
                variant="flat"
            >
              {cellValue}
            </Chip>
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
              {/* <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button> */}
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
          classNames={{ wrapper: "max-h-[382px]" }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
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
                <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-200"
                    as={Link}
                    href={"/moderator/tickets/" + item.ticketId}
                >
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
            )}
          </TableBody>

      </Table>
  );
}
