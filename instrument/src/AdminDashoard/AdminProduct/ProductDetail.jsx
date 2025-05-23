import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { submitAdditionalDetails } from './AdminProductSlice';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {



  const { id } = useParams();

  const dispatch = useDispatch()
  const [form, setForm] = useState({
    image1: null,
    image2: null,
    image3: null,
  })
  const [formData, setFormData] = useState({
    manufacturer: '',
    modelName: '',
    keyFeatures: '',
    price: '',
    availability: '',
    reviews: '',
    typeOfProduct: '',
    modelNo: '',
    application: '',
    material: '',
    flowRate: '',
    patternWidth: '',
    packageContains: '',
    countryOfOrigin: '',
    // images: [form.image1, form.image2, form.image3]
  });




  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    { console.log("files :", files) }
    const file = files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreviewImages((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = new FormData();

  //   // Append all text fields
  //   for (const key in formData) {
  //     if (key !== 'image1' && key !== 'image2' && key !== 'image3') {
  //       if (formData[key]) {
  //         data.append(key, formData[key]);
  //       }
  //     }
  //   }
  //   // Append images using the same key 'images'
  //   if (form.image1) data.append('images', form.image1);
  //   if (form.image2) data.append('images', form.image2);
  //   if (form.image3) data.append('images', form.image3);


  //   dispatch(productDetail({ id, formData: data }));

  //   setFormData({
  //     manufacturer: '',
  //     modelName: '',
  //     keyFeatures: '',
  //     price: '',
  //     availability: '',
  //     reviews: '',
  //     typeOfProduct: '',
  //     modelNo: '',
  //     application: '',
  //     material: '',
  //     flowRate: '',
  //     patternWidth: '',
  //     packageContains: '',
  //     countryOfOrigin: '',
  //   })


  // };

  const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();

  // Append all text fields
  for (const key in formData) {
    if (formData[key]) {
      data.append(key, formData[key]);
    }
  }

  // Append images
  if (form.image1) data.append('images', form.image1);
  if (form.image2) data.append('images', form.image2);
  if (form.image3) data.append('images', form.image3);

  dispatch(submitAdditionalDetails({ id, formData: data }));

  // Reset form after submission
  setFormData({
    manufacturer: '',
    modelName: '',
    keyFeatures: '',
    price: '',
    availability: '',
    reviews: '',
    typeOfProduct: '',
    modelNo: '',
    application: '',
    material: '',
    flowRate: '',
    patternWidth: '',
    packageContains: '',
    countryOfOrigin: '',
  });

  setForm({
    image1: null,
    image2: null,
    image3: null,
  });

  setPreviewImages({
    image1: null,
    image2: null,
    image3: null,
  });
};

  return (
    <Box className="p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
      <Typography variant="h5" gutterBottom className="mb-4 font-bold text-gray-700">
        Add Full Product Detail
      </Typography>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} fullWidth />
        <TextField label="Model Name" name="modelName" value={formData.modelName} onChange={handleChange} fullWidth />
        <TextField label="Key Features" name="keyFeatures" value={formData.keyFeatures} onChange={handleChange} fullWidth multiline />
        <TextField label="Price" name="price" value={formData.price} onChange={handleChange} fullWidth />
        <TextField label="Availability" name="availability" value={formData.availability} onChange={handleChange} fullWidth />
        <TextField label="Reviews" name="reviews" value={formData.reviews} onChange={handleChange} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Type of Product</InputLabel>
          <Select name="typeOfProduct" value={formData.typeOfProduct} onChange={handleChange} label="Type of Product">
            <MenuItem value="Automation">Automation</MenuItem>
            <MenuItem value="Instrumentation">Instrumentation</MenuItem>
            <MenuItem value="Software">Software</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Model No" name="modelNo" value={formData.modelNo} onChange={handleChange} fullWidth />
        <TextField label="Application" name="application" value={formData.application} onChange={handleChange} fullWidth />
        <TextField label="Material" name="material" value={formData.material} onChange={handleChange} fullWidth />
        <TextField label="Flow Rate" name="flowRate" value={formData.flowRate} onChange={handleChange} fullWidth />
        <TextField label="Pattern Width" name="patternWidth" value={formData.patternWidth} onChange={handleChange} fullWidth />
        <TextField label="Package Contains" name="packageContains" value={formData.packageContains} onChange={handleChange} fullWidth />
        <TextField label="Country of Origin" name="countryOfOrigin" value={formData.countryOfOrigin} onChange={handleChange} fullWidth />

        {/* Image Uploads */}
        <Box>
          <InputLabel>Image 1</InputLabel>
          <input type="file" name="image1" accept="image/*" onChange={handleImageChange} />
          {previewImages.image1 && <img src={previewImages.image1} alt="Preview 1" className="mt-2 w-32 h-20 object-cover rounded" />}
        </Box>
        <Box>
          <InputLabel>Image 2</InputLabel>
          <input type="file" name="image2" accept="image/*" onChange={handleImageChange} />
          {previewImages.image2 && <img src={previewImages.image2} alt="Preview 2" className="mt-2 w-32 h-20 object-cover rounded" />}
        </Box>
        <Box>
          <InputLabel>Image 3</InputLabel>
          <input type="file" name="image3" accept="image/*" onChange={handleImageChange} />
          {previewImages.image3 && <img src={previewImages.image3} alt="Preview 3" className="mt-2 w-32 h-20 object-cover rounded" />}
        </Box>

        <Box className="col-span-1 md:col-span-2 flex justify-end mt-4">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductDetail;
