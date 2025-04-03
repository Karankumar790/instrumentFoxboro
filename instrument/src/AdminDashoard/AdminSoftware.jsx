import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import Backdrop from '@mui/material/Backdrop';
import { addSoftware, deleteSoftware, getSoftware } from './SoftwareSlice';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



function software() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const [softwareName, setSoftwareName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { data: softwareData = [], loading, error } = useSelector(state => state.software);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };





  const handleSubmit = async () => {
    console.log("Submit button clicked!"); // Debugging log
    const formData = new FormData();
    formData.append("softwareName", softwareName);
    formData.append("description", description);

    if (image instanceof File) {
      formData.append("softwareImage", image);
    }

    try {
      const result = await dispatch(addSoftware(formData));
    } catch (error) {
      console.error("Error:", error);
    }

    handleClose();
  };

  useEffect(() => {
    dispatch(getSoftware());
  }, [dispatch]);

  const hadleDelete = async (softwareId) => {
    try {
      await dispatch(deleteSoftware(softwareId))

      dispatch(getSoftware());
    } catch (error) {
      console.error("Error deleting software:", error);
      return error
    }
  }





  return (
    <div className='p-5'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Software Management</h2>
        <Button variant='contained' color='primary' onClick={handleOpen} >
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
            {softwareData?.map((software,index) => (
              <TableRow key={index}>
                {/* <TableCell>
                  <img src={software.softwareImage} alt={software.softwareName} className='w-16 h-16 object-contain'  />
                </TableCell> */}
                <TableCell>{
                  <div className='w-24 h-20'>
                    <img src={software.softwareImage} alt="" className='w-full h-full object-cover' />
                  </div>
                  }</TableCell>
                <TableCell>{software.softwareName}</TableCell>
                <TableCell>{software.description}</TableCell>
                <TableCell>
                  <IconButton color='primary'>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='error' onClick={()=> hadleDelete(software._id) }>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={ModalStyle}>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>Add Software</h2>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </div>
          <div className='space-y-4 mt-4'>
            <input
              type='text'
              placeholder='Software Name'
              className='w-full p-2 border rounded'
              value={softwareName}
              onChange={(e) => setSoftwareName(e.target.value)}
            />
            <textarea
              placeholder='Description'
              rows={3}
              className='w-full p-2 border rounded'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className='w-full h-36 border rounded-lg flex items-center justify-center overflow-hidden bg-gray-100'>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt='preview'
                  className='h-full w-full object-cover'
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )
              }
            </div>

            <Button
              variant='contained'
              component="label"
              fullWidth
              className="mt-4 bg-blue-600 hover:bg-blue-700">
              Upload Image
              <input type='file' accept='image/*' hidden onChange={handleImage} />
            </Button>

            <Button variant='contained' color='primary' fullWidth onClick={handleSubmit} >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default software;
