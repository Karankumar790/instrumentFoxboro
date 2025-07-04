import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
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
  const fetchHeader = useSelector((state) => state.header.headerInt);

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
    { text: "Home", Link: "/" },
    { text: "Products", Link: "/product" },
    { text: "Engineering", Link: "/software" },
    { text: "E-Service", Link: null },
    { text: "Contact Us", Link: "/support" },
  ];

  const serviceOptions = [
    { text: "Get Estimate", Link: "/service" },
    { text: "Upload Order", Link: "/poGenerator" },
    { text: "Track Service", Link: "/trackService" },
    { text: "Service Partners", Link: "/servicePartner" },
  ];

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
    dispatch(getHeader());
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      <Grid2 container sx={{ overflowX: "hidden" }}>
        <Grid2
          size={{ lg: 12, md: 12, sm: 12, xs: 12 }}
          className="bg-[#3C9040] flex justify-center py-2 w-full overflow-x-hidden"
        >
          <Grid2
            size={{ lg: 8, md: 10, sm: 10, xs: 12 }}
            className=" flex flex-col lg:flex-row justify-between items-center text-white "
          >
            {/* Left side: Info items */}

            <Grid
              item
              xs={12}
              md={8}
              sm={12}
              lg={6}
              gap={2}
              sx={{ mb: { xs: 1, sm: 0 }, display: "flex" }}
            >
              <Box sx={{ width: 120, height: 64 }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img
                    src={fetchHeader.foxboroLogo}
                    alt="Foxboro Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </Box>
              <Box className="flex justify-center items-center">
                <p className="text-3xl font-bold">Foxboro Instrument Company</p>
              </Box>
            </Grid>

            {/* Right side: Social icons + Login button */}
            <Grid2 xs={12} md={8} lg={6} sm={12}>
              <div className="flex items-center lg:gap-4 md:gap-1 sm:gap-1  mt-3 lg:mt-0">
                <Stack direction="row" spacing={1}>
                  <a
                    href={fetchHeader.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <InstagramIcon
                        style={{ color: "red", fontSize: "35px" }}
                      />
                    </Button>
                  </a>
                  <a
                    href={fetchHeader.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <FacebookIcon
                        style={{ color: "blue", fontSize: "35px" }}
                      />
                    </Button>
                  </a>
                  <a
                    href={fetchHeader.youTubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <IoLogoYoutube
                        style={{ color: "red", fontSize: "35px" }}
                      />
                    </Button>
                  </a>
                </Stack>
                <Link to="/login" className="no-underline">
                  <button className="bg-blue-700 hover:bg-yellow-400 text-md rounded-md text-black font-semibold py-2 px-5 shadow-md transition duration-300">
                    STAFF LOGIN
                  </button>
                </Link>
              </div>
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            bgcolor: "#2b313b",
            color: "white",
            py: 1.5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflowX: "hidden",
          }}
        >
          <Grid2
            size={{ lg: 8, md: 10, sm: 12, xs: 12 }}
            sx={{
              display: "flex",
            }}
            wrap="wrap"
          >
            {/* Logo Section */}

            {/* Navigation & Work @Foxboro */}
            <Grid2 item size={{ lg: 12, md: '10', sm: '12', xs: '12' }} >
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}

                sx={{ width: "100%", flexWrap: "wrap", display: 'flex', justifyContent: 'space-between' }}
              >
                {/* Navigation Links */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {arr.map((value, index) => (
                    <Box key={index}>
                      {value.text === "E-Service" ? (
                        <>
                          <Button
                            sx={{
                              color: "white",
                              textTransform: "none",
                              fontSize: "18px",
                            }}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={handleServiceClick}
                          >
                            {value.text}
                          </Button>
                          <Menu
                            anchorEl={serviceMenu}
                            open={Boolean(serviceMenu)}
                            onClose={handleCloseServiceMenu}
                          >
                            {serviceOptions.map((option, idx) => (
                              <MenuItem
                                key={idx}
                                onClick={handleCloseServiceMenu}
                              >
                                <Link
                                  to={option.Link}
                                  className="text-gray-700 hover:text-blue-600 w-full block"
                                >
                                  {option.text}
                                </Link>
                              </MenuItem>
                            ))}
                          </Menu>
                        </>
                      ) : (
                        <Button
                          sx={{
                            color: "white",
                            textTransform: "none",
                            fontSize: "18px",
                          }}
                        >
                          <Link
                            to={value.Link}
                            className="text-white no-underline"
                          >
                            {value.text}
                          </Link>
                        </Button>
                      )}
                    </Box>
                  ))}
                </Box>

                {/* Work @Foxboro */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    onClick={handleOpen}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: "18px",
                    }}
                  >
                    <EngineeringIcon />
                    Work @Foxboro
                  </Button>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/applyIntership"
                    >
                      Apply for Internship
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/hiringExpert"
                    >
                      We are Hiring Experts
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/becomePartner"
                    >
                      Become Service Partner
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2
          container
          size={{ lg: 12, md: 12, sm: 12, xs: 12 }}
          className="flex justify-center mt-4 mb-3"
        >
          <Grid2
            size={{ lg: 8, md: 10, sm: 12, xs: 12 }}
            className="flex justify-end flex-wrap text-xs sm:text-sm md:text-base lg:text-lg gap-3"
          >
            {fetchHeader && Object.keys(fetchHeader).length > 0 &&
              item.map((value, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={index}
                  className="whitespace-nowrap flex-nowrap items-center"
                >
                  {value.icon}
                  <Typography ml={1} className="whitespace-nowrap">
                    {value.text}
                  </Typography>
                </Stack>
              ))
            }
          </Grid2>
        </Grid2>

      </Grid2>
    </>
  );
}

export default Header;
