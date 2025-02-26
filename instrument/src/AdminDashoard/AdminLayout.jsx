import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'

function AdminLayout() {
    return (
        <div className="flex grid-cols-[1fr_4fr] min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        <AdminHeader/>
        
        {/* Main Page Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
    )
}

export default AdminLayout
