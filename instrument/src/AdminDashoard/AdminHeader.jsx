import React from "react";

function AdminHeader() {
  return (
    <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Foxboro Instrument Company</h1>
      <div className="flex items-center gap-4">
        <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Notifications
        </button>
        <button className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
