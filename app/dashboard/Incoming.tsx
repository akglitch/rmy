import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { RecordData } from '../types'; // Ensure this path is correct
import { TableHead, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModalIncoming from './EditModalIncoming'; // Adjust path as needed

const IncomingRecord: React.FC = () => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<RecordData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incoming/records');
        const allRecords = response.data as RecordData[];
        setRecords(allRecords);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredRecords = records.filter(record =>
    record.serial_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (record: RecordData) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleUpdateRecord = (updatedRecord: RecordData) => {
    const updatedRecords = records.map(record =>
      record._id === updatedRecord._id ? updatedRecord : record
    );
    setRecords(updatedRecords);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/incoming/records/${id}`);
      setRecords(records.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Title>Incoming Records</Title>
      <TextField
        label="Search by Serial Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map(record => (
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
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(record)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(record._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} align="center">
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}>
        See more orders
      </Link>

      {/* Edit Modal */}
      <EditModalIncoming
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        record={selectedRecord as RecordData}
        onUpdate={handleUpdateRecord}
      />
    </React.Fragment>
  );
};

export default IncomingRecord;
