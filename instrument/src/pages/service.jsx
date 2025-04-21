import React from "react";
import {
  Box,
  Button,
  Card,
  Grid2,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

function service() {
  const customer = [
    {
      Text: "Name",
      Value: "",
    },
    {
      Text: "Mobile",
      Value: "",
    },
    {
      Text: "Email",
      Value: "",
    },
    {
      Text: "Position",
      Value: "",
    },
    {
      Text: "Company ",
      Value: "",
    },
  ];
  const Details = [
    {
      Text: "City",
      Value: "",
    },
    {
      Text: "State",
      Value: "",
    },
    {
      Text: "Country",
      Value: "",
    },

    // {
    //   Text: "Problem",
    //   Value: "",
    // },
  ];

  const partners = [
    {
      companyName: "Company Name 1",
      contactPerson: "John Doe",
      telephone: "+1 234 567 890",
      mobile: "+1 987 654 321",
      email: "john@example.com",
      location: "123 Main St, New York, NY",
    },
    {
      companyName: "Company Name 2",
      contactPerson: "Jane Smith",
      telephone: "+1 345 678 901",
      mobile: "+1 876 543 210",
      email: "jane@example.com",
      location: "456 Oak Ave, Los Angeles, CA",
    },
    {
      companyName: "Company Name 3",
      contactPerson: "Robert Johnson",
      telephone: "+1 555 678 901",
      mobile: "+1 999 543 210",
      email: "robert@example.com",
      location: "789 Pine St, Chicago, IL",
    },
    {
      companyName: "Company Name 4",
      contactPerson: "Emily Davis",
      telephone: "+1 444 678 901",
      mobile: "+1 888 543 210",
      email: "emily@example.com",
      location: "321 Maple Ave, Houston, TX",
    },
    {
      companyName: "Company Name 5",
      contactPerson: "Michael Brown",
      telephone: "+1 333 678 901",
      mobile: "+1 777 543 210",
      email: "michael@example.com",
      location: "654 Birch Rd, San Francisco, CA",
    },
  ];


  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
  });
  return (
    <div className="min-h-screen flex flex-col flex-1">
      <Header />
      <Grid2
        container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent:'center',
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
              backgroundColor:"#ECECEC"
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
                backgroundColor:"#ECECEC"
              }}
              
            >


              <Grid2 container spacing={2} mt={1} width="90%" gap={13} >
                <Grid2 xs={6}>
                  <label className="flex items-start gap-4 mb-4">
                    <input type="radio" name="service" className="size-5 mt-1" />
                    <p className="text-base font-semibold">Remote Maintenance Rs. 6000/service</p>
                  </label>
                </Grid2>
                <Grid2 xs={6}>
                  <label className="flex items-start gap-4 mb-4">
                    <input type="radio" name="service" className="size-5 mt-1" />
                    <p className="text-base font-semibold">Physical Maintenance Rs. 25000/service</p>
                  </label>
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2} mt={1} width="90%" gap={6}>
                <Grid2 xs={6}>
                  <label className="flex items-start gap-4 mb-4">
                    <input type="radio" name="service" className="size-5 mt-1" />
                    <p className="text-base font-semibold">Maintenance & Stay in Audits Rs. 40000/4 day</p>
                  </label>
                </Grid2>
                <Grid2 xs={6}>
                  <label className="flex items-start gap-4 mb-4">
                    <input type="radio" name="service" className="size-5 mt-1" />
                    <p className="text-base font-semibold">System Under Warranty Rs. 0/service</p>
                  </label>
                </Grid2>
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
                {[...customer, ...Details].map((value, index) => (
                  <Grid2 item xs={12} md={6} key={index}>
                    <Box display="flex" alignItems="center" >
                      <Typography variant="h6" sx={{ minWidth: "130px" }}>
                        {value.Text}
                      </Typography>
                      <TextField
                        sx={{ minWidth: "350px" }}
                        size="small"
                        variant="outlined"
                        value={value.Value}
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
                  >
                    Generate Estimate
                  </Button>
                </Box>
              </div>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
      <Footer />
    </div>
  );
}
export default service;
