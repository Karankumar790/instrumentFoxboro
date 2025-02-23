import React from "react";
import { Card, Grid2, TextField, Typography } from "@mui/material";
import Services from "../../public/assets/service.webp";
import PageContainer from "../components/HOC/PageContainer";
import Header from "../components/Header";

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
      Text: "Company Name",
      Value: "",
    },
    {
      Text: "Address",
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
      Text: "Postal Code",
      Value: "",
    },
    {
      Text: "Description",
      Value: "",
    },
  ];
  return (
    <>
      {/* <PageContainer showheader="true"> */}
      <Header/>
      <Grid2
        container
        sx={{
          height: "83.8vh",
          backgroundImage: `url(${Services})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
        }}
        bgcolor={"blue"}
      >
        <Grid2
          size={{ lg: 12 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card
            sx={{ borderRadius: "25px", height: "72vh" }}
            borderRadius={2}
            p={2}
          >
            <Typography variant="h5" fontWeight={"bold"} m={1} mt={2}>
              Customer Support (7*24)
            </Typography>
            <Typography variant="h5" fontWeight={"bold"} m={1}>
              Customer Details
            </Typography>
            <Grid2 p={1}>
              <Grid2 size={{ lg: 12 }}>
                {customer.map((value, index) => (
                  <Typography
                    gap={8}
                    m={1}
                    variant="h6"
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    {value.Text}

                    <TextField
                      key={index}
                      size="small"
                      label={value.Value}
                      variant="outlined"
                      value={value.Value}
                    />
                  </Typography>
                ))}
              </Grid2>
              <Grid2 size={{ lg: 12 }}>
                {Details.map((value, index) => (
                  <Typography
                    variant="h6"
                    m={1}
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    {value.Text}
                    <TextField
                      key={index}
                      size="small"
                      label={value.Value}
                      variant="outlined"
                      value={value.Value}
                    />
                  </Typography>
                ))}
              </Grid2>
            </Grid2>
          </Card>
        </Grid2>
      </Grid2>
      {/* </PageContainer> */}
    </>
  );
}

export default service;
