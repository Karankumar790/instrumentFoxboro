import {
  Box,
  Button,
  Card,
  CardMedia,
  Collapse,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import product from "./product";

("https://www.beckhoff.com/media/pictures/stages/news/application-report-tetra-pak-stage-lowres_webp_85.webp");
("https://www.beckhoff.com/media/pictures/stages/news/produktneuheiten-sps-2024-stage-lowres_webp_85.webp");
"https://www.beckhoff.com/media/pictures/stages/news/hvide-sand-seasight-stage_webp_85.webp",
  "https://www.beckhoff.com/media/pictures/stages/news/twincat-plc-plus-plus-starting-page-stage-lowres_webp_85.webp";
function content() {
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
  ];

  const indus = [
    "https://www.beckhoff.com/media/pictures/tiles/products/automation/automation_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/mx-system/mx-system_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/tiles/products/ipc/ipc_webp_85.webp",
  ];

  const images_animation = [
    "https://www.beckhoff.com/media/pictures/stages/news/distributed-drive-technology-stage-lowres_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/stages/news/application-report-tetra-pak-stage-lowres_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/stages/news/produktneuheiten-sps-2024-stage-lowres_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/stages/news/hvide-sand-seasight-stage_webp_85.webp",
    "https://www.beckhoff.com/media/pictures/stages/news/twincat-plc-plus-plus-starting-page-stage-lowres_webp_85.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images_animation.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + images_animation.length) % images_animation.length
    );
  };
  return (
    <>
      <PageContainer showheader="true">
        <Grid2 container display="flex" justifyContent="center" mt={1}>
          <Grid2 mr={2} display={"flex"} alignItems={"center"}>
            <Button variant="inherit" onClick={handlePrevious}>
              <ArrowBackIosIcon sx={{ fontSize: "50px" }} />
            </Button>
          </Grid2>
          <Grid2 size={{ lg: 7 }}>
            <Box display="flex" justifyContent="center" height="53.3vh">
              <img
                src={images_animation[currentIndex]}
                alt="Carousel"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </Box>
          </Grid2>
          <Grid2 ml={3} display={"flex"} alignItems={"center"}>
            <Button variant="inherit" onClick={handleNext}>
              <ArrowForwardIosIcon sx={{ fontSize: "50px" }} />
            </Button>
          </Grid2>
        </Grid2>
        <Grid2 container display="flex" justifyContent="center" m={1}>
          <Grid2
            size={{ lg: 7 }}
            p={0}
            overflow="hidden"
            // border={"1px solid black"}
          >
            <Box>
              <Typography variant="h4" mt={3}>
                Industrial Automation{" "}
              </Typography>
            </Box>

            <Grid2 container spacing={2}>
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
                          width: "30vh",
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
            <Typography variant="h4" mt={3}>
              {" "}
              Industrial software
            </Typography>
            <Grid2 container spacing={2} mt={1}>
              {indus.map((src, index) => (
                <Grid2
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  // border={"1px solid black"}
                  key={index}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      style={{
                        height: "30vh",
                        width: "30vh",
                        objectFit: "cover",
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
                      We deliver Panels and Industrial PCs for every application
                      with the latest technology for all performance classes.
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
                        More" is clicked. You can put a detailed description of
                        the image here.
                      </Typography>
                    </Collapse>
                  </Card>
                </Grid2>
              ))}
            </Grid2>

            <Typography variant="h4" mt={3}>
              Engineering Services
            </Typography>
            <Grid2 display="flex" m={1} flexDirection="row" gap={2}>
              <Grid2 size={{ lg: 8 }}>
                {/* <img
                  src="https://www.beckhoff.com/media/pictures/cards/news/scheugenpflug-application-report-teaser_webp_85.webp"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  alt=""
                /> */}
                <Box position="relative" width="100%" height="100%">
                  <img
                    src="https://www.beckhoff.com/media/pictures/cards/news/scheugenpflug-application-report-teaser_webp_85.webp"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="Layer Seven Application"
                  />
                  <Box width={'10px'}  bgcolor={'yellow'}>
                    <Typography
                      variant="h6"
                      sx={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        color: "black",
                        backgroundColor: "rgba(237, 231, 231, 0.7)",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      In the extensive central warehouse of Australian office
                      equipment supplier Officeworks, Layer Seven Automation has
                      replaced the proprietary, outdated warehouse logistics
                      control technology with PC-based control.
                    </Typography>
                  </Box>
                </Box>
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
        <Footer />
      </PageContainer>
    </>
  );
}

export default content;
