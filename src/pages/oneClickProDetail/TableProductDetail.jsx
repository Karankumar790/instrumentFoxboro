import React, { useState } from "react";

function TableProductDetail({ product }) {
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
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
      {/* Mobile Tabs (Hidden on md and above) */}
      <div className="flex w-full border-b mb-4 md:hidden">
        <button
          className={`flex-1 py-2 text-center text-lg font-bold ${activeTab === "Description"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
            }`}
          onClick={() => setActiveTab("Description")}
        >
          Description
        </button>
        <button
          className={`flex-1 py-2 text-center text-lg font-bold ${activeTab === "Specifications"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
            }`}
          onClick={() => setActiveTab("Specifications")}
        >
          Specifications
        </button>
      </div>

      {/* Mobile View Content */}
      <div className="md:hidden">
        {activeTab === "Description" && (
          <div className="text-gray-700 leading-relaxed text-base">
            {product?.productId?.description || "No description available."}
          </div>
        )}
        {activeTab === "Specifications" && (
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full text-left">
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-2 text-gray-700 w-1/3">{spec.label}</td>
                    <td className="p-2 text-gray-800">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Desktop/Laptop Layout (Your original design) */}
      <div className="hidden md:flex h-auto gap-6">
        {/* Description Section */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-2 text-gray-600"> Description</h2>
          <p className="p-2 text-gray-700 leading-relaxed">
            {product?.productId?.description || "No description available."}
          </p>
        </div>

        {/* Specifications Section */}
        <div className="w-1/2 overflow-x-auto">
          <h2 className="text-xl font-bold mb-2 text-gray-600"> Specifications</h2>
          <table className="min-w-full text-left">
            <tbody>
              {specifications.map((spec, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-2 text-gray-700 w-1/3">{spec.label}</td>
                  <td className="p-2 text-gray-800">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default TableProductDetail;
