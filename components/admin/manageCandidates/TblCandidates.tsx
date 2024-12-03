import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useRouter } from "next/navigation";

interface Candidate {
  email: string;
  [key: string]: any; // Add other properties as needed
}

interface TblCandidatesProps {
  data: Candidate[];
}

const columns = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

export default function TblCandidate({ data }: TblCandidatesProps) {
  const router = useRouter();

  const handleRowClick = (candidateId: string) => {
    router.push(`/admin/candidate/${candidateId}`);
  };

  // Deactivate candidate
  const deActivateCandidate = (candidateId : string) => {
  
  };

  return (
    <Table aria-label="Candidates Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow
            key={item.email}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(item.candidateId)}
          >
            {(columnKey) =>
              columnKey === 'actions' ? (
                <TableCell>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Deactivate
                  </button>
                </TableCell>
              ) : (
                <TableCell>{item[columnKey as keyof Candidate]}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}