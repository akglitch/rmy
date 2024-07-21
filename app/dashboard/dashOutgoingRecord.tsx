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
import { outgoingRecordData } from '../types'; // Ensure this path is correct

const Outgoing: React.FC = () => {
  const [records, setRecords] = useState<outgoingRecordData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/outgoing/records');
        const allRecords = response.data as outgoingRecordData[];
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
      <Title>Outgoing Records</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Serial No</TableCell>
            <TableCell>Date Received</TableCell>
            <TableCell>Date Dispatched</TableCell>
            <TableCell>Reference No</TableCell>
            <TableCell>Folio No</TableCell>
            <TableCell>Addressee</TableCell>
            <TableCell>Mode of Dispatch</TableCell>
            <TableCell>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record._id}>
              <TableCell>{record.year}</TableCell>
              <TableCell>{record.month}</TableCell>
              <TableCell>{record.serial_no}</TableCell>
              <TableCell>{record.date_received}</TableCell>
              <TableCell>{record.date_dispatched}</TableCell>
              <TableCell>{record.reference_no}</TableCell>
              <TableCell>{record.folio_no}</TableCell>
              <TableCell>{record.addressee}</TableCell>
              <TableCell>{record.mode_of_dispatch}</TableCell>
              <TableCell>{record.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}>
        See more outgoing
      </Link>
    </React.Fragment>
  );
};

export default Outgoing;
