import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../AuthCycle/Login/loginSlice";

function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const  loginUser  = useSelector((state) => state.auth.user)

  const user = {
    name: "Admin User",
    email: "admin@foxboro.com"
  };
  console.log("--------",loginUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleLogout = async () => {
  //   try {
  //     await dispatch(logout())
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }

  //   // Clear local storage
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("admin");

  //   // Redirect to login
  //   window.location.href = "/login";

  //   handleClose(); // Close the dropdown
  // };

const handleLogout = async () => {
  try {
    const resultAction = await dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {
      // Only proceed if logout was successful
      localStorage.removeItem("authToken");
      localStorage.removeItem("admin");

      window.location.href = "/login"; // Redirect to login
    } else {
      console.error("Logout failed:", resultAction.payload || "Unknown error");
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    handleClose(); // Close the dropdown menu
  }
};


  return (
    <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Foxboro Instrument Company</h1>

      <div>
        <IconButton onClick={handleClick} size="large">
          <AccountCircleIcon className="text-gray-400 " style={{ fontSize: '50px' }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <Box className="px-4 py-2">
            <Typography variant="subtitle1">{loginUser.username}</Typography>
            <Typography variant="body2" color="textSecondary">
              {loginUser.email}
            </Typography>
          </Box>
          <MenuItem onClick={handleLogout} className="text-red-600">Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default AdminHeader;
