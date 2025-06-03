import { Box, Card, CardMedia, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getProductById } from "./product";

function oneclickproduct() {
  const [open, setOpen] = useState(false);
  const { categoryId, categoryName } = useParams();
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(categoryId);
        console.log("API Response:", response);

        // Handle common response structures
        if (Array.isArray(response)) {
          setProduct(response);
        } else if (response && Array.isArray(response.data)) {
          setProduct(response.data);
        } else {
          setProduct([]); // fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
        setProduct([]); // Also set empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categoryId]);

  const limitWords = (text, wordLimit = 20) => {
    if (!text) return "No description available.";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const limitNameWords = (text, wordLimit = 5) => {
    if (!text) return "No Name available";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageContainer showheader="true" className="flex flex-1 flex-col">
        <Grid2
          container
          display="flex"
          justifyContent="center"
          className="flex-1"
        >
          <Grid2 size={{ lg: 8 }} overflow="hidden" mb={4}>
            <Box>
              <p className="text-4xl mt-10 mb-8 font-bold font-noto">
                Industrial Automation / {decodeURIComponent(categoryName)}
              </p>
            </Box>

            {loading ? (
              <Typography>Loading products...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : products.length == 0 ? (
              <Typography>No products available for this category.</Typography>
            ) : (
              <Grid2 container spacing={3}>
                {products.map((product, index) => (
                  <Grid2
                    bgcolor={"yellow"}
                    key={index}
                    size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  >
                    <Card className="h-full flex flex-col justify-between">
                      <Link to={`/oneClickProDetail/${product._id}`}>
                        <div className="h-64 w-full">
                          <img
                            src={product.productImage}
                            alt={product.productName}
                            className="transition-transform duration-300 ease-in-out h-full w-full object-fill"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col flex-grow px-3 py-4">
                        <p className="text-xl text-black font-bold pt-3  line-clamp-2">
                          {limitNameWords(product.productName)}
                        </p>

                        <p className="text-lg text-gray-800  font-noto flex-grow">
                          {limitWords(product.description)}
                        </p>

                        <div className="w-full flex  pr-2">
                          <Link to={`/oneClickProDetail/${product._id}`}>
                            <p className=" text-pink-400 text-lg font-semibold rounded-lg  mb-2">Learn More ➜</p>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            )}
          </Grid2>
        </Grid2>
        {/* Pagination at the bottom */}
        <Box mt="auto" margin={3}>
          <Stack spacing={1} alignItems="end">
            <Pagination count={2} variant="outlined" shape="rounded" />
          </Stack>
        </Box>
        <Footer />
      </PageContainer>
    </div>
  );
}
export default oneclickproduct;
