import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageContainer from "../components/HOC/PageContainer";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import { fetchCategories } from "../AdminDashoard/Category/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getSoftware } from "../AdminDashoard/AdminSoftware/SoftwareSlice";
import { getNewProduct } from "../AdminDashoard/Run&NewProject/newProductSlice";
import { getRunning } from "../AdminDashoard/Run&NewProject/RunNewSlice";
import { getBanner } from "../AdminDashoard/SiteSetting/SettingSlice";
import Header from "../components/Header";
// import product from "./product";

function content() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const fetchRunning = useSelector((state) => state.rnProject.runningInt[0]);
  const fetchNewProject = useSelector(
    (state) => state.newProduct.newProducts[0]
  );
  const {
    data: softwareData = [],
    loading,
    error,
  } = useSelector((state) => state.software);
  const { uploadedBanners } = useSelector((state) => state.header);

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
    const interval = setInterval(handleNext, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getSoftware());
    dispatch(getNewProduct());
    dispatch(getRunning());
    dispatch(getBanner());
  }, [dispatch]);

  const limitWords = (text, wordLimit = 10) => {
    if (!text) return "No description available.";
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
          <Grid2 size={{ lg: 9 }}>
            <Box display="flex" justifyContent="center" height="45vh">
              <img
                src={data[currentIndex]}
                alt="Carousel"
                style={{ maxHeight: "100%", maxWidth: "100%", width: "100%" }}
              />
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 container className=" flex justify-center">
          <Grid2 size={{ lg: 9 }} className="">
            <Box>
              <Typography variant="h5" mt={3} mb={2} fontWeight={"bold"}>
                Industrial Automation
              </Typography>
            </Box>
            <Grid2 container spacing={3}>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category, index) => (
                  <Grid2
                    bgcolor={"yellow"}
                    key={index}
                    size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  >
                    <Card>
                      <Link
                        to={`/products/${category._id}/${encodeURIComponent(
                          category.categoryName
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="h-80 w-full">
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
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ padding: "8px" }}
                      >
                        {category.categoryName}{" "}
                        {/* Display the actual category name */}
                      </Typography>
                      <Typography
                        variant="body2"
                        mb={2}
                        sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                      >
                        {limitWords(category.description)}
                      </Typography>
                    </Card>
                  </Grid2>
                ))
              ) : (
                <div>No categories available</div>
              )}
            </Grid2>
            <Typography variant="h5" mt={3} mb={2} fontWeight={"bold"}>
              Industrial Software
            </Typography>
            <Grid2 container spacing={3} mt={1}>
              {softwareData.slice(0, 4).map((software, index) => (
                <Grid2
                  size={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                  // border={"1px solid black"}
                  key={software._id}
                >
                  <Card>
                    <Link to="/software">
                      <div className="h-80 w-full">
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
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ padding: "8px" }}
                    >
                      {software.softwareName}
                    </Typography>

                    <Typography
                      variant="body2"
                      mb={2}
                      sx={{ paddingLeft: "8px", paddingRight: "8px" }}
                    >
                      {software.description.split(" ").slice(0, 100).join(" ") +
                        (software.description.split(" ").length > 100
                          ? "..."
                          : "")}
                    </Typography>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Grid2 display={"flex"} mt={3} mb={2} gap={"55%"}>
              <Typography variant="h5" fontWeight={"bold"}>
                Ongoing Projects
              </Typography>
              <Typography variant="h5" fontWeight={"bold"}>
                New Product
              </Typography>
            </Grid2>
            <Grid2 container className="flex" gap={2.8} mb={4}>
              <Grid2 size={{ lg: 8 }} sx={{ height: 500 }}>
                {fetchRunning && (
                  <Box position="relative" className="h-full">
                    <div className=" h-full">
                      <img
                        src={fetchRunning.projectImage}
                        className="h-full w-full object-fill"
                        alt="Layer Seven Application"
                      />
                    </div>
                    <Box width={"10px"} bgcolor={"yellow"}>
                      <Typography
                        variant="h6"
                        sx={{
                          position: "absolute",
                          right: 20,
                          bottom: 20,
                          left: 20,
                          color: "black",
                          backgroundColor: "rgba(237, 231, 231, 0.7)",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          background:
                            "linear-gradient(49deg, rgb(245, 244, 244), rgb(170, 170, 219) 100%) ",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="black"
                          fontWeight={"bold"}
                        >
                          {fetchRunning.projectName}
                        </Typography>
                        {fetchRunning.description}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid2>
              <Grid2 sx={{ height: 400 }} size={{ lg: 3.8 }}>
                {fetchNewProject && (
                  <Box position="relative" className="h-full">
                    <div className="h-full">
                      <img
                        src={fetchNewProject.projectImage}
                        className="h-full w-full object-fill"
                        alt="Layer Seven Application"
                      />
                    </div>

                    <CardContent
                      sx={{
                        background:
                          "linear-gradient(49deg, rgb(245, 244, 244), rgb(170, 170, 219) 100%) ",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      <Typography variant="h6" color="black">
                        <Typography
                          variant="h6"
                          color="black"
                          fontWeight={"bold"}
                        >
                          {fetchNewProject.projectName}
                        </Typography>
                        {fetchNewProject.description}
                      </Typography>
                    </CardContent>
                  </Box>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Footer />
      </div>
    </>
  );
}

export default content;
