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
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { vacancyColumns, vacancyStatusOptions, vacancies } from "./data";
import { capitalize } from "@/utils/stringUtils";
import { IoNewspaperSharp } from "react-icons/io5";

const statusColorMap: Record<string, ChipProps["color"]> = {
  live: "success",
  archived: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "title",
  "applications",
  "createdDate",
  "status",
  "actions",
];

type Vacancy = (typeof vacancies)[0];

const VacancyTable = ({ filter }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>(
    new Set(["all"])
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(vacancies.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return vacancyColumns;

    return vacancyColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredVacancies = [...vacancies];

    if (hasSearchFilter) {
      filteredVacancies = filteredVacancies.filter((vacancy) =>
        vacancy.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
if(filter) {
  if (filter.job !== "All") {
    filteredVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.title === filter.job
    );
  }

  if (filter.type !== "All") {
    filteredVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.type === filter.type
    );
  }

  if (filter.fromDate) {
    filteredVacancies = filteredVacancies.filter(
        (vacancy) => new Date(vacancy.createdDate) >= new Date(filter.fromDate)
    );
  }

  if (filter.toDate) {
    filteredVacancies = filteredVacancies.filter(
        (vacancy) => new Date(vacancy.createdDate) <= new Date(filter.toDate)
    );
  }
}
    if (statusFilter.has("all")) {
      return filteredVacancies; // If "all" is selected, do not filter by status
    } else {
      filteredVacancies = filteredVacancies.filter((vacancy) =>
        Array.from(statusFilter).includes(vacancy.status)
      );
    }

    return filteredVacancies;
  }, [vacancies, filterValue, filter, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Vacancy, b: Vacancy) => {
      const first = a[sortDescriptor.column as keyof Vacancy];
      const second = b[sortDescriptor.column as keyof Vacancy];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (vacancy: Vacancy, columnKey: string) => {
      const cellValue = vacancy[columnKey as keyof Vacancy];

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-medium">{cellValue}</p>
              {/* <p className="text-bold text-tiny text-default-500">ID</p> */}
            </div>
          );
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-medium">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip color={statusColorMap[cellValue]} size="md">
              {capitalize(cellValue.toString())}
            </Chip>
          );
        case "applications":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-medium">{cellValue}</p>
            </div>
          );
        case "createdDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-medium">{cellValue}</p>
            </div>
          );
        case "lastUpdated":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-medium">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="flex flex-row gap-4">
              <div
                onClick={() => (location.href = `/recruiter/vacancy/123/edit`)}
                className="cursor-pointer"
              >
                <CiEdit />
              </div>
              <div
                onClick={() =>
                  (location.href = `/recruiter/vacancy/123/applications`)
                }
                className="cursor-pointer"
              >
                <IoNewspaperSharp />
              </div>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="md"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-medium" />}
                  size="md"
                  variant="flat"
                >
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
                {vacancyStatusOptions.map((status) => (
                  <DropdownItem key={status.key} className="capitalize">
                    {capitalize(status.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-medium" />}
                  size="md"
                  variant="flat"
                >
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
                {vacancyColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-medium">
            Total {vacancies.length} items
          </span>
          <label className="flex items-center text-default-400 text-medium">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-medium"
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
    vacancies.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-medium text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
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
      <TableBody emptyContent={"No vacancies posted"} items={sortedItems}>
        {(item) => (
          <TableRow className="cursor-pointer hover:bg-gray-100" key={item.id}>
            {(columnKey) => (
              <TableCell >{renderCell(item, columnKey.toString())}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default VacancyTable;
