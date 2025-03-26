import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otpLogin } from './loginSlice';
import { otpSignUp } from '../SignUp/SignUpSlice';

const OTPModal = ({ open, onClose, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useSelector((state) => state.signUp);

  const handleSubmitOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      let response;

      if (!email) {
        // If no email, call otpSignUp
        response = await dispatch(otpSignUp({ otp, token })).unwrap();
        handleResponse(response, '/login', '/');
      } else {
        // If email exists, call otpLogin
        response = await dispatch(otpLogin({ otp, email })).unwrap();
        handleResponse(response, '/admin', '/login');
      }
    } catch (error) {
      setOtp('');
      onClose(false);
      setError(error.message || "Error processing OTP");
      alert(error.message || "Error processing OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (response, successRedirect, failureRedirect) => {
    if (response?.success) {
      setOtp('');
      onClose(false);
      navigate(successRedirect);
    } else {
      setOtp('');
      onClose(false);
      navigate(failureRedirect);
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

          {/* OTP Input */}
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

          {/* Submit Button */}
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleSubmitOtp}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Submit'}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Success Message */}
          {message && <p className="text-green-500">{message}</p>}

          <p className="text-sm text-blue-600 cursor-pointer hover:underline">
            Resend One-Time Password
          </p>
        </div>
      </Box>
    </Modal>
  );
};

export default OTPModal;