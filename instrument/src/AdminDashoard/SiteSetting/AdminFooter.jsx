import React from 'react'

function AdminFooter() {
  return (
    <div>
      <div>
        <form action="submit" className='space-y-8'>
          <div className='space-y-2'>
            <p className='text-2xl font-bold'>Customer Support</p>
            <div className='flex gap-2 w-full '>
              <input type="number" placeholder='Number 1' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="number" placeholder='Number 2' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="number" placeholder='Number 3' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="email" placeholder='Email' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
            </div>
            <div className='flex gap-2 w-full '>
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-2xl font-bold'>Useful Website</p>
            <div className='flex gap-2 w-full '>
              <input type="text" placeholder='Website Link 1' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Website Link 2' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Website Link 3' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
              <input type="text" placeholder='Website Link 4' className='w-1/2 border border-gray-600 p-2 rounded-lg' />
            </div>
            <div className='flex gap-2 w-full '>
            </div>
          </div>
          <div className='space-y-2 flex justify-between '>
            <div className='w-full'>
              <p className='text-2xl font-bold'>Registered Office</p>
              <textarea name="" id="" rows={2} placeholder='Registered' className='w-1/2 p-2 border rounded-lg border-gray-600'></textarea>
            </div>
            <button className=' w-28 h-10 bg-blue-600 p-2 text-white rounded-lg font-semibold'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminFooter
