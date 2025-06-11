import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSoftware } from '../AdminDashoard/AdminSoftware/SoftwareSlice';
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Software = () => {

  const dispatch = useDispatch();
  const { data: softwareData = [], loading, error } = useSelector(state => state.software);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  

  
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

  const limitWords = (text, wordLimit = 100) => {
    if (!text) return "No Description available.";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  const limitName = (text, wordLimit = 10) => {
    if (!text) return "No Name available.";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }


  return (
    <div className='min-h-screen flex flex-col bg-gray-50 overflow-x-hidden'>
      <div className="py-10  flex justify-center overflow-hidden  h-[1400px]">
        <div className="container w-[70%]  px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left">
            Engineering Service
          </h1>
          <p className="text-base sm:text-xl mb-8 text-center sm:text-left text-gray-700">
           We Provide Broad Range of Engineering Services like Engineering Consultancy, Project Management, Maintenance Contract, PLC/ SCADA Programming, Embedded System Designing and Software Development Etc
          </p>

          <div className="w-full h-full  flex flex-col gap-6">
            {softwareData.map((product, index) => (
              <div
                key={index}
                className=" flex bg-gray-300 w-full h-96 rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-1/2 h-full  rounded-lg  flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                  <img
                    src={product.softwareImage}
                    alt={product.softwareName}
                    className="w-full h-full object-fill rounded-md"
                  />
                </div>
                <div className='flex flex-col w-[50%]'>
                  <div className="w-[100%] h-full  sm:text-left flex flex-col ml-3 gap-3 ">
                    <p className="text-2xl  font-semibold">
                      {limitName(product.softwareName)}
                    </p>
                    <p className="text-gray-700 text-lg  mb-6">
                      {limitWords(product.description)}
                    </p>
                  </div>

                  <div className="flex  justify-end">
                    <button onClick={handleOpenModal} className="text-green-700 font-semibold text-base sm:text-lg hover:text-blue-800 transition-colors">
                      Send Enquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "85%", md: "70%", lg: "55%" },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
          }}
        >
          <div className="bg-white p-6 border shadow-lg rounded-xl border-gray-300 space-y-4">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Send Enquiry
              </h2>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon className="text-gray-600" />
              </IconButton>
            </div>

            {/* Form Starts */}
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 "
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 "
                 
                />
                <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="Mobile"
                  placeholder="Mobile No."
                  className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  
                />
                <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
              </div>
              <div className="relative">
                <input
                  type="email"
                  required
                  name="Email"
                  placeholder="Email ID"
                  className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  
                />
                <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="Companyname"
                  placeholder="Company"
                  className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  
                />
                <i className="fas fa-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="Product Name"
                  placeholder="Product Name"
                  className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  
                />
                <i className="fas fa-box absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="Model"
                  placeholder="Model"
                  className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                 
                />
                <i className="fas fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
              </div>
              <div className="relative col-span-1 sm:col-span-2">
                <textarea
                  rows={4}
                  required
                  placeholder="Message"
                  name="Message"
                  className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  
                />
                <i className="fas fa-comment-alt absolute left-4 top-4 text-gray-500 text-lg"></i>
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-end">
                <button
                  // disabled={loading}
                  type="submit"
                  className="bg-blue-400 text-lg rounded-lg font-semibold w-40 h-11 "
                >
                  {/* {loading ? "Submitting..." : "Submit"} */}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Software;