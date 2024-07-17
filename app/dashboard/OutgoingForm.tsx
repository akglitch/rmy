import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Paper, Typography, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OutgoingRecordForm: React.FC = () => {
  const initialFormData = {
    year: '',
    month: '',
    serial_no: '',
    date_received: '',
    date_dispatched: '',
    reference_no: '',
    folio_no: '',
    addressee: '',
    mode_of_dispatch: '',
    subject: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false); // State to control save animation
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setSaving(true); // Start saving animation
      await axios.post('http://localhost:5000/api/outgoing/records', formData);
      setFormData(initialFormData); // Clear form after successful save
      console.log('Outgoing record saved successfully');
      setSnackbarSeverity('success');
      setSnackbarMessage('Outgoing record saved successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving outgoing record:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to save outgoing record');
      setSnackbarOpen(true);
    } finally {
      setSaving(false); // Stop saving animation
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Add New Outgoing Record
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="year"
            label="Year"
            variant="outlined"
            fullWidth
            value={formData.year}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="month"
            label="Month"
            variant="outlined"
            fullWidth
            value={formData.month}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="serial_no"
            label="Serial No"
            variant="outlined"
            fullWidth
            value={formData.serial_no}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="date_received"
            label="Date Received"
            variant="outlined"
            fullWidth
            value={formData.date_received}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="date_dispatched"
            label="Date Dispatched"
            variant="outlined"
            fullWidth
            value={formData.date_dispatched}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="reference_no"
            label="Reference No"
            variant="outlined"
            fullWidth
            value={formData.reference_no}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="folio_no"
            label="Folio No"
            variant="outlined"
            fullWidth
            value={formData.folio_no}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="addressee"
            label="Addressee"
            variant="outlined"
            fullWidth
            value={formData.addressee}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mode_of_dispatch"
            label="Mode of Dispatch"
            variant="outlined"
            fullWidth
            value={formData.mode_of_dispatch}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="subject"
            label="Subject"
            variant="outlined"
            fullWidth
            value={formData.subject}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving} // Disable button during save
          >
            {saving ? (
              <CircularProgress size={24} color="inherit" /> // Show spinner if saving
            ) : (
              'Save'
            )}
          </Button>
          <Button
            variant="contained"
            onClick={handleClear}
            style={{ marginLeft: '10px' }}
            disabled={saving} // Disable button during save
          >
            Clear
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default OutgoingRecordForm;
