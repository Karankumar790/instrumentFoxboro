import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import DynamicTable from './Components/DynamicTable'
import { columns, rows } from './Components/TableData';

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
    <div>
      <div className='flex justify-between '>
        <p className=' text-2xl font-semibold'>Automation </p>
        <button onClick={handleOpen} className='text-xl font-semibold'>Add Category +</button>
      </div>

      <DynamicTable columns={columns} rows={rows} />

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6">
            Add New Category
          </Typography>


          {/* Name Field */}
          <TextField label="Category Name" fullWidth margin="normal" />

          {/* Short Description */}
          <TextField label="Short Description" fullWidth multiline rows={4} margin="normal" />

          {/* Long Description */}
          <TextField label="Long Description" fullWidth multiline rows={4} margin="normal" />

          {/* Add Button */}

          {/* Image Upload */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            {image && (
              <img
                src={image}
                alt="Preview"
                style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
              />
            )}
            
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
