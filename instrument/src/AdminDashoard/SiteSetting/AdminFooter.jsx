import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postFooter } from './SettingSlice';
import { toast } from 'react-toastify';

function AdminFooter() {

  const dispatch = useDispatch();

  const [footerData, setFooterData] = useState({
    salesNumber: "",
    engineeringNumber: "",
    serviceNumber: "",
    supportEmail: "",
    link1: "",
    link2: "",
    link3: "",
    link4: "",
    registeredOfficeAddress: "",
  });

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
      const res = await dispatch(postFooter(footerData)).unwrap(); // Wait for successful response
      setFooterData({  // Reset form on success
        salesNumber: "",
        engineeringNumber: "",
        serviceNumber: "",
        supportEmail: "",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        registeredOfficeAddress: "",
      });
      toast.success(res?.message)
    } catch (error) {
      const errorMessage = error?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };



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
              <input type="text" placeholder='Website Link 1' name='link1' value={footerData.link1} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Website Link 2' name='link2' value={footerData.link2} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Website Link 3' name='link3' value={footerData.link3} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Website Link 4' name='link4' value={footerData.link4} onChange={handleInput} className='w-1/2 border border-gray-600 p-2 rounded-lg' />
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
      </div>
    </div>
  )
}

export default AdminFooter
