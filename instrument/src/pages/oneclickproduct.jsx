import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Collapse,
  Grid,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getProductById } from "./product";


function oneclickproduct() {
  const [open, setOpen] = useState(false);
  const { categoryId } = useParams();
  const [products,setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleToggle = () => {
    setOpen(!open);
  };
 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(categoryId);
        console.log("API Response:", response); // Debugging
  
        // Ensure we're setting the correct data array
        setProduct(response);  
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [categoryId]);
  
  
  

  return (
    <div className="min-h-screen flex flex-col">
     <PageContainer showheader="true" className="flex flex-1 flex-col">
        <Grid2 container display="flex" justifyContent="center" className="flex-1">
          <Grid2 size={{ lg: 9 }} overflow="hidden" mb={4}>
            <Box>
              <Typography variant="h5" mt={2} mb={2} fontWeight={"bold"}>
                Industrial Automation
              </Typography>
            </Box>

            {loading ? (
              <Typography>Loading products...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Grid2 container spacing={3}>
                {products.length > 0 ? (
                  products.map((product, index) => (
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
                            objectFit: "cover",
                            objectPosition: "left",
                            background:
                              "linear-gradient(49deg, rgb(245, 244, 244), rgb(170, 170, 219) 100%) ",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          image={product.productImage}
                          alt={product.productName}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                        <Typography variant="h6" gutterBottom sx={{ padding: "8px" }}>
                          {product.productName}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                        >
                          {product.description}
                        </Typography>
                      </Card>
                    </Grid2>
                  ))
                ) : (
                  <Typography>No products available for this category.</Typography>
                )}
              </Grid2>
            )}

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
export default oneclickproduct;
