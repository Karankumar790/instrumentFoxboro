import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from 'react-redux';
import { getHeader, postheader, updateHeader } from './SettingSlice';
import { toast } from 'react-toastify';




const style = {
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


function AdminHeader() {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const getHeaders = useSelector((state) => state.header.headerInt);
  const [formValue, setFormValue] = useState({
    contactNumberOne: "",
    contactNumberTwo: "",
    whatsappNumber: "",
    email: "",
    instagramLink: "",
    facebookLink: "",
    youTubeLink: ""
  });

  const [updateValue, setUpdateValue] = useState({
    contactNumberOne: "",
    contactNumberTwo: "",
    whatsappNumber: "",
    email: "",
    instagramLink: "",
    facebookLink: "",
    youTubeLink: ""
  })

  const dispatch = useDispatch();

  const handleOpen = () => {
    setUpdateValue({
      contactNumberOne: getHeaders.contactNumberOne,
      contactNumberTwo: getHeaders.contactNumberTwo,
      whatsappNumber: getHeaders.whatsappNumber,
      email: getHeaders.email,
      instagramLink: getHeaders.instagramLink,
      facebookLink: getHeaders.facebookLink,
      youTubeLink: getHeaders.youTubeLink,
    })
    setImage(getHeaders.foxboroLogo)
    setOpen(true)
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
    }
  }

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateValue = (e) => {
    const { name, value } = e.target;
    setUpdateValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleSubmit = async () => {
    const submitformData = new FormData();
    submitformData.append("contactNumberOne", formValue.contactNumberOne);
    submitformData.append("contactNumberTwo", formValue.contactNumberTwo);
    submitformData.append("whatsappNumber", formValue.whatsappNumber);
    submitformData.append("email", formValue.email);
    submitformData.append("instagramLink", formValue.instagramLink);
    submitformData.append("facebookLink", formValue.facebookLink);
    submitformData.append("youTubeLink", formValue.youTubeLink);

    if (image) {
      submitformData.append("foxboroLogo", image);
    }

    try {
      await dispatch(postheader(submitformData)).unwrap(); // unwrap gives you success/error directly
      setFormValue({
        contactNumberOne: "",
        contactNumberTwo: "",
        whatsappNumber: "",
        email: "",
        instagramLink: "",
        facebookLink: "",
        youTubeLink: "",
      });
      setImage(null);
      toast.success("Header added successfully!");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const handleUpdateSubmit = async () => {
    const updateformData = new FormData();
    updateformData.append("contactNumberOne", updateValue.contactNumberOne);
    updateformData.append("contactNumberTwo", updateValue.contactNumberTwo);
    updateformData.append("whatsappNumber", updateValue.whatsappNumber);
    updateformData.append("email", updateValue.email);
    updateformData.append("instagramLink", updateValue.instagramLink);
    updateformData.append("facebookLink", updateValue.facebookLink);
    updateformData.append("youTubeLink", updateValue.youTubeLink);

    if (image && typeof image !== "string") {
      updateformData.append("foxboroLogo", image);
    }

    try {
      await dispatch(updateHeader(
        updateformData
      )).unwrap();
      toast.success("Header updated successfully!");
      handleClose();
    } catch (error) {
      toast.error(error?.message || "Failed to update header");
    }
  };

  useEffect(() => {
    dispatch(getHeader());
  }, [dispatch])


  return (
    <div className='flex flex-col  space-y-5'>
      <div className='flex justify-between'>
        <p className='font-semibold text-2xl'>Header Management</p>
        {/* <button className='bg-green-600 font-semibold p-2 rounded-lg text-white text-lg' onClick={handleOpen}>Add Header +</button> */}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-between p-4 bg-white rounded-lg shadow-md overflow-x-auto'>
        <div className='flex flex-col '>
          <label>
            <h2 className='text-sm font-semibold mb-1'>Phone Number 1</h2>
            <input type="number" name='contactNumberOne' value={formValue.contactNumberOne} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
        <div className='flex flex-col '>
          <label>
            <h2 className='text-sm font-semibold mb-1'>Phone Number 2</h2>
            <input type="number" name='contactNumberTwo' value={formValue.contactNumberTwo} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
        <div className='flex flex-col'>
          <label>
            <h2 className='text-sm font-semibold mb-1'>WhatsApp Number</h2>
            <input type="number" name='whatsappNumber' value={formValue.whatsappNumber} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
        <div className='flex flex-col'>
          <label>
            <h2 className='text-sm font-semibold mb-1'>Email</h2>
            <input type="email" name='email' value={formValue.email} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-between p-4 bg-white rounded-lg shadow-md overflow-x-auto'>
        <div className='flex flex-col'>
          <label>
            <h2 className='text-sm font-semibold mb-1'>Logo Image</h2>
            <input type="file" name='image' accept='image/*' onChange={handleImage} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
        <div className='flex  flex-col'>
          <label>
            <h2 className='text-sm font-semibold mb-1'>Instagram</h2>
            <input type="text" name='instagramLink' value={formValue.instagramLink} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
        <div className='flex flex-col'>
          <label>
            <h2 className='text-sm font-semibold mb-1'>FaceBook</h2>
            <input type="text" name='facebookLink' value={formValue.facebookLink} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>
        <div className='flex flex-col'>
          <label>
            <h2 className='text-sm font-semibold mb-1'>Youtube</h2>
            <input type="text" name='youTubeLink' value={formValue.youTubeLink} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </label>
        </div>

      </div>
      <div className='flex items-end justify-end w-full '>
        <button onClick={handleSubmit} className='bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-md w-32'>
          Submit
        </button>
      </div>


      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Logo Image</StyledTableCell>
                <StyledTableCell >Phone Number 1</StyledTableCell>
                <StyledTableCell >Phone Number 2</StyledTableCell>
                <StyledTableCell >Phone Number 3</StyledTableCell>
                <StyledTableCell >Email</StyledTableCell>
                <StyledTableCell >Instagram</StyledTableCell>
                <StyledTableCell >FaceBook</StyledTableCell>
                <StyledTableCell align="left">YouTube</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={getHeaders._id}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={getHeaders.foxboroLogo}
                    alt="logo"
                    className="w-20 h-12 object-contain"
                  />
                </StyledTableCell>
                <StyledTableCell >{getHeaders.contactNumberOne}</StyledTableCell>
                <StyledTableCell>{getHeaders.contactNumberTwo}</StyledTableCell>
                <StyledTableCell >{getHeaders.whatsappNumber}</StyledTableCell>
                <StyledTableCell >{getHeaders.email}</StyledTableCell>
                <StyledTableCell sx={{ width: "200px", maxWidth: "100px", overflow: "hidden" }}>{getHeaders.instagramLink}</StyledTableCell>
                <StyledTableCell sx={{ width: "200px", maxWidth: "100px", overflow: "hidden" }}>{getHeaders.facebookLink}</StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "200px", maxWidth: "100px", overflow: "hidden" }}>{getHeaders.youTubeLink}</StyledTableCell>
                <StyledTableCell align="right">{
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(getHeaders)}
                  >
                    <EditIcon />
                  </IconButton>
                }</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex justify-between'>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <button onClick={handleClose}>
                <ClearIcon className="text-black text-lg" />
              </button>
            </div>

            <div className='w-full  space-y-4 mt-2'>
              <div className='flex gap-2 w-full '>
                <input type="number" placeholder='Number 1' name='contactNumberOne' value={updateValue.contactNumberOne} onChange={handleUpdateValue} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="number" placeholder='Number 2' name='contactNumberTwo' value={updateValue.contactNumberTwo} onChange={handleUpdateValue} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <input type="number" placeholder='whatsappNumber ' name='whatsappNumber' value={updateValue.whatsappNumber} onChange={handleUpdateValue} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="email" placeholder='Email' name='email' value={updateValue.email} onChange={handleUpdateValue} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <input type="text" placeholder='InstagramLink' name='instagramLink' value={updateValue.instagramLink} onChange={handleUpdateValue} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="text" placeholder='FaceBookLink' name='facebookLink' value={updateValue.facebookLink} onChange={handleUpdateValue} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='w-full'>
                <input type="text" placeholder='YoutubeLink' name='youTubeLink' value={updateValue.youTubeLink} onChange={handleUpdateValue} className='w-full border border-gray-600 p-2 rounded-lg' />
              </div>
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

              <button onClick={handleUpdateSubmit} className='w-full bg-blue-600 p-2 text-white rounded-lg font-semibold'>Submit</button>
            </div>

          </Box>
        </Fade>
      </Modal>

    </div>
  )
}

export default AdminHeader
