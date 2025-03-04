import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import DynamicTable from './Components/DynamicTable'
import { columns, rows } from './Components/TableData';
import ClearIcon from '@mui/icons-material/Clear';

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



function automation() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [image, setImage] = useState(null);

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='space-y-3'>
      <div className='flex justify-between '>
        <p className=' text-2xl font-bold'>Automation </p>
        <button onClick={handleOpen} className='text-xl font-semibold p-2 rounded-lg bg-green-800 text-white'>Add Category +</button>
      </div>

      <DynamicTable rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]} />

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Box display='flex' justifyContent='space-between'>
            <Typography id="modal-title" variant="h6">
              Add New Category
            </Typography>
            <Button onClick={handleClose}>
              <ClearIcon className='text-black text-lg' />
            </Button>
          </Box>



          {/* Name Field */}
          <TextField label="Category Name" fullWidth margin="normal" />

          {/* Short Description */}
          <TextField label="Short Description" fullWidth multiline rows={4} margin="normal" />

          {/* Long Description */}
          <TextField label="Long Description" fullWidth multiline rows={4} margin="normal" />

          {/* Add Button */}

          {/* Image Upload */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            <Box
              sx={{
                width: "100%",
                maxHeight: 200,
                height: 200, // Fixed height to reserve space
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0", // Light gray background for visibility
                borderRadius: 8,
                marginBottom: 2,
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )}
            </Box>

            <Box sx={{

              width: '100%',
              display: 'flex', // Ensure flexbox is applied
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
              gap: 2, // Add spacing between buttons

            }}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
              <Button variant="contained" color="primary">
                Add  Category
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>


    </div>
  )
}

export default automation
