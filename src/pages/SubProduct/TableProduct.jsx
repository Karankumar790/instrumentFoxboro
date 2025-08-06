import React, { useState } from "react";

function TableProduct({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  const specifications = [
    {
      label: "Type of Product",
      value: product?.typeOfProduct || "Not Available",
    },
    { label: "Model No.", value: product?.modelNo || "Not Available" },
    { label: "Application", value: product?.application || "Not Available" },
    { label: "Material", value: product?.material || "Not Available" },
    { label: "Flow Rate", value: product?.flowRate || "Not Available" },
    { label: "Pattern Width", value: product?.patternWidth || "Not Available" },
    {
      label: "Package Contains",
      value: product?.packageContains || "Not Available",
    },
    {
      label: "Country of Origin",
      value: product?.countryOfOrigin || "Not Available",
    },
    {
      label: "Name of Manufacturer/Importer",
      value: product?.manufacturer || "Not Available",
    },
  ];

  return (
   
    <div className="bg-gray-50 p-7 rounded-lg shadow-md">
      <div className="flex w-full border-b mb-4">
        <button
          className={`flex-1 py-2 text-center text-xl font-bold
          `}
        >
          Description
        </button>
        <button
          className={`flex-1 py-2 text-center text-xl font-bold `}
         
        >
          Specifications
        </button>
      </div>

      <div className="h-[400px]  flex ">
        {/* {activeTab === "Description" && ( */}
        <div className="p-4 text-gray-700 leading-relaxed w-1/2">
          <p>
            {product?.productId?.description || "No description available."}
          </p>
        </div>
        <div className="border border-gray-200 mr-4 "></div>

        {/* {activeTab === "Specifications" && ( */}
        <table className="w-1/2 text-left  ">
         
          <tbody>
            {specifications.map((spec, index) => (
              <tr key={index}>
                <td className=" p-2 text-gray-700 w-1/3">{spec.label}</td>
                <td className=" p-2 text-gray-800 ">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* )} */}

        {/* )} */}
      </div>
    </div>
  );
}

export default TableProduct;
