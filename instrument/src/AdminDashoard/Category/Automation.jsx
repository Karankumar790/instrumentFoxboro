import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import DynamicTable from '../Components/DynamicTable';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from './CategorySlice';
import CategoryTableData, { generateColumns, generateRows } from "../Components/TableData";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Automation({ open: isOpen, handleClose: onClose }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.category);


  const { rows, columns } = CategoryTableData;

  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    shortDescription: '',
    longDescription: '',
    categoryImage: null,
  });

  const [image, setImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  // Handle input change
  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCategoryData({ ...categoryData, categoryImage: file });
    }
  };

  // Validate fields before submitting
  const validateForm = () => {
    if (!categoryData.categoryName.trim()) return 'Category Name is required.';
    if (!categoryData.shortDescription.trim()) return 'Short Description is required.';
    if (!categoryData.longDescription.trim()) return 'Long Description is required.';
    if (!categoryData.categoryImage) return 'Category Image is required.';
    return null;
  };

  // Handle form submission
  const handleSubmit = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryData.categoryName);
    formData.append('shortDescription', categoryData.shortDescription);
    formData.append('longDescription', categoryData.longDescription);
    formData.append('categoryImage', categoryData.categoryImage);

    // Debugging: Check FormData before dispatching
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    dispatch(addCategory(formData))
      .then(() => {
        setSnackbar({ open: true, message: 'Category added successfully!', severity: 'success' });
        setCategoryData({ categoryName: '', shortDescription: '', longDescription: '', categoryImage: null });
        setImage(null);
        handleClose();
      })
      .catch(() => {
        setSnackbar({ open: true, message: 'Failed to add category.', severity: 'error' });
      });
  };


  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Automation</p>
        <button
          onClick={handleOpen}
          className="text-xl font-semibold p-2 rounded-lg bg-green-800 text-white"
        >
          Add Category +
        </button>
      </div>

      <DynamicTable rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />

      <Modal open={isModalOpen} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-title" variant="h6">
              Add New Category
            </Typography>
            <Button onClick={handleClose}>
              <ClearIcon className="text-black text-lg" />
            </Button>
          </Box>

          {/* Name Field */}
          <TextField
            label="Category Name"
            name="categoryName"
            fullWidth
            margin="normal"
            value={categoryData.categoryName}
            onChange={handleChange}
          />

          {/* Short Description */}
          {/* <TextField
            label="Short Description"
            name="shortDescription"
            fullWidth
            multiline
            rows={2}
            margin="normal"
            value={categoryData.shortDescription}
            onChange={handleChange}
          /> */}

          {/* Long Description */}
          <TextField
            label="Description"
            name="longDescription"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={categoryData.longDescription}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Box
              sx={{
                width: '100%',
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#f0f0f0',
                borderRadius: 2,
                border : "1px solid grey",
                marginBottom: 2,
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )}
            </Box>

            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Box>

          {/* Add Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for errors and success messages */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <DynamicTable rows={generateRows} columns={generateColumns}/>
    </div>
  );
}

export default Automation;
