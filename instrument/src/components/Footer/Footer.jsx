import React, { useEffect } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CallIcon from '@mui/icons-material/Call';
import { getFooter } from "../../AdminDashoard/SiteSetting/SettingSlice";
import { Link } from "react-router-dom";

function Footer() {
  const dispatch = useDispatch();

  const fetchFooter = useSelector((state) => state.header.footerInt);

  useEffect(() => {
    dispatch(getFooter());
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: "#2b313b",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 1, sm: 2 },
        minHeight: { xs: "auto", md: "170px" },
      }} >
      {fetchFooter && Object.keys(fetchFooter).length > 0 && (
        <Grid2
          container
          spacing={4}

          sx={{ display: "flex", justifyContent: "space-between", ml: { md: 12, sm: 6, xs: 2 } }}
        >

          {/* Corporate Office */}
          <Grid2 size={{ lg: 2.6, md: 4, sm: 6, xs: 12 }}>
            <Box>
              <Typography variant="h5" color="white" sx={{
                display: 'inline-block',
                textDecorationColor: "red",
                margin: '3px',
                width: 'fit-content',
                borderBottom: '2px solid white',
              }}>
                Registered Office
              </Typography>
              {fetchFooter.registeredOfficeAddress
                ?.split(",")
                .map((line, index) => (
                  <Typography key={index} color="white">
                    {line}
                  </Typography>
                ))}

              {/* <Typography color="white">Raj Nagar District Center, Ghaziabad </Typography>
            <Typography color="white">Uttar Pradesh India, Zip code 201001</Typography> */}
              <Typography color="white">{fetchFooter.supportEmail}</Typography>
            </Box>
          </Grid2>

          {/* Customer Support */}
          <Grid2 size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
            <Box>
              <Typography variant="h5" color="white" sx={{
                textDecorationColor: "red",
                margin: '3px',
                width: 'fit-content',
                borderBottom: '2px solid white',
              }}>
                Customer Support{" "}
              </Typography>
              <Typography color="white">
                <CallIcon/>  {fetchFooter?.customerSupport?.salesNumber}
              </Typography>
              <Typography color="white">
               <CallIcon/> {fetchFooter?.customerSupport?.engineeringNumber}{" "}
                {" "}
              </Typography>
              <Typography color="white">
               <CallIcon/> {fetchFooter?.customerSupport?.serviceNumber}
              </Typography>
              <Typography color="white">
                <CallIcon/> {fetchFooter?.customerSupport?.email}
              </Typography>
            </Box>
          </Grid2>

          {/* Foxboro Website */}
          <Grid2 size={{ lg: 4, md: 6, sm: 8, xs: 12 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box>
              <Typography variant="h5" color="white" sx={{
                width: 'fit-content',
                borderBottom: '2px solid white',
                textDecorationColor: "red",
                margin: '3px'
              }}>
                Foxboro Website{" "}
              </Typography>
              <Typography color="white">
                <a
                  href="https://www.foxboroinstrument.com"
                  style={{ color: "white", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fetchFooter?.websiteLinks?.link1}
                </a>
              </Typography>
              <Typography color="white">
                <a
                  href="https://www.foxboroinstrument.online"
                  style={{ color: "white", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fetchFooter?.websiteLinks?.link2}
                </a>
              </Typography>
              <Typography color="white">
                <a
                  href="https://www.foxboro.in"
                  style={{ color: "white", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fetchFooter?.websiteLinks?.link3}
                </a>
              </Typography>
              <Typography color="white">
                <a
                  href="https://www.foxboroinstrument.co.in"
                  style={{ color: "white", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fetchFooter?.websiteLinks?.link4}
                </a>
              </Typography>
            </Box>
          </Grid2>

          {/* Help & Policies */}
          <Grid2 size={{ lg: 2, md: 4, sm: 6, xs: 12 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box>
              <Typography variant="h5" color="white" sx={{
                width: 'fit-content',
                borderBottom: '2px solid white',
                textDecorationColor: "red",
                margin: '3px'
              }}>
                Need Help?
              </Typography>
              {/* <Typography color="white">Contact Us</Typography> */}
              <Link
                to="/privacypolicy"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Typography color="white">Privacy Policy</Typography>
              </Link>

              <Link
                to="/refundreturns"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Typography color="white">Refund and Return</Typography>
              </Link>
              <Link
                to="/termsconditions"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Typography color="white">Terms & Conditions</Typography>
              </Link>
              <Link
                to="/complaintodirector"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Typography color="white">Complaint to Director</Typography>
              </Link>
            </Box>
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
}

export default Footer;
