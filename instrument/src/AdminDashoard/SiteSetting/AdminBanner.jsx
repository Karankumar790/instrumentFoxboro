import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBanner,
  getBanner,
  postBanner,
} from "../SiteSetting/SettingSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const BannerUploadUI = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();
  const { loading, uploadedBanners } = useSelector((state) => state.header);
  const [selectedPublicIds, setSelectedPublicIds] = useState({});
  const [sliderDelay, setSliderDelay] = useState(""); // Add this

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setSelectedImages((prev) => {
      const updated = [...prev, ...imageUrls];
      return updated.slice(0, 10);
    });

    setImageFiles((prev) => {
      const updated = [...prev, ...files];
      return updated.slice(0, 10);
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (imageFiles.length === 0) {
  //     alert("Please select at least one image.");
  //     return;
  //   }
  //   dispatch(postBanner(imageFiles)).then(() => {
  //     dispatch(getBanner());
  //   });
  //   setSelectedImages([]);
  //   setImageFiles([]);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    console.log(sliderDelay, "sliderDelay :");
    // Correctly pass object with images and sliderDelay
    dispatch(postBanner({ images: imageFiles, sliderDelay })).then(() =>
      dispatch(getBanner())
    );

    setSelectedImages([]);
    setImageFiles([]);
    setSliderDelay("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (imageFiles.length === 0) {
  //     alert("Please select at least one image.");
  //     return;
  //   }

  //   // Dispatch correctly with both images and delay
  //   dispatch(postBanner({ images: imageFiles, sliderDelay })).then(() => {
  //     dispatch(getBanner());
  //   });

  //   // Reset local states
  //   setSelectedImages([]);
  //   setImageFiles([]);
  //   setSliderDelay("");
  // };

  const handleDelete = (bannerId) => {
    dispatch(deleteBanner({ id: bannerId })).then(() => {
      dispatch(getBanner());
    });
  };

  const handleDeleteSingleImage = (bannerId, publicId) => {
    dispatch(deleteBanner({ id: bannerId, publicIds: [publicId] })).then(() => {
      dispatch(getBanner());
    });
  };

  const handleDeletePreviewImage = (index) => {
    const updatedPreviews = [...selectedImages];
    const updatedFiles = [...imageFiles];
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedPreviews);
    setImageFiles(updatedFiles);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold text-2xl">Banner Management</p>
      </div>

      <div className="flex flex-col bg-white rounded-md space-y-5 p-3">
        <Box sx={{ mb: 4, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Upload Up to 10 Banners
          </Typography>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="banner-upload"
              />
              <label htmlFor="banner-upload">
                <IconButton color="primary" component="span" sx={{ mb: 2 }}>
                  <Typography>Select Images</Typography>
                </IconButton>
              </label>
              {/* <input
                type="text"
                placeholder="Time"
                className="h-10 border px-2 rounded"
              /> */}
              <input
                type="number"
                placeholder="Slider Delay (in seconds)"
                className="h-10 px-3 border rounded"
                value={sliderDelay}
                onChange={(e) => setSliderDelay(e.target.value)}
                min={1}
              />
            </div>

            {/* Preview grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: 2,
                mb: 2,
              }}
            >
              {selectedImages.map((img, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <Avatar
                    variant="square"
                    src={img}
                    sx={{ width: "100%", height: 120 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleDeletePreviewImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <button
              type="submit"
              disabled={loading || selectedImages.length === 0}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Banners"}
            </button>
          </form>
        </Box>

        {/* Image Table */}
        <Typography variant="h5" gutterBottom>
          Banner Gallery
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <TableCell key={i}>Image {i + 1}</TableCell>
                ))}
                <TableCell align="right">Delete All</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedBanners.map((banner) => (
                <TableRow key={banner._id}>
                  {banner.images.map((image) => (
                    <TableCell
                      key={image.public_id}
                      sx={{ position: "relative" }}
                    >
                      <Avatar
                        variant="square"
                        src={image.url}
                        sx={{ width: 100, height: 60 }}
                      />
                      <input
                        type="checkbox"
                        className="absolute top-0 left-0 m-1"
                        checked={
                          selectedPublicIds[banner._id]?.includes(
                            image.public_id
                          ) || false
                        }
                        onChange={(e) => {
                          setSelectedPublicIds((prev) => {
                            const current = prev[banner._id] || [];
                            const updated = e.target.checked
                              ? [...current, image.public_id]
                              : current.filter(
                                  (pid) => pid !== image.public_id
                                );
                            return {
                              ...prev,
                              [banner._id]: updated,
                            };
                          });
                        }}
                      />
                    </TableCell>
                  ))}

                  {/* Fill blank cells if fewer than 10 */}
                  {Array.from({ length: 10 - banner.images.length }).map(
                    (_, i) => (
                      <TableCell key={`empty-${i}`}></TableCell>
                    )
                  )}

                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => {
                        const selectedIds = selectedPublicIds[banner._id] || [];
                        if (selectedIds.length === 0) return;
                        dispatch(
                          deleteBanner({
                            id: banner._id,
                            publicIds: selectedIds,
                          })
                        ).then(() => {
                          setSelectedPublicIds((prev) => ({
                            ...prev,
                            [banner._id]: [],
                          }));
                          dispatch(getBanner());
                        });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BannerUploadUI;
