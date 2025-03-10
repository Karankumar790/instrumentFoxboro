import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import OTPModal from "./OTPModal";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SignUpPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    Avtar: "",
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file,"file receiving!")
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  }
  console.log("Form Data Submitted:");
  console.log("Name:", formData.name);
  console.log("Email:", formData.email);
  console.log("Phone:", formData.phone);
  console.log("Password:", formData.password);
  console.log("Confirm Password:", formData.confirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setOpenModal(true); // Open modal after form submission
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
                name="name"
                size="small"
                value={formData.name}
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
                label="confirmpassword"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                name="confirmPassword"
                size="small"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{mb:"10px"}}
              >
                Photo Upload
                  <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
               
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </div>
          {/* OTP Modal */}
          <OTPModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SignUpPage;
