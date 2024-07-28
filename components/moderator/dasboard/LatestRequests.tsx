"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Pagination,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import Link from "next/link";

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "TICKET ID", uid: "ticketId", sortable: true },
  { name: "SUBJECT", uid: "subject" },
  { name: "STATUS", uid: "status", sortable: true },
];

const users = [
  {
    name: "John Doe",
    ticketId: "TICKET-123",
    subject: "Need help with my account",
    status: "Resolved",
  },
  {
    name: "Jane Doe",
    ticketId: "TICKET-124",
    subject: "Need help with my account",
    status: "Rejected",
  },
  {
    name: "John Doe",
    ticketId: "TICKET-125",
    subject: "Need help with my account",
    status: "UnderReview",
  },
  {
    name: "Jane Doe",
    ticketId: "TICKET-126",
    subject: "Need help with my account",
    status: "Resolved",
  },
  {
    name: "John Doe",
    ticketId: "TICKET-127",
    subject: "Need help with my account",
    status: "Rejected",
  },
  {
    name: "Jane Doe",
    ticketId: "TICKET-128",
    subject: "Need help with my account",
    status: "UnderReview",
  },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  Resolved: "success",
  Rejected: "danger",
  UnderReview: "warning",
};

const INITIAL_VISIBLE_COLUMNS = new Set(columns.map((column) => column.uid));

type User = (typeof users)[0];

export default function MTicketsTable() {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "status",
    direction: "ascending",
  });

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) => INITIAL_VISIBLE_COLUMNS.has(column.uid));
  }, []);

  const sortedItems = React.useMemo(() => {
    return [...users].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User];
      const second = b[sortDescriptor.column as keyof User];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "name":
        return (
          <User
            // avatarProps={{ radius: "lg", src: user.avatar }} // Uncomment if you have avatars
            name={cellValue as string}
          >
            {/* {user.email} */}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize w-10"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue as string;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
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
            key={item.ticketId}
            className="cursor-pointer hover:bg-gray-200"
            as={Link}
            href={"/moderator/tickets/details"}
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
