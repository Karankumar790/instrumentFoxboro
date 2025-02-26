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
          height: "83.8vh",
          backgroundImage: `url(${Services})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid2
          size={{ lg: 12 }}
          mr={2}
          display={"flex"}
          // justifyContent={""}
          alignItems={"center"}
        >
          <Card
            sx={{
              borderRadius: "25px",
              height: "71vh",
              ml: "55%",
              width: "55%",
            }}
            borderRadius={2}
            p={2}
          >
            <Typography variant="h5" fontWeight={"bold"} ml={1.5} mt={2}>
              Find Service Engineer Near You
            </Typography>
            {/* <Typography variant="h6" fontWeight={"bold"} ml={1.5}>
              Customer Support (7*24)
            </Typography> */}
            {/* <Typography variant="h5" fontWeight={"bold"} mt={1} ml={1.5}>
              Customer Details
            </Typography> */}
            <Grid2 container p={1} display={"flex"} flexDirection={"row"}>
              <Grid2 size={{ lg: 6 }}>
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

              <Grid2 size={{ lg: 5 }} ml={8}>
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
              <Grid2 ml={1}>
                <Typography  variant="h6">Problem</Typography>
                <Box sx={{ width: 815, maxWidth: "100%", height:"150px" }}>
                  <TextField fullWidth   sx={{ height: "150px" }}
      multiline
      rows={5}  />
                </Box>
              </Grid2>
              <Grid2 size={{ lg: 12 }} display={"flex"}>
                <Box m={1}>
                  <Button
                    sx={{ width: "100%" }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Front Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                  <Button
                    sx={{ width: "100%", mt: "2%" }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Back Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Box>
                <Box m={1}>
                  <Button
                    sx={{ width: "100%" }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Left Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                  <Button
                    sx={{ width: "100%", mt: "2%" }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Right Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </Box>
              </Grid2>
              <Box m={1} width={"100%"}  display={"flex"} justifyContent={"end"}>
                <Button
                  sx={{ width: "15%", bgcolor: "orange" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Grid2>
          </Card>
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
