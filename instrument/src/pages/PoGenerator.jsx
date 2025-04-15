import React, { useState } from 'react'
import {  Card, Grid2, Typography } from '@mui/material'
import PageContainer from '../components/HOC/PageContainer';

function PoGenerator() {

    const [selectedIndex, setSelectedIndex] = useState(null);

    const arr = [
        { Estimate: "Mobile", Date: "12/12/12", Description: "there are the one " },
        { Estimate: "Name", Date: "03/06/2025", Description: "Integrated SCADA system for real-time process monitoring and control, improving operational efficiency across multiple industrial sites." },
        { Estimate: "Email", Date: "03/07/2021", Description: "Upgraded legacy PLC systems to modern PC-based automation, enhancing flexibility and reducing downtime in manufacturing processes." },
        { Estimate: "Position", Date: "03/05/2022", Description: "Developed a centralized dashboard for remote diagnostics and control of field devices using IIoT protocols." },
        { Estimate: "Company", Date: "03/09/2018", Description: "Implemented energy monitoring solutions with data visualization tools for predictive maintenance and resource optimization." },
        { Estimate: "City", Date: "03/12/2019", Description: "Automated packaging line with vision-based inspection and robotic handling, increasing throughput and quality assurance." },
        { Estimate: "State", Date: "03/03/2023", Description: "Customized control panel design for a multi-zone HVAC system, ensuring climate stability in cleanroom environments." },
        { Estimate: "Country", Date: "14/05/2024", Description: "Converted manual operations to fully automated sequences using IEC 61131-3 compliant programming for process safety." },
        { Estimate: "ZIP Code", Date: "23/07/2015", Description: "Designed an HMI solution for a bottling plant, improving operator interface and reducing training time." },
    ]

    return (
            <PageContainer showheader="true" showfooter="true" className='min-h-screen flex flex-col overflow-hidden'>
                <Grid2 container className='flex justify-center items-center  bg-slate-200 flex-grow overflow-hidden'>
                    <Grid2 size={{ lg: 7 }}>
                        <Card sx={{
                            borderRadius: "20px",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            // backgroundColor: "#ECECEC"
                        }}>
                            <Typography variant="h5" fontWeight="bold" className="border bg-green-400 px-5 h-14 p-3 ">
                                Upload Purchase Order
                            </Typography>
                            <div className=' flex gap-4 p-5 '>
                                <input type="text" size='small' placeholder='Enter Email or Mobile' className='w-96 border rounded-lg p-2 ' />
                                <button className='w-28 p-3 text-white font-bold bg-yellow-600 rounded-lg border'>Search</button>
                            </div>

                            <div className='flex justify-between gap-8 px-5 py-3 bg-gray-300 rounded-t-md'>
                                <p className='text-xl font-semibold w-[20%] px-3 text-gray-800'>Estimate</p>
                                <p className='text-xl font-semibold w-[20%] text-gray-800'>Date</p>
                                <p className='text-xl font-semibold w-[100%] text-gray-800'>Description</p>
                            </div>

                            {arr.map((row, index) => (
                                <div
                                    key={index}
                                    className='flex justify-between items-center border rounded-md  gap-4 px-5 py-3 border-b bg-gray-50 hover:bg-gray-100 transition-all duration-200'
                                >
                                    <input
                                        type="radio"
                                        name='po selected'
                                        checked={selectedIndex == index}
                                        onChange={() => setSelectedIndex(index)}
                                        className='text-lg accent-yellow-600' />
                                    <p className='w-[20%] text-gray-700 font-medium'>{row.Estimate}</p>
                                    <p className='w-[20%] text-gray-700 font-medium'>{row.Date}</p>
                                    <p className='w-[100%] text-gray-600 text-sm'>{row.Description}</p>
                                </div>
                            ))}

                            <div className='flex justify-between p-4 bg-gray-300 '>
                                <input type="file" name="" id="hiddenFileInput" style={{ display: "none" }} />
                                <label htmlFor="hiddenFileInput">
                                    <button className="bg-yellow-600  text-white font-semibold py-2 px-4 rounded-lg cursor-pointer w-36">
                                        Upload File
                                    </button>
                                </label>
                                <button className='bg-orange-600 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer w-28'>Submit</button>
                            </div>

                        </Card>
                    </Grid2>
                </Grid2>
            </PageContainer>
    )
}

export default PoGenerator