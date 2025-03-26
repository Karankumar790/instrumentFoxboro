import React from "react";
import { Box, Grid2, Typography, Link } from "@mui/material";

function Footer() {


  return (
    <Box sx={{ bgcolor: "#2b313b", p: 2 }}>
      <Grid2 container spacing={5} ml={12}  sx={{display:'flex',justifyContent:'space-between'}}>
        {/* Corporate Office */}
        <Grid2 size={{ lg: 2.4 }} >
          <Box >
            <Typography variant="h5" color="white">Registered Office</Typography>
            <Typography color="white">118, Sundaram Building Ansal Complex </Typography>
            <Typography color="white">Raj Nagar District Center, Ghaziabad </Typography>
            <Typography color="white">Uttar Pradesh India, Zip code 201001</Typography>
            <Typography color="white">Email:admin@foxboroinstrument.com</Typography>
          </Box>
        </Grid2>


        {/* Customer Support */}
        <Grid2 size={{ lg: 2.4 }}>
          <Box>
            <Typography variant="h5" color="white">Customer Support </Typography>
            <Typography color="white">Tel 1: +91-9457889231 (Sales)</Typography>
            <Typography color="white">Tel 2: +91-9457889232 (Engineering) </Typography>
            <Typography color="white">Tel 3: +91-9457889234 (Service)</Typography>
            <Typography color="white">Email: support@foxboroinstrument.com</Typography>
          </Box>
        </Grid2>

        <Grid2 size={{ lg: 2.4 }}>
          <Box>
          <Typography variant="h5" color="white">Useful Website </Typography>
          <Typography color="white">
              <a href="https://www.foxboroinstrument.com" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              www.foxboroinstrument.com (Automation)
              </a>
            </Typography>
            <Typography color="white">
              <a href="https://www.foxboroinstrument.online" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
                www.foxboroinstrument.co.in (E-Store)
              </a>
            </Typography>
            <Typography color="white">
              <a href="https://www.foxboro.in" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              www.foxboro.in (Industrial IoT Systems)
              </a>
            </Typography>
            <Typography color="white">
              <a href="https://www.foxboroinstrument.co.in" style={{ color: "white", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
                www.foxboroinstrument.co.in (Freeware)
              </a>
            </Typography>

          </Box>
        </Grid2>

        {/* Help & Policies */}
        <Grid2 size={{ lg: 2.4 }}>
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