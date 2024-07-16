import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { outgoingRecordData } from '../types'; // Ensure this path is correct
import { TableHead, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModalOutgoing from './EditModalOutgoing'; // Adjust path as needed

const OutgoingRecord: React.FC = () => {
  const [records, setRecords] = useState<outgoingRecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<outgoingRecordData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/outgoing/records');
        const allRecords = response.data as outgoingRecordData[];
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
    setSearchTerm(event.target.value);
  };

  const handleEdit = (record: outgoingRecordData) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleUpdateRecord = (updatedRecord: outgoingRecordData) => {
    const updatedRecords = records.map(record =>
      record._id === updatedRecord._id ? updatedRecord : record
    );
    setRecords(updatedRecords);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/outgoing/records/${id}`);
      setRecords(records.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredRecords = records.filter(record =>
    Object.values(record).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Title>Outgoing Records</Title>
      <TextField
        label="Search Records"
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
            <TableCell>Serial No</TableCell>
            <TableCell>Date Received</TableCell>
            <TableCell>Date Dispatched</TableCell>
            <TableCell>Reference No</TableCell>
            <TableCell>Folio No</TableCell>
            <TableCell>Addressee</TableCell>
            <TableCell>Mode of Dispatch</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRecords.map(record => (
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
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(record)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(record._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}>
        See more orders
      </Link>

      {/* Edit Modal */}
      <EditModalOutgoing
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        record={selectedRecord as outgoingRecordData}
        onUpdate={handleUpdateRecord}
      />
    </React.Fragment>
  );
};

export default OutgoingRecord;
