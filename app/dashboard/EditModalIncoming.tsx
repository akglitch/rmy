import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, TextField, Button } from '@mui/material';
import { RecordData } from '../types'; // Adjust path as needed
import axios from 'axios';

interface EditModalIncomingProps {
  open: boolean;
  onClose: () => void;
  record: RecordData;
  onUpdate: (updatedRecord: RecordData) => void;
}

const EditModalIncoming: React.FC<EditModalIncomingProps> = ({ open, onClose, record, onUpdate }) => {
  const [editedRecord, setEditedRecord] = useState<RecordData>({ ...record });
  const [showModal, setShowModal] = useState(false); // State to control fade effect

  // Update local state when props change
  useEffect(() => {
    setEditedRecord({ ...record });
    setShowModal(open); // Show modal when open prop changes
  }, [open, record]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/incoming/records/${editedRecord._id}`, editedRecord);
      if (response.status === 200) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
    onClose();
  };

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        className: 'bg-black bg-opacity-50',
      }}
      className="flex items-center justify-center"
    >
      <Fade in={open}>
        <div className="modal-content">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl mx-auto grid grid-cols-2 gap-4">
            <h2 id="edit-modal-title" className="col-span-2 text-xl font-bold mb-4">Edit Incoming Record</h2>
            <TextField
              name="year"
              label="Year"
              value={editedRecord.year}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="month"
              label="Month"
              value={editedRecord.month}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="date_received"
              label="Date Received"
              value={editedRecord.date_received}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="log_time"
              label="Log Time"
              value={editedRecord.log_time}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="serial_no"
              label="Serial No"
              value={editedRecord.serial_no}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="from_whom_received"
              label="From Whom Received"
              value={editedRecord.from_whom_received}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="date_of_letter"
              label="Date of Letter"
              value={editedRecord.date_of_letter}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="letter_ref_no"
              label="Letter Ref No"
              value={editedRecord.letter_ref_no}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="received_by"
              label="Received By"
              value={editedRecord.received_by}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <TextField
              name="subject"
              label="Subject"
              value={editedRecord.subject}
              onChange={handleChange}
              fullWidth
              margin="normal"
              className="mb-4 cursor-auto"
            />
            <div className="col-span-2 flex justify-end space-x-4 mt-6">
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
              <Button variant="contained" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditModalIncoming;
