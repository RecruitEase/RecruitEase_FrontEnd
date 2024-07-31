import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

interface TblProps {
  columns: { key: string; name: string }[];
  rows: { [key: string]: string }[];
}

export default function Tbl({ columns, rows }: TblProps) {
  return (
    <Table removeWrapper aria-label="Example dynamic table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {column.key === "actions" ? (
                  <Button
                    auto
                    size="mini"
                    onClick={() => alert(`Edit row with key: ${rowIndex}`)}
                  >
                    Edit
                  </Button>
                ) : (
                  row[column.key]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
