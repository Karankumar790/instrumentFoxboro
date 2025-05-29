import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFoxProduct,
  deleteProduct,
  updateFoxProduct,
  fetchFoxboroProduct,
} from './AdminProductSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

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

function Product() {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.foxboroProduct);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Open modal for add or edit
  const handleOpen = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
      });
      setImage(product.foxboroProductImage || product.image || null);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '' });
      setImage(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '' });
    setImage(null);
  };





  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Submit form for add or update
  const handleSubmit = async () => {
    if (!formData.name || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);

    if (image && !(typeof image === "string")) {
      data.append('foxboroProductImage', image);
    }

    try {
      if (editingProduct) {
        await dispatch(
          updateFoxProduct({ id: editingProduct._id, formData: data })
        ).unwrap();

      } else {
        // Add new product
        await dispatch(addFoxProduct(data)).unwrap();

      }
      await dispatch(fetchFoxboroProduct({ page: 1, limit: 100 }))
      handleClose();
    } catch (error) {
      alert(error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDeletePro = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await dispatch(deleteProduct(productId)).unwrap();

    } catch (error) {
      alert(error || 'Failed to delete product');
    }
  };

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchFoxboroProduct({ page: 1, limit: 100 }))
  }, [dispatch]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Foxboro Product Line</p>
        <button
          className="text-xl font-semibold p-2 rounded-lg text-white bg-green-700"
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
              products
                .filter((product) => product && product._id)
                .map((product) => (
                  <StyledTableRow key={product._id}>
                    <StyledTableCell component="th" scope="row">
                      <div className="w-24 h-20">
                        {product?.image || product?.foxboroProductImage ? (
                          <img
                            src={product.image || product.foxboroProductImage}
                            alt={product?.name || 'Product image'}
                            className="w-full h-full object-fill"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Typography variant="body2">No Image</Typography>
                          </div>
                        )}

                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="right">{product?.name || 'N/A'}</StyledTableCell>
                    <StyledTableCell align="right">{product?.description || 'N/A'}</StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/admin/productDetail/${product._id}`}>
                          <IconButton>
                            <AddIcon className="text-black font-bold" />
                          </IconButton>
                        </Link>
                        <IconButton
                          color="primary"
                          className="hover:bg-blue-100"
                          onClick={() => handleOpen(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          className="hover:bg-red-100"
                          onClick={() => handleDeletePro(product._id)}
                        >
                          <DeleteIcon />
                        </IconButton>

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

      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={Modalstyle}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <IconButton onClick={handleClose} className="hover:bg-gray-100 text-lg">
              <ClearIcon />
            </IconButton>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="border rounded w-full p-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
            />
            <textarea
              rows={3}
              placeholder="Description"
              name="description"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={handleInputChange}
            />
            <div className="w-full h-56 border border-gray-300 rounded-lg flex justify-center items-center">
              {image ? (
                <div className='h-56 w-full'>
                  <img
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-fill"
                  />
                </div>
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
              <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>

            <button
              className={`w-full bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg font-semibold transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : editingProduct ? 'Update' : 'Submit'}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
