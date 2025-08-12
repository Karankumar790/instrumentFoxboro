import React, { useState } from "react";

// export default Profile;
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { updatePassword, updateUser } from "../AuthCycle/Login/loginSlice";
import { toast } from "react-toastify";

function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: null,
  });
const [currentPassword,setCurrentPassword] = useState("")
const [newPassword,setNewPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
  const handleProfileChange = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    if (formData.avatar) {
      payload.append("avatar", formData.avatar);
    }}

  const [changePwd, setChangePwd] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })


  const handleSubmitPassword = async (e) => {
    try {
      const response = await dispatch(updateUser(payload));
      if (response.payload.success) {
        toast.success(response.payload.message);
      } else {
        toast.error(response.payload.message);
      }
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handlePasswordChange = async (e) =>{
    e.preventDefault();

  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setChangePwd((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePwd = async (e) => {
  e.preventDefault();

  try {
    const result = await dispatch(
      updatePassword(changePwd)
    ).unwrap();
    toast.success(result.message || "Password updated successfully");

    // Optional: Clear input fields
    setChangePwd({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

  } catch (error) {
    toast.error(error || "Failed to update password");
  }
};



  return (
    <div className=" bg-gray-100  w-1/1.3 m-0  ">
      <div className=" bg-white shadow-lg rounded-2xl m-2 mt-0 p-5 w-full max-w-4xl border">
        <div className="relative mb-8">
          <h2 className="text-3xl font-bold  text-gray-800">User Profile</h2>
          
        </div>

        

        <div className="grid grid-cols-7 gap-6 ">
          {/* User Details */}
          <div className="col-span-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Username
              </label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
                {user.username}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Phone
              </label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
                {user.phone}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Email
              </label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
                {user.email}
              </div>
            </div>
          </div>

          {/* Avatar & Button Stack */}
          <div className="col-span-2 flex justify-between flex-col items-end space-y-6 ">
            <div className="w-40 h-40">
              <img
                src={user.avatar || "https://i.pravatar.cc/150?img=12"}
                alt="User Avatar"
                className="w-full h-full  object-fill border-4 border-blue-300 shadow-md"
              />
            </div>
            <div className=" w-full flex  justify-end">
              <button
                type="button"
                onClick={handleOpen}
                className="bg-blue-600 text-white px-4 py-2 rounded w-40 shadow hover:bg-blue-700 transition duration-200"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl m-2 mt-6 p-5 w-full max-w-4xl border">
        <h2 className="text-3xl font-bold mb-8  text-gray-800">
          Change Password
        </h2>
        <form onSubmit={handleChangePwd} className="space-y-4">
          <div>
            <label>Current Password</label>
            <input
              type="text"
              name="currentPassword"
              value={changePwd.currentPassword}
              onChange={handleInput}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="text"
              name="newPassword"
              value={changePwd.newPassword}
              onChange={handleInput}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              onChange={handleInput}
              value={changePwd.confirmPassword}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600  w-40 text-white px-4 py-2 flex items-end rounded hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-xl">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Edit Profile
            </h2>

            <form onSubmit={handleProfileChange} className="space-y-5">
              <div>
                <label className="block mb-1 text-lg font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-lg font-medium ">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-lg font-medium ">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-lg ">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.files[0] })
                  }
                  className="w-full text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
