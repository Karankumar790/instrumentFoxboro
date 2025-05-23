import {
  Box, Button, IconButton, Modal, Paper, styled, Table, TableBody,
  TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoxProduct, deleteProduct, updateFoxProduct, fetchFoxboroProduct
} from './AdminProductSlice';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Modalstyle = {
  position: 'absolute',
  top: '50%', left: '50%',
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

function Product() {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.foxboroProduct);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchFoxboroProduct({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleOpen = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ name: product.name || "", description: product.description || "" });
      setImage(product.image || null);
    } else {
      setEditingProduct(null);
      setFormData({ name: "", description: "" });
      setImage(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", description: "" });
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (image && typeof image !== "string") {
      data.append("foxboroProductImage", image);
    }

    try {
      if (editingProduct) {
        await dispatch(updateFoxProduct({ id: editingProduct._id, formData: data })).unwrap();
      } else {
        await dispatch(addFoxProduct({ proData: data })).unwrap();
      }
      dispatch(fetchFoxboroProduct({ page: 1, limit: 100 }));
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong!");
    }
  };

  const handleDeletePro = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      dispatch(fetchFoxboroProduct({ page: 1, limit: 100 }));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className='space-y-3'>
      <div className='flex justify-between'>
        <p className='text-2xl font-bold'>Foxboro Product Line</p>
        <button
          className='text-xl font-semibold p-2 rounded-lg text-white bg-green-700'
          onClick={() => handleOpen()}
        >
          Add Item +
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <StyledTableRow key={product._id}>
                  <StyledTableCell>
                    <div className='w-20 h-20'>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-full h-full object-contain'
                        />
                      ) : (
                        <Typography variant="body2">No Image</Typography>
                      )}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{product.name}</StyledTableCell>
                  <StyledTableCell align="right">{product.description}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="flex justify-end space-x-2">
                      <IconButton color="primary" onClick={() => handleOpen(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeletePro(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Link to={`/admin/productDetail/${product._id}`}>
                        <IconButton>
                          <AddIcon className='text-black font-bold' />
                        </IconButton>
                      </Link>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  No products available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={Modalstyle}>
          <div className='flex justify-between mb-4'>
            <h2 className='text-xl font-bold'>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <IconButton onClick={handleClose}><ClearIcon /></IconButton>
          </div>
          <div className='space-y-4'>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded'
            />
            <textarea
              rows={3}
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded'
            />
            <div className="w-full h-56 border border-gray-300 rounded-lg flex justify-center items-center">
              {image ? (
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Typography variant="body2">No Image Selected</Typography>
              )}
            </div>
            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : editingProduct ? "Update" : "Submit"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
