import {
  Button,
  Card,
  CardMedia,
  Collapse,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PageContainer from "../components/HOC/PageContainer";

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
  ];
  return (
    <div>
      <PageContainer showheader="true" showfooter="true">
        <Typography variant="h4" m={2}>
         Automation Products
        </Typography>
        <Grid2 container spacing={2} mt={2} m={2}>
          {images.map((src, index) => (
            <Grid2
              bgcolor={"yellow"}
              key={index}
              size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  style={{
                    height: "30vh",
                    width: "40vh",
                    backgroundColor: "#97b5f7",
                  }}
                  image={src}
                  alt={`Image ${index}`}
                />
                <Typography variant="h6" gutterBottom sx={{ padding: "8px" }}>
                  Automation
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                >
                  We deliver Panels and Industrial PCs for every application
                  with the latest technology for all performance classes.
                </Typography>

                {/* Learn More Button */}
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

                {/* Hidden text that shows on click */}
                <Collapse in={open}>
                  <Typography
                    variant="body2"
                    sx={{
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      paddingBottom: "8px",
                    }}
                  >
                    This is the additional text that appears when "Learn More"
                    is clicked. You can put a detailed description of the image
                    here.
                  </Typography>
                </Collapse>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </PageContainer>
    </div>
  );
}

export default product;
