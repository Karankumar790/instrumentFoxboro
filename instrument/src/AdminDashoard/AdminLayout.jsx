import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";

function AdminLayout() {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
  }, [loginUser, navigate]);
  if (!loginUser) {
    // Optionally render a loading or fallback while redirecting
    return null;
  }
  return (
    <div className="flex grid-cols-[1fr_4fr] min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        <AdminHeader />

        {/* Main Page Content */}
        <main
          className={`flex-1 bg-gray-100 ${
            location.pathname === "/admin/profile" ? "pl-6" : "p-6"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
