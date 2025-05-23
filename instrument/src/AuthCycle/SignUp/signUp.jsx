import React, { useEffect, useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import OTPModal from "../Login/OTPModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
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

        // const token = action.payload.user; // Extract user data
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

  //   const token = localStorage.getItem("authToken");
  //   console.log("signUp token", sigupToken);
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

  return (
    <>
      <div className="bg-cover  bg-[url('/login.jpg')] w-full h-full">
        <Header />
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center ">
              Foxboro Instruments
            </h2>
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
        <Footer />
      </div>
      {/* OTP Modal */}
      {/* <OTPModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        email={formData.email}
        token
        sign={true}
        onOtpSubmit={() => {
          handleSignupOtpSubmit;
        }}
      /> */}

      <OTPModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        email={formData.email}
        sign={true}
        handleSignupOtpSubmit={handleSignupOtpSubmit} // <-- Correct prop name
      />
    </>
  );
};

export default SignUpPage;