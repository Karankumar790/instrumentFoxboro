import React from 'react'
import { Link } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className="w-64 grid-cols-[1fr_4fr] min-h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
        Admin Dashboard
      </h2>
      <nav className="flex flex-col p-4">
        <Link to="/admin/automation" className="py-2 px-4 text-2xl hover:bg-gray-700 rounded">
          Automation
        </Link>
        <Link to="/admin/adminProduct" className="py-2 px-4 text-2xl hover:bg-gray-700 rounded">
          AdminProduct
        </Link>
        <Link to="/admin/adminService" className="py-2 px-4 text-2xl hover:bg-gray-700 rounded">
          Service
        </Link>
        <Link to="/admin/siteSetting" className="py-2 px-4 text-2xl hover:bg-gray-700 rounded">
        SiteSetting
        </Link>
        <Link to="/admin/adminsoftware" className="py-2 px-4 text-2xl hover:bg-gray-700 rounded">
        Software
        </Link>
        
      </nav>
    </div>
  )
}

export default AdminSidebar
