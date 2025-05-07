import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { getFoxboroProduct } from "./product";

function product() {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getFoxboroProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProduct();
  }, [])





  return (
    <div className='min-h-screen flex flex-col'>
      <PageContainer showheader="true" className="flex-1 flex flex-col">
        <Grid2 container display="flex" justifyContent="center" className='flex-1' >
          <Grid2
            size={{ lg: 9 }}
            overflow="hidden"
            mb={4}
          // border={"1px solid black"}
          >
            <Box mb={2} >
              <Typography variant="h5" mt={2} fontWeight={"bold"} >
                Foxboro Product
              </Typography>
            </Box>
            {/* <Box>
              <Typography variant="h5" mt={2} mb={2} fontWeight={"bold"}>
                Industrial Automation
              </Typography>
            </Box> */}

            <Grid2 container spacing={3}>
              {products.map((product, index) => (
                <Grid2
                  bgcolor={"yellow"}
                  key={product.id}
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                >
                  <Link to="/product" style={{ textDecoration: "none" }}>
                    <Card>
                      {/* <CardMedia
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
                        image={product.image}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)"; // Scales the image when hovered
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)"; // Resets the scale when hover ends
                        }}
                        alt={`Image ${index}`}
                      /> */}

                      <div className="h-72 w-full bg-pink-500">
                        <img
                          src={product.image}
                          alt={product.image}
                          className="transition-transform duration-300 ease-in-out h-full w-full object-fill"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ padding: "8px" }}
                      >
                        {product.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        mb={2}
                        sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                      >
                        {product.description}
                      </Typography>
                      <div className="w-full flex justify-end">
                        <button className="bg-blue-600 text-white rounded-lg p-2 mb-2">Available on E-store</button>
                      </div>

                      {/* <Button
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
                      </Collapse> */}
                    </Card>
                  </Link>
                </Grid2>
              ))}
            </Grid2>
            <Stack spacing={1} alignItems={"end"} mt={2}>
              <Pagination count={5} variant="outlined" shape="rounded" />
            </Stack>
          </Grid2>
        </Grid2>
        <Footer />
      </PageContainer>
    </div>
  );
}
export default product;
