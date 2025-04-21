import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box,CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNewProduct, getNewProduct, postNewProduct, resetStatus, updateNewProduct } from './newProductSlice';
import { toast } from 'react-toastify';

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

const initialInput = {
  projectName: '',
  description: '',
};
function AdminNewProduct() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState(initialInput);
  const [modalData, setModalData] = useState(initialInput);
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const { newProducts, loading, error, success } = useSelector((state) => state.newProduct);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      toast.success("Operation completed successfully!");
      dispatch(resetStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  // Load products on mount
  useEffect(() => {
    dispatch(getNewProduct());
  }, [dispatch]);

  const handleOpen = (product) => {
    setModalData({
      projectName: product.projectName,
      description: product.description,
    });
    setImagePreview(product.projectImage);
    setEditingId(product._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalInput = (e) => {
    const { name, value } = e.target;
    setModalData(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.projectName || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append("projectName", formData.projectName);
    submitFormData.append("description", formData.description);
    
    if (image) {
      submitFormData.append("newProjectImage", image);
    }

    try {
      await dispatch(postNewProduct(submitFormData)).unwrap();
      dispatch(getNewProduct());
      setFormData(initialInput);
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!modalData.projectName || !modalData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("projectName", modalData.projectName);
    updatedFormData.append("description", modalData.description);
    
    if (image) {
      updatedFormData.append("newProjectImage", image);
    }

    try {
      await dispatch(updateNewProduct({ 
        projectId: editingId, 
        formData: updatedFormData 
      })).unwrap();
      handleClose();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteNewProduct(productId)).unwrap();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <p className='text-2xl font-bold mb-4'>New Product</p>
      
      {/* Form Section */}
      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-md mb-6'>
        <div>
          <label className='block text-lg font-semibold mb-1'>Name *</label>
          <input
            type='text'
            name='projectName'
            value={formData?.projectName}
            onChange={handleInput}
            required
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        
        <div>
          <label className='block text-lg font-semibold mb-1'>Description *</label>
          <input
            type='text'
            name='description'
            value={formData?.description}
            onChange={handleInput}
            required
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        
        <div>
          <label className='block text-lg font-semibold mb-1'>Image</label>
          <input
            type='file'
            name='newProjectImage'
            onChange={handleImage}
            accept="image/*"
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        
        <div className='flex items-end'>
          <button
            type="submit"
            disabled={loading}
            className='bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-md w-full flex justify-center items-center h-[42px]'
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </button>
        </div>
      </form>

      {/* Products Table */}
      <div className='mt-6'>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newProducts?.length > 0 ? (
                  newProducts.map((row, index) => (
                    <StyledTableRow key={row._id || index}>
                      <StyledTableCell>
                        <img
                          src={row.projectImage}
                          alt="product"
                          className="w-20 h-12 object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x48?text=No+Image';
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{row.projectName}</StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpen(row)}
                          disabled={loading}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row._id)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">
                      No products found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-product-modal"
      >
        <Box sx={Modalstyle}>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Edit Product
            </h2>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </div>

          <form onSubmit={handleUpdate} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Name *</label>
              <input
                type="text"
                className='border rounded w-full p-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                name='projectName'
                onChange={handleModalInput}
                value={modalData.projectName}
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Description *</label>
              <textarea
                rows={3}
                name='description'
                className='w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                onChange={handleModalInput}
                value={modalData.description}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className='block text-sm font-medium text-gray-700'>Image</label>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  border: "1px dashed grey",
                  mb: 2,
                  overflow: 'hidden'
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain" 
                    }}
                    alt="preview"
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No Image Selected
                  </Typography>
                )}
              </Box>

              <label className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-center cursor-pointer py-2 px-4 block transition-colors'>
                {imagePreview ? 'Change Image' : 'Upload Image'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg font-semibold transition-colors flex justify-center items-center ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminNewProduct;