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
    (state) => state.productPage
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

  const limitWords = (text, wordLimit = 20) => {
    if (!text) return "No description available.";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const limitNameWords = (text, wordLimit = 5) => {
    if (!text) return "No Name available";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };




  return (
    <div className='min-h-screen flex flex-col'>
      <PageContainer showheader="true" className="flex-1 flex flex-col">
        <Grid2 container display="flex" justifyContent="center" className='flex-1' >
          <Grid2
            size={{ lg: 8 }}
            overflow="hidden"
            mb={4}
          // border={"1px solid black"}
          >
            <Box mb={2} >
              <p className="text-4xl mt-3 mb-5 font-bold font-noto" >
                Foxboro Product Line
              </p>
            </Box>


            <Grid2 container spacing={3}>
              {productFox.map((product) => (
                <Grid2
                  key={product._id}
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                >
                  <div>

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
                    <p className="text-xl text-black font-bold pt-3">
                      {limitNameWords(product?.name)}
                    </p>

                    <p className="text-base text-gray-800 pt-1 py-1">
                      {limitWords(product?.description)}
                    </p>
                    <Link to={`/subProduct/${product._id}`}>
                      <div className="w-full flex  pr-2">
                        <p className=" text-pink-400 text-lg font-semibold rounded-lg  mb-2">Learn More ➜</p>
                      </div>
                    </Link>
                  </div>
                </Grid2>
              ))}
            </Grid2>
            {/* {productFox.length > 0 && (
              <Stack spacing={1} alignItems={"end"} mt={2}>
                <Pagination count={pagination?.totalPages || 1}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded" />
              </Stack>
            )} */}

          </Grid2>
        </Grid2>
        <div className="m-3">
          {productFox.length > 0 && (
            <Stack spacing={1} alignItems={"end"} mt={2}>
              <Pagination count={pagination?.totalPages || 1}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded" />
            </Stack>
          )}
        </div>
        <Footer />
      </PageContainer>
    </div>
  );
}
export default product;
