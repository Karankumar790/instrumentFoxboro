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
  useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EngineeringIcon from "@mui/icons-material/Engineering";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeader } from "../AdminDashoard/SiteSetting/SettingSlice";
import { IoLogoYoutube } from "react-icons/io";
import DehazeIcon from '@mui/icons-material/Dehaze';

function Header() {
  const fetchHeader = useSelector((state) => state.header.headerInt);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openMob, setOpenMob] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  const handleToggle = () => {
    setOpenMob(!openMob);
  };

  const handleCloseMob = () => {
    setOpenMob(false);
     setWorkOpen(false);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const item = [
    { text: fetchHeader.contactNumberOne, icon: <PhoneInTalkIcon /> },
    { text: fetchHeader.contactNumberTwo, icon: <PhoneInTalkIcon /> },
    { text: fetchHeader.whatsappNumber, icon: <WhatsAppIcon /> },
    !isMobile && { text: fetchHeader.email, icon: <MarkunreadIcon /> },
  ].filter(Boolean);

  // const arr = ["Product", "Software", "Services", "E-Store", "Support"];
  const arr = [
    { text: "Home", Link: "/" },
    { text: "Products", Link: "/product" },
    // { text: "Solutions", Link: "/solution" },
    { text: "Engineering", Link: "/software" },
    // { text: "E-Service", Link: null },
    { text: "Service Partners", Link: "/servicePartner" },
    // { text: "Free Software", Link: "" },
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
              sm={12}
              md={8}
              lg={6}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "start" },
                  gap: 2,
                }}
              >
                {fetchHeader.foxboroLogo && (
                  <Box
                    sx={{
                      width: 120,
                      height: 64,
                      display: {
                        xs: "none",
                        sm: "flex",
                      },
                      justifyContent: "center",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <img
                        src={fetchHeader.foxboroLogo}
                        alt="Foxboro Logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </Link>
                  </Box>
                )}
                <Box
                  sx={{
                    // display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // px: { xs: 2, md: 4 },
                    // py: 2,
                    flexDirection: { xs: "row", md: "row" },
                    width: { xs: "400px", md: "100%" },
                  }}
                >
                  {/* Mobile Dropdown Button */}
                  <div className="flex">
                    <div className="block md:hidden relative">
                      <button
                        id="basic-button"
                        aria-haspopup="true"
                        aria-expanded={openMob ? "true" : undefined}
                        onClick={handleToggle}
                        className="p-2"
                      >
                        <DehazeIcon className="text-3xl" />
                      </button>
                    </div>

                    {/* Company Name */}
                    <p className="text-xl sm:text-2xl md:mt-0 mt-2 md:text-3xl font-bold text-center mx-auto md:mx-0">
                      Foxboro Instrument Company
                    </p>
                  </div>
                  {openMob && (
                    <div className="md:hidden w-full mt-2 rounded shadow-md z-50 flex flex-col items-center bg-[#2B313B]">

                      {/* First Row - First 3 items */}
                      <div className="flex w-full">
                        {arr.slice(0, 3).map((item, index) =>
                          item.Link ? (
                            <Link
                              key={index}
                              to={item.Link}
                              className="block px-4 py-2 text-white font-semibold hover:bg-gray-700 w-full text-center"
                              onClick={handleCloseMob}
                            >
                              {item.text}
                            </Link>
                          ) : (
                            <span
                              key={index}
                              className="block px-4 py-2 text-gray-400 cursor-not-allowed w-full text-center"
                            >
                              {item.text}
                            </span>
                          )
                        )}
                      </div>

                      {/* Second Row - Remaining items */}
                      <div className="flex  w-full border-t border-gray-600">
                        {arr.slice(3).map((item, index) =>
                          item.Link ? (
                            <Link
                              key={index}
                              to={item.Link}
                              className="block px-4 py-2 text-white font-semibold hover:bg-gray-700 w-full text-center"
                              onClick={handleCloseMob}
                            >
                              {item.text}
                            </Link>
                          ) : (
                            <span
                              key={index}
                              className="block px-4 py-2 text-gray-400 cursor-not-allowed w-full text-center"
                            >
                              {item.text}
                            </span>
                          )
                        )}
                      </div>

                      {/* Work @ Foxboro Dropdown */}
                      <button
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white font-semibold border-t border-gray-600 focus:outline-none"
                        onClick={() => setWorkOpen(!workOpen)}
                      >
                        <EngineeringIcon className="text-lg" />
                        Work @ Foxboro
                        <span className={`transition-transform ${workOpen ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>

                      {/* Submenu (Only shows if workOpen === true) */}
                      {workOpen && (
                        <div className="flex flex-col w-full bg-[#2B313B] border-t border-gray-600">
                          <Link
                            to="/applyIntership"
                            onClick={handleCloseMob}
                            className="block px-4 py-2 text-white hover:bg-gray-700 text-center"
                          >
                            Apply for Internship
                          </Link>
                          <Link
                            to="/hiringExpert"
                            onClick={handleCloseMob}
                            className="block px-4 py-2 text-white hover:bg-gray-700 text-center"
                          >
                            We’re Hiring Experts
                          </Link>
                          <Link
                            to="/becomePartner"
                            onClick={handleCloseMob}
                            className="block px-4 py-2 text-white hover:bg-gray-700 text-center"
                          >
                            Become Service Partner
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                </Box>
              </Box>
            </Grid>


            {/* Right side: Social icons + Login button */}
            <Grid2 xs={12} md={8} lg={6} sm={12}>
              <div className="flex items-center lg:gap-4 md:gap-1 sm:gap-1  mt-3 lg:mt-0">
                <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
                  <button className="bg-blue-700 hidden xs:none sm:flex  hover:bg-yellow-400 text-md rounded-md text-black font-semibold py-2 px-5 shadow-md transition duration-300">
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
            display: { xs: 'none', sm: 'flex' },
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

                sx={{ width: "100%", flexWrap: "wrap", display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between' }}
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
            className="flex md:justify-end justify-center flex-wrap text-xs sm:text-sm md:text-base lg:text-lg  gap-3"
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
