import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  colors,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../public/assets/foxlogo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Link } from "react-router-dom";

function Header() {
  const item = [
    { text: "+91 88104 74728", icon: <PhoneInTalkIcon /> },
    { text: "+91 94578893231", icon: <WhatsAppIcon /> },
    { text: "foxboroinstrument@gmail.com", icon: <MarkunreadIcon /> },
    { text: "9:00am-5:30pm (Monday to Saturday)", icon: <AccessTimeIcon /> },
  ];
  // const arr = ["Product", "Software", "Services", "E-Store", "Support"];
  const arr = [
    {
      text: "Product",
      Link: "/product",
    },
    {
      text: "Software",
      Link: "/software",
    },
    {
      text: "Services",
      Link: "/services",
    },
    {
      text: "E-Store",
      Link: "/estore",
    },
    {
      text: "Support",
      Link: "/support",
    },
  ];
  const label = { inputProps: { "aria-label": "Join Foxboro" } };
  const top100Films = [];
  return (
    <>
      <Grid2
        display={"flex"}
        bgcolor={"#3C9040"}
        height={"6vh"}
        color="white"
        p={1}
      >
        <Grid2
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
          px={2}
        >
          <Stack direction="row" gap={9} width={"100%"} ml={"8%"}>
            {item.map((value, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                {value.icon}
                <Typography ml={1}>{value.text}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack display={"flex"} flexDirection={"row"} mr={6}>
            <Button>
              <InstagramIcon style={{ color: "white", fontSize: "30px" }} />
            </Button>
            <Button>
              <FacebookIcon style={{ color: "white", fontSize: "30px" }} />
            </Button>
            <Button>
              <YouTubeIcon style={{ color: "white", fontSize: "39px" }} />
            </Button>
          </Stack>
          <Button
            sx={{ bgcolor: "#eccf40", color: "black", width: "7vw", ml: 3 }}
            variant="contained"
          >
            Login
          </Button>
        </Grid2>
      </Grid2>
      <Grid2
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        bgcolor={"#2b313b"}
        p={1.5}
      >
        <Grid2 size={{ lg: 4 }} display={"flex"} gap={3}>
          <Grid2 size={{ lg: 3 }} ml={2}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "contain" }}
            />
          </Link>
          </Grid2>
          <Typography
            ml={6}
            variant="h5"
            display={"flex"}
            alignItems={"center"}
          >
            Foxboro Instrument Company
          </Typography>
        </Grid2>
        <Grid2 size={{ lg: 8 }}>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"65vw"}
          >
            {/* <Box flexDirection={"row"} display={"flex"} gap={5} ml={4}>
              {arr.map((value, index) => (
                <Stack direction="row" alignItems="center" key={index}>
                  <Button sx={{ color: "white" }} ml={1}>
                    <Typography>{value} <a href={value.Link}></a></Typography>
                  </Button>
                </Stack>
              ))}
            </Box> */}
            <Box flexDirection={"row"} display={"flex"} gap={5} ml={4}>
              {arr.map((value, index) => (
                <Stack direction="row" alignItems="center" key={index}>
                  <Button sx={{ color: "white" }} ml={1}>
                    {/* If there's a Link (non-empty), use the React Router Link component */}
                    {value.Link ? (
                      <Link to={value.Link} style={{ color: "white", textDecoration: "none" }}> 
                        <Typography>{value.text}</Typography>
                      </Link>
                    ) : (
                      <Typography>{value.text}</Typography>
                    )}
                  </Button>
                </Stack>
              ))}
            </Box>
            <Box>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <EngineeringIcon sx={{ color: "white" }} />
                Work At Foxboro
              </Typography>
            </Box>
          </Stack>
        </Grid2>
        {/* <Grid2 size={{ lg: 2 }}>
          <Stack
            spacing={2}
            sx={{ width: 200, bgcolor: "white" }}
            borderRadius={3}
          >
            <Autocomplete
              sx={{ borderRadius: 3 }}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="Search" />}
            />
          </Stack>
        </Grid2> */}
        {/* <Grid2 size={{ lg: 3 }} display={"flex"} gap={2}>
          <Button variant="contained">
            <ShoppingCartIcon />
            Cart
          </Button>
          <Button variant="contained">Track Order</Button>
         
        </Grid2> */}
      </Grid2>
      {/* <Grid2
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
      </Grid2> */}

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
