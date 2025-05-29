import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFooter, postFooter } from './SettingSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, styled, tableCellClasses, Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from "@mui/icons-material/Clear";
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
}


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

const initialFooterState = {
  salesNumber: "",
  engineeringNumber: "",
  serviceNumber: "",
  supportEmail: "",
  link1: "",
  link2: "",
  link3: "",
  link4: "",
  registeredOfficeAddress: "",
}


function AdminFooter() {

  const dispatch = useDispatch();
  const fetchFooter = useSelector((state) => state.header.footerInt);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [footerData, setFooterData] = useState(initialFooterState);
  const [editData, setEditData] = useState(initialFooterState);

  const handleOpen = () => {
    setEditData({
      salesNumber: fetchFooter?.customerSupport?.salesNumber,
      engineeringNumber: fetchFooter?.customerSupport?.engineeringNumber,
      serviceNumber: fetchFooter?.customerSupport?.serviceNumber,
      supportEmail: fetchFooter?.customerSupport?.email,
      link1: fetchFooter?.websiteLinks?.link1,
      link2: fetchFooter?.websiteLinks?.link2,
      link3: fetchFooter?.websiteLinks?.link3,
      link4: fetchFooter?.websiteLinks?.link4,
      registeredOfficeAddress: fetchFooter.registeredOfficeAddress,
    })

    setOpen(true)
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFooterData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = open ? editData : footerData; // check modal open or not
      const res = await dispatch(postFooter(dataToSend)).unwrap();

      toast.success(res?.message);

      // Reset appropriate form
      if (open) {
        setEditData(initialFooterState);
        handleClose();
      } else {
        setFooterData(initialFooterState);
      }

      dispatch(getFooter());
    } catch (error) {
      toast.error(error || "Something went wrong!");
    }
  };

  useEffect(() => {
    dispatch(getFooter())
  }, [])


  return (
    <div>
      <div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='space-y-2'>
            <p className='text-2xl font-bold'>Customer Support</p>
            <div className='flex gap-2 w-full '>
              <input type="number" placeholder='Number 1' name='salesNumber' value={footerData.salesNumber} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="number" placeholder='Number 2' name='engineeringNumber' value={footerData.engineeringNumber} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="number" placeholder='Number 3' name='serviceNumber' value={footerData.serviceNumber} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="email" placeholder='Email' name='supportEmail' value={footerData.supportEmail} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
            </div>
            <div className='flex gap-2 w-full '>
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-2xl font-bold'>Useful Website</p>
            <div className='flex gap-2 w-full '>
              <input type="text" placeholder='Automation Link 1' name='link1' value={footerData.link1} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='E-store Link 2' name='link2' value={footerData.link2} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='IoT Link 3' name='link3' value={footerData.link3} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Service Link 4' name='link4' value={footerData.link4} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
            </div>
            <div className='flex gap-2 w-full '>
            </div>
          </div>
          <div className='space-y-2 flex justify-between '>
            <div className='w-full'>
              <p className='text-2xl font-bold'>Registered Office</p>
              <textarea id="" rows={2} placeholder='Registered' name='registeredOfficeAddress' value={footerData.registeredOfficeAddress} onChange={handleInput} className='w-1/2 p-2 border rounded-lg border-gray-600'></textarea>
            </div>
            <button type='submit' className=' w-28 h-10 bg-blue-600 p-2 text-white rounded-lg font-semibold' >Submit</button>
          </div>
        </form>

        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="bg-gray-800">
              <TableRow>
                <StyledTableCell className="text-white">Registered Office</StyledTableCell>
                <StyledTableCell className="text-white">Sales Number</StyledTableCell>
                <StyledTableCell className="text-white">Engineering Number</StyledTableCell>
                <StyledTableCell className="text-white">Service Number</StyledTableCell>
                <StyledTableCell className="text-white">Support Email</StyledTableCell>
                <StyledTableCell className="text-white">Link 1</StyledTableCell>
                <StyledTableCell className="text-white">Link 2</StyledTableCell>
                <StyledTableCell className="text-white">Link 3</StyledTableCell>
                <StyledTableCell className="text-white">Link 4</StyledTableCell>
                <StyledTableCell className="text-white">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={fetchFooter._id}>
                <StyledTableCell component="th" scope="row">{fetchFooter?.registeredOfficeAddress}</StyledTableCell>
                <StyledTableCell>{fetchFooter?.customerSupport?.salesNumber}</StyledTableCell>
                <StyledTableCell>{fetchFooter?.customerSupport?.engineeringNumber}</StyledTableCell>
                <StyledTableCell>{fetchFooter?.customerSupport?.serviceNumber}</StyledTableCell>
                <StyledTableCell>{fetchFooter?.customerSupport?.email}</StyledTableCell>
                <StyledTableCell><a href={fetchFooter?.websiteLinks?.link1} className="text-blue-600 underline" target="_blank" rel="noreferrer">Link 1</a></StyledTableCell>
                <StyledTableCell><a href={fetchFooter?.websiteLinks?.link2} className="text-blue-600 underline" target="_blank" rel="noreferrer">Link 2</a></StyledTableCell>
                <StyledTableCell><a href={fetchFooter?.websiteLinks?.link3} className="text-blue-600 underline" target="_blank" rel="noreferrer">Link 3</a></StyledTableCell>
                <StyledTableCell><a href={fetchFooter?.websiteLinks?.link4} className="text-blue-600 underline" target="_blank" rel="noreferrer">Link 4</a></StyledTableCell>
                <StyledTableCell>
                  <IconButton color="primary" onClick={handleOpen} >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
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
                Update Footer
              </Typography>
              <button onClick={handleClose}>
                <ClearIcon className="text-black text-lg" />
              </button>
            </div>
            <div className='w-full  space-y-4 mt-2'>
              <div className='flex gap-2 w-full '>
                <input type="number" placeholder='Number 1' name='salesNumber' value={editData.salesNumber} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="number" placeholder='Number 2' name='engineeringNumber' value={editData.engineeringNumber} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <input type="number" placeholder='Number 3' name='serviceNumber' value={editData.serviceNumber} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="email" placeholder='Email' name='supportEmail' value={editData.supportEmail} onChange={handleEditInput} className='w-1/2 border  border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <input type="text" placeholder='Automation Link' name='link1' value={editData.link1} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="text" placeholder='E-store Link' name='link2' value={editData.link2} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <input type="text" placeholder='IoT Link' name='link3' value={editData.link3} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
                <input type="text" placeholder='Service Link' name='link4' value={editData.link4} onChange={handleEditInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              </div>
              <div className='flex gap-2 w-full '>
                <textarea rows={3} placeholder='Resgistered' name='registeredOfficeAddress' value={editData.registeredOfficeAddress} onChange={handleEditInput} className='w-full border border-gray-600 p-2 rounded-lg' />
              </div>
              <button className='w-full bg-blue-600 p-2 text-white rounded-lg font-semibold' onClick={handleSubmit}>Submit</button>

            </div>
          </Box>
        </Fade>
      </Modal>

    </div>
  )
}

export default AdminFooter
