import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(getSoftware())
  }, [dispatch])


  return (
    <div className='min-h-screen flex flex-col bg-gray-50 overflow-x-hidden'>
      <div className="py-10  flex justify-center flex-grow h-[900px]">
        <div className="container w-[70%]  px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left">
            Web Based Industrial Software
          </h1>
          <p className="text-base sm:text-xl mb-8 text-center sm:text-left text-gray-700">
            Unique and powerful web software applications suite to transform the way you work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareData.map((product, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center mb-4">
                  <div className="w-full sm:w-36 h-32 sm:h-24 rounded-lg bg-gray-200 flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                    <img
                      src={product.softwareImage}
                      alt={product.softwareName}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {product.softwareName}
                    </h2>
                  </div>
                </div>

                <p className="text-gray-700 text-sm sm:text-base mb-6">
                  {product.description}
                </p>

                <div className="flex justify-center sm:justify-end">
                  <button className="text-green-700 font-semibold text-base sm:text-lg hover:text-blue-800 transition-colors">
                    TRY NOW &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Software;