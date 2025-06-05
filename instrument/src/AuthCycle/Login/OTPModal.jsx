import React, { useEffect, useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otpLogin, resendOtp } from "./loginSlice";

const OTPModal = ({ open, onClose, email, sign, handleSignupOtpSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSubmitOtp = async () => {
    setLoading(true);
    try {
      const response = await dispatch(otpLogin({ otp, email })).unwrap();

      if (response?.user?.role === "admin") {
        navigate("/admin");
      } else if (response?.user?.role === "service_manager") {
        navigate("/admin/serviceEstimate");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (sign) return;
    try {
      const response = await dispatch(resendOtp({ email })).unwrap();
      setResendMessage(response.message || "OTP sent again!");
      setResendTimer(30); // Start 30-second countdown
    } catch (error) {
      setResendMessage(error || "Failed to resend OTP");
    }

    setTimeout(() => setResendMessage(""), 3000); // Clear message after 3 seconds
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
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
                width: "100%",
                maxWidth: "2.5rem",
                height: "4vh",
                fontSize: "18px",
                border: "2px solid black",
                color: "black",
                textAlign: "center",
                margin: "0 0.5rem",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={
              sign
                ? () => {
                    handleSignupOtpSubmit(otp); // properly invoke the function
                  }
                : handleSubmitOtp
            }
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Submit"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}

          {resendMessage && <p className="text-green-600">{resendMessage}</p>}

          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend available in {resendTimer}s...
            </p>
          ) : (
            <p
              className="text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={handleResendOtp}
            >
             {!sign && <p>Resend One-Time Password</p>} 
            </p>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default OTPModal;
