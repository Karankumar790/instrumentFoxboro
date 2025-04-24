import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteService, getService } from './AdminServiceSlice';



function SupportTable() {
  // const [rows, setRows] = useState({
  //   Firstname: "",
  //   Lastname: "",
  //   Mobile: "",
  //   Email: "",
  //   Companyname: "",
  //   Position: "",
  //   Country: "",
  //   State: "",
  //   Message: "",
  // });

  const { serviceAdm, loading } = useSelector((state) => state.service);
  const rows = serviceAdm?.getServiceData || [];

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteService(id))
  };

  useEffect(() => {
    dispatch(getService())
  }, [dispatch])

  return (
    <>
      <p className='text-2xl font-bold'>Enquire</p>
      <TableContainer component={Paper} className="mt-6">
        <Table>
          <TableHead sx={{ backgroundColor: '#1e3a8a' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mobile No.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Country</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>State</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Message</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.Firstname}</TableCell>
                <TableCell>{row.Lastname}</TableCell>
                <TableCell>{row.Mobile}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Companyname}</TableCell>
                <TableCell>{row.Position}</TableCell>
                <TableCell>{row.Country}</TableCell>
                <TableCell>{row.State}</TableCell>
                <TableCell>{row.Message}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SupportTable;
