import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SecurityIcon from '@mui/icons-material/Security';
import MoneyIcon from '@mui/icons-material/Money';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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

    const content = [
        { name: "6 Month Warranty Brand", icon: <SecurityIcon className="text-orange-500 scale-150" /> },
        { name: "100% Original Products", icon: <MoneyIcon className="text-orange-500 scale-150" /> },
        { name: "Secure Payments", icon: <AdminPanelSettingsIcon className="text-orange-500 scale-150" /> },
        { name: "100% Buyer Protection", icon: <StoreIcon className="text-orange-500 scale-150" /> },
        { name: "Top Brands", icon: <ShoppingBagIcon className="text-orange-500 scale-150" /> },
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
                    <div className="flex gap-4 m-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
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
                                    src={currentImage || product?.productId?.image }
                                    alt="Main Slide"
                                    className="w-full h-full object-fill transition-transform duration-500 ease-in-out"
                                />
                            </div>

                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-4 p-5">
                            <div className="text-3xl font-semibold text-gray-700">
                                <span className="text-4xl">🛍️</span> Product Name:&nbsp; {product?.productId?.name}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">🏭</span> Manufacturer:&nbsp; {product?.manufacturer}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">📦</span> Model Name:&nbsp; {product?.modelNo}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">✨</span> Key Features:&nbsp; {product?.keyFeatures}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">💰</span> Price:&nbsp; ₹{product?.price}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">📋</span> Availability:&nbsp; {product?.availability}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">⭐</span> Reviews:&nbsp; {product?.reviews}
                            </div>
                            <div className="text-xl text-gray-600">
                                <span className="text-4xl">📝</span> Description:&nbsp;
                                {product?.productId?.description?.split(" ").slice(0, 9).join(" ")}<br />
                                <span className="ml-8">{product?.productId?.description?.split(" ").slice(9, 25).join(" ")}</span>
                            </div>
                            <Button variant="contained" className="bg-blue-900 w-48 h-11">Datasheet</Button>
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
            <Footer />
        </div>
    );
}

export default SubProduct;
