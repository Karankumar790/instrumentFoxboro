import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import PageContainer from "../../components/HOC/PageContainer";
import { postEstimate } from "./ServiceSlice";
import { useDispatch } from "react-redux";

function service() {

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
  })



  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      serviceMethod: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(postEstimate(formData));
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
    })
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
    <PageContainer showheader="true" showfooter="true" className=' flex flex-col overflow-hidden'>
      <Grid2
        container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className='bg-slate-200'

      >

        <Grid2 size={{ lg: 6.5 }} >
          <Card
            sx={{
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: "#ECECEC"
            }}

          >
            {/* Sticky Header */}
            <Typography variant="h5" fontWeight="bold" className="border bg-green-400 px-5 h-10 ">
              Generate Estimate (Self Service)
            </Typography>
            <Box
              sx={{
                bgcolor: "background.paper",
                position: "sticky",
                top: 0,
                px: 3,
                py: 2,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#ECECEC"
              }}
            >

              <Grid2 container spacing={2}>
                {services.map((service, idx) => (
                  <Grid2 item xs={6} key={idx}>
                    <label className="flex items-start gap-4 mb-2">
                      <input
                        type="radio"
                        name="serviceMethod"
                        className="size-5 mt-1"
                        checked={formData.serviceMethod === service}
                        onChange={() => handleServiceChange(service)}
                      />
                      <p className="text-base font-semibold">{service}</p>
                    </label>
                  </Grid2>
                ))}
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
                    <Box display="flex" alignItems="center" >
                      <Typography variant="h6" sx={{ minWidth: "130px" }}>
                        {field.label}
                      </Typography>
                      <TextField
                        sx={{ minWidth: "350px" }}
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
              <div >
                <Grid2 item xs={12} mt={2}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Service Description"
                    sx={{ width: "100%", minWidth: "470px" }}
                    value={formData.problemDescription}
                    onChange={handleChange("problemDescription")}
                  />
                </Grid2>

                <Box width="100%" display="flex" justifyContent="flex-end" alignItems="end" mt={3} mb={2} >
                  <Button
                    sx={{
                      width: "20%",
                      minWidth: "150px",
                      bgcolor: "orange",
                      "&:hover": { bgcolor: "darkorange" },

                    }}
                    variant="contained"
                    className="font-bold"
                    onClick={handleSubmit}
                  >
                    Generate Estimate
                  </Button>
                </Box>
              </div>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
export default service;
