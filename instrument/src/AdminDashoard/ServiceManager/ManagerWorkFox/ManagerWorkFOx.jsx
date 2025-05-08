import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, CircularProgress
} from '@mui/material';
import { getWorkFox, authorizePartner, getAuthorize, deleteWorkFox } from '../../ServiceManager/ManagerWorkFox/ManagerWorkSlice'; // adjust path
import DeleteIcon from '@mui/icons-material/Delete';

function ManagerWorkFOx() {
  const dispatch = useDispatch();

  const { workFox, authWork, loading } = useSelector((state) => state.managerFoxboro);

  useEffect(() => {
    dispatch(getWorkFox());
    dispatch(getAuthorize());
  }, [dispatch]);

  const handleAuthorize = (id) => {
    dispatch(authorizePartner(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteWorkFox(id))
  }

  return (
    <>
      <div className='mb-80'>
        <TableContainer component={Paper}  sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1e3a8a' }}>
              <TableRow>
                {['Name', 'Phone', 'Email', 'City', 'State', 'Country', 'Authorized', 'Action'].map((header) => (
                  <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center"><CircularProgress /></TableCell>
                </TableRow>
              ) : (
                workFox.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.state}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.authorize ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={user.authorize ? 'primary' : 'primary'}
                        onClick={() => handleAuthorize(user._id)}
                      >
                        {user.authorize ? 'Authorize' : 'Authorize'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <TableContainer component={Paper}  sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1e3a8a' }}>
              <TableRow>
                {['Name', 'Phone', 'Email', 'City', 'State', 'Country', 'Authorized', 'Action'].map((header) => (
                  <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center"><CircularProgress /></TableCell>
                  </TableRow>
                ) : (
                  authWork.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.city}</TableCell>
                      <TableCell>{user.state}</TableCell>
                      <TableCell>{user.country}</TableCell>
                      <TableCell>{user.authorize ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <DeleteIcon className='text-red-700' onClick={() => handleDelete(user?._id)} />
                      </TableCell>
                    </TableRow>
                  ))
                )
              }

            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ManagerWorkFOx;
