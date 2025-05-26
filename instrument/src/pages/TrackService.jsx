import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import PageContainer from '../components/HOC/PageContainer'
import { Card, Grid2, Typography } from '@mui/material'

function TrackService() {
    return (
        <PageContainer showheader="true" showfooter="true" className='flex flex-col'>
            {/* <div className='h-full w-full flex justify-center items-center'>
                <div className=' w-1/2 h-2/3 border border-gray-500 rounded-lg p-3 '>
                    <div>
                        <p className='text-3xl font-bold'>Track Service Status</p>
                        <div className='flex justify-between mt-3'>
                            <input type="text" placeholder='Enter service number' className='border border-gray-700 rounded-lg p-2' />
                            <button className='bg-yellow-600 text-white text-lg font-semibold rounded-lg p-2 w-24'>Submit</button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-end items-end h-5/6 w-full'>
                        <div className='flex justify-end gap-4'>
                            <button className='bg-yellow-600 text-white text-lg font-semibold rounded-lg p-2 w-36'>Send Reminder</button>
                            <button className='bg-yellow-600 text-white text-lg font-semibold rounded-lg p-2 w-36'>Reschedule</button>
                            <button className='bg-yellow-600 text-white text-lg font-semibold rounded-lg p-2 w-28'>Accept</button>
                        </div>
                    </div>
                </div>

            </div> */}

            <Grid2 container className='flex justify-center items-center  bg-slate-200 flex-grow overflow-hidden'>
                <Grid2 size={{ lg: 6 }} className='rounded-lg'>
                    <Card sx={{
                        borderRadius: "20px",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        // backgroundColor: "#ECECEC"
                    }}>
                        <Typography variant="h5" fontWeight="bold" className="border bg-green-400 px-5 h-14 p-3">
                            Track Service Status
                        </Typography>
                        <div className=' flex gap-4 p-5 '>
                            <input type="text" size='small' placeholder='Enter Service Number' className='w-96 border rounded-lg p-2 ' />
                            <button className='w-28 p-3 text-white font-bold bg-yellow-600 rounded-lg border'>Submit</button>
                        </div>
                        <div className='h-96 flex justify-center items-center bg-gray-100 border rounded-lg border-gray-500 m-2'>
                            <p className='text-2xl font-bold'>Under Development</p>
                        </div>
                        <div className='w-full flex justify-end p-4'>
                             <button className='bg-orange-600 text-white font-semibold rounded-lg cursor-pointer w-28 p-2'>Accept</button>
                        </div>
                    </Card>
                </Grid2>
            </Grid2>

        </PageContainer>
    )
}

export default TrackService
