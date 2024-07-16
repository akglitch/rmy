import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function TotalOutgoingRecords() {
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/outgoing/records');
        const allRecords = response.data;
        setTotalRecords(allRecords.length);
      } catch (error) {
        console.error('Error fetching total records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Title>Total Outgoing Records</Title>
      <Typography component="p" variant="h4">
        {totalRecords}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toLocaleDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}
