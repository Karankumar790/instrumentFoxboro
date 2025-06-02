import React, { useState } from 'react';

function TableProduct({ product }) {
    const [activeTab, setActiveTab] = useState("Description");

    const specifications = [
        { label: "Type of Product", value: product?.typeOfProduct || "Not Available" },
        { label: "Model No.", value: product?.modelNo || "Not Available" },
        { label: "Application", value: product?.application || "Not Available" },
        { label: "Material", value: product?.material || "Not Available" },
        { label: "Flow Rate", value: product?.flowRate || "Not Available" },
        { label: "Pattern Width", value: product?.patternWidth || "Not Available" },
        { label: "Package Contains", value: product?.packageContains || "Not Available" },
        { label: "Country of Origin", value: product?.countryOfOrigin || "Not Available" },
        { label: "Name of Manufacturer/Importer", value: product?.manufacturer || "Not Available" },
        // { label: "Warranty Duration", value: "6 Months" },
    ];

    return (
        <div className="bg-gray-50 p-7 rounded-lg shadow-md">
            <div className="flex w-full border-b mb-4">

                <button
                    className={`flex-1 py-2 text-center text-xl font-bold ${activeTab === "Description"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-800"
                        }`}
                    onClick={() => setActiveTab("Description")}
                >
                    Description
                </button>
                <button
                    className={`flex-1 py-2 text-center text-xl font-bold ${activeTab === "Specifications"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-800"
                        }`}
                    onClick={() => setActiveTab("Specifications")}
                >
                    Specifications
                </button>
            </div>

            <div className="h-[400px] overflow-y-auto">
                {activeTab === "Specifications" && (
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-200 p-2 w-1/3 bg-gray-100 text-gray-600 font-bold">
                                    Specification
                                </th>
                                <th className="border border-gray-200 p-2 w-2/3 bg-gray-100 text-gray-600 font-bold">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {specifications.map((spec, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-200 p-2 text-gray-700">{spec.label}</td>
                                    <td className="border border-gray-200 p-2 text-gray-800">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === "Description" && (
                    <div className="p-4 text-gray-700 leading-relaxed">
                        <p>{product?.productId?.description || "No description available."}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableProduct;
