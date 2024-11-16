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
import {Education} from "@/types/users";
import react from "react";

interface TblProps {
  columns: { key: string; name: string }[];
  rows: Education[];
    setEducation: react.Dispatch<react.SetStateAction<Education[]>>;

}

export default function Tbl({ columns, rows,setEducation }: TblProps) {
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
                    onClick={()=>{
                        const newArray = rows.filter(
                            (x) =>
                                x.school !== row["school"] ||
                                x.degree !== row["degree"]
                        );
                        console.log("Dedwdw",newArray)
                        setEducation(newArray)
                    }}
                  >
                    Delete
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
