// import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import SecurityIcon from "@mui/icons-material/Security";
// import MoneyIcon from "@mui/icons-material/Money";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import StoreIcon from "@mui/icons-material/Store";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
// import TableProduct from "./TableProduct";
// import { useParams } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer/Footer";
// import { useDispatch } from "react-redux";
// import { contactProduct, getProduct } from "./subProduct"; // ensure this returns a promise

// function SubProduct() {
//   const [product, setProduct] = useState(null);
//   const [currentImage, setCurrentImage] = useState(product?.images?.[0] || "");
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [open, setOpen] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNumber: "",
//     email: "",
//     company: "",
//     productName: "",
//     modelNumber: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(contactProduct(formData));

//     setFormData({
//       name: "",
//       mobileNumber: "",
//       email: "",
//       company: "",
//       productName: "",
//       modelNumber: "",
//       message: "",
//     });
//   };

//   const handleOpenPdf = (url) => {
//     setPdfUrl(url);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setPdfUrl("");
//   };

//   const content = [
//     {
//       name: "Multiple Payment Options",
//       icon: <MoneyIcon className="text-orange-500 scale-150" />,
//     },
//     {
//       name: "12 Month Unlimited Warranty ",
//       icon: <SecurityIcon className="text-orange-500 scale-150" />,
//     },
//     // { name: "Secure Payments", icon: <AdminPanelSettingsIcon className="text-orange-500 scale-150" /> },
//     {
//       name: "24✕7 Technical Support",
//       icon: <HeadsetMicIcon className="text-orange-500 scale-150" />,
//     },
//     {
//       name: "Free Engineering Consultancy",
//       icon: <StoreIcon className="text-orange-500 scale-150" />,
//     },
//   ];

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const res = await dispatch(getProduct(id));
//       setProduct(res.payload.data); // assuming redux thunk
//     };
//     fetchProduct();
//   }, [dispatch, id]);

//   return (
//     <div>
//       <Header />
//       <div className="flex">
//         <div className="w-full p-1">
//           <div className="flex justify-between m-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
//             <div className="flex h-full w-full max-w-2xl p-6">
//               {/* Thumbnails */}
//               <div className="flex flex-col justify-center items-center w-1/6 gap-20 mr-2">
//                 {product?.images?.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
//                       currentImage === image
//                         ? "border-blue-500"
//                         : "border-transparent"
//                     }`}
//                     onClick={() => setCurrentImage(image)}
//                   />
//                 ))}

//                 {product?.productId?.image && (
//                   <img
//                     src={product.productId.image}
//                     alt="Product ID Image"
//                     className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
//                       currentImage === product.productId.image
//                         ? "border-blue-500"
//                         : "border-transparent"
//                     }`}
//                     onClick={() => setCurrentImage(product.productId.image)}
//                   />
//                 )}
//               </div>

//               {/* Main Image */}
//               <div className="rounded-lg w-full h-[500px]">
//                 <img
//                   src={currentImage || product?.productId?.image}
//                   alt="Main Slide"
//                   className="w-full h-full object-fill transition-transform duration-500 ease-in-out"
//                 />
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="flex flex-col  w-[90%] gap-4 p-5">
//               <div className="text-3xl font-semibold text-gray-700">
//                 <span className="text-4xl">🛍</span> Product Name:&nbsp;{" "}
//                 {product?.productId?.name}
//               </div>
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">📦</span>
//                 <p className="font-bold">Model:</p> &nbsp; {product?.modelNo}
//               </div>
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">🏭</span>
//                 <p className="font-bold"> Manufacturer: </p>&nbsp;{" "}
//                 {product?.manufacturer}
//               </div>
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">📝</span>
//                 <p className="font-bold"> Description:</p>&nbsp;
//                 {product?.productId?.description
//                   ?.split(" ")
//                   .slice(0, 9)
//                   .join(" ")}
//                 {/* <span className="ml-8">{product?.productId?.description?.split(" ").slice(9, 25).join(" ")}</span> */}
//               </div>
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">📋</span>
//                 <p className="font-bold"> Application:</p>&nbsp;{" "}
//                 {product?.application}
//               </div>
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">📋</span>
//                 <p className="font-bold"> Availability:</p>&nbsp;{" "}
//                 {product?.availability}
//               </div>
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">💰</span>
//                 <p className="font-bold"> Price:</p>&nbsp; ₹{product?.price}
//               </div>
//               {/* <div className="text-xl flex text-gray-600">
//                                 <span className="text-4xl">✨</span><p className="font-bold"> Key Features:</p>&nbsp; {product?.keyFeatures}
//                             </div> */}
//               <div className="text-xl flex text-gray-600">
//                 <span className="text-4xl">⭐</span>
//                 <p className="font-bold">Google Reviews:</p>&nbsp;{" "}
//                 {product?.reviews}
//               </div>
//               <div className="w-full flex justify-end">
//                 {product?.datasheetPdf && (
//                   <button
//                     onClick={() => handleOpenPdf(product?.datasheetPdf)}
//                     className="bg-green-500 text-lg font-semibold w-60 h-11"
//                   >
//                     Download Datasheet
//                   </button>
//                 )}
//               </div>
//             </div>
//             {/* Contact  */}
//             <div className="w-full p-6">
//               <div className="bg-white w-full p-6 space-y-4 h-full  border shadow-lg rounded-lg border-gray-400">
//                 <p className="text-3xl font-semibold bg-blue-950 text-white py-2 px-4 rounded-md text-center">
//                   Contact Us
//                 </p>
//                 <form
//                   className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//                   onSubmit={handleSubmit}
//                 >
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 "
//                     />
//                     <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       name="Mobile"
//                       placeholder="Mobile No."
//                       value={formData.mobileNumber}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           mobileNumber: e.target.value,
//                         })
//                       }
//                       className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
//                     />
//                     <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       required
//                       name="Email"
//                       placeholder="Email ID"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
//                     />
//                     <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       name="Companyname"
//                       placeholder="Company"
//                       value={formData.company}
//                       onChange={(e) =>
//                         setFormData({ ...formData, company: e.target.value })
//                       }
//                       className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
//                     />
//                     <i className="fas fa-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       name="Product Name"
//                       placeholder="Product Name"
//                       value={formData.productName}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           productName: e.target.value,
//                         })
//                       }
//                       className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
//                     />
//                     <i className="fas fa-box absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       name="Model"
//                       placeholder="Model"
//                       value={formData.modelNumber}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           modelNumber: e.target.value,
//                         })
//                       }
//                       className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
//                     />
//                     <i className="fas fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="relative col-span-1 sm:col-span-2">
//                     <textarea
//                       rows={4}
//                       required
//                       placeholder="Message"
//                       name="Message"
//                       value={formData.message}
//                       onChange={(e) =>
//                         setFormData({ ...formData, message: e.target.value })
//                       }
//                       className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
//                     />
//                     <i className="fas fa-comment-alt absolute left-4 top-4 text-gray-500 text-lg"></i>
//                   </div>
//                   <div className="col-span-1 sm:col-span-2">
//                     <button
//                       type="submit"
//                     //   disabled={loading}
//                       className="bg-blue-900 w-full text-white font-bold text-2xl rounded-lg py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       {/* {loading ? "Submitting..." : "Submit"} */}
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           {/* Content Strip */}
//           <div className="flex justify-between items-center m-2 bg-gray-50 p-6 rounded-lg shadow-md space-x-4">
//             {content.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center text-center space-y-2 w-40"
//               >
//                 {item.icon}
//                 <p className="text-md text-gray-700 font-medium">{item.name}</p>
//               </div>
//             ))}
//           </div>

//           {/* Table */}
//           <div>{product && <TableProduct product={product} />}</div>
//         </div>
//       </div>
//       <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
//         <DialogTitle>DataSheet</DialogTitle>
//         <DialogContent dividers>
//           <iframe
//             src={pdfUrl}
//             title="Resume PDF"
//             width="100%"
//             height="600px"
//             style={{ border: "none" }}
//           />
//         </DialogContent>
//       </Dialog>
//       <Footer />
//     </div>
//   );
// }

// export default SubProduct;

import { Button, Dialog, DialogContent, DialogTitle, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import MoneyIcon from "@mui/icons-material/Money";
import StoreIcon from "@mui/icons-material/Store";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import TableProduct from "../oneClickProDetail/TableProductDetail";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { getProductDetail } from "../../AdminDashoard/Category/CategoryProductSlice"; // ensure this returns a promise
import { contactProduct, getProduct } from "./subProduct"; // ensure this returns a promise
import { toast } from "react-toastify"; // import toast from 'react-toastify' library
import FactoryIcon from "@mui/icons-material/Factory";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SubProduct() {
  const [product, setProduct] = useState(null);
  // const [currentImage, setCurrentImage] = useState(
  //   product?.productId?.productImage[0] || ""
  // );
  const [currentImage, setCurrentImage] = useState(product?.images?.[0] || "");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenPdf = (url) => {
    setPdfUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPdfUrl("");
  };
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    company: "",
    productName: "",
    modelNumber: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(contactProduct(formData)).unwrap();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      company: "",
      productName: "",
      modelNumber: "",
      message: "",
    });
  };

  const content = [
    {
      name: "Multiple Payment Options",
      icon: <MoneyIcon className="text-orange-500 scale-150" />,
    },
    {
      name: "12 Month Unlimited Warranty ",
      icon: <SecurityIcon className="text-orange-500 scale-150" />,
    },
    // { name: "Secure Payments", icon: <AdminPanelSettingsIcon className="text-orange-500 scale-150" /> },
    {
      name: "24✕7 Technical Support",
      icon: <HeadsetMicIcon className="text-orange-500 scale-150" />,
    },
    {
      name: "Free Engineering Consultancy",
      icon: <StoreIcon className="text-orange-500 scale-150" />,
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await dispatch(getProduct(id));
      setProduct(res.payload.data); // assuming redux thunk
    };
    fetchProduct();
  }, [dispatch, id]);

  return (
    <div>
      <div className="flex">
        <Grid2 container className="w-full justify-center p-1">
          <Grid2 size={{ xs: 12, sm: 10, md: 9, lg: 8 }} className="flex justify-between m-2 gap-3 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
            <div className="flex h-full w-full max-w-2xl p-6">
              {/* Thumbnails */}
              <div className="flex flex-col justify-center items-center w-1/6 gap-20 mr-2">
                {product?.images?.map((productImage, index) => (
                  <img
                    key={index}
                    src={productImage}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 rounded-md cursor-pointer border-2 ${currentImage === productImage
                      ? "border-blue-500"
                      : "border-transparent"
                      }`}
                    onClick={() => setCurrentImage(productImage)}
                  />
                ))}

                {product?.productId?.image && (
                  <img
                    src={product.productId.image}
                    alt="Product ID Image"
                    className={`w-16 h-16 rounded-md cursor-pointer border-2 ${currentImage === product.productId.image
                      ? "border-blue-500"
                      : "border-transparent"
                      }`}
                    onClick={() => setCurrentImage(product.productId.image)}
                  />
                )}
              </div>

              {/* Main Image */}
              <div className="rounded-lg w-full h-[500px]">
                <img
                  src={currentImage || product?.productId?.image}
                  alt="Main Slide"
                  className="w-full h-full object-fill transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col  w-[90%] gap-4 p-5">
              <div className="text-3xl font-semibold text-gray-700  ">
                <span className="text-4xl pt-2">🛍️</span> Product Name:&nbsp;{" "}
                {product?.productId?.name}
              </div>
              <div className="text-xl flex text-gray-600 gap-2">
                <span className="text-4xl">📦</span>
                <p className="font-bold flex justify-center  pt-2">
                  Model:
                </p>{" "}
                &nbsp;<p className="pt-2"> {product?.modelNo}</p>
              </div>
              <div className="text-xl flex text-gray-600 gap-">
                <span className="text-4xl  ml-2">
                  {/* 🏭 */}
                  <FactoryIcon fontSize="large" />
                </span>
                <p className="font-bold pt-3 ml-4"> Manufacturer: </p>&nbsp;{" "}
                <p className="pt-2"> {product?.manufacturer}</p>
              </div>
              <div className="text-xl flex text-gray-600 gap-2">
                <span className="text-4xl">📝</span>
                <p className="font-bold pt-2"> Description:</p>&nbsp;
                <p className="pt-2">
                  {product?.productId?.description
                    ?.split(" ")
                    .slice(0, 9)
                    .join(" ")}
                </p>
                {/* <span className="ml-8">{product?.productId?.description?.split(" ").slice(9, 25).join(" ")}</span> */}
              </div>
              <div className="text-xl flex text-gray-600 gap-2">
                <span className="text-4xl ml-2">
                  <SettingsApplicationsIcon fontSize="large" />
                </span>
                <p className="font-bold pt-2 ml-2"> Application:</p>&nbsp;{" "}
                <p className="pt-2"> {product?.application}</p>
              </div>
              <div className="text-xl flex text-gray-600 gap-2">
                <span className="text-4xl  ml-2">
                  {/* 📋 */}
                  <AccessTimeFilledIcon fontSize="large" />
                </span>
                <p className="font-bold pt-2  ml-2"> Availability:</p>&nbsp;{" "}
                <p className="pt-2"> {product?.availability}</p>
              </div>
              <div className="text-xl flex text-gray-600 gap-2">
                <span className="text-4xl">💰</span>
                <p className="font-bold pt-2"> Price:</p>&nbsp;
                <p className="pt-2 font-bold">₹ {product?.price}</p>
              </div>
              {/* <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">✨</span><p className="font-bold"> Key Features:</p>&nbsp; {product?.keyFeatures}
                            </div> */}
              <div className="text-xl flex text-gray-600 gap-2">
                <span className="text-4xl">⭐</span>
                <p className="font-bold pt-2">Google Reviews:</p>&nbsp;{" "}
                <p className="pt-2"> {product?.reviews}</p>
              </div>
              <div className="text-xl flex gap-9 ml-4">
                {product?.datasheetPdf && (
                  <button
                    onClick={() => handleOpenPdf(product?.datasheetPdf)}
                    className="bg-green-500 text-lg rounded-lg font-semibold w-40 h-11 mt-3"
                  >
                    Datasheet
                  </button>
                )}
                <button

                  onClick={handleOpenModal}
                  className="bg-green-500 text-lg rounded-lg font-semibold w-40 h-11 mt-3"

                >
                  Send Enquiry
                </button>
              </div>
            </div>
            {/* Contact  */}
            {/* <div className="w-full p-6">
              <div className="bg-white w-full p-3 space-y-2 h-full  border shadow-lg rounded-lg border-gray-400">
                <p className="text-3xl font-semibold text-black py-2  rounded-md ">
                  Send Enquiry{" "}
                </p>

              </div>
            </div> */}
          </Grid2>

          {/* Content Strip */}
          <Grid2 size={{ xs: 12, sm: 10, md: 9, lg: 8 }} className="flex justify-between items-center m-2 bg-gray-50 p-6 rounded-lg shadow-md space-x-4">
            {content.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 w-40"
              >
                {item.icon}
                <p className="text-md text-gray-700 font-medium">{item.name}</p>
              </div>
            ))}
          </Grid2>

          {/* Table */}
          <Grid2 size={{ xs: 12, sm: 10, md: 9, lg: 8 }}>{product && <TableProduct product={product} />}</Grid2>
        </Grid2>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>DataSheet</DialogTitle>
        <DialogContent dividers>
          <iframe
            src={pdfUrl}
            title="Resume PDF"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </DialogContent>
      </Dialog>

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
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 "
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobileNumber: e.target.value,
                    })
                  }
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
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
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productName: e.target.value,
                    })
                  }
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
                  value={formData.modelNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      modelNumber: e.target.value,
                    })
                  }
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
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
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
}

export default SubProduct;
