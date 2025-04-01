import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addSoftware, updateSoftware, deleteSoftware, getSoftwareList } from './softwareSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
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

function software() {
  const dispatch = useDispatch();
  const softwareList = useSelector((state) => state.software.softwareList);
  const [open, setOpen] = useState(false);
  const [softwareName, setSoftwareName] = useState('');
  const [description, setDescription] = useState('');
  const [softwareImage, setSoftwareImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
    dispatch(getSoftwareList());
  }, [dispatch]);

  const handleOpen = (software = null) => {
    setOpen(true);
    if (software) {
      setEditMode(true);
      setEditingId(software._id);
      setSoftwareName(software.softwareName);
      setDescription(software.description);
      setSoftwareImage(software.softwareImage);
    } else {
      setEditMode(false);
      resetForm();
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSoftwareName('');
    setDescription('');
    setSoftwareImage(null);
    setEditMode(false);
    setEditingId(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setSoftwareImage(file);
  };

  const handleSubmit = async () => {
    if (!softwareName.trim() || !description.trim()) {
      alert("Software name and description are required.");
      return;
    }
  
    // Check if an image is required when adding a new software
    if (!editMode && !softwareImage) {
      alert("Software image is required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("softwareName", softwareName);
    formData.append("description", description);
  
    // Only append image if it's a new file
    if (softwareImage && typeof softwareImage !== "string") {
      formData.append("softwareImage", softwareImage);
    }
  
    try {
      if (editMode) {
        await dispatch(updateSoftware({ id: editingId, formData })).unwrap();
      } else {
        await dispatch(addSoftware(formData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong!");
    }
  };
  
  const handleDelete = (id) => {
    dispatch(deleteSoftware(id));
  };

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
            {softwareList.map((software) => (
              <TableRow key={software._id}>
                <TableCell>
                  <img src={software.softwareImage} alt={software.softwareName} className='w-16 h-16 object-contain' onChange={handleImageChange} />
                </TableCell>
                <TableCell>{software.softwareName}</TableCell>
                <TableCell>{software.description}</TableCell>
                <TableCell>
                  <IconButton color='primary' onClick={() => handleOpen(software)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='error' onClick={() => handleDelete(software._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={ModalStyle}>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>{editMode ? 'Edit Software' : 'Add New Software'}</h2>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </div>
          <div className='space-y-4 mt-4'>
            <input
              type='text'
              placeholder='Software Name'
              value={softwareName}
              onChange={(e) => setSoftwareName(e.target.value)}
              className='w-full p-2 border rounded'
            />
            <textarea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full p-2 border rounded'
            />
            <input type='file' onChange={handleImageChange} accept='image/*' className='w-full p-2 border rounded' />
            <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default software;
