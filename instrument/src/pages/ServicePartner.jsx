import React from 'react'
import {Grid2,styled, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

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


    const partners = [
        {
            companyName: "Company Name 1",
            contactPerson: "C",
            telephone: "+1 234 567 890",
            mobile: "+1 987 654 321",
            email: "john@example.com",
            location: "123 Main St, New York, NY",
        },
        {
            companyName: "Company Name 2",
            contactPerson: "Jane Smith",
            telephone: "+1 345 678 901",
            mobile: "+1 876 543 210",
            email: "jane@example.com",
            location: "456 Oak Ave, Los Angeles, CA",
        },
        {
            companyName: "Company Name 3",
            contactPerson: "Robert Johnson",
            telephone: "+1 555 678 901",
            mobile: "+1 999 543 210",
            email: "robert@example.com",
            location: "789 Pine St, Chicago, IL",
        },
        {
            companyName: "Company Name 4",
            contactPerson: "Emily Davis",
            telephone: "+1 444 678 901",
            mobile: "+1 888 543 210",
            email: "emily@example.com",
            location: "321 Maple Ave, Houston, TX",
        },
        {
            companyName: "Company Name 5",
            contactPerson: "Michael Brown",
            telephone: "+1 333 678 901",
            mobile: "+1 777 543 210",
            email: "michael@example.com",
            location: "654 Birch Rd, San Francisco, CA",
        },
    ];

    return (
        <div>
            <Header />

            <Grid2 size={{ lg: 4 }} >
                <div className="h-[100vh] flex flex-col border rounded-lg overflow-hidden">
                    {/* Sticky Header */}
                    <div className="bg-white sticky top-0 z-10 p-4 border-b flex justify-between items-center">
                        <p className=" text-2xl font-bold">SERVICE PARTNERS</p>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="State"
                                className="p-2 border rounded"
                            />
                             <input
                                type="text"
                                placeholder="Country"
                                className="p-2 border rounded"
                            />
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
                                    {rows?.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                             {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.calories}</StyledTableCell>
                                            <StyledTableCell>{row.fat}</StyledTableCell>
                                            <StyledTableCell>
                                               {row.fat}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.fat}</StyledTableCell>
                                            <StyledTableCell>{row.fat}</StyledTableCell>
                                            <StyledTableCell>{row.fat}</StyledTableCell>
                                            <StyledTableCell>{row.fat}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>
            </Grid2>

            <Footer />
        </div>
    )
}

export default ServicePartner
