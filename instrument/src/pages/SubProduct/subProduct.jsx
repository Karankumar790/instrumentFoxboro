import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import SecurityIcon from '@mui/icons-material/Security';
import MoneyIcon from '@mui/icons-material/Money';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TableProduct from "./TableProduct";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { getProduct } from "./subProduct"; // ensure this returns a promise

function SubProduct() {
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(product?.images?.[0] || '');
    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");

    const handleOpenPdf = (url) => {
        setPdfUrl(url);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPdfUrl("");
    };

    const content = [
        { name: "Multiple Payment Options", icon: <MoneyIcon className="text-orange-500 scale-150" /> },
        { name: "12 Month Unlimited Warranty ", icon: <SecurityIcon className="text-orange-500 scale-150" /> },
        // { name: "Secure Payments", icon: <AdminPanelSettingsIcon className="text-orange-500 scale-150" /> },
        { name: "24✕7 Technical Support", icon: <HeadsetMicIcon className="text-orange-500 scale-150" /> },
        { name: "Free Engineering Consultancy", icon: <StoreIcon className="text-orange-500 scale-150" /> },
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
            <Header />
            <div className="flex">
                <div className="w-full p-1">
                    <div className="flex justify-between m-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
                        <div className="flex h-full w-full max-w-2xl p-6">
                            {/* Thumbnails */}
                            <div className="flex flex-col justify-center items-center w-1/6 gap-20 mr-2">
                                {product?.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-16 h-16 rounded-md cursor-pointer border-2 ${currentImage === image ? "border-blue-500" : "border-transparent"}`}
                                        onClick={() => setCurrentImage(image)}
                                    />
                                ))}

                                {product?.productId?.image && (
                                    <img
                                        src={product.productId.image}
                                        alt="Product ID Image"
                                        className={`w-16 h-16 rounded-md cursor-pointer border-2 ${currentImage === product.productId.image ? "border-blue-500" : "border-transparent"}`}
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
                            <div className="text-3xl font-semibold text-gray-700">
                                <span className="text-4xl">🛍️</span> Product Name:&nbsp; {product?.productId?.name}
                            </div>
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">📦</span><p className="font-bold">Model:</p> &nbsp; {product?.modelNo}
                            </div>
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">🏭</span><p className="font-bold"> Manufacturer: </p>&nbsp; {product?.manufacturer}
                            </div>
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">📝</span><p className="font-bold"> Description:</p>&nbsp;
                                {product?.productId?.description?.split(" ").slice(0, 9).join(" ")}
                                {/* <span className="ml-8">{product?.productId?.description?.split(" ").slice(9, 25).join(" ")}</span> */}
                            </div>
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">📋</span><p className="font-bold"> Application:</p>&nbsp; {product?.application}
                            </div>
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">📋</span><p className="font-bold"> Availability:</p>&nbsp; {product?.availability}
                            </div>
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">💰</span><p className="font-bold"> Price:</p>&nbsp; ₹{product?.price}
                            </div>
                            {/* <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">✨</span><p className="font-bold"> Key Features:</p>&nbsp; {product?.keyFeatures}
                            </div> */}
                            <div className="text-xl flex text-gray-600">
                                <span className="text-4xl">⭐</span><p className="font-bold">Google Reviews:</p>&nbsp; {product?.reviews}
                            </div>
                            {product?.datasheetPdf && (
                                <button
                                    onClick={() => handleOpenPdf(product?.datasheetPdf)}
                                    className="bg-green-500 text-lg font-semibold w-60 h-11"
                                >
                                   Download Datasheet
                                </button>
                            )}

                        </div>
                        {/* Contact  */}
                        <div className="w-full p-6">
                            <div className="bg-white w-full p-6 space-y-4 h-full  border shadow-lg rounded-lg border-gray-400">
                                <p className="text-3xl font-semibold bg-blue-950 text-white py-2 px-4 rounded-md text-center">Contact Us</p>
                                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 " />
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
                                    <div className="col-span-1 sm:col-span-2">
                                        <button
                                            type="submit"
                                            className="bg-blue-900 w-full text-white font-bold text-2xl rounded-lg py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                    {/* Content Strip */}
                    <div className="flex justify-between items-center m-2 bg-gray-50 p-6 rounded-lg shadow-md space-x-4">
                        {content.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-2 w-40">
                                {item.icon}
                                <p className="text-md text-gray-700 font-medium">{item.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div>
                        {product && <TableProduct product={product} />}
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Po Preview</DialogTitle>
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
            <Footer />
        </div>
    );
}

export default SubProduct;
