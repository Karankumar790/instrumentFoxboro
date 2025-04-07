import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ClearIcon from "@mui/icons-material/Clear";




const style = {
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
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function AdminHeader() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);

  return (
    <div className='flex flex-col space-y-5'>
      <div className='flex justify-between'>
        <p className='font-semibold text-2xl'>Header Management</p>
        <button className='bg-green-600 font-semibold p-2 rounded-lg text-white text-lg' onClick={handleOpen}>Add Header +</button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Logo Image</StyledTableCell>
                <StyledTableCell >Phone Number 1</StyledTableCell>
                <StyledTableCell >Phone Number 2</StyledTableCell>
                <StyledTableCell >Phone Number 3</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell >{row.calories}</StyledTableCell>
                  <StyledTableCell>{row.fat}</StyledTableCell>
                  <StyledTableCell >{row.carbs}</StyledTableCell>
                  <StyledTableCell align="left">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{
                    <IconButton
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  }</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex justify-between'>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <button onClick={handleClose}>
                <ClearIcon className="text-black text-lg" />
              </button>
            </div>

            <div className='w-full  space-y-4 mt-2'>
              <div className='flex gap-2 w-full '>
                <input type="number" placeholder='Number 1' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="number" placeholder='Number 2' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <input type="number" placeholder='Number 3' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="email" placeholder='Email' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    border: "1px solid grey",
                    marginBottom: 2,
                  }}
                >
                  {
                    image ? (
                      <img src={URL.createObjectURL(image)} alt=""
                        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No Image Selected
                      </Typography>
                    )
                  }
                </Box>
                <button className='w-full bg-blue-600 p-2 text-white rounded-lg font-semibold'>
                 Upload Image 
                 <input type='file' hidden accept='image/*'/>
                </button>
              </Box>
              <button className='w-full bg-blue-600 p-2 text-white rounded-lg font-semibold'>Submit</button>
            </div>

          </Box>
        </Fade>
      </Modal>

    </div>
  )
}

export default AdminHeader
