import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../public/assets/foxlogo.png";
function Header() {
  const item = ["Automation", "E-Store", "Software", "Support", "Support"];
  // const arr = [{"automation":"http://localhost"},{"E-Store":"http://localhost"},{"Software":"http://localhost"},{"Support":"http://localhost"},{"Support":"http://localhost"}]
  const label = { inputProps: { "aria-label": "Join Foxboro" } };
  const top100Films = [];
  return (
    <>
      <Grid2
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        bgcolor={"#2b313b"}
        p={1}
      >
        <Grid2 size={{ lg: 2 }}>
          <img src={logo} height={"50vh"} width={"200px"} />
        </Grid2>
        <Grid2 size={{ lg: 6 }}>
          <Typography variant="h5">Industrial Automation Company</Typography>
        </Grid2>
        <Grid2 size={{ lg: 3 }}>
          <Stack
            spacing={2}
            sx={{ width: 300, bgcolor: "white" }}
            borderRadius={10}
          >
            <Autocomplete
              sx={{ borderRadius: 10 }}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="Search" />}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ lg: 1 }}>
          <Button variant="contained">Login/SignUp</Button>
        </Grid2>
      </Grid2>
      <Grid2
        display={"flex"}
        bgcolor={"#223047"}
        // bgcolor={"skyblue"}
        justifyContent={"space-between"}
        color="white"
        p={1}
      >
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          width={"60vw"}
          alignItems={"center"}
        >
          {item.map((value, index) => (
            <Typography> {value}</Typography>
          ))}
        </Stack>
        <Stack>
          <Typography>
            <Checkbox {...label} />
            Join Foxboro
          </Typography>
        </Stack>
      </Grid2>

      
      {/* <Grid2
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        bgcolor={"#2b313b"}
        p={1}
      >
        <Grid2 size={{ lg: 10 }}>
        <Grid2 size={{ lg: 2 }}></Grid2>
        <Grid2 size={{ lg: 2 }}></Grid2>
        <Grid2 size={{ lg: 2 }}></Grid2>
        <Grid2 size={{ lg: 2 }}></Grid2>
        <Grid2 size={{ lg: 2 }}></Grid2>
      
        </Grid2>
        <Grid2 size={{ lg: 2 }}></Grid2>
      </Grid2> */}
    </>
  );
}

export default Header;
