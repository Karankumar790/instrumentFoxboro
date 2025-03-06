import React, { useState } from 'react';
import { Modal,  Button, Box } from '@mui/material';
import OTPInput from "react-otp-input";


const OTPModal = ({ open, onClose }) => {
  const [otp, setOtp] = useState('');

  // const handleOtpChange = (e) => {
  //   setOtp(e.target.value);
  // };

  // const handleSubmitOtp = () => {
  //   // Handle OTP submission
  //   alert('OTP Submitted: ' + otp);
  //   onClose(); // Close modal after submission
  // };
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
                    <div className="flex flex-col gap-8 items-center h-full w-full">
                        <p className="text-4xl">Enter OTP To Verify</p>
                        <div className="flex justify-center  w-full ">
                            <OTPInput
                                inputStyle={{
                                    width: "100%",
                                    maxWidth: "2.5rem",
                                    height: "4vh",
                                    fontSize: "18px",
                                    border: "2px solid black",
                                    color: "black",
                                    textAlign: "center",
                                    margin: "0 0.5rem",
                                }}
                                numInputs={6}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        <Button variant="contained" type="submit" size="small" fullWidth >Submit</Button>
                        <p className="text-2xl"> Resend One-Time Password</p>
                    </div>
                </Box>
    </Modal>
  );
};

export default OTPModal;
