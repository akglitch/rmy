import React, { useState } from 'react';
import { Modal, Backdrop, TextField, Button } from '@mui/material';
import { outgoingRecordData } from '../types'; // Adjust path as needed
import axios from 'axios';

interface EditModalOutgoingProps {
  open: boolean;
  onClose: () => void;
  record: outgoingRecordData;
  onUpdate: (updatedRecord: outgoingRecordData) => void;
}

const EditModalOutgoing: React.FC<EditModalOutgoingProps> = ({ open, onClose, record, onUpdate }) => {
  const [editedRecord, setEditedRecord] = useState<outgoingRecordData>({ ...record });
  const [showModal, setShowModal] = useState(false); // State to control fade effect

  // Update local state when props change
  React.useEffect(() => {
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
      const response = await axios.put(`http://localhost:5000/api/outgoing/records/${editedRecord._id}`, editedRecord);
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
      <div className="modal-content">
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl mx-auto grid grid-cols-2 gap-4">
          <h2 id="edit-modal-title" className="col-span-2 text-xl font-bold mb-4">Edit Outgoing Record</h2>
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
            name="serial_no"
            label="Serial No"
            value={editedRecord.serial_no}
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
            name="date_dispatched"
            label="Date Dispatched"
            value={editedRecord.date_dispatched}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="mb-4 cursor-auto"
          />
          <TextField
            name="reference_no"
            label="Reference No"
            value={editedRecord.reference_no}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="mb-4 cursor-auto"
          />
          <TextField
            name="folio_no"
            label="Folio No"
            value={editedRecord.folio_no}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="mb-4 cursor-auto"
          />
          <TextField
            name="addressee"
            label="Addressee"
            value={editedRecord.addressee}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="mb-4 cursor-auto"
          />
          <TextField
            name="mode_of_dispatch"
            label="Mode of Dispatch"
            value={editedRecord.mode_of_dispatch}
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
    </Modal>
  );
};

export default EditModalOutgoing;
