import React from "react";
import { Box, Grid2, Typography, Link } from "@mui/material";

function Footer() {
  

  return (
    <Box sx={{ bgcolor: "darkblue", p: 2 }}>
      <Grid2 container spacing={5} ml={12}>
        {/* Corporate Office */}
        <Grid2 size={{ lg: 2.4 }} > 
          <Box >
            <Typography variant="h5" color="white">REGISTERED Office</Typography>
            <Typography color="white">118, Sundaram Building Ansal Complex </Typography>
            <Typography color="white">Raj Nagar District Center, Ghaziabad </Typography>
            <Typography color="white">Uttar Pradesh India, Zip code 201001</Typography>
            <Typography color="white">Email:admin@foxboroinstrument.com</Typography>
          </Box>
        </Grid2>

        {/* Manufacturing Unit */}
        <Grid2 size={{ lg: 2.4 }}>
          <Box>
            <Typography variant="h5" color="white">Manufacturing Unit</Typography>
            <Typography color="white">Address1</Typography>
            <Typography color="white">City&Country</Typography>
            <Typography color="white">Phone</Typography>
            <Typography color="white">Email</Typography>
          </Box>
        </Grid2>

        {/* Tax IDs & Certification */}
        <Grid2 size={{ lg: 2.4 }}>
          <Box>
            <Typography variant="h5" color="white">Tax IDs</Typography>
            <Typography color="white">GST:09AGLPV3098E</Typography>
            <Typography color="white">GST2:</Typography>
            <Typography color="white">GST3:</Typography>
            <Typography variant="h6" color="white" >Certification</Typography>
            <Link href={""} color="white" underline="hover">
              View Certificate
            </Link>
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

        {/* Help & Policies */}
        <Grid2 size={{ lg: 2.4 }}>
          <Box>
            <Typography variant="h5" color="white">Need Help?</Typography>
            <Typography color="white">Contact Us</Typography>
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