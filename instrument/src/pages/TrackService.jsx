import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import PageContainer from '../components/HOC/PageContainer'

function TrackService() {
    return (
        <PageContainer showheader="true" showfooter="true" className='min-h-screen flex flex-col'>
            <div className='h-full w-full flex justify-center items-center'>
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
                            <button className='bg-yellow-600 text-white text-lg font-semibold rounded-lg p-2 w-36'>Reschedule</button>
                            <button className='bg-yellow-600 text-white text-lg font-semibold rounded-lg p-2 w-28'>Accept</button>
                        </div>
                    </div>
                </div>

            </div>

        </PageContainer>
    )
}

export default TrackService
