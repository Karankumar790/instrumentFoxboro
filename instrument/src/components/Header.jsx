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
  const images = [
    "https://www.beckhoff.com/media/pictures/tiles/products/ipc/ipc_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/i-o/io_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/motion/motion_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
  ];

  const indus = [
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/ipc/ipc_webp_85.webp",
  ];
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

      <Grid2 container display="flex" justifyContent="center" m={1}>
        <Grid2
          size={{ lg: 8 }}
          p={1}
          overflow="hidden"
          border={"1px solid black"}
        >
          <Box display="flex" justifyContent="center">
            <img src="https://www.beckhoff.com/media/pictures/stages/news/distributed-drive-technology-stage-lowres_webp_85.webp" />
          </Box>
          <Box>
            <Typography variant="h4">Industries </Typography>
          </Box>
          <Grid2 container spacing={2}>
            {/* <Typography></Typography> */}
            {images.map((src, index) => (
              <Grid2
                size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                border={"1px solid black"}
                key={index}
              >
                <Card>
                  <CardMedia
                    component="img"
                    style={{ height: "30vh", width: "40vh" }}
                    image={src}
                  />
                </Card>
              </Grid2>
            ))}
          </Grid2>
          <Typography variant="h4"> Industrial software</Typography>
          <Grid2 container spacing={2} mt={1}>
            {indus.map((src, index) => (
              <Grid2
                size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                border={"1px solid black"}
                key={index}
              >
                <Card>
                  <CardMedia
                    component="img"
                    style={{ height: "30vh", width: "40vh" }}
                    image={src}
                  />
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2></Grid2>

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
