import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { submitAdditionalDetails } from "./AdminProductSlice";
import { useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ProductDetail = () => {
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { loading, error, success } = useSelector(
    (state) => state.foxboroProduct
  );
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [formData, setFormData] = useState({
    manufacturer: "",
    modelName: "",
    keyFeatures: "",
    price: "",
    availability: "",
    reviews: "",
    typeOfProduct: "",
    modelNo: "",
    application: "",
    material: "",
    flowRate: "",
    patternWidth: "",
    packageContains: "",
    countryOfOrigin: "",
    datasheetPdf: null,

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
    const file = files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Only generate previews for image fields
      if (["image1", "image2", "image3"].includes(name)) {
        setPreviewImages((prev) => ({
          ...prev,
          [name]: URL.createObjectURL(file),
        }));
      }

      // Handle datasheetPdf (store file name in formData if needed)
      if (name === "datasheetPdf") {
        setFormData((prev) => ({
          ...prev,
          datasheetPdf: file,
        }));
      }
    }
  };

  
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
    if (form.image1) data.append("images", form.image1);
    if (form.image2) data.append("images", form.image2);
    if (form.image3) data.append("images", form.image3);

    dispatch(submitAdditionalDetails({ id, formData: data }));
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      manufacturer: "",
      modelName: "",
      keyFeatures: "",
      price: "",
      availability: "",
      reviews: "",
      typeOfProduct: "",
      modelNo: "",
      application: "",
      material: "",
      flowRate: "",
      patternWidth: "",
      packageContains: "",
      countryOfOrigin: "",
      datasheetPdf: null,
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

  useEffect(() => {
    if (!submitted) return;

    if (success) {
      setSnackbar({
        open: true,
        message: "Data submitted successfully!",
        severity: "success",
      });
      setSubmitted(false); // Reset submission flag
    } else if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      setSubmitted(false); // Reset submission flag
    }
  }, [success, error, submitted]);

  return (
    <>
      <p className="mb-2 text-2xl font-bold">Product Detail</p>
      <Box className="p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
        <Typography
          variant="h5"
          gutterBottom
          className="mb-4 font-bold text-gray-700"
        >
          Add Full Product Detail
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextField
            label="Manufacturer"
            required
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Model Name"
            required
            name="modelName"
            value={formData.modelName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Key Features"
            required
            name="keyFeatures"
            value={formData.keyFeatures}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <TextField
            label="Price"
            required
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Availability"
            required
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Reviews"
            required
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Type of Product</InputLabel>
            <Select
              name="typeOfProduct"
              value={formData.typeOfProduct}
              onChange={handleChange}
              label="Type of Product"
            >
              <MenuItem value="Automation">Automation</MenuItem>
              <MenuItem value="Instrumentation">Instrumentation</MenuItem>
              <MenuItem value="Software">Software</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Model No"
            required
            name="modelNo"
            value={formData.modelNo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Application"
            required
            name="application"
            value={formData.application}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Material"
            required
            name="material"
            value={formData.material}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Flow Rate"
            required
            name="flowRate"
            value={formData.flowRate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Pattern Width"
            required
            name="patternWidth"
            value={formData.patternWidth}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Package Contains"
            required
            name="packageContains"
            value={formData.packageContains}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Country of Origin"
            required
            name="countryOfOrigin"
            value={formData.countryOfOrigin}
            onChange={handleChange}
            fullWidth
          />

          {/* Image Uploads */}
          <div className="flex space-x-3 justify-between md:col-span-2 flex-wrap ">
            <Box>
              <InputLabel>Image 1</InputLabel>
              <input
                type="file"
                name="image1"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImages.image1 && (
                <img
                  src={previewImages.image1}
                  alt="Preview 1"
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </Box>
            <Box>
              <InputLabel>Image 2</InputLabel>
              <input
                type="file"
                name="image2"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImages.image2 && (
                <img
                  src={previewImages.image2}
                  alt="Preview 2"
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </Box>
            <Box>
              <InputLabel>Image 3</InputLabel>
              <input
                type="file"
                name="image3"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImages.image3 && (
                <img
                  src={previewImages.image3}
                  alt="Preview 3"
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </Box>
            <Box>
              <InputLabel>Data Sheet</InputLabel>
              <input
                type="file"
                name="datasheetPdf"
                accept=".pdf"
                onChange={handleImageChange}
              />
              {formData.datasheetPdf && (
                <Typography
                  variant="body2"
                  className="mt-2 text-sm text-gray-600"
                >
                  Selected File: {formData.datasheetPdf.name}
                </Typography>
              )}
            </Box>
          </div>

          <Box className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ProductDetail;
