import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBanner, getBanner, postBanner } from '../SiteSetting/SettingSlice';
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
  Typography
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const BannerUploadUI = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();
  const { loading, uploadedBanners, success, error } = useSelector((state) => state.header);

  console.log("-------------", uploadedBanners)

  useEffect(() => {
    dispatch(getBanner())
  }, [dispatch])

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
      alert('Please select at least one image.');
      return;
    }
    dispatch(postBanner(imageFiles)).then(() => {
      dispatch(getBanner());
    })
    setSelectedImages([]);
  };

  const handleDelete = (id) => {
    console.log('Delete image with id:', id);
    dispatch(deleteBanner(id)).then(() => {
      dispatch(getBanner())
    })
  }

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
      <div className='flex justify-between'>
        <p className='font-semibold text-2xl'>Banner Management</p>
        {/* <button className='bg-green-600 font-semibold p-2 rounded-lg text-white text-lg' onClick={handleOpen}>Add Header +</button> */}
      </div>
      <div className='flex flex-col bg-white rounded-md space-y-5 p-3'>
        {/* Upload Section */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Upload Up to 10 Banners
          </Typography>

          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="banner-upload"
            />
            <label htmlFor="banner-upload">
              <IconButton
                color="primary"
                component="span"
                sx={{ mb: 2 }}
              >
                <Typography>Select Images</Typography>
              </IconButton>
            </label>

            {/* Preview Grid */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 2,
              mb: 2
            }}>
              {selectedImages.map((img, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Avatar
                    variant="square"
                    src={img}
                    sx={{ width: '100%', height: 120 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleDeletePreviewImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255,255,255,0.7)'
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
              {loading ? 'Uploading...' : 'Upload Banners'}
            </button>
          </form>
        </Box>

        {/* Image Table with Delete Only */}
        <Typography variant="h5" gutterBottom>
          Banner Gallery
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Image 1</TableCell>
                <TableCell>Image 2</TableCell>
                <TableCell>Image 3</TableCell>
                <TableCell>Image 4</TableCell>
                <TableCell>Image 5</TableCell>
                <TableCell>Image 6</TableCell>
                <TableCell>Image </TableCell>
                <TableCell>Image 8</TableCell>
                <TableCell>Image 9</TableCell>
                <TableCell>Image 10</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedBanners.map((banner) => (
                <TableRow key={banner._id}>
                  {banner.images.map((image) => (
                    <TableCell key={image._id}>
                      <Avatar
                        variant="square"
                        src={image.url}
                        sx={{ width: 100, height: 60 }}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(banner._id)}
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
