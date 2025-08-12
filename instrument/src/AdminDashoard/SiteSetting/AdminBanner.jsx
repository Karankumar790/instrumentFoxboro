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
  TableRow,
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
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-5">
          <p className="font-semibold text-2xl">Banner Management</p>
        </div>

        <div className="flex flex-col bg-white rounded-md space-y-5 p-3">
          {/* Image Table */}
          <div className="w-full flex justify-between">
            <Typography variant="h5" gutterBottom>
              Banner Gallery
            </Typography>
            <input
              type="number"
              placeholder="Slider Delay (in seconds)"
              className="h-10 px-3 border rounded"
              value={sliderDelay}
              onChange={(e) => setSliderDelay(e.target.value)}
              min={1}
            />
          </div>
          <TableContainer >
            <Table>
             
              <TableBody>
                {uploadedBanners.map((banner) => {
                  // Group images in chunks of 5
                  const imageChunks = [];
                  for (let i = 0; i < banner.images.length; i += 5) {
                    imageChunks.push(banner.images.slice(i, i + 5));
                  }

                  return imageChunks.map((chunk, rowIndex) => (
                    <TableRow key={`${banner._id}-${rowIndex}`}>
                      {chunk.map((image, index) => (
                        <TableCell key={image.public_id}>
                          <Box sx={{ position: "relative" }} width={'80%'} height={'80%'}>
                            <Avatar
                              variant="square"
                              src={image.url}
                               sx={{ width: "100%", height: 120 }}
                            />
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteSingleImage(banner._id, image.public_id)}
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
                        </TableCell>
                      ))}
                    </TableRow>
                  ));
                })}
              </TableBody>

            </Table>
          </TableContainer>

          <Box sx={{ mb: 4, p: 3, bgcolor: "background.paper", borderRadius: 2, display: 'flex', justifyContent: 'space-between' }}>
            <div>
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

              </div>

              <Box
                sx={{
                  display: "flex",
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
            </div>
            <div>
              <button
                type="submit"
                className="w-36 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                Save Banner
              </button>
            </div>
          </Box>
        </div>
      </form >
    </>
  );
};

export default BannerUploadUI;
