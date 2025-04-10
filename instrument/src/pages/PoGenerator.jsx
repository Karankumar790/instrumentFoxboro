import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import { Button, Card, Grid2 } from '@mui/material'

function PoGenerator() {
    const arr = [
        { label: "Mobile", value: "?" },
        { label: "Name", value: "?" },
        { label: "Email", value: "?" },
        { label: "Position", value: "?" },
        { label: "Company", value: "?" },
        { label: "City", value: "?" },
        { label: "State", value: "?" },
        { label: "Country", value: "?" },
        { label: "ZIP Code", value: "?" },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Grid2 container className='flex-grow flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100 p-4'>
                <Grid2 size={{ lg: 4 }} className="h-full">
                    <Card
                        sx={{
                            borderRadius: "25px",
                            height: "83vh",
                            width: "100%",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column"
                        }}
                        className="bg-white"
                    >
                        {/* Card Content Container */}
                        <div className="flex flex-col h-full">
                            {/* Search Section */}
                            <div className='border p-3 bg-blue-50'>
                                <p className="text-gray-600 text-xl font-bold">Upload Purchase Order</p>
                            </div>

                            {/* Search Input */}
                            <div className='flex justify-between border p-3 bg-blue-50 rounded-lg m-3'>
                                <div className='flex gap-1 font-semibold items-center flex-grow'>
                                    <input
                                        type="text"
                                        className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                                        placeholder="Enter Email or Mobile"
                                    />
                                </div>
                                <button className='bg-blue-500 hover:bg-blue-600 rounded-lg text-white p-2 w-28 font-semibold transition-colors ml-2'>
                                    Search
                                </button>
                            </div>

                            {/* List Items - Scrollable Area */}
                            <div className="flex flex-wrap overflow-y-auto flex-grow px-3 pb-3" style={{ maxHeight: 'calc(100% - 180px)' }}>
                                {arr.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex border-b pb-2 items-center min-h-20 px-3 hover:bg-gray-50 transition-colors gap-4 w-full md:w-1/2"
                                    >
                                        <p className="text-lg font-medium text-gray-600">{item.label}:</p>
                                        <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Submit Button */}
                            <div className='flex justify-between items-center h-20 border-t p-4'>
                                <input type="file" name="" placeholder='Attach order file' />
                                <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors'>
                                    Upload
                                </button>
                            </div>
                        </div>
                    </Card>
                </Grid2>
            </Grid2>
            <Footer />
        </div>
    )
}

export default PoGenerator