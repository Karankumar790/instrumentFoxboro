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
import Services from "../../public/assets/service.webp";
import PageContainer from "../components/HOC/PageContainer";
import Header from "../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
    {
      Text: "ZIP Code",
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
    <>
      <Header />
      <Grid2
        container
        sx={{
          height: "84.2vh",
          // backgroundImage: `url(${Services})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px"
        }}

      >

        <Grid2 size={{ lg: 4 }}>
          <Card
            sx={{
              borderRadius: "20px",
              height: "83vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Sticky Header */}
            <Box
              sx={{
                bgcolor: "background.paper",
                position: "sticky",
                top: 0,
                zIndex: 1,
                px: 3,
                py: 2,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Find Service Engineer Near You
              </Typography>

              <Grid2 container spacing={2} mt={2}>
                <Grid2 xs={6}>
                  <label className="flex items-center gap-4">
                    <input type="radio" name="service" className="size-5" />
                    <p className="text-base font-semibold">Remote Maintenance Rs. 6000/service</p>
                  </label>
                </Grid2>
                <Grid2 xs={6}>
                  <label className="flex items-center gap-4">
                    <input type="radio" name="service" className="size-5" />
                    <p className="text-base font-semibold">Physical Maintenance Rs. 25000/service</p>
                  </label>
                </Grid2>
                <Grid2 xs={6}>
                  <label className="flex items-center gap-4">
                    <input type="radio" name="service" className="size-5" />
                    <p className="text-base font-semibold">Maintenance & Stay in Audits Rs. 40000/4 day</p>
                  </label>
                </Grid2>
                <Grid2 xs={6}>
                  <label className="flex items-center gap-4">
                    <input type="radio" name="service" className="size-5" />
                    <p className="text-base font-semibold">System Under Warranty</p>
                  </label>
                </Grid2>
              </Grid2>
            </Box>

            {/* Scrollable Content */}
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
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="h6" sx={{ minWidth: "150px" }}>
                        {value.Text}
                      </Typography>
                      <TextField
                        sx={{ minWidth: "390px" }}
                        size="small"
                        variant="outlined"
                        value={value.Value}
                        fullWidth
                      />
                    </Box>
                  </Grid2>
                ))}

                <div >
                  <Grid2 item xs={12} mt={2}>
                    <Typography variant="h6">Problem</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      sx={{ mt: 1, width: "100%", minWidth: "550px" }}
                    />
                  </Grid2>

                  <Grid2 item xs={12} mt={2} >
                    <Box display="flex" justifyContent="flex-end" alignItems="end" >
                      <Button
                        sx={{
                          width: "35%",
                          minWidth: "150px",
                          bgcolor: "orange",
                          "&:hover": { bgcolor: "darkorange" },
                        }}
                        variant="contained"
                      >
                        Generate Estimate
                      </Button>
                    </Box>
                  </Grid2>
                </div>
              </Grid2>
            </Box>
          </Card>
        </Grid2>


        <Grid2 size={{ lg: 5 }} >
          <div className="h-[83vh] flex flex-col border rounded-lg overflow-hidden">
            {/* Sticky Header */}
            <div className="bg-white sticky top-0 z-10 p-4 border-b flex justify-between items-center">
              <p className="font-bold">SERVICE PARTNERS</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Country"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="p-2 border rounded"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {partners.map((partner, index) => (
                <div key={index} className="p-4 rounded-lg">
                  <p className="font-bold mb-2">{partner.companyName}</p>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex gap-3">
                      <p className="text-sm text-gray-500">Contact Person:</p>
                      <p>{partner.contactPerson}</p>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-sm text-gray-500">Telephone:</p>
                      <p>{partner.telephone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex gap-3">
                      <p className="text-sm text-gray-500">Mobile:</p>
                      <p>{partner.mobile}</p>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-sm text-gray-500">Email:</p>
                      <p>{partner.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <p className="text-sm text-gray-500">Location:</p>
                    <p>{partner.location}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Grid2>
        {/* <Grid2 size={{ lg: 2.7 }} mt={5}>
          <Typography variant="h5" fontWeight={"bold"}>
            Find Service Engineer Near by You
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"center"}
          >
            Customer Support (7*24)
          </Typography>
        </Grid2> */}
      </Grid2>
    </>
  );
}
export default service;
