import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Category/CategorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const TableData = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);
  

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Category Table</h2>
      {/* <DataGrid rows={generateRows(categories)} columns={columns} pageSize={5} /> */}
    </div>
  );
};

// Function to generate rows dynamically
export const generateRows = (categories = []) =>
  Array.isArray(categories)
    ? categories.map((category) => ({
        name: category.categoryName,
        image: category.categoryImage,
        shortDesc: category.shortDescription,
        longDesc: category.longDescription,
        actions: (
          <div style={{ display: "flex", gap: "10px" }}>
            <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
            <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer" }} />
            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "red" }} />
          </div>
        ),
      }))
    : [];


// Export columns separately
export const generateColumns = [
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => <img src={params.value} alt="Category" width="50" height="50" />,
  },
  { field: "shortDesc", headerName: "Short Description", width: 200 },
  { field: "longDesc", headerName: "Long Description", width: 200 },
  { field: "actions", headerName: "Actions", width: 150 },
];





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
export default { TableData, productRows, productColumns,generateRows,generateColumns };
