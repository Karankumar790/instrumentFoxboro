import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Backdrop, Box, Button, Fade, Grid2, Modal, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
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

function createData(name, calories, fat, carbs, protein, calcium, cat, lion, tiger, dear) {
    return { name, calories, fat, carbs, protein, calcium, cat, lion, tiger, dear };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 5, 76, 65, 55),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 6, 7, 9, 56),
    createData('Eclair', 262, 16.0, 24, 6.0, 32, 45, 12, 52),
    createData('Cupcake', 305, 3.7, 67, 4.3, 34, 44, 78, 59),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 65, 35, 23, 51),
];

function support() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const images_animation = [
        "https://www.beckhoff.com/media/pictures/stages/news/distributed-drive-technology-stage-lowres_webp_85.webp",
        "https://www.beckhoff.com/media/pictures/stages/news/application-report-tetra-pak-stage-lowres_webp_85.webp",
        "https://www.beckhoff.com/media/pictures/stages/news/produktneuheiten-sps-2024-stage-lowres_webp_85.webp",
        "https://www.beckhoff.com/media/pictures/stages/news/hvide-sand-seasight-stage_webp_85.webp",
        "https://www.beckhoff.com/media/pictures/stages/news/twincat-plc-plus-plus-starting-page-stage-lowres_webp_85.webp",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle next image
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images_animation.length);
    };

    // Auto-change banner every 3 seconds
    useEffect(() => {
        const interval = setInterval(handleNext, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <Header />
            <Grid2 container className='space-x-7 gap-10 space-y-14'>
                <Box display="flex" justifyContent="center" width='100%' height="30vh">
                    <img
                        src={images_animation[currentIndex]}
                        alt="Carousel"
                        style={{ maxHeight: "100%", maxWidth: "100%", width: "100%" }}
                    />
                </Box>
            </Grid2>
            <Grid2 container sx={{ display: 'flex' }} >
                <Grid2 size={{ lg: 10 }}>
                    <Grid2 size={{ lg: 12 }} p={2} >
                        <Box sx={{ width: '100%', height: '100%' }} className='space-y-5 '>
                            <div className="w-full">
                                {/* <input type="search" className="w-full p-2 outline-none" placeholder="Search..." />
                                <button className="bg-blue-500 text-white px-4 py-2">Search</button> */}
                                <p className='text-lg font-semibold'>Jobs</p>
                            </div>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Company Name</StyledTableCell>
                                            <StyledTableCell align="right">Country</StyledTableCell>
                                            <StyledTableCell align="right">State</StyledTableCell>
                                            <StyledTableCell align="right">Position</StyledTableCell>
                                            <StyledTableCell align="right">Experience</StyledTableCell>
                                            <StyledTableCell align="right">Openings</StyledTableCell>
                                            <StyledTableCell align="right">Recruiter</StyledTableCell>
                                            <StyledTableCell align="right">Mobile</StyledTableCell>
                                            <StyledTableCell align="right">Email</StyledTableCell>
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
                                                <StyledTableCell align="right">{row.calcium}</StyledTableCell>
                                                <StyledTableCell align="right">{row.cat}</StyledTableCell>
                                                <StyledTableCell align="right">{row.lion}</StyledTableCell>
                                                <StyledTableCell align="right">{row.tiger}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='w-full flex justify-end '>
                                <button className="bg-blue-500 text-white px-4 py-2" onClick={handleOpen}>Add Post Job</button>
                            </div>
                        </Box>
                    </Grid2>
                    <Grid2 size={{ lg: 12 }} p={2}>
                        <Box sx={{ width: '100%' }} className='space-y-5'>
                            <div className="w-full">
                                {/* <input type="search" className="w-full p-2 outline-none" placeholder="Search..." />
                                <button className="bg-blue-500 text-white px-4 py-2">Search</button> */}
                                <p className='text-lg font-semibold'>Apply for Jobs</p>

                            </div>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Photo</StyledTableCell>
                                            <StyledTableCell align="right">Name</StyledTableCell>
                                            <StyledTableCell align="right">Mobile</StyledTableCell>
                                            <StyledTableCell align="right">Email</StyledTableCell>
                                            <StyledTableCell align="right">Stream</StyledTableCell>
                                            <StyledTableCell align="right">Experience</StyledTableCell>
                                            <StyledTableCell align="right">Country</StyledTableCell>
                                            <StyledTableCell align="right">Salary</StyledTableCell>
                                            <StyledTableCell align="right">Email</StyledTableCell>
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
                                                <StyledTableCell align="right">{row.calcium}</StyledTableCell>
                                                <StyledTableCell align="right">{row.cat}</StyledTableCell>
                                                <StyledTableCell align="right">{row.lion}</StyledTableCell>
                                                <StyledTableCell align="right">{row.tiger}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <div className='w-full flex justify-end '>
                                <button className="bg-blue-500 text-white px-4 py-2">Add Post Job</button>
                            </div>

                        </Box>
                    </Grid2>
                </Grid2>
                {/* <Grid2 size={{ lg: 2 }} >
                    <Box display="flex" justifyContent="center" height="90vh">
                        <img
                            src={images_animation[currentIndex]}
                            alt="Carousel"
                            style={{ maxHeight: "100%", maxWidth: "100%", width: "100%" }}
                        />
                    </Box>
                </Grid2> */}
            </Grid2>

            <Modal
                aria-labelledby="job-post-modal-title"
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
                        <Box display="flex" justifyContent="space-between">
                            <Typography id="modal-title" variant="h6">
                                Add Post Job
                            </Typography>
                            <Button onClick={handleClose}>
                                <ClearIcon className="text-black text-lg" />
                            </Button>
                        </Box>
                        <hr className="mb-4" />
                        <div className="grid grid-cols-3 gap-4">
                            <TextField label="Company Name" fullWidth variant="outlined" />
                            <TextField label="Country" fullWidth variant="outlined" />
                            <TextField label="State" fullWidth variant="outlined" />
                            <TextField label="Position" fullWidth variant="outlined" />
                            <TextField label="Experience" fullWidth variant="outlined" />
                            <TextField label="Openings" fullWidth variant="outlined" />
                            <TextField label="Recruiters" fullWidth variant="outlined" />
                            <TextField label="Mobile" fullWidth variant="outlined" />
                            <TextField label="Email" fullWidth variant="outlined" />
                        </div>
                        <div className="mt-4 text-right">
                            <Button variant="contained" className="bg-green-500 text-white" onClick={handleClose}>
                                Submit
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default support
