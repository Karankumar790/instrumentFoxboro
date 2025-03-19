import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Category/CategorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const TableData = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching categories...');
      try {
        const response = await dispatch(fetchCategories()).unwrap();
        console.log('Categories fetched:', response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, [dispatch]);




  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>Table Component</div>; // Placeholder UI
};

// ✅ Move Exports Outside Component
export const generateRows = (categories = []) =>
  categories.map((category, index) => ({
    id: index + 1, // Ensuring unique ID for DataGrid
    image: <div className="w-32 h-32 "><img src={category.categoryImage} alt="Category Image" className="h-full w-full object-cover" /></div>,
    name: category.categoryName,
    description:
      category.shortDescription ||
      category.longDescription ||
      category.description ||
      "No description",
    actions: (
      <div style={{ display: "flex", gap: "10px" }}>
        <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
        <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer" }} />
        <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "red" }} />
      </div>
    ),
  }));

export const generateColumns = () => [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => (
      <img src={params.value} alt="Category" width="50" height="50" style={{ borderRadius: "5px" }} />
    ),
  },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "actions", headerName: "Actions", width: 150 },
];


// ✅ Product Table Data
const createDatas = (name, last, hash, cabs) => ({
  name,
  last,
  hash,
  cabs,
  actions: (
    <div style={{ display: "flex", gap: "30px" }}>
      <FontAwesomeIcon icon={faEye} />
      <FontAwesomeIcon icon={faPen} />
      <FontAwesomeIcon icon={faTrash} />
    </div>
  ),
});

export const productRows = [
  createDatas("PLC", 23, 43, 45),
  createDatas("BPLC", 43, 30, 64),
  createDatas("HPLC", 89, 73, 95),
  createDatas("TPLC", 23, 90, 45),
  createDatas("GPLC", 21, 53, 95),
];

export const productColumns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "last", headerName: "Product Name", width: 150 },
  { field: "hash", headerName: "Long Description", width: 200 },
  { field: "cabs", headerName: "Short Description", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => params.value, // Render the combined icons
  },
];

// ✅ Export Correctly
export default TableData;
