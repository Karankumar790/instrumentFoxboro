import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid2,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EngineeringIcon from "@mui/icons-material/Engineering";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeader } from "../AdminDashoard/SiteSetting/SettingSlice";
import { IoLogoYoutube } from "react-icons/io";

function Header() {

  const fetchHeader = useSelector((state) => state.header.headerInt)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const item = [
    { text: fetchHeader.contactNumberOne, icon: <PhoneInTalkIcon /> },
    { text: fetchHeader.contactNumberTwo, icon: <PhoneInTalkIcon /> },
    { text: fetchHeader.whatsappNumber, icon: <WhatsAppIcon /> },
    { text: fetchHeader.email, icon: <MarkunreadIcon /> },
  ];
  // const arr = ["Product", "Software", "Services", "E-Store", "Support"];
  const arr = [
    { text: "Automation", Link: "/" },
    { text: "Products", Link: "/product" },
    { text: "Software", Link: "/software" },
    { text: "E-Service", Link: null }, 
    { text: "Contact Us", Link: "/support" },
  ];

  const serviceOptions = [
    { text: "Get Estimate", Link: "/service" },
    { text: "Upload Order", Link: "/poGenerator" },
    { text: "Track Service", Link: "/trackService" },
    { text: "Service Partners", Link: "/servicePartner" }
  ]

  const [serviceMenu, setServiceMenu] = useState(null);

  const handleServiceClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setServiceMenu(event.currentTarget);
  };

  const handleCloseServiceMenu = () => {
    setServiceMenu(null);
  };

  const [isBlinking, setIsBlinking] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const toggleBlink = () => {
      setIsBlinking((prev) => !prev);
    };

    const intervalId = setInterval(toggleBlink, 1000); // Toggle every 500ms
    dispatch(getHeader())
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      <Grid2
        display={"flex"}
        justifyContent={"center"}
        bgcolor={"#3C9040"}
        height={"6vh"}
        color="white"
        p={1}
      >
        <Grid2
          display={"flex"}
          flexDirection={"row"}
          width={"76%"}
          gap={11}
        >
          <Stack direction="row" width={"70%"} gap={5}  >
            {item.map((value, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                {value.icon}
                <Typography ml={1}>{value.text}</Typography>
              </Stack>
            ))}

          </Stack>
          <Grid2 className='flex w-96'>
            <Stack display={"flex"} flexDirection={"row"} mr={2} >
              <a href={fetchHeader.instagramLink}>
                <Button>
                  <InstagramIcon style={{ color: "red", fontSize: "30px" }} />
                </Button>
              </a>
              <a href={fetchHeader.facebookLink}>
                <Button>
                  <FacebookIcon style={{ color: "blue", fontSize: "30px" }} />
                </Button>
              </a>
              <a href={fetchHeader.youTubeLink}>
                <Button>
                  <IoLogoYoutube style={{ color: "red", fontSize: "30px" }} />
                </Button>
              </a>
            </Stack>
            <button className="bg-pink-300 hover:bg-pink-600 text-lg text-white font-semibold py-2 px-9 rounded-lg shadow-md transition duration-300">
              <Link to="/login" className="no-underline text-white">
                Login
              </Link>
            </button>

          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2
        container
        display="flex"
        gap={1}
        alignItems="center"
        color="white"
        bgcolor={"#2b313b"}
        p={1.5}
        pl={27}
      >
        <div className=' w-32 h-16' display={"flex"} >
          <Link to="/" style={{ textDecoration: "none" }}>
            {/* <div className="h-20 w-20"> */}
            <img
              src={fetchHeader.foxboroLogo}
              className="h-full w-full object-fill"
            />
            {/* </div> */}
          </Link>
        </div>
        <Grid2 size={{ lg: 10 }} >
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"67.5vw"}
          >

            <Box flexDirection="row" display="flex" gap={5} ml={4}>
              {arr.map((value, index) => (
                <Stack direction="row" alignItems="center" key={index}>
                  {value.text === "E-Service" ? (
                    <>
                      <Button
                        sx={{ color: "white" }}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleServiceClick}
                      >
                        <Typography>{value.text}</Typography>
                      </Button>
                      <Menu
                        anchorEl={serviceMenu}
                        open={Boolean(serviceMenu)}
                        onClose={handleCloseServiceMenu}
                      >
                        {serviceOptions.map((option, idx) => (
                          <MenuItem key={idx} onClick={handleCloseServiceMenu}>
                            <Link to={option.Link} className="text-gray-700 hover:text-blue-600 w-full block">
                              {option.text}
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <Button sx={{ color: "white" }}>
                      <Link to={value.Link} className="text-white no-underline">
                        <Typography>{value.text}</Typography>
                      </Link>
                    </Button>
                  )}
                </Stack>
              ))}
            </Box>
            <Box display={'flex'} gap={2} mr={3}>

              <button
                onClick={handleOpen}
                // sx={{ color: "white", textTransform: "none", display: "flex", alignItems: "center", gap: 1, }}
                className="text-white flex gap-1 text-xl"
              >
                <EngineeringIcon className="text-white text-2xl" />
                Work @Foxboro
              </button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} component={Link} to="/applyIntership">
                  Apply for Internship
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/hiringExpert">
                  We're Hiring Experts
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/becomePartner">
                  Become Service Partner
                </MenuItem>
              </Menu>
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
