import { Box, Card, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import { fetchCategories } from "../AdminDashoard/Category/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getSoftware } from "../AdminDashoard/AdminSoftware/SoftwareSlice";
import { getBanner } from "../AdminDashoard/SiteSetting/SettingSlice";
import Header from "../components/Header";
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

    const interval = setInterval(handleNext, 3000);

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <Grid2 container display="flex" justifyContent="center" mt={1}>

          <Grid2 size={{ lg: 8 }}>

            <Box display="flex" justifyContent="center" height="45vh">
              {data.length > 0 && (
                <img
                  src={data[currentIndex]}
                  alt="Carousel"
                  style={{ maxHeight: "100%", maxWidth: "100%", width: "100%" }}
                />
              )}
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 container className=" flex justify-center" >
          <Grid2 size={{ lg: 8 }}>
            <Box>
              <p className="text-4xl mt-10 mb-8 font-bold font-noto">
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
                    <Card >
                      <Link to={`/products/${category._id}/${encodeURIComponent(category.categoryName)}`} style={{ textDecoration: "none" }}>
                        <div className="h-72 w-full">
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
                      <p className="text-xl text-black font-semibold font-noto pt-3">
                        {limitNameWords(category.categoryName)}
                      </p>
                      <p className="text-lg text-gray-800 pt-1 py-1" >
                        {limitWords(category.description)}
                      </p>
                      <div className="w-full flex  pr-2">
                      <Link to={`/products/${category._id}/${encodeURIComponent(category.categoryName)}`} style={{ textDecoration: "none" }}>
                        <p className=" text-pink-400 text-lg font-semibold rounded-lg  mb-2">Learn More ➜</p>
                        </Link>
                      </div>

                    </Card>
                  </Grid2>
                ))
              ) : (
                <div>No categories available</div>
              )}
            </Grid2>
            <p className="text-4xl mt-10 mb-8 font-bold font-noto">
             Web Based Industrial Software
            </p>
            <Grid2 container spacing={3} mt={1}>
              {softwareData.slice(0, 4).map((software, index) => (
                <Grid2
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  // border={"1px solid black"}
                  key={software._id}
                >
                  <Card>
                    <Link to='/software'>
                      <div className="h-72 w-full">
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
                    <p className="text-xl text-black font-noto font-bold pt-3">
                      {limitNameWords(software.softwareName)}
                    </p>

                    <p className="text-lg text-gray-800 pt-1 py-1">
                      {software.description
                        .split(" ")
                        .slice(0, 20)
                        .join(" ") + (software.description.split(" ").length > 20 ? "..." : "")
                      }
                    </p>
                    <div className="w-full flex  pr-2">
                      <Link to='/software'>
                        <p className=" text-pink-400 text-lg font-semibold rounded-lg  mb-2">Learn More ➜</p>
                      </Link>
                    </div>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Grid2 mt={3} mb={2}   >
              <p className="text-4xl mt-10 mb-8 font-bold font-noto">Foxboro Product Line</p>
            </Grid2>

            <Grid2 container spacing={3} mt={1} mb={3}>
              {(productFox || []).slice(0, 4).map((product) => (
                <Grid2
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  // border={"1px solid black"}
                  key={product._id}
                >
                  <Card>
                    <Link to='/product'>
                      <div className="h-72 w-full">
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
                    <p className="text-xl text-black font-noto font-bold pt-3">
                      {limitNameWords(product.name)}
                    </p>

                    <p className="text-lg text-gray-800 pt-1 py-1">
                      {product.description
                        .split(" ")
                        .slice(0, 20)
                        .join(" ") + (product.description.split(" ").length > 20 ? "..." : "")
                      }
                    </p>

                    <div className="w-full flex  pr-2">
                      <Link to='/product'>
                        <p className=" text-pink-400 text-lg font-semibold rounded-lg  mb-2">Learn More ➜</p>
                      </Link>
                    </div>

                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>
        <Footer />
      </div>
    </>
  );
}

export default content;
