import { Link } from "react-router-dom";
import { FaCogs, FaBox, FaTools, FaSlidersH, FaLaptopCode, FaPlay, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MdManageAccounts } from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';
import { RiBriefcaseLine } from "react-icons/ri";

export default function AdminSidebar() {
  const [settingMenu, setSettingMenu] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  const auth = useSelector((state) => state.auth);
  console.log("Auth State From Redux:", auth);


  const handleSettingClick = (event) => {
    event.stopPropagation();
    setSettingMenu(event.currentTarget);
  };

  const handleCloseSettingMenu = () => {
    setSettingMenu(null);
  };

  const settingOptions = [
    { text: "Header", Link: "/admin/adminHeader" },
    { text: "Banner", Link: "/admin/adminBanner" },
    { text: "Footer", Link: "/admin/adminFooter" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col shadow-lg">
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700 bg-gray-900">
        Admin Dashboard
      </h2>

      <nav className="flex flex-col p-4 space-y-2">
        {role === 'admin' && (
          <>
            <NavItem to="/admin/automation" icon={<FaCogs />} label="Automation" />
            <NavItem to="/admin/adminProduct" icon={<FaBox />} label="Products" />
            <NavItem to="/admin/adminsoftware" icon={<FaLaptopCode />} label="Software" />
            <NavItem to="/admin/adminService" icon={<FaTools />} label="Enquire" />
            <NavItem to="/admin/adminRunningProject" icon={<FaPlay />} label="Running Project" />
            <NavItem to="/admin/adminNewProject" icon={<FaPlus />} label="New Project" />
            <NavItem to="/admin/serviceEstimate" icon={<MdManageAccounts />} label="Service Estimate" />
            <NavItem to="/admin/serviceUploadPO" icon={<RiServiceLine />} label="Service UploadPO" />
          </>
        )}

        {(role === 'service_manager') && (
          <>
            <NavItem to="/admin/serviceEstimate" icon={<MdManageAccounts />} label="Service Estimate" />
            {/* <NavItem to="/admin/serviceUploadPO" icon={<RiServiceLine />} label="Service UploadPO" /> */}
            <NavItem to="/admin/managerWorkFOx" icon={<RiBriefcaseLine />} label="Work Foxboro" />
          </>
        )}

        {role === 'admin' && (
          <>
            <div className="flex items-center space-x-2 pl-4 cursor-pointer text-white hover:text-blue-400 transition-all duration-200"
              onClick={handleSettingClick}>
              <FaSlidersH />
              <span className="font-semibold text-lg">Settings</span>
              <KeyboardArrowDownIcon fontSize="medium" className="text-lg" />
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
          </>
        )}
      </nav>
    </div>
  );
}

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
