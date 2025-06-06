import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../AuthCycle/Login/loginSlice";
import { Link } from "react-router-dom";

function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.auth.user);

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

        window.location.href = "/"; // Redirect to login
      } else {
        console.error(
          "Logout failed:",
          resultAction.payload || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      handleClose(); // Close the dropdown menu
    }
  };

  return (
    <header className="bg-gray-100 shadow pl-8 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Foxboro Instrument Company</h1>

      <div>
        <IconButton onClick={handleClick} size="large">
          {/* <AccountCircleIcon className="text-gray-400 " style={{ fontSize: '50px' }} /> */}
          <img
            src="https://i.pravatar.cc/150?img=12"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            alt="image"
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box className="px-4 py-2">
            {/* <Typography variant="subtitle1">{loginUser.username}</Typography> */}
            <Link to="/admin/profile" className="text-black">
              <MenuItem variant="subtitle1" className="text-black ">
                Profile
              </MenuItem>
            </Link>
            {/* <Typography variant="body2" color="textSecondary">
              {loginUser.email}
            </Typography> */}
            <MenuItem onClick={handleLogout} className="text-red-600">
              Logout
            </MenuItem>
          </Box>
        </Menu>
      </div>
    </header>
  );
}

export default AdminHeader;
