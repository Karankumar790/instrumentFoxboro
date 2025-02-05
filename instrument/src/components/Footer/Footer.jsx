import React from 'react'
import {  Grid2, Typography } from '@mui/material'
function Footer() {
  return (
    <div>
      <Grid2 container sx={{ display: "flex", justifyContent: "center", background: "#023861", p:0.8  }} >
        <Grid2 item lg={12} md={12} sm={12} xs={12} textAlign='center' sx={{display: { sm: "block", xs: "none", md: "block", lg: "block" }}}>
          <Typography variant='inherit' color={'white'}  >
            Foxboro Instrument company: All Right Reserved Best display resolution  [ 1920*1080 ]
          </Typography>
        </Grid2>

        <Grid2 item lg={12} md={12} sm={12} xs={12} textAlign='center' sx={{display: { sm: "none", xs: "block", md: "none", lg: "none" }}}>
          <Typography fontSize='small' color={'white'}  >
            Foxboro Instrument company: All Right Reserved
          </Typography>
        </Grid2>
      </Grid2>
    </div>
  )
}

export default Footer