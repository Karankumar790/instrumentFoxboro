// DynamicModal.js
import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function DynamicModal({ open, handleClose, title, fields, onSave }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  // Handle field changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6">
          {title}
        </Typography>
        {fields.map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline={field.multiline}
            rows={field.rows || 1}
          />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DynamicModal;
