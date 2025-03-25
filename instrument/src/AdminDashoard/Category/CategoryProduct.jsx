import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Typography } from '@mui/material';
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
import { addProduct } from './CategoryProductSlice';


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
        backgroundColor: theme.palette.common.black,
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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [image, setImage] = useState(null);
    const { categoryId } = useParams();
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(categoryId);
                console.log("API Response:", response); // Debugging

                // Ensure we're setting the correct data array
                setProduct(response);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [categoryId]);

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");

    const { loadings, errors, success } = useSelector((state) => state.product);

    const handleImageChanges = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleAddProduct = async () => {
        if (!productName || !description || !image) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("productImage", image);

        try {
            const resultAction = await dispatch(addProduct({ categoryId, formData }));

            if (addProduct.fulfilled.match(resultAction)) {
                setProduct((prevProducts) => [...prevProducts, resultAction.payload.data]); // Add new product to state
                handleClose();
            } else {
                alert("Failed to add product. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Something went wrong!");
        }
    };




    return (
        <div>
            <div className='flex justify-between mb-4'>
                <p className='text-2xl font-semibold'>Product</p>
                <button onClick={handleOpen} className='text-2xl font-semibold p-2 bg-blue-950 text-white rounded-lg'>Add Product +</button>
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
                        {products.map((product, index) => (
                            <StyledTableRow key={product.index}>
                                <StyledTableCell component="th" scope="row">
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">{product.productName}</StyledTableCell>
                                <StyledTableCell align="right">{product.description}</StyledTableCell>
                                <StyledTableCell align="right">{product.fat}</StyledTableCell>
                            </StyledTableRow>
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
                <Fade in={open}>
                    <Box sx={style}>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <p className='text-2xl font-bold'>Add New Product</p>
                                <button onClick={handleClose}>
                                    <ClearIcon className="text-black text-lg" />
                                </button>
                            </div>
                            <div className='flex flex-col space-y-5'>
                                <input type="text" placeholder='Product Name' className='p-2 rounded-lg border border-gray-700' value={productName} onChange={(e) => setProductName(e.target.value)} />
                                <textarea rows={3} name="Description" id="" placeholder='Description' className='p-2 rounded-lg border border-gray-700' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
                                        {image ? (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Preview"
                                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                                            />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                No Image Selected
                                            </Typography>
                                        )}
                                    </Box>

                                    <Button variant="contained" component="label" onChange={handleImageChanges} disabled={loadings}>
                                        Upload Image
                                        <input type="file" hidden onChange={handleImageChanges} accept="image/*" />
                                    </Button>

                                </Box>
                                <button
                                    onClick={handleAddProduct}
                                    className="w-full bg-blue-950 p-2 text-white rounded-lg font-semibold"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "SUBMIT"}
                                </button>

                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                {success && <p className="text-green-500 mt-2">Product added successfully!</p>}
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default CategoryProduct
