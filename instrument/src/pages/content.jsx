import { Box, Card, CardMedia, Grid2, Typography } from "@mui/material";
import React from "react";
import PageContainer from "../components/HOC/PageContainer";

function content() {
  const images = [
    "https://www.beckhoff.com/media/pictures/tiles/products/ipc/ipc_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/i-o/io_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/motion/motion_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
  ];

  const indus = [
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/ipc/ipc_webp_85.webp",
  ];
  return (
    <>
      <PageContainer showheader="true" showfooter="true">
        <Grid2 container display="flex" justifyContent="center" m={1}>
          <Grid2
            size={{ lg: 8 }}
            p={1}
            overflow="hidden"
            border={"1px solid black"}
          >
            <Box display="flex" justifyContent="center">
              <img src="https://www.beckhoff.com/media/pictures/stages/news/distributed-drive-technology-stage-lowres_webp_85.webp" />
            </Box>
            <Box>
              <Typography variant="h4">Industries </Typography>
            </Box>
            <Grid2 container spacing={2}>
              {/* <Typography></Typography> */}
              {images.map((src, index) => (
                <Grid2
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  border={"1px solid black"}
                  key={index}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      style={{ height: "30vh", width: "40vh" }}
                      image={src}
                    />
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Typography variant="h4"> Industrial software</Typography>
            <Grid2 container spacing={2} mt={1}>
              {indus.map((src, index) => (
                <Grid2
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  border={"0.5px solid black"}
                  key={index}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      style={{ height: "30vh", width: "40vh" }}
                      image={src}
                    />
                  </Card>
                </Grid2>
              ))}
            </Grid2>

            <Grid2 display="flex" m={1} flexDirection="row" gap={2}>
              <Grid2 size={{ lg: 8 }}>
                <img
                  src="https://www.beckhoff.com/media/pictures/cards/news/scheugenpflug-application-report-teaser_webp_85.webp"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt=""
                />
              </Grid2>
              <Grid2 size={{ lg: 4 }}>
                <img
                  src="https://www.beckhoff.com/media/pictures/cards/news/layer-seven-application-teaser_webp_85.webp"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt=""
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </PageContainer>
    </>
  );
}

export default content;
