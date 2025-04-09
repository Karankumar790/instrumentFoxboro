import { Link } from "react-router-dom";
import { FaCogs, FaBox, FaTools, FaSlidersH, FaLaptopCode } from "react-icons/fa";
import { useState } from "react";
import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function AdminSidebar() {

  const [settingMenu, setSettingMenu] = useState(null);

  const handleSettingClick = (event) => {
    event.stopPropagation();
    setSettingMenu(event.currentTarget);
  }

  const handleCloseSettingMenu = () => {
    setSettingMenu(null);
  }

  const settingOptions = [
    { text: "Header", Link: "/admin/adminHeader" },
    { text: "Banner", Link: "/admin/adminBanner" },
    { text: "Footer", Link: "/admin/adminFooter" },
  ]


  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700 bg-gray-900">
        Admin Dashboard
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-2">
        <NavItem to="/admin/automation" icon={<FaCogs />} label="Automation" />
        <NavItem to="/admin/adminProduct" icon={<FaBox />} label="Products" />
        <NavItem to="/admin/adminsoftware" icon={<FaLaptopCode />} label="Software" />
        <NavItem to="/admin/adminService" icon={<FaTools />} label="Enquire" />

        {/* Settings with same style as NavItem */}
        <div className="flex items-center space-x-2 pl-4 cursor-pointer text-white hover:text-blue-400 transition-all duration-200"
          onClick={handleSettingClick}>
          <FaSlidersH />
          <span className="font-semibold text-lg">Settings</span>
          <KeyboardArrowDownIcon fontSize="medium"className="text-lg" />
        </div>

        <Menu
          anchorEl={settingMenu}
          open={Boolean(settingMenu)}
          onClose={handleCloseSettingMenu}
        >
          {settingOptions.map((option, idx) => (
            <MenuItem key={idx} onClick={handleCloseSettingMenu}>
              <Link
                to={option.Link}
                className="text-gray-700 hover:text-blue-600 w-full block"
              >
                {option.text}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </nav>

    </div>
  );
}

// Reusable Navigation Item Component
function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 py-3 px-4 text-lg font-medium hover:bg-gray-700 rounded-lg transition duration-200"
    >
      {icon}
      {label}
    </Link>
  );
}
