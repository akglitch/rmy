import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Title from './Title';
import { RecordData } from '../types'; // Ensure this path is correct
import RecordsTable from './dashRecordTableIncoming';

const Incoming: React.FC = () => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/records');
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
      <RecordsTable records={records} />
      <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default Incoming;
