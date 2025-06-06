import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFooter, postFooter } from './SettingSlice';
import { toast } from 'react-toastify';




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

  const [updateValue, setUpdateValue] = useState(initialFooterState);
  const [isEditable, setIsEditable] = useState(false);



  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdateValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateSubmit = async () => {
    const jsonBody = {
      salesNumber: updateValue.salesNumber,
      engineeringNumber: updateValue.engineeringNumber,
      serviceNumber: updateValue.serviceNumber,
      supportEmail: updateValue.supportEmail,
      link1: updateValue.link1,
      link2: updateValue.link2,
      link3: updateValue.link3,
      link4: updateValue.link4,
      registeredOfficeAddress: updateValue.registeredOfficeAddress,
    };

    try {
      const result = await dispatch(postFooter(jsonBody)).unwrap();
      toast.success(result?.message || "Footer updated successfully");
      setIsEditable(false);
    } catch (error) {
      toast.error(error || "Footer update failed");
    }
  };



  useEffect(() => {
    dispatch(getFooter())
  }, [])

  useEffect(() => {
    if (
      fetchFooter &&
      fetchFooter.customerSupport &&
      fetchFooter.websiteLinks
    ) {
      setUpdateValue({
        salesNumber: fetchFooter.customerSupport.salesNumber || "",
        engineeringNumber: fetchFooter.customerSupport.engineeringNumber || "",
        serviceNumber: fetchFooter.customerSupport.serviceNumber || "",
        supportEmail: fetchFooter.customerSupport.email || "",
        link1: fetchFooter.websiteLinks.link1 || "",
        link2: fetchFooter.websiteLinks.link2 || "",
        link3: fetchFooter.websiteLinks.link3 || "",
        link4: fetchFooter.websiteLinks.link4 || "",
        registeredOfficeAddress: fetchFooter.registeredOfficeAddress || "",
      });
    }
  }, [fetchFooter]);




  return (
    <div className='flex flex-col  space-y-5'>
      <div className='flex justify-between'>
        <p className='font-semibold text-2xl'>Footer Management</p>
        {/* <button className='bg-green-600 font-semibold p-2 rounded-lg text-white text-lg' onClick={handleOpen}>Add Header +</button> */}
      </div>
      <div className='bg-white rounded-lg shadow-md p-5'>
        <form onSubmit={handleUpdateSubmit} className='space-y-8'>

          <div className='space-y-2 flex justify-between '>
            <div className='w-full'>
              <p className='text-lg font-semibold'>Registered Office Address</p>
              <textarea id="" rows={2} placeholder='Registered and To the next line used the ( , ) ' name='registeredOfficeAddress' disabled={!isEditable} value={updateValue.registeredOfficeAddress} onChange={handleInput} className='w-1/2 p-2 border rounded-lg border-gray-600'></textarea>
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-lg font-semibold'>Customer Support</p>
            <div className='flex gap-2 w-full '>
              <input type="number" placeholder='Number 1' name='salesNumber' disabled={!isEditable} value={updateValue.salesNumber} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="number" placeholder='Number 2' name='engineeringNumber' disabled={!isEditable} value={updateValue.engineeringNumber} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="number" placeholder='Number 3' name='serviceNumber' disabled={!isEditable} value={updateValue.serviceNumber} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="email" placeholder='Email' name='supportEmail' disabled={!isEditable} value={updateValue.supportEmail} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
            </div>

          </div>
          <div className='space-y-2'>
            <p className='text-lg font-semibold'>Useful Website</p>
            <div className='flex gap-2 w-full '>
              <input type="text" placeholder='Automation Link 1' name='link1' disabled={!isEditable} value={updateValue.link1} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='E-store Link 2' name='link2' disabled={!isEditable} value={updateValue.link2} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='IoT Link 3' name='link3' disabled={!isEditable} value={updateValue.link3} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Service Link 4' name='link4' disabled={!isEditable} value={updateValue.link4} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
            </div>

          </div>

          <div className='flex items-end justify-end w-full gap-2'>
            <div className="flex items-end justify-end w-full gap-2">
              {!isEditable ? (
                <button
                  type='button'
                  onClick={() => setIsEditable(true)}
                  className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-md w-32"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type='button'
                    onClick={handleUpdateSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md w-32"
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setIsEditable(false);
                      setUpdateValue(fetchFooter); // reset to original
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-semibold px-4 py-2 rounded-md w-32"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>


          </div>
        </form>


      </div>


    </div>
  )
}

export default AdminFooter
