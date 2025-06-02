import { Link } from "react-router-dom";
import { FaCogs, FaBox, FaTools, FaSlidersH, FaLaptopCode, FaPlay, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MdManageAccounts } from 'react-icons/md';
import { RiServiceLine } from 'react-icons/ri';
import { RiBriefcaseLine } from "react-icons/ri";
import { GrUserExpert } from "react-icons/gr";

export default function AdminSidebar() {
  const [settingMenu, setSettingMenu] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;



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
            <div
              className="flex items-center space-x-2 pl-4   cursor-pointer text-white hover:text-blue-400 transition-all duration-200"
              onClick={handleSettingClick}
            >
              <FaSlidersH />
              <span className="font-semibold text-lg">Site Settings</span>
              <KeyboardArrowDownIcon
                fontSize="medium"
                className={`text-lg transition-transform duration-300 ${settingMenu ? 'rotate-180' : ''
                  }`}
              />
            </div>


            <Menu
              anchorEl={settingMenu}
              open={Boolean(settingMenu)}
              onClose={handleCloseSettingMenu}
              PaperProps={{
                elevation: 8,
                sx: {
                  borderRadius: 2,
                  minWidth: 200,
                  padding: 1,
                  // backgroundColor: '#ffffff',
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {settingOptions.map((option, idx) => (
                <MenuItem
                  key={idx}
                  onClick={handleCloseSettingMenu}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  <Link
                    to={option.Link}
                    style={{
                      textDecoration: 'none',
                      width: '100%',
                      color: 'inherit',
                      fontWeight: 500
                    }}
                  >
                    {option.text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>

          </>
        )}

        {role === 'admin' && (
          <>
            <NavItem to="/admin/automation" icon={<FaCogs />} label="Automation" />
            <NavItem to="/admin/adminProduct" icon={<FaBox />} label="Products" />
            <NavItem to="/admin/adminsoftware" icon={<FaLaptopCode />} label="Software" />
            <NavItem to="/admin/serviceEstimate" icon={<MdManageAccounts />} label="E-Service" />
            <NavItem to="/admin/adminService" icon={<FaTools />} label="Mail Box" />
            {/* <NavItem to="/admin/adminRunningProject" icon={<FaPlay />} label="Running Project" />
            <NavItem to="/admin/adminNewProject" icon={<FaPlus />} label="New Project" /> */}
            {/* <NavItem to="/admin/managerWorkFOx" icon={<RiBriefcaseLine />} label="Work Foxboro" />
            <NavItem to="/admin/internship" icon={<RiServiceLine />} label="Intership" />
            <NavItem to="/admin/adminHiringExp" icon={<GrUserExpert />} label="Hiring Expert" /> */}
          </>
        )}

        {/* {(role === 'service_manager') && (
          <>
            <NavItem to="/admin/serviceEstimate" icon={<MdManageAccounts />} label="Service Estimate" />
            <NavItem to="/admin/serviceUploadPO" icon={<RiServiceLine />} label="Service UploadPO" />
          </>
        )} */}


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
