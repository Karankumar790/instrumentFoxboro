import React, { useEffect, useState } from 'react'

import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHeader,  updateHeader } from './SettingSlice';
import { toast } from 'react-toastify';
import AdminFooter from './AdminFooter';
import AdminBanner from './AdminBanner'



function AdminHeader() {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const getHeaders = useSelector((state) => state.header.headerInt);
  const error = useSelector((state) => state.header.error)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
    }
  }

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setUpdateValue(prev => ({
      ...prev,
      [name]: value
    }));
  }

  

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
      const result = await dispatch(updateHeader(updateformData)).unwrap();
      setSnackbar({
        open: true,
        message: result.message || "Header updated successfully",
        severity: "success",
      });
      setIsEditable(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Header failed to update",
        severity: "error",
      });
    }
  };



  useEffect(() => {
    dispatch(getHeader());
  }, [dispatch]);

  useEffect(() => {
    if (getHeaders) {
      setUpdateValue({
        contactNumberOne: getHeaders.contactNumberOne || "",
        contactNumberTwo: getHeaders.contactNumberTwo || "",
        whatsappNumber: getHeaders.whatsappNumber || "",
        email: getHeaders.email || "",
        instagramLink: getHeaders.instagramLink || "",
        facebookLink: getHeaders.facebookLink || "",
        youTubeLink: getHeaders.youTubeLink || ""
      });
    }
  }, [getHeaders]);


  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  return (
    <div className='flex flex-col  space-y-5'>
      <div className='flex justify-between'>
        <p className='font-semibold text-2xl'>Header Management</p>
      </div>

      <div className='space-y-4 bg-white rounded-lg shadow-md p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-between p-4  overflow-x-auto'>
          <div className='flex flex-col '>
            <label>
              <h2 className='text-sm font-semibold mb-1'>Phone Number 1</h2>
              <input type="number" name='contactNumberOne' value={updateValue.contactNumberOne} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
              {error?.message}
            </label>
          </div>
          <div className='flex flex-col '>
            <label>
              <h2 className='text-sm font-semibold mb-1'>Phone Number 2</h2>
              <input type="number" name='contactNumberTwo' value={updateValue.contactNumberTwo} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </label>
          </div>
          <div className='flex flex-col'>
            <label>
              <h2 className='text-sm font-semibold mb-1'>WhatsApp Number</h2>
              <input type="number" name='whatsappNumber' value={updateValue.whatsappNumber} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </label>
          </div>
          <div className='flex flex-col'>
            <label>
              <h2 className='text-sm font-semibold mb-1'>Email</h2>
              <input type="email" name='email' value={updateValue.email} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </label>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-between p-4  overflow-x-auto'>
          <div className='flex flex-col'>
            <label>
              <h2 className='text-sm font-semibold mb-1'>Logo Image</h2>
              <div className="grid items-center gap-2">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className='h-20'>
                  {getHeaders?.foxboroLogo && (
                    <img
                      src={getHeaders.foxboroLogo}
                      alt="foxboroLogo"
                      className="h-full w-52 object-fill"
                    />
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className='flex  flex-col'>
            <label>
              <h2 className='text-sm font-semibold mb-1'>Instagram Link</h2>
              <input type="text" name='instagramLink' value={updateValue.instagramLink} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </label>
          </div>
          <div className='flex flex-col'>
            <label>
              <h2 className='text-sm font-semibold mb-1'>FaceBook Link</h2>
              <input type="text" name='facebookLink' value={updateValue.facebookLink} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </label>
          </div>
          <div className='flex flex-col'>
            <label>
              <h2 className='text-sm font-semibold mb-1'>Youtube Link</h2>
              <input type="text" name='youTubeLink' value={updateValue.youTubeLink} disabled={!isEditable} onChange={handleFormValue} className='w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </label>
          </div>

        </div>
        <div className='flex items-end justify-end w-full gap-2'>
          <div className="flex items-end justify-end w-full gap-2">
            {!isEditable ? (
              <button
                onClick={() => setIsEditable(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-md w-32"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdateSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md w-32"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditable(false);
                    setUpdateValue(getHeaders); // reset to original
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-semibold px-4 py-2 rounded-md w-32"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AdminFooter />
      <AdminBanner />


      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </div>
  )
}

export default AdminHeader
