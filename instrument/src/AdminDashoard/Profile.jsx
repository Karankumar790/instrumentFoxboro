import { Typography } from "@mui/material";
// import React from 'react'

function Profile() {
  const user = {
    username: "Donald Duck", 
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          User Details
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 p-2 w-full bg-gray-100 border border-gray-100 rounded-md text-black-800">
              {user.username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
           <div className="mt-1 p-2 w-full bg-gray-100 border border-gray-100 rounded-md text-black-800">
              {user.username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
           <div className="mt-1 p-2 w-full bg-gray-100 border border-gray-100 rounded-md text-black-800">
              {user.username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="mt-1 p-2 w-full bg-gray-100 border border-gray-100 rounded-md text-black-800">
              {user.username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Existing Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
