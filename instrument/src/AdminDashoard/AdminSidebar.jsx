import { Link } from "react-router-dom";
import { FaCogs, FaBox, FaTools, FaSlidersH, FaLaptopCode } from "react-icons/fa";

export default function AdminSidebar() {
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
        <NavItem to="/admin/siteSetting" icon={<FaSlidersH />} label="Settings" />
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
