import React, { useEffect } from 'react';
import Headers from '../components/Header';
import Footer from '../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getSoftware } from '../AdminDashoard/AdminSoftware/SoftwareSlice';

const Software = () => {

  const dispatch = useDispatch();
  const { data: softwareData = [], loading, error } = useSelector(state => state.software);

  const products = [
    {
      name: 'RTMS',
      description: 'Real Time Oil & Gas Well Monitoring System Monitor oil and gas wells in real-time for optimized performance',
    },
    {
      name: 'EnMS',
      description: 'Energy Management System Optimize energy usage and enhance efficiency with our advanced',
    },
    {
      name: 'FoxIoT',
      description: 'Internet of Things Connect devices seamlessly to transform operations with the Internet of Things.',
    },
    {
      name: 'Vision AI',
      description: 'Vision Artificial Intelligence Empower insights and automation with cutting-edge Vision AI technology.',
    },
    {
      name: 'E-Store',
      description: 'Foxboro E-commerce platform Revolutionize shopping with a seamless, user-friendly E-Store for instruments',
    },
    {
      name: 'Sign',
      description: 'Digital signature app for businesses.',
    },
  ];

  useEffect(()=>{
    dispatch(getSoftware())
  },[dispatch])


  return (
    <div className='min-h-screen flex flex-col'>
      <Headers />
      <div className=' py-12 flex-grow'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl font-bold mb-2'>Industrial Software</h1>
          <p className='text-xl mb-8'>Help your sales team be more productive with tools they'd love.</p>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {softwareData.map((product, index) => (
              <div key={index} className='bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
                <div className='flex items-center mb-4'>
                  <div className='w-20  h-16 rounded-lg bg-gray-200 flex items-center justify-center mr-4'>
                    <img src={product.softwareImage} alt={product.softwareName} className='w-full h-full object-cover' />
                  </div>
                  <h2 className='text-xl font-semibold'>{product.softwareName}</h2>
                </div>
                <p className='text-gray-600 mb-6'>{product.description}</p>
                <button className='text-blue-600 font-semibold hover:text-blue-800 transition-colors'>
                  TRY NOW &gt;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Software;