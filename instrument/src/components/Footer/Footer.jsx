import React, { useEffect, useState } from "react";
import { Box, Grid2, Typography, Link } from "@mui/material";
// import { getfooterCorporate, getfooterTaxId, getManufacturing } from "../../Redux/api/service";

function Footer() {
  // const [corporateData, setCorporateData] = useState({});
  // const [taxData, setTaxData] = useState({});
  // const [manufacturingData, setManufacturingData] = useState({});

  // Fetch all data in parallel for optimization
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [corporateRes, taxRes, manufacturingRes] = await Promise.all([
  //         getfooterCorporate(),
  //         getfooterTaxId(),
  //         getManufacturing(),
  //       ]);

  //       if (corporateRes.success) setCorporateData(corporateRes.data);
  //       if (taxRes.success) setTaxData(taxRes.data);
  //       if (manufacturingRes.success) setManufacturingData(manufacturingRes.data);
  //     } catch (error) {
  //       console.error("Error fetching footer data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Box sx={{ bgcolor: "darkblue", p: 2 }}>
      <Grid2 container spacing={5} ml={12}>
        {/* Corporate Office */}
        <Grid2 size={{ lg: 2.4 }} > 
          <Box >
            <Typography variant="h5" color="white">Corporate Office</Typography>
            <Typography color="white">Address:118, Sundaram Building Ansal Complex RDC Raj Nagar</Typography>
            <Typography color="white">City&Country:Ghaziabad, India</Typography>
            <Typography color="white">Phone:+91-9457889231/32/34</Typography>
            <Typography color="white">Email:Admin@foxboroinstrument.com</Typography>
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
            <Typography variant="h5" color="white">Customer Support</Typography>
            <Typography color="white">Tel 1: +91-9457889231</Typography>
            <Typography color="white">Tel 2: +91-9457889232</Typography>
            <Typography color="white">Tel 3: +91-9457889234</Typography>
            <Typography color="white">Timing: (9:00AM to 5:30PM)</Typography>
            <Typography color="white">Email: foxboroinstrument@gmail.com</Typography>
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

// import React from 'react'
// import {  Grid22, Typography } from '@mui/material'
// function Footer() {
//   return (
//     <div>
//       <Grid22 container sx={{ display: "flex", justifyContent: "center", background: "#023861", p:0.8  }} >
//         <Grid22 item lg={12} md={12} sm={12} xs={12} textAlign='center' sx={{display: { sm: "block", xs: "none", md: "block", lg: "block" }}}>
//           <Typography variant='inherit' color={'white'}  >
//             Foxboro Instrument company: All Right Reserved Best display resolution  [ 1920*1080 ]
//           </Typography>
//         </Grid22>

//         <Grid22 item lg={12} md={12} sm={12} xs={12} textAlign='center' sx={{display: { sm: "none", xs: "block", md: "none", lg: "none" }}}>
//           <Typography fontSize='small' color={'white'}  >
//             Foxboro Instrument company: All Right Reserved
//           </Typography>
//         </Grid22>
//       </Grid22>
//       {/* <Grid22 container sx={{ display: "flex", justifyContent: "center", background: "#8c99ac", p:0.8  }} >
       
//       </Grid22> */}
//     </div>
//   )
// }

// export default Footer