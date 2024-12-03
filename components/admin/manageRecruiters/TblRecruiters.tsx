import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useRouter } from "next/navigation";

interface recruiter {
  email: string;
  [key: string]: any; // Add other properties as needed
}

interface TblRecruitersProps {
  data: recruiter[];
}

const columns = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

export default function Tblrecruiter({ data }: TblRecruitersProps) {
  const router = useRouter();

  const handleRowClick = (recruiterId: string) => {
    router.push(`/admin/recruiter/${recruiterId}`);
  };

  
// Deactivate recruiter
  const deActivateRecruiter = (recruiterId : string) => {
  
  };

  return (
    <Table aria-label="recruiters Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow
            key={item.email}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(item.recruiterId)}
          >
            {(columnKey) =>
              columnKey === 'actions' ? (
                <TableCell>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Deactivate
                  </button>
                </TableCell>
              ) : (
                <TableCell>{item[columnKey as keyof recruiter]}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}