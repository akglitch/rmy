import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Paper, Typography, Snackbar, CircularProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IncomingRecordForm: React.FC = () => {
  const initialFormData = {
    year: '',
    month: '',
    date_received: '',
    log_time: '',
    serial_no: '',
    from_whom_received: '',
    date_of_letter: '',
    letter_ref_no: '',
    received_by: '',
    subject: '',
    type_of_letter: '', // Add type_of_letter to initial form data
  };

  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false); // State to control save animation
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Check if type_of_letter is not empty before saving
      if (!formData.type_of_letter.trim()) {
        throw new Error('Type of letter is required');
      }

      setSaving(true); // Start saving animation
      await axios.post('http://localhost:5000/api/incoming/records', formData);
      setFormData(initialFormData); // Clear form after successful save
      setSnackbarSeverity('success');
      setSnackbarMessage('Incoming record saved successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving incoming record:', error);
      setSnackbarSeverity('error');
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
    <>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Add New Incoming Record
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
              name="log_time"
              label="Log Time"
              variant="outlined"
              fullWidth
              value={formData.log_time}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
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
              name="from_whom_received"
              label="From Whom Received"
              variant="outlined"
              fullWidth
              value={formData.from_whom_received}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="date_of_letter"
              label="Date of Letter"
              variant="outlined"
              fullWidth
              value={formData.date_of_letter}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="letter_ref_no"
              label="Letter Ref No"
              variant="outlined"
              fullWidth
              value={formData.letter_ref_no}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="received_by"
              label="Received By"
              variant="outlined"
              fullWidth
              value={formData.received_by}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="type_of_letter" // Name matches the key in formData
              label="Type of Letter" // Label for the text field
              variant="outlined" // Outlined style for the text field
              fullWidth // Takes full width of the container
              value={formData.type_of_letter} // Value from the state
              onChange={handleChange} // Function to handle changes
              required // Makes the field required
              error={snackbarSeverity === 'error'} // Shows error state if an error occurred
              helperText={snackbarSeverity === 'error' ? snackbarMessage : ''} // Shows error message if any
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
              style={{ position: 'relative' }}
            >
              {saving && (
                <CircularProgress
                  size={24}
                  style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12 }}
                />
              )}
              Save
            </Button>
            <Button variant="contained" onClick={handleClear} style={{ marginLeft: '10px' }}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

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
    </>
  );
};

export default IncomingRecordForm;
