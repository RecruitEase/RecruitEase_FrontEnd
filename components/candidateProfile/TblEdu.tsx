import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

import { Education } from "@/types/users";

interface TblEduProps {
  data: Education[];
}

const columns = [
  {
    key: "school",
    label: "School",
  },
  {
    key: "degree",
    label: "Degree",
  },
  {
    key: "fieldOfStudy",
    label: "Field of Study",
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

export default function TblEdu({ data }: TblEduProps) {
  return (
    <Table aria-label="Education Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.school+item.endDate}>
            {(columnKey) => <TableCell>{item[columnKey as keyof Education]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
