import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditCategoryModal = ({ open, handleClose, category, handleSave }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category);

  const handleChange = (e) => {
    setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>Edit Category</Typography>
        <TextField
          label="Category Name"
          fullWidth
          name="categoryName"
          value={updatedCategory.categoryName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          name="description"
          value={updatedCategory.description}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={() => handleSave(updatedCategory)}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
