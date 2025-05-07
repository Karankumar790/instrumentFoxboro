import React, { useEffect, useState } from 'react'
import { Grid2, styled, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PageContainer from '../components/HOC/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorize, searchWorkFox } from '../AdminDashoard/ServiceManager/ManagerWorkFox/ManagerWorkSlice';

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
    createData('C', '+1 234 567 890', 6.0, 24, 4.0),
    createData('Jane Smith', 237, 9.0, 37, 4.3),
    createData('Robert Johnson"', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function ServicePartner() {

    const dispatch = useDispatch();
    const { authWork, loading } = useSelector((state) => state.managerFoxboro);

    const [filters, setFilters] = useState({
        city: '',
        state: '',
        country: ''
    });

    // ✅ Handle input change
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    // ✅ Handle Search Button
    const handleSearch = () => {
        dispatch(searchWorkFox(filters));
    };

    useEffect(() => {
        dispatch(getAuthorize())
    }, [dispatch])

    return (
        <PageContainer showheader="true" showfooter="true" className=' flex flex-col overflow-hidden'>
            <Grid2 size={{ lg: 4 }} >
                <div className=" flex flex-col border rounded-lg overflow-hidden">
                    {/* Sticky Header */}
                    <div className="bg-white sticky top-0 z-10 p-4 border-b flex justify-between items-center">
                        <p className=" text-2xl font-bold">SERVICE PARTNERS</p>
                        <div className="flex gap-4">
                            <input
                                name="city"
                                type="text"
                                placeholder="City"
                                className="p-2 border rounded"
                                value={filters.city}
                                onChange={handleChange}
                            />
                            <input
                                name="state"
                                type="text"
                                placeholder="State"
                                className="p-2 border rounded"
                                value={filters.state}
                                onChange={handleChange}
                            />
                            <input
                                name="country"
                                type="text"
                                placeholder="Country"
                                className="p-2 border rounded"
                                value={filters.country}
                                onChange={handleChange}
                            />
                            <button
                                className="p-2 text-xl bg-blue-700 text-white rounded-lg w-32"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* {partners.map((partner, index) => (
                            <div key={index} className="p-4 rounded-lg">
                                <p className="font-bold mb-2">{partner.companyName}</p>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <div className="flex gap-3">
                                        <p className="text-sm text-gray-500">Contact Person:</p>
                                        <p>{partner.contactPerson}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p className="text-sm text-gray-500">Telephone:</p>
                                        <p>{partner.telephone}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <div className="flex gap-3">
                                        <p className="text-sm text-gray-500">Mobile:</p>
                                        <p>{partner.mobile}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p className="text-sm text-gray-500">Email:</p>
                                        <p>{partner.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <p className="text-sm text-gray-500">Location:</p>
                                    <p>{partner.location}</p>
                                </div>
                            </div>
                        ))} */}

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Service Partner</StyledTableCell>
                                        <StyledTableCell>Contact Person</StyledTableCell>
                                        <StyledTableCell>Mobile</StyledTableCell>
                                        <StyledTableCell >Email</StyledTableCell>
                                        <StyledTableCell >City</StyledTableCell>
                                        <StyledTableCell >State</StyledTableCell>
                                        <StyledTableCell >Country</StyledTableCell>
                                        <StyledTableCell >Authazation</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {authWork?.map((row) => (
                                        <StyledTableRow key={row._id}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell><StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.phone}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell>
                                                {row.city}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.state}</StyledTableCell>
                                            <StyledTableCell>{row.country}</StyledTableCell>

                                            <TableCell>{row.authorize ? 'Yes' : 'No'}</TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>
            </Grid2>
        </PageContainer>
    )
}

export default ServicePartner
