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
import {Experience} from "@/types/users";
import react from "react";

interface TblExpProps {
  columns: { key: string; name: string }[];
  rows: Experience[];
    setExperience: react.Dispatch<react.SetStateAction<Experience[]>>;

}

export default function TblExp({ columns, rows,setExperience }: TblExpProps) {
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
                                x.company !== row["company"] ||
                                x.position !== row["position"]
                        );
                        setExperience(newArray)
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
