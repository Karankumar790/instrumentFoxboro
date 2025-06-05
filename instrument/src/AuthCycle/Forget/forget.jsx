import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forget, resetPassword } from '../Forget/forgetSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import { Modal, Box, TextField, Button, Alert, CircularProgress } from '@mui/material';
import PageContainer from '../../components/HOC/PageContainer';

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.authForget);
  
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle email submission for OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forget({ email })).then((res) => {
      if (res.payload?.success) {
        setOpen(true);
      }
    });
  };

  // Handle password reset submission
  const handleResetSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(resetPassword({ email, ...formData })).then((res) => {
      if (res.payload?.success) {
        setOpen(false);
        alert("Password reset successfully!");
      }
    });
  };

  return (
      <PageContainer showheader='true' showfooter='true' className='bg-sky-200 flex flex-col overflow-hidden'>
    <div className='flex justify-center items-center bg-gray-50 flex-grow overflow-hidden'>
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded mt-2" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Reset Password"}
            </button>
          </form>
        </div>

      {/* Modal for OTP & Password Reset */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <TextField 
            label="Email Address" 
            fullWidth 
            margin="normal" 
            value={email} 
            disabled
          />
          <TextField 
            label="OTP" 
            fullWidth 
            margin="normal" 
            value={formData.otp} 
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            required
          />
          <TextField 
            label="New Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={formData.newPassword} 
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />
          <TextField 
            label="Confirm Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={formData.confirmPassword} 
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            className="mt-4"
            onClick={handleResetSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Reset Password"}
          </Button>
        </Box>
      </Modal>
    </div>
    </PageContainer>
  );
}

export default ForgotPassword;
