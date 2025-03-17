import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import logo from "../../public/assets/foxlogo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Link } from "react-router-dom";

function Header() {
  const item = [
    { text: "+91 94578893231", icon: <PhoneInTalkIcon /> },
    { text: "+91 9457889232", icon: <PhoneInTalkIcon /> },
    { text: "+91 88104 74728", icon: <WhatsAppIcon /> },
    { text: "foxboroinstrument@gmail.com", icon: <MarkunreadIcon /> },
  ];
  // const arr = ["Product", "Software", "Services", "E-Store", "Support"];
  const arr = [
    {
      text: "Automation",
      Link: "/product",
    },

    {
      text: "Fox  IoT",
      Link: "/hardware"
    },
    {
      text: "Software",
      Link: "/software",
    },

    {
      text: "E-Store",
      Link: "/estore",
    },

    {
      text: "Service Locator",
      Link: "/service",
    },

    // {
    //   text: "Support",
    //   Link: "/support",
    // },

    {
      text: "Free Job Search",
      Link: "/support",
    },
  ];

  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const toggleBlink = () => {
      setIsBlinking((prev) => !prev);
    };

    const intervalId = setInterval(toggleBlink, 1000); // Toggle every 500ms

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

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
          <Stack direction="row" gap={9} width={"100%"} ml={"3%"}>
            {item.map((value, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                {value.icon}
                <Typography ml={1}>{value.text}</Typography>
              </Stack>
            ))}
            <button className="bg-blue-700 border rounded-md text-white p-2 pl-4 pr-4">
              <span className={isBlinking ? "opacity-100" : "opacity-0"}>
                <p className="#FFFF00"> Engineering Consulting - Book Appointment</p>
              </span>
            </button>
          </Stack>
          <Stack display={"flex"} flexDirection={"row"} mr={6}>
            <Button>
              <InstagramIcon style={{ color: "red", fontSize: "30px" }} />
            </Button>
            <Button>
              <FacebookIcon style={{ color: "blue", fontSize: "30px" }} />
            </Button>
            <Button>
              <YouTubeIcon style={{ color: "red", fontSize: "39px" }} />
            </Button>
          </Stack>
          <Button
            sx={{ bgcolor: "pink", color: "black", width: "7vw", ml: 3, fontWeight: '300' }}
            variant="contained"

          >
            <Link to='/login' >Login</Link>
          </Button>
        </Grid2>
      </Grid2>
      <Grid2
        container
        display="flex"
        gap={5}
        alignItems="center"
        color="white"
        bgcolor={"#2b313b"}
        p={1.5}
      >
        <Grid2 size={{ lg: 1 }} display={"flex"}  >
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Grid2>
        <Grid2 size={{ lg: 10 }} >
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"88vw"}
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
            <Box display={'flex'} gap={2} mr={3}>

              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <EngineeringIcon sx={{ color: "white" }} />
                Work @Foxboro
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
