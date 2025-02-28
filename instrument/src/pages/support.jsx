import React, { useEffect, useState } from 'react'
// import Header from '../Component/Header'
// import MainFooter from '../Component/MainFooter'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function Support() {

    const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]); // Default to London coordinates

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div className='h-48 w-full flex flex-col justify-center items-center  bg-black'>
                <p className="text-6xl font-semibold">
                    <span className="text-yellow-400">Support</span> <span className="text-white">Us</span>
                </p>
                <p className='text-1xl space-x-5'>
                    <span className='text-yellow-400'>Home →</span>
                    <span className='text-white '>Support Us</span>
                </p>
            </div>
            <div className='h-screen flex flex-col justify-center '>
                <div className='h-64  w-full flex flex-col justify-center items-center gap-3'>
                    <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold'>
                        WORK WITH THE LEADING IOT COMPANY
                    </p>
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl font-medium'>
                        If you are looking to transform the world with IoT, Connect with us Today.
                    </p>
                </div>
                <div className=' h-full w-full flex justify-center  '>
                    {/* <div className='h-32 w-44 bg-yellow-400'></div> */}
                    <div className='h-3/4 w-3/5 flex border rounded-lg border-gray-950 bg-[#111111] p-4 gap-10'>
                        <div className='w-1/2 flex flex-col gap-2'>
                            <p className="text-5xl font-semibold">
                                <span className="text-white">Contact</span> <span className=" text-yellow-400">Us</span>
                            </p>
                            <p className='text-white'>Name</p>
                            <input type="text" placeholder='Name' className='border border-gray-700 bg-[#202020] text-white text-xl rounded-lg p-1' />
                            <p className='text-white'>Email Address</p>
                            <input type="email" placeholder='Email Address' className='border border-gray-700 bg-[#202020] text-white text-xl rounded-lg p-1' />
                            <p className='text-white'>Subject</p>
                            <input type="email" placeholder='Subject' className='border border-gray-700 bg-[#202020] text-white text-xl rounded-lg p-1' />
                            <p className='text-white'>Mobile No.</p>
                            <input type="email" placeholder='Enter Your Contact Number' className='border border-gray-700 bg-[#202020] text-white text-xl rounded-lg p-1' />
                            <p className='text-white'>Message</p>
                            <textarea type="email" placeholder='Enter Your Contact Number' rows={4} className='border border-gray-700 bg-[#202020] text-white text-xl rounded-lg p-1' />
                            <button className='w-full bg-yellow-500 hover:bg-yellow-700 text-black font-bold p-2 rounded-md'>Submit</button>
                        </div>
                        <div className='w-1/2'>
                            <div className='h-96 max-w-xl rounded-3xl'>
                                <MapContainer
                                    center={currentPosition}
                                    zoom={13}
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={currentPosition}>
                                        <Popup>You are here!</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-3xl text-white'>Address</p>
                                <p className='text-3xl text-white'>Contact Us</p>
                                <p className='text-3xl text-white'>Working hours</p>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <div className='flex gap-1'>
                                    <LocationOnIcon className='text-white' />
                                    <p className='flex flex-col'>
                                        <span className='text-white'>118,sumadha</span>
                                        <span className='text-white'>building</span>
                                        <span className='text-white'>RDC,Raj Nagar</span>
                                        <span className='text-white'>Ghaziabad</span>
                                    </p>
                                </div>
                                <div className='flex gap-1'>
                                    <p className='flex flex-col'>
                                        <span className='text-white'><CallIcon /> +91 9898029829</span>
                                        <span className='text-white'><EmailIcon /> foxboro@gmail.com</span>
                                    </p>
                                </div>
                                <div className='flex gap-1'>
                                    <PersonIcon className='text-white' />
                                    <p className='flex flex-col'>
                                        <span className='text-white'>Monday-Saturday</span>
                                        <span className='text-white'>9:30 AM – 6:30 PM</span>
                                        <span className='text-white'>Saturday : Closed at 6:PM</span>
                                        <span className='text-white'>Sunday : Closed</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MainFooter /> */}
        </div>
    )
}

export default Support