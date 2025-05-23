import {
  Box,
  Card,
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
import { useDispatch, useSelector } from "react-redux";

function product() {
  const { productFox, pagination } = useSelector(
    (state) => state.foxboroProduct
  );
  const [open, setOpen] = useState(false);


  const handleToggle = () => {
    setOpen(!open);
  };


  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getFoxboroProduct({ page, limit: 8 }));
  }, [dispatch, page]);


  const handlePageChange = (event, value) => {
    setPage(value);
  };




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
                Foxboro Products
              </Typography>
            </Box>


            <Grid2 container spacing={3}>
              {productFox.map((product) => (
                <Grid2
                  bgcolor={"yellow"}
                  key={product._id}
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                >
                  <Card>

                    <Link to={`/subProduct/${product._id}`}>
                      <div className="h-72 w-full ">
                        <img
                          src={product?.image}
                          alt={product.name}
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
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ padding: "8px" }}
                    >
                      {product?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      mb={2}
                      sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                    >
                      {product?.description}
                    </Typography>
                    <div className="w-full flex justify-end">
                      <button className="bg-green-600 text-white rounded-lg p-2 mb-2">Available on E-store</button>
                    </div>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            {productFox.length > 0 && (
              <Stack spacing={1} alignItems={"end"} mt={2}>
                <Pagination count={pagination?.totalPages || 1}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded" />
              </Stack>
            )}

          </Grid2>
        </Grid2>
        <Footer />
      </PageContainer>
    </div>
  );
}
export default product;
