import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
  Pagination
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getEstimate } from './serviceSlice';



function SeviceEstimate() {

  const { quotations, pagination } = useSelector((state) => state.serviceManager);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getEstimate({ page, limit:8 }))
  }, [dispatch, page])


  const handlePageChange = ( event,value) => {
    setPage(value);
  };

  return (
    <>
      <p className='text-2xl font-bold'>Service Estimate</p>
      <TableContainer component={Paper} className="mt-6">
        <Table>
          <TableHead sx={{ backgroundColor: '#1e3a8a' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>quotationNumber</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>mobileNumber</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>position</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>State</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Country</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>serviceMethod</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>serviceNumber</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>problemDescription</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {quotations?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quotationNumber}</TableCell>
                <TableCell>{row.mobileNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.serviceMethod}</TableCell>
                <TableCell>{row.serviceNumber}</TableCell>
                <TableCell>{row.problemDescription}</TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-end mt-4">
        <Pagination
          count={pagination?.totalPages || 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default SeviceEstimate;
