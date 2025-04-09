import React from 'react'

function AdminBanner() {
  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Upload 4 Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 1</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 2</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 3</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 4</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminBanner
