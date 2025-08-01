import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import OTPModal from "../Login/OTPModal";
import { useDispatch, useSelector } from "react-redux";
import { otpSignUp, register } from "./SignUpSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { loading, error, message } = useSelector((state) => state.signUp);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    avatar: null,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("password", formData.password);

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar); // Append the file correctly
    }
    console.log(register(formDataToSend), "token from register api");
    dispatch(register(formDataToSend)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        console.log(action.payload, "Response Data from API");
        console.log(action.payload.user, "User Data");

        setOpenModal(true); // Open modal after successful registration
      }
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, avatar: file })); // Store the file object
    }
  };

  const [openModals, setOpenModals] = useState(false);

  const sigupToken = useSelector((state) => state.signUp?.token);
  const handleSignupOtpSubmit = async (otp) => {
    try {
      const response = await dispatch(otpSignUp({ otp, token: sigupToken }));
      console.log(response, "response from signup page of otp");
      if (response.payload.success) {
        alert("OTP Verified! Account created.");
        setOpenModals(false);
        navigate("/login");
      } else {
        alert("OTP verification failed.");
      }
    } catch (error) {
      alert("Error verifying OTP.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await dispatch(resendOtp({ email })).unwrap();
      setResendMessage(response.message || "OTP sent again!");
      setResendTimer(30); // Start 30-second countdown
    } catch (error) {
      setResendMessage(error || "Failed to resend OTP");
    }

    setTimeout(() => setResendMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <>
      <div className="min-h-screen  flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
        <div className="flex justify-center items-center bg-gray-50 flex-grow overflow-hidden">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-1 text-center ">
                Foxboro Instruments Company
              </h2>
              <div className="w-full flex justify-center">
                <p className="text-black" >Employee Registration</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-6 ">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                size="small"
                value={formData.username}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                size="small"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phone"
                size="small"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                name="password"
                size="small"
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                type="file"
                fullWidth
                margin="normal"
                name="avatar"
                size="small"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {loading ? "logging in" : "signup"}
              </Button>
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Success Message */}
              {message && (
                <p className="text-green-500 text-center">{message}</p>
              )}
            </form>
          </div>
        </div>

        <OTPModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          email={formData.email}
          sign={true}
          handleSignupOtpSubmit={handleSignupOtpSubmit}
        />
      </div >
    </>

  );
};

export default SignUpPage;