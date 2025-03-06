import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Category/CategorySlice";

const TableData = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const rows = categories.map((category) => ({
    id: category.id,  // Ensure each row has a unique 'id'
    name: category.categoryName,
    calories: category.categoryImage,
    fat: category.shortDescription,
    carbs: category.longDescription,
    actions: (
      <div style={{ display: "flex", gap: "10px" }}>
        <FontAwesomeIcon icon={faEye} />
        <FontAwesomeIcon icon={faPen} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
    ),
  }));

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "calories", headerName: "Image", width: 150 },
    { field: "fat", headerName: "Short Description", width: 200 },
    { field: "carbs", headerName: "Long Description", width: 200 },
    { field: "actions", headerName: "Actions", width: 300 },
  ];

  console.log("Rows:", rows);   // Debugging
  console.log("Columns:", columns); // Debugging

  return { rows, columns };
};

// Product Table Data
const createDatas = (name, last, hash, cabs, nuts) => ({
  name,
  last,
  hash,
  cabs,
  actions: (
    <div style={{ display: "flex", gap: "30px" }}>
      <FontAwesomeIcon icon={faEye} /> {/* View icon */}
      <FontAwesomeIcon icon={faPen} /> {/* Edit icon */}
      <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
    </div>
  ),
});

 export const productRows = [
  createDatas("PLC", 23, 43, 45, 90),
  createDatas("BPLC", 43, 30, 64, 78),
  createDatas("HPLC", 89, 73, 95, 34),
  createDatas("TPLC", 23, 90, 45, 56),
  createDatas("GPLC", 21, 53, 95, 78),
];

export const productColumns = [
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

// Export components and data
export default { TableData, productRows, productColumns };
