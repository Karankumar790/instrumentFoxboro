import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import { Card, Grid2 } from '@mui/material'

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
        <div>
            <Header />
            <Grid2 container className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100'>
                <Grid2 size={{ lg: 4 }}>
                    <Card
                        sx={{
                            borderRadius: "25px",
                            height: "83vh",
                            width: "100%",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            overflow: "hidden"
                        }}
                        borderRadius={2}
                        p={2}
                        className="bg-white"
                    >
                        {/* Search Section */}
                        <div className='flex justify-evenly border p-3 bg-blue-50 rounded-lg mb-4'>
                            <div className='flex gap-1 font-semibold items-center'>
                                <p className="text-gray-600">Cotion Number:</p>
                                <input
                                    type="text"
                                    className='border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300'
                                    placeholder="Enter number"
                                />
                            </div>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-28 font-semibold transition-colors'>
                                Search
                            </button>
                        </div>

                        {/* List Items */}
                        <div className="flex flex-wrap overflow-y-auto h-[calc(83vh-180px)] pr-2">
                            {arr.map((item, index) => (
                                <div
                                key={index}
                                className="flex border-b pb-2 items-center h-20 px-3 hover:bg-gray-50 transition-colors gap-4 w-1/2" // Added w-1/2 for 2 items per row
                              >
                                <p className="text-lg font-medium text-gray-600">{item.label}:</p>
                                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                              </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className='flex justify-end items-center h-20 border-t pt-4'>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium transition-colors mr-14'>
                                Submit
                            </button>
                        </div>
                    </Card>
                </Grid2>
            </Grid2>
            <Footer />
        </div>
    )
}

export default PoGenerator
