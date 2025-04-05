import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, fetchCategories } from "./CategorySlice";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye } from "@fortawesome/free-solid-svg-icons";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function Automation() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const token = useSelector((state) => state.auth.token);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: "",
    categoryImage: null,
  });

  const [image, setImage] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCategoryData({ ...categoryData, categoryImage: file });
    }
  };

  const validateForm = () => {
    if (!categoryData.categoryName.trim()) return "Category Name is required.";
    if (!categoryData.description.trim()) return "Long Description is required.";
    if (!categoryData.categoryImage) return "Category Image is required.";
    return null;
  };

  const handleSubmit = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("description", categoryData.description);
    formData.append("categoryImage", categoryData.categoryImage);

    try {
      await dispatch(addCategory(formData)).unwrap();
      setSnackbar({
        open: true,
        message: "Category added successfully!",
        severity: "success",
      });
      setCategoryData({ categoryName: "", description: "", categoryImage: null });
      setImage(null);
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error || "Failed to add category.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Automation</p>
        <button
          onClick={handleOpen}
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
              <StyledTableCell >Description</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <StyledTableRow key={cat._id}>
                <StyledTableCell align="right">
                  <img src={cat.categoryImage} alt={cat.categoryName} width="100" />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {cat.categoryName}
                </StyledTableCell>
                <StyledTableCell>{cat.description}</StyledTableCell>
                <StyledTableCell>
                  <IconButton>
                    <Link to={`/admin/categoryProduct/${cat._id}`}>
                      <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>
                  </IconButton>
                  <IconButton
                    color='primary'
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Modal open={isModalOpen} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-title" variant="h6">
              Add New Category
            </Typography>
            <Button onClick={handleClose}>
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
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Selected
                </Typography>
              )}
            </Box>

            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Automation;
