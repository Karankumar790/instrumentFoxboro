import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

// Function to create a row object
export default function createData(name, calories, fat, carbs) {
  return {
    name, calories, fat, carbs, actions: (
      <div style={{ display: "flex", gap: "30px" }}>
        <FontAwesomeIcon icon={faEye}  /> {/* View icon */}
        <FontAwesomeIcon icon={faPen} /> {/* Edit icon */}
        <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
      </div>
    ),
  };
}

// Rows data
export const rows = [
  createData("Watch", "Titan", "Rolex", "Rado"),
  createData("Phone", 237, 9.0, 37),
  createData("Laptop", 262, 16.0, 24),
  createData("Bikes", 305, 3.7, 67),
  createData("Cars", 356, 16.0, 49),
];

// Columns configuration
export const columns = [
  { field: "name", headerName: "Image", width: 150 },
  { field: "calories", headerName: "Name", width: 150 },
  { field: "fat", headerName: "Short Description", width: 200 },
  { field: "carbs", headerName: "Long Description", width: 200 },
  {
    field: "actions",
    headerName: "View", // Header for the combined icons
    width: 300,
    renderCell: (params) => params.value, // Render the combined icons
  },
];

function createDatas(name, last, hash, cabs, nuts) {
  return {
    name, last, hash, cabs, actions: (
      <div style={{ display: "flex", gap: "30px" }}>
        <FontAwesomeIcon icon={faEye} /> {/* View icon */}
        <FontAwesomeIcon icon={faPen} /> {/* Edit icon */}
        <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
      </div>
    ),
  }
}

export const productRows = [
  createDatas("PLC", 23, 43, 45, 90),
  createDatas("BPLC", 43, 30, 64, 78),
  createDatas("HPLC", 89, 73, 95, 34),
  createDatas("TPLC", 23, 90, 45, 56),
  createDatas("GPLC", 21, 53, 95, 78),
]

export const productcolumns = [
  { field: "name", headerName: "Image" },
  { field: "last", headerName: "Product Name" },
  { field: "hash", headerName: "Long Description" },
  { field: "cabs", headerName: "Short Description" },
  {
    field: "actions",
    headerName: "View", // Header for the combined icons
    width: 200,
    renderCell: (params) => params.value, // Render the combined icons
  },
];