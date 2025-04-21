import React, { useEffect } from "react";
import { Box, Grid2, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFooter } from "../../AdminDashoard/SiteSetting/SettingSlice";

function Footer() {

  const dispatch = useDispatch();

  const fetchFooter = useSelector((state) => state.header.footerInt)

  useEffect(() => {
    dispatch(getFooter())
  },[dispatch])

  return (
    <Box sx={{ bgcolor: "#2b313b", p: 2 }}>
      <Grid2 container spacing={4} ml={12}  sx={{display:'flex',justifyContent:'space-between'}}>
        {/* Corporate Office */}
        <Grid2 size={{ lg: 2.6 }} >
          <Box >
            <Typography variant="h5" color="white">Registered Office</Typography>
            <Typography color="white">{fetchFooter.registeredOfficeAddress} </Typography>
            <Typography color="white">Raj Nagar District Center, Ghaziabad </Typography>
            <Typography color="white">Uttar Pradesh India, Zip code 201001</Typography>
            <Typography color="white">{fetchFooter.supportEmail}</Typography>
          </Box>
        </Grid2>


        {/* Customer Support */}
        <Grid2 size={{ lg: 2.6 }}>
          <Box>
            <Typography variant="h5" color="white">Customer Support </Typography>
            <Typography color="white">Tel 1: {fetchFooter?.customerSupport?.salesNumber} (Sales)</Typography>
            <Typography color="white">Tel 2: {fetchFooter?.customerSupport?.engineeringNumber} (Engineering) </Typography>
            <Typography color="white">Tel 3: {fetchFooter?.customerSupport?.serviceNumber} (Service)</Typography>
            <Typography color="white">Email: {fetchFooter?.customerSupport?.email}</Typography>
          </Box>
        </Grid2>

        <Grid2 size={{ lg: 2.9 }}>
          <Box>
          <Typography variant="h5" color="white">Useful Website </Typography>
          <Typography color="white">
              <a href="https://www.foxboroinstrument.com" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              {fetchFooter?.websiteLinks?.link1} (Automation)
              </a>
            </Typography>
            <Typography color="white">
              <a href="https://www.foxboroinstrument.online" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              {fetchFooter?.websiteLinks?.link2}  (E-Store)
              </a>
            </Typography>
            <Typography color="white">
              <a href="https://www.foxboro.in" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              {fetchFooter?.websiteLinks?.link3}  (Industrial IoT Systems)
              </a>
            </Typography>
            <Typography color="white">
              <a href="https://www.foxboroinstrument.co.in" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              {fetchFooter?.websiteLinks?.link4}  (Service)
              </a>
            </Typography>

          </Box>
        </Grid2>

        {/* Help & Policies */}
        <Grid2 size={{ lg: 2.6 }}>
          <Box>
            <Typography variant="h5" color="white">Need Help?</Typography>
            {/* <Typography color="white">Contact Us</Typography> */}
            <Typography color="white">Privacy Policy</Typography>
            <Typography color="white">Refund and Return</Typography>
            <Typography color="white">Terms & Conditions</Typography>
            <Typography color="white">Complaint to Director</Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Footer;