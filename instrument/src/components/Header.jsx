import React from "react";
import {
  Autocomplete,
  Button,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../public/assets/foxlogo.png";
function Header() {
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
          <Typography variant="h5">Industrial Automation company</Typography>
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
      <Grid2 bgcolor={"red"} display="flex">
        <Grid2 size={{lg:"2"}}>Automation</Grid2>
        <Grid2 size={{lg:"2"}}>E-Store</Grid2> 
        <Grid2 size={{lg:"2"}}>Software</Grid2>  
        <Grid2 size={{lg:"2"}}>Support</Grid2>
        <Grid2 size={{lg:"2"}}>Service</Grid2>
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
