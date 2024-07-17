import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Title from './Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { RecordData } from '../types'; // Ensure this path is correct

const Incoming: React.FC = () => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incoming/records');
        const allRecords = response.data as RecordData[];
        const recentRecords = allRecords.slice(-5); // Get the most recent 5 records
        setRecords(recentRecords);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Title>Incoming Records</Title>
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
      <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default Incoming;
