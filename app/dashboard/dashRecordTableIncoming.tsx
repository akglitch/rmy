import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { RecordData } from '../types'; // Ensure this path is correct

interface RecordsTableProps {
  records: RecordData[];
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Year</TableCell>
          <TableCell>Month</TableCell>
          <TableCell>Date Received</TableCell>
          <TableCell>Log Time</TableCell>
          <TableCell>Serial No</TableCell>
          <TableCell>From Whom Received</TableCell>
          <TableCell>Date of Letter</TableCell>
          <TableCell>Letter Ref No</TableCell>
          <TableCell>Received By</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell align="right">Letter Ref No</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record._id}>
            <TableCell>{record.year}</TableCell>
            <TableCell>{record.month}</TableCell>
            <TableCell>{record.date_received}</TableCell>
            <TableCell>{record.log_time}</TableCell>
            <TableCell>{record.serial_no}</TableCell>
            <TableCell>{record.from_whom_received}</TableCell>
            <TableCell>{record.date_of_letter}</TableCell>
            <TableCell>{record.letter_ref_no}</TableCell>
            <TableCell>{record.received_by}</TableCell>
            <TableCell>{record.subject}</TableCell>
            <TableCell align="right">{record.letter_ref_no}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecordsTable;
