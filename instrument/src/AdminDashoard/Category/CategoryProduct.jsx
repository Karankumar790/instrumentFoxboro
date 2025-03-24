import React, { useState } from 'react'
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
    const [image, setImage] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
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
                                <input type="text" placeholder='Product Name' className='p-2 rounded-lg border border-gray-700' />
                                <textarea rows={3} name="Description" id="" placeholder='Description' className='p-2 rounded-lg border border-gray-700'></textarea>
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

                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                                    </Button>

                                </Box>
                                <button className='w-full bg-blue-950 p-2 text-white rounded-lg font-semibold'>SUBMIT</button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default CategoryProduct
