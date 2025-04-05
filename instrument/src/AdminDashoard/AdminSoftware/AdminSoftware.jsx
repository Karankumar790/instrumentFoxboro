import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import Backdrop from '@mui/material/Backdrop';
import { addSoftware, deleteSoftware, getSoftware, upadateSoftware } from './SoftwareSlice';

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

function Software() { // Changed to PascalCase
  const dispatch = useDispatch();
  const { data: softwareData = [], loading, error } = useSelector((state) => state.software);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    softwareName: "",
    description: ""
  });
  const [editingSoftware, setEditingSoftware] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleOpen = (software = null) => {
    if (software) {
      // Edit mode
      setEditingSoftware(software);
      setFormData({
        softwareName: software.softwareName || "",
        description: software.description || ""
      });
      setImage(software.softwareImage || null);
    } else {
      // Add mode
      setEditingSoftware(null);
      setFormData({
        softwareName: "",
        description: ""
      });
      setImage(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSoftware(null);
    setFormData({
      softwareName: "",
      description: ""
    });
    setImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.softwareName || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    const submitFormData = new FormData();
    submitFormData.append("softwareName", formData.softwareName);
    submitFormData.append("description", formData.description);

    // Only append image if it's a new file (not existing URL string)
    if (image && !(typeof image === "string")) {
      submitFormData.append("softwareImage", image);
    }

    try {
      if (editingSoftware) {
        // Update existing software
        await dispatch(upadateSoftware({
          softwareId: editingSoftware._id,
          formData: submitFormData
        })).unwrap();
      } else {
        // Add new software
        await dispatch(addSoftware(submitFormData)).unwrap();
      }

      // Refresh the list
      await dispatch(getSoftware());
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (softwareId) => {

    try {
      await dispatch(deleteSoftware(softwareId));
      dispatch(getSoftware()); // Refresh the list
    } catch (error) {
      console.error("Error deleting software:", error);
    }

  };

  useEffect(() => {
    dispatch(getSoftware());
  }, [dispatch]);

  return (
    <div className='p-5'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Software Management</h2>
        <Button variant='contained' color='primary' onClick={() => handleOpen()}>
          Add Software
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {softwareData?.map((soft) => (
              <StyledTableRow key={soft?._id}>
                <StyledTableCell>
                  <div className='w-24 h-20'>
                    {soft?.softwareImage ? (
                      <img
                        src={soft?.softwareImage || "/fallback.png"}
                        alt={soft?.softwareName || "N/A"}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <Typography variant="body2">No Image</Typography>
                    )}
                  </div>
                </StyledTableCell>
                <StyledTableCell>{soft?.softwareName || "N/A"}</StyledTableCell>
                <StyledTableCell>{soft?.description || "N/A"}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleOpen(soft)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDelete(soft?._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Box sx={ModalStyle}>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>
              {editingSoftware ? 'Edit Software' : 'Add Software'}
            </h2>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </div>
          <div className='space-y-4 mt-4'>
            <input
              type='text'
              name="softwareName"
              placeholder='Software Name'
              className='w-full p-2 border rounded'
              value={formData.softwareName}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder='Description'
              rows={3}
              className='w-full p-2 border rounded'
              value={formData.description}
              onChange={handleInputChange}
            />

            <div className='w-full h-36 border rounded-lg flex items-center justify-center overflow-hidden bg-gray-100'>
              {image ? (
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt='preview'
                  className='h-full w-full object-cover'
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )}
            </div>

            <Button
              variant='contained'
              component="label"
              fullWidth
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Upload Image
              <input type='file' accept='image/*' hidden onChange={handleImage} />
            </Button>

            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : editingSoftware ? 'Update' : 'Submit'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Software;