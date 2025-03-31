import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../pages/product';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from './CategoryProductSlice';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '12px',
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

function CategoryProduct() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // Form States
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setCategoryName] = useState("");

    // Editing States
    const [editMode, setEditMode] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [modalType, setModalType] = useState(""); // "product" or "category"
    const [editingId, setEditingId] = useState(null);

    const handleOpen = (type, item = null) => {
        setModalType(type);
        if (item) {
            setEditMode(true);
            setEditingId(item._id);
            if (type === "product") {
                setProductName(item.productName);
                setDescription(item.description);
                setImage(item.productImage);
                setEditingProductId(item._id);
            } else if (type === "category") {
                setCategoryName(item.categoryName);
            }
        } else {
            setEditMode(false);
            setEditingId(null);
            resetForm();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(categoryId);
                setProducts(response);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [categoryId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const resetForm = () => {
        setProductName("");
        setDescription("");
        setCategoryName("");
        setImage(null);
        setEditMode(false);
        setEditingProductId(null);
    };

    const handleSubmit = async () => {
        if (modalType === "product") {
            if (!productName || !description) {
                alert("All fields are required!");
                return;
            }

            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("description", description);

            if (image instanceof File) {
                formData.append("productImage", image);
            }

            try {
                if (editMode) {
                    const resultAction = await dispatch(
                        updateProduct({ productId: editingProductId, formData })
                    );
                    if (updateProduct.fulfilled.match(resultAction)) {
                        setProducts((prevProducts) =>
                            prevProducts.map((product) =>
                                product._id === editingProductId ? resultAction.payload.data : product
                            )
                        );
                    }
                } else {
                    const resultAction = await dispatch(
                        addProduct({ categoryId, formData })
                    );
                    if (addProduct.fulfilled.match(resultAction)) {
                        setProducts((prevProducts) => [...prevProducts, resultAction.payload.data]);
                    }
                }
                handleClose();
            } catch (error) {
                alert("Something went wrong!");
            }
        } else if (modalType === "category") {
            // Handle category submission logic here
            console.log("Category submission:", categoryName);
            handleClose();
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await dispatch(deleteProduct(productId));
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productId)
                );
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    return (
        <div className="p-6">
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Product Management</h1>
                <div className="space-x-4">
                    {/* <button 
                        onClick={() => handleOpen("category")}
                        className='px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors'
                    >
                        Edit Category
                    </button> */}
                    <button 
                        onClick={() => handleOpen("product")}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
                    >
                        Add Product +
                    </button>
                </div>
            </div>

            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" className="text-red-500">
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No products found
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <StyledTableRow key={product._id}>
                                    <StyledTableCell>
                                        <img 
                                            src={product.productImage} 
                                            alt={product.productName} 
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className="font-medium">
                                        {product.productName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {product.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className="flex justify-end space-x-2">
                                            <IconButton 
                                                color="primary" 
                                                onClick={() => handleOpen("product", product)}
                                                className="hover:bg-blue-100"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="hover:bg-red-100"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
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
                <Fade in={open}>
                    <Box sx={style}>
                        <div>
                            <div className='flex justify-between items-center mb-6'>
                                <h2 className='text-2xl font-bold text-gray-800'>
                                    {editMode ? `Edit ${modalType}` : `Add New ${modalType}`}
                                </h2>
                                <IconButton onClick={handleClose} className="hover:bg-gray-100">
                                    <ClearIcon />
                                </IconButton>
                            </div>
                            
                            <div className='space-y-6'>
                                {modalType === "product" ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Product Name
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder='Product Name' 
                                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                value={productName} 
                                                onChange={(e) => setProductName(e.target.value)} 
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea 
                                                rows={4} 
                                                placeholder='Description' 
                                                className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                value={description} 
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Product Image
                                            </label>
                                            <Box 
                                                sx={{ 
                                                    width: "100%",
                                                    height: 200,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderRadius: 2,
                                                    border: "1px dashed grey",
                                                    marginBottom: 2,
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {image ? (
                                                    typeof image === 'string' ? (
                                                        <img
                                                            src={image}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary">
                                                        No Image Selected
                                                    </Typography>
                                                )}
                                            </Box>
                                            
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
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Category Name
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder='Category Name' 
                                            className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                            value={categoryName} 
                                            onChange={(e) => setCategoryName(e.target.value)} 
                                        />
                                    </div>
                                )}
                                
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-600 hover:bg-blue-700 p-3 text-white rounded-lg font-semibold transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : editMode ? "Update" : "Submit"}
                                </button>
                                
                                {error && (
                                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default CategoryProduct;