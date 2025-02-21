import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function product() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const images = [
    "https://www.beckhoff.com/media/pictures/tiles/products/ipc/ipc_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/i-o/io_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/motion/motion_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/motion/motion_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/vision/vision_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/motion/motion_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
  ];
  return (
    <div>
      <PageContainer showheader="true">
        <Grid2 container display="flex" justifyContent="center"  >
          <Grid2
            size={{ lg: 9 }}
            overflow="hidden"
            mb={4}
            // border={"1px solid black"}
          >
            <Box display={"flex"} justifyContent={"center"} >
              <Typography variant="h4" mt={2} fontWeight={"bold"} >
                Foxboro Product Line
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" mt={2} mb={2} fontWeight={"bold"}>
                Industrial Automation
              </Typography>
            </Box>

            <Grid2 container spacing={3}>
              {images.map((src, index) => (
                <Grid2
                  bgcolor={"yellow"}
                  key={index}
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                >
                  <Link to="/product" style={{ textDecoration: "none" }}>
                    <Card>
                      <CardMedia
                        component="img"
                        // sx={{objectFit:"cover",objectPosition:'center'}}
                        style={{
                          height: "30vh",
                          width: "40vh",
                          objectFit: "cover",
                          objectPosition: "left",
                          background:
                            "linear-gradient(49deg, rgb(245, 244, 244), rgb(170, 170, 219) 100%) ",
                          transition: "transform 0.3s ease-in-out",
                        }}
                        image={src}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)"; // Scales the image when hovered
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)"; // Resets the scale when hover ends
                        }}
                        alt={`Image ${index}`}
                      />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ padding: "8px" }}
                      >
                        Automation
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                      >
                        We deliver Panels and Industrial PCs for every
                        application with the latest technology for all
                        performance classes.
                      </Typography>

                      <Button
                        onClick={handleToggle}
                        sx={{
                          marginLeft: "8px",
                          marginBottom: "8px",
                          color: "red",
                        }}
                      >
                        {open ? "Show Less" : "Learn More"}
                      </Button>

                      <Collapse in={open}>
                        <Typography
                          variant="body2"
                          sx={{
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingBottom: "8px",
                          }}
                        >
                          This is the additional text that appears when "Learn
                          More" is clicked. You can put a detailed description
                          of the image here.
                        </Typography>
                      </Collapse>
                    </Card>
                  </Link>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>
        <Footer />
      </PageContainer>
    </div>
  );
}
export default product;
