import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otpLogin } from './loginSlice';

const OTPModal = ({ open, onClose, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state) => state.auth);

  const handleSubmitOtp = async () => {
    setLoading(true);
    try {
      const response = await dispatch(otpLogin({ otp, email })).unwrap();
      
      if (response?.user?.role === 'admin') {
        navigate('/admin');
      } else if (response?.user?.role === 'service_manager') {
        navigate('/admin/serviceEstimate');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="flex flex-col gap-6 items-center h-full w-full">
          <p className="text-2xl font-semibold">Enter OTP To Verify</p>

          <div className="flex justify-center w-full">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                width: '100%',
                maxWidth: '2.5rem',
                height: '4vh',
                fontSize: '18px',
                border: '2px solid black',
                color: 'black',
                textAlign: 'center',
                margin: '0 0.5rem',
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleSubmitOtp}
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying...' : 'Submit'}
          </Button>

          {error && <p className="text-red-500">{error}</p>}

          <p className="text-sm text-blue-600 cursor-pointer hover:underline">
            Resend One-Time Password
          </p>
        </div>
      </Box>
    </Modal>
  );
};

export default OTPModal;