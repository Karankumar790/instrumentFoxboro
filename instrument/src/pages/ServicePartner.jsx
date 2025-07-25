import React, { useEffect, useState } from 'react'
import { Grid2, styled, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
        <div className="flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
            <Grid2
                size={{ lg: 4 }}
                className="bg-gray-50 min-h-[800px] w-full px-2 md:px-6"
            >
                <div className="flex flex-col rounded-lg overflow-hidden">
                    {/* Sticky Header */}
                    <div className="flex justify-center">
                        <div className="bg-white w-full sm:w-[90%] lg:w-[69%] sticky top-0 z-10 p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <p className="text-xl sm:text-2xl font-bold">
                                SERVICE PARTNERS
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="City"
                                    className="p-2 border rounded w-full sm:w-auto"
                                    value={filters.city}
                                    onChange={handleChange}
                                />
                                <input
                                    name="state"
                                    type="text"
                                    placeholder="State"
                                    className="p-2 border rounded w-full sm:w-auto"
                                    value={filters.state}
                                    onChange={handleChange}
                                />
                                <input
                                    name="country"
                                    type="text"
                                    placeholder="Country"
                                    className="p-2 border rounded w-full sm:w-auto"
                                    value={filters.country}
                                    onChange={handleChange}
                                />
                                <button
                                    className="p-2 text-base sm:text-xl bg-blue-700 text-white rounded-lg w-full sm:w-32"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 flex justify-center overflow-x-auto sm:overflow-y-auto p-4">
                        <div className="w-full sm:w-[90%] lg:w-[70%]">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Company Name</StyledTableCell>
                                            <StyledTableCell>Mobile</StyledTableCell>
                                            <StyledTableCell>Email</StyledTableCell>
                                            <StyledTableCell>City</StyledTableCell>
                                            <StyledTableCell>State</StyledTableCell>
                                            <StyledTableCell>Country</StyledTableCell>
                                            <StyledTableCell>Authorization</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {authWork?.map((row) => (
                                            <StyledTableRow key={row._id}>
                                                <StyledTableCell>{row.companyName}</StyledTableCell>
                                                <StyledTableCell>{row.phone}</StyledTableCell>
                                                <StyledTableCell>{row.email}</StyledTableCell>
                                                <StyledTableCell>{row.city}</StyledTableCell>
                                                <StyledTableCell>{row.state}</StyledTableCell>
                                                <StyledTableCell>{row.country}</StyledTableCell>
                                                <TableCell>
                                                    {row.authorize ? (
                                                        <div className="text-green-600">Authorization</div>
                                                    ) : (
                                                        "No"
                                                    )}
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </Grid2>
        </div>

    )
}

export default ServicePartner
