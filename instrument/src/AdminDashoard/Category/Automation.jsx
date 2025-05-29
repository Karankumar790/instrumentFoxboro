import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "./CategorySlice";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

function Automation() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [image, setImage] = useState(null);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: "",
    categoryImage: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpen = (cat = null) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryData({
        categoryName: cat.categoryName,
        description: cat.description,
      });
      setImage(cat.categoryImage);
    } else {
      setEditingCategory(null);
      setCategoryData({
        categoryName: "",
        description: "",
        categoryImage: null,
      });
      setImage(null);
    }
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingCategory(null);
    setCategoryData({
      categoryName: "",
      description: "",
      categoryImage: null,
    });
    setImage(null);
  };

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCategoryData({ ...categoryData, categoryImage: file });
    }
  };

  // Validate form data before submitting
  const validateForm = () => {
    if (!categoryData.categoryName.trim()) return "Category Name is required.";
    if (!categoryData.description.trim()) return "Description is required.";
    if (!editingCategory && !categoryData.categoryImage) return "Category Image is required.";
    return null;
  };

  // Handle form submission for adding a category
  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setSnackbar({
        open: true,
        message: validationError,
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("description", categoryData.description);

    if (image && !(typeof image === "string")) {
      formData.append("categoryImage", image);
    }

    try {
      if (editingCategory) {
        await dispatch(
          updateCategory({
            updateCategoryId: editingCategory._id,
            formData: formData,
          })
        ).unwrap();
      } else {
        await dispatch(addCategory(formData)).unwrap();
      }
      await dispatch(fetchCategories());
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: error.message || "An error occurred",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId)).unwrap();
      setTimeout(() => {
        dispatch(fetchCategories());
      }, 1000)
      setSnackbar({
        open: true,
        message: "Category deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      setSnackbar({
        open: true,
        message: error.message || "Please first delete the product then  delete category",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Automation</p>
        <button
          onClick={() => handleOpen()}
          className="text-xl font-semibold p-2 rounded-lg bg-green-800 text-white"
        >
          Add Category +
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <StyledTableRow key={cat._id}>
                <StyledTableCell>
                  <div className="w-24 h-20">
                    <img
                      src={cat.categoryImage}
                      alt={cat.categoryName}
                      className="w-full h-full object-fill"
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {cat.categoryName}
                </StyledTableCell>
                <StyledTableCell>{cat.description}</StyledTableCell>
                <StyledTableCell className="w-40 ">
                  <IconButton component={Link} to={`/admin/categoryProduct/${cat._id}`}>
                    <AddIcon icon={faEye} className="text-black text-lg" />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(cat)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title">
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-title" variant="h6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </Typography>
            <Button onClick={handleCloseModal}>
              <ClearIcon className="text-black text-lg" />
            </Button>
          </Box>

          <TextField
            label="Category Name"
            name="categoryName"
            fullWidth
            margin="normal"
            value={categoryData.categoryName}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={categoryData.description}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            <Box
              sx={{
                width: "100%",
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                border: "1px solid grey",
                marginBottom: 2,
              }}
            >
              {image ? (
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="Preview"
                  className='h-full w-full object-fill'
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )}
            </Box>

            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : editingCategory ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Modal> */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Automation;