import React, { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const arr = [
    { text: "Home", Link: "/" },
    { text: "Products", Link: "/product" },
    { text: "Engineering", Link: "/software" },
    { text: "E-Service", Link: null },
    { text: "Contact Us", Link: "/support" },
];

const MobileDropdown = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="block md:hidden ">
            {/* Icon button */}
            <button onClick={() => setOpen(!open)} className="p-2">
                <RxDropdownMenu className="text-3xl" />
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="bg-gray-100 w-full rounded-md shadow-md mt-2 px-4 py-2">
                    {arr.map((item, index) =>
                        item.Link ? (
                            <Link
                                key={index}
                                to={item.Link}
                                className="block py-1 text-black hover:text-blue-600"
                                onClick={() => setOpen(false)}
                            >
                                {item.text}
                            </Link>
                        ) : (
                            <span
                                key={index}
                                className="block py-1 text-gray-500 cursor-not-allowed"
                            >
                                {item.text}
                            </span>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default MobileDropdown;
