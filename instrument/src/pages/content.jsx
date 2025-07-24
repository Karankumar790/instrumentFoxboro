import { Box, Card, Grid2  } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../AdminDashoard/Category/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getSoftware } from "../AdminDashoard/AdminSoftware/SoftwareSlice";
import { getBanner } from "../AdminDashoard/SiteSetting/SettingSlice";
import { getFoxboroProduct } from "./product";
// import product from "./product";

function content() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const {
    data: softwareData = [],
    loading,
    error,
  } = useSelector((state) => state.software);
  const { uploadedBanners } = useSelector((state) => state.header);
  const { productFox } = useSelector(state => state.productPage)
  const [page, setPage] = useState(1);

  const data =
    uploadedBanners.length > 0
      ? uploadedBanners[0].images.map((img) => img.url)
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);


  // Function to handle next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  // Auto-change banner every 3 seconds
  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(handleNext,uploadedBanners?.map((time) => time.sliderDelay*1000) );

    return () => clearInterval(interval);
  }, [data.length]); // Re-run if banner data updates

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getSoftware());
    dispatch(getBanner());
    dispatch(getFoxboroProduct({ page, limit: 4 }));
  }, [dispatch]);

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
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between w-full ">
        <Grid2 container display="flex" justifyContent="center" mt={1} sx={{px:{xs:2,md:0,sm:2}}}>
          <Grid2 size={{ xs: 12, sm: 10, md: 9, lg: 8 }}>
            <Box
              display="flex"
              justifyContent="center"
              sx={{
                height: {
                  xs: '30vh',  // smaller height on mobile
                  sm: '35vh',
                  md: '40vh',
                  lg: '45vh',  // your desired default
                }
              }}
            >
              {data.length > 0 && (
                <img
                  src={data[currentIndex]}
                  alt="Carousel"
                  className="h-full w-full object-fill"
                />
              )}
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 container className=" flex justify-center" sx={{px:{xs:2,md:0,sm:2}}} >
          {categories.length > 0 ? (
            <Grid2 size={{ lg: 8,xs: 12, sm: 10, md: 9 }}>
              <Box>
                <p className="text-3xl mt-10 mb-8 font-bold font-noto">
                  Industrial Automation
                </p>
              </Box>
              <Grid2 container spacing={3}>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category, index) => (
                    <Grid2
                      // bgcolor={"yellow"}
                      key={index}
                      size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                    >
                      <Card className="h-full flex flex-col justify-between">
                        <Link to={`/products/${category._id}/${encodeURIComponent(category.categoryName)}`} style={{ textDecoration: "none" }}>
                          <div className="h-64 w-full bg-slate-200">
                            <img
                              src={category.categoryImage}
                              alt={category.categoryName}
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
                          <p className="text-xl text-black font-noto font-bold mb-2 line-clamp-2 ">
                            {limitNameWords(category.categoryName)}
                          </p>
                          <p className="text-lg text-gray-800 font-noto flex-grow">
                            {limitWords(category.description)}
                          </p>

                          <div className="w-full flex pt-3">
                            <Link
                              to={`/products/${category._id}/${encodeURIComponent(category.categoryName)}`}
                              style={{ textDecoration: "none" }}
                            >
                              <p className="text-red-600 text-md font-semibold">Learn More ➜</p>
                            </Link>
                          </div>
                        </div>

                      </Card>
                    </Grid2>
                  ))
                ) : (
                  <div>No categories available</div>
                )}
              </Grid2>

              <Grid2 mt={3} mb={2}   >
                <p className="text-3xl mt-10 mb-8 font-bold font-noto">Foxboro Product Line</p>
              </Grid2>

              <Grid2 container spacing={3} mt={1} mb={3}>
                {productFox.length > 0 ? (

                  productFox.slice(0, 8).map((product) => (
                    <Grid2
                      size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                      // border={"1px solid black"}
                      key={product._id}
                      sx={{ backgroundColor: 'pink' }}
                    >
                      <Card className="h-full flex flex-col justify-between">
                        <Link to='/product'>
                          <div className="h-64 w-full">
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

                        </Link>
                        <div className="flex flex-col flex-grow px-3 py-4">
                          <p className="text-xl text-black font-noto font-bold pt-3 line-clamp-2 ">
                            {limitNameWords(product.name)}
                          </p>

                          <p className="text-lg text-gray-800 font-noto flex-grow">
                            {limitWords(product.description)}
                          </p>

                          <div className="w-full flex  pr-2">
                            <Link to='/product'>
                              <p className=" text-red-600 text-md font-semibold rounded-lg  mb-2">Learn More ➜</p>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </Grid2>
                  ))

                ) : (
                  <div>
                    No Foxboro Product
                  </div>
                )}

              </Grid2>

              <p className="text-3xl mt-10 mb-8 font-bold font-noto">
                Engineering Service
              </p>
              <Grid2 container spacing={3} mt={1} mb={3}>
                {softwareData.length > 0 ? (
                  softwareData.slice(0, 4).map((software, index) => (
                    <Grid2
                      size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                      key={software._id}
                    >
                      <Card className="h-full flex flex-col justify-between">
                        <Link to="/software">
                          <div className="h-64 w-full">
                            <img
                              src={software.softwareImage}
                              alt={software.softwareName}
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
                          <p className="text-xl text-black font-noto font-bold pt-3 line-clamp-2 ">
                            {limitNameWords(software.softwareName)}
                          </p>
                          <p className="text-lg text-gray-800 font-noto flex-grow">
                            {limitWords(software.description)}
                          </p>
                          <div className="w-full flex pr-2">
                            <Link to="/software">
                              <p className="text-red-600 text-md font-semibold rounded-lg mb-2">
                                Learn More ➜
                              </p>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </Grid2>
                  ))
                ) : (
                  <div>No Software available</div>
                )}
              </Grid2>


            </Grid2>
          ) : (
            <div></div>
          )}

        </Grid2>
      </div>
    </>
  );
}

export default content;
