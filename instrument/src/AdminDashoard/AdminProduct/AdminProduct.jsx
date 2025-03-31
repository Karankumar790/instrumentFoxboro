import { Box, Button, IconButton, Modal, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { addFoxProduct } from './AdminProductSlice';


const Modalstyle = {
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


function Product() {

  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
  })

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Save the selected image to state
    }
  };

  const dispatch = useDispatch();

  // const handleSubmit = async () => {
  //   const formData = new FormData(); // Ensure FormData is initialized here
  //   formData.append("name", product.name);
  //   formData.append("description", product.description);
  //   formData.append("image", image);
  //   console.log(formData,"form data.....")
  //   console.log(product.name,"product name")
  //   dispatch(addFoxProduct({ proData: formData })); // Use formData correctly
  // };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("foxboroProductImage", image);

    dispatch(addFoxProduct({ proData: formData }));
    setProduct({
      name: "",
      description: "",
      foxboroProductImage:null,
    })
  };


  return (
    <div className='space-y-3'>
      <div className='flex justify-between '>
        <p className=' text-2xl font-bold'>Foxboro Product Line</p>
        <button className='text-xl font-semibold p-2 rounded-lg text-white bg-green-700' onClick={handleOpen}>Add Item +</button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={Modalstyle}>
          <div className=' flex justify-between '>
            <p className='text-2xl font-semibold'>
              Foxboro Product
            </p>
            <IconButton onClick={handleClose} className="hover:bg-gray-100 text-lg">
              <ClearIcon />
            </IconButton>
          </div>

          <div className='space-y-5'>
            <input type="text" placeholder='Name' className='border rounded w-full p-2  border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' value={product.name} onChange={handleChange} name='name' />
            <textarea
              rows={3}
              placeholder='Description'
              name='description'
              className='w-full p-3 rounded-lg border  border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 '
              value={product.description}
              onChange={handleChange}
            />
            <div className="w-full h-56 border border-gray-300 rounded-lg flex justify-center items-center">
              {image ? (
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )}
            </div>

            <Button
              variant="contained"
              component="label"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700"
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </Button>

            <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg font-semibold transition-colors" type='submit' onClick={handleSubmit}>
              Submit
            </button>
          </div>

        </Box>
      </Modal>

    </div>
  )
}

export default Product
