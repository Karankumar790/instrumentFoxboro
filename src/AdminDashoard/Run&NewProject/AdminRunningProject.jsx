import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from 'react-redux';
import { deleteRunning, getRunning, postRunning, updateRunning } from './RunNewSlice';
import { toast } from 'react-toastify';


const Modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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



const initialInput = {
  projectName: '',
  description: '',
}

function AdminRunningProject() {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(initialInput);
  const [modalData, setModalData] = useState(initialInput);
  const [editingId, setEditingId] = useState(null);


  const dispatch = useDispatch();

  const fetchRunning = useSelector((state) => state.rnProject.runningInt)

  const handleOpen = (project) => {
    setModalData({
      projectName: project.projectName,
      description: project.description,
    });
    setImage(project.projectImage);
    setEditingId(project._id); // <--- set ID here
    setOpen(true);
  };




  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleModalInput = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = () => {
    const submitFormData = new FormData();
    submitFormData.append("projectName", formData.projectName);
    submitFormData.append("description", formData.description);

    // Only append image if it's a new file (not existing URL string)
    if (image && !(typeof image === "string")) {
      submitFormData.append("runningProjectImage", image);
    }

    dispatch(postRunning(submitFormData)).unwrap();
    dispatch(getRunning());

    setFormData({
      projectName: '',
      description: '',
    })
    toast.success("Running Project added successfully!");
  }

  const handleUpdate = () => {
    const updatedFormData = new FormData();
    updatedFormData.append("projectName", modalData.projectName);
    updatedFormData.append("description", modalData.description);

    if (image && typeof image !== "string") {
      updatedFormData.append("runningProjectImage", image);
    }

    dispatch(updateRunning({ projectId: editingId, formData: updatedFormData })).unwrap();
    dispatch(getRunning());
    toast.success("Project updated successfully!");
    setOpen(false); // close modal
  };

  const handleDelete = (projectId) => {
      dispatch(deleteRunning(projectId))
        .unwrap()
        .then(() => {
          toast.success("Project deleted successfully!");
        })
        .catch((err) => {
          toast.error(err || "Failed to delete project.");
        });
  };
  


  useEffect(() => {
    dispatch(getRunning())
  }, [dispatch])


  return (
    <div>
      <p className='text-2xl font-bold'>Running Project</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-between p-4 bg-white rounded-lg shadow-md overflow-x-auto mt-2'>
        <label>
          <p className='text-lg font-semibold mb-1'>Name</p>
          <input type='text' name='projectName' value={formData.projectName} onChange={handleInput} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </label>
        <label>
          <p className='text-lg font-semibold mb-1'>Description</p>
          <input type='text' name='description' value={formData.description} onChange={handleInput} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </label>
        <label>
          <p className='text-lg font-semibold mb-1'>Image</p>
          <input type='file' name='runningProjectImage' onChange={handleImage} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </label>
        <div className='flex items-end justify-end w-full '>
          <button onClick={handleSubmit} className='bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-md w-full'>
            Submit
          </button>
        </div>
      </div>

      <div className='mt-4'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell >Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchRunning?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={row.projectImage}
                      alt="logo"
                      className="w-20 h-12 object-contain"
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.projectName}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      className="hover:bg-blue-100"
                      onClick={() => handleOpen(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      className="hover:bg-red-100"
                      onClick={() => handleDelete(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={Modalstyle}>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Edit Running Project
            </h2>
            <IconButton className="hover:bg-gray-100 text-lg" onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </div>

          <div className='space-y-5'>
            <input
              type="text"
              className='border rounded w-full p-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Name'
              name='projectName'
              onChange={handleModalInput}
              value={modalData.projectName}
            />
            <textarea
              rows={3}
              placeholder='Description'
              name='description'
              className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              onChange={handleModalInput}
              value={modalData.description}
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
                {
                  image ? (
                    <img
                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}
                      alt="preview"
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Image Selected
                    </Typography>
                  )
                }
              </Box>

              {/* Wrap the input inside a label */}
              <label className='w-full bg-blue-600 p-2 text-white rounded-lg font-semibold text-center cursor-pointer'>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            </Box>
            <button
              className={`w-full bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg font-semibold transition-colors`}
              type="button"
              onClick={handleUpdate}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AdminRunningProject
