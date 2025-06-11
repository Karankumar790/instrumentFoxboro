import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid2,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { postEstimate } from "./ServiceSlice";
import { useDispatch } from "react-redux";

function service() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    position: "",
    company: "",
    city: "",
    state: "",
    country: "",
    problemDescription: "",
    serviceMethod: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      serviceMethod: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(postEstimate(formData)).unwrap();

      setSnackbar({
        open: true,
        message: result.message || "Estimate generated successfully",
        severity: "success",
      });

      // Reset form only on success
      setFormData({
        name: "",
        mobileNumber: "",
        email: "",
        position: "",
        company: "",
        city: "",
        state: "",
        country: "",
        problemDescription: "",
        serviceMethod: "",
      });
    } catch (error) {
      console.error("Estimate error:", error);
      setSnackbar({
        open: true,
        message: error || "Failed to generate estimate",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fields = [
    { label: "Name", key: "name" },
    { label: "Mobile", key: "mobileNumber" },
    { label: "Email", key: "email" },
    { label: "Position", key: "position" },
    { label: "Company", key: "company" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Country", key: "country" },
  ];

  const services = [
    "Remote Maintenance Rs. 6000/service",
    "Physical Maintenance Rs. 25000/service",
    "Maintenance & Stay in Audits Rs. 40000/4 day",
    "System Under Warranty Rs. 0/service",
  ];

  return (
    <div className=" flex flex-col justify-between overflow-x-hidden bg-gray-50">
      <Grid2
        container
        sx={{
          height: "800px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bg-gray-50"
      >
        <Grid2 size={{ lg: 6.5, md: 10, xs: 12 }}>
          <Card
            sx={{
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: "#ECECEC",
            }}
          >
            {/* Sticky Header */}
            <Typography
              variant="h5"
              fontWeight="bold"
              className="border bg-green-400 px-5 h-14 p-3"
            >
              Generate Estimate (Self Service )
            </Typography>
            <Box
              sx={{
                bgcolor: "background.paper",
                position: "sticky",
                top: 0,
                px: 3,
                py: 2,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#ECECEC",
              }}
            >
              <Grid2 container spacing={2}>
                {services.map((service, idx) => {
                  const [title, price] = service.split(" Rs.");
                  return (
                    <Grid2 item xs={6} key={idx} >
                      <label className="flex items-start gap-4 mb-2">
                        <input
                          type="radio"
                          name="serviceMethod"
                          className="size-5 mt-1"
                          checked={formData.serviceMethod === service}
                          onChange={() => handleServiceChange(service)}
                        />
                        <div className="flex flex-col">
                          <span className="text-base font-semibold">{title}</span>
                          <span className="text-sm text-gray-700">Rs. {price}</span>
                        </div>
                      </label>
                    </Grid2>
                  );
                })}
              </Grid2>

            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                px: 3,
                py: 2,
              }}
            >
              <Grid2 container spacing={2}>
                {[...fields].map((field, index) => (
                  <Grid2 item xs={12} md={6} key={index}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6" sx={{ minWidth: "110px", display: 'flex', justifyContent: 'end', marginRight: '25px' }}>
                        {field.label}
                      </Typography>
                      <TextField
                        sx={{ minWidth: "340px",backgroundColor:'white' }}
                        size="small"
                        variant="outlined"
                        value={formData[field.key]}
                        onChange={handleChange(field.key)}
                        fullWidth
                      />
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
              <Grid2 size={{lg:'12', md:'10', sm:'8', xs:'6'}} className='mt-5 ml-5  pr-4' >
                <TextField
                  multiline
                  fullWidth
                  rows={4}
                  placeholder="Service Description"
                  sx={{backgroundColor:'white' }}
                  value={formData.problemDescription}
                  onChange={handleChange("problemDescription")}
                />

                <Box
                  width="100%"
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="end"
                  mt={3}
                  mb={2}
                >
                  <button
                    sx={{
                      width: "20%",

                      minWidth: "150px",
                      // bgcolor: "green",
                      // "&:hover": { bgcolor: "darkgreen" },
                    }}
                    // variant="contained"
                    className="font-bold bg-green-400 w-[20%] p-2 rounded-md text-lg"
                    onClick={handleSubmit}
                  >
                    Generate Estimate
                  </button>
                </Box>
              </Grid2>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default service;
