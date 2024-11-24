import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

import { Experience } from "@/types/users";

interface TblExpProps {
  data: Experience[];
}

const columns = [
  {
    key: "company",
    label: "Company",
  },
  {
    key: "position",
    label: "Position",
  },
  {
    key: "startDate",
    label: "Start Date",
  },
  {
    key: "endDate",
    label: "End Date",
  },
];

export default function TblExp({ data }: TblExpProps) {
  return (
    <Table aria-label="Experience Table" >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.company+item.endDate}>
            {(columnKey) => <TableCell>{item[columnKey as keyof Experience]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
