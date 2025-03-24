import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../Category/CategorySlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { generateRows, generateColumns } from "./tableUtils.jsx";
import AdminTable from "./AdminTable";
import EditCategoryModal from "./editCategoryModal.jsx";

const TableData = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleSaveCategory = (updatedCategory) => {
    console.log("Updated Category:", updatedCategory);
    handleCloseModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching categories...");
      try {
        const response = await dispatch(fetchCategories()).unwrap();
        console.log("Categories fetched:", response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [dispatch]);



  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (categoryId) => {
    console.log("Delete button clicked for categoryId:", categoryId);

    console.log("Clicked")
    if (!categoryId) {
      console.error("Invalid category ID!");
      return;
    }

    try {
      console.log("Dispatching deleteCategory API...");
      await dispatch(deleteCategory(categoryId)).unwrap();
      console.log("Category deleted successfully");

      // Re-fetch categories to update UI
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  // const rows = generateRows(categories, handleDelete, handleOpenModal);
  const columns = generateColumns();

  return (
    <>
      <AdminTable
        columns={columns}
        rows={generateRows(categories, handleOpenModal, handleDelete)}

      />
      {selectedCategory && (
        <EditCategoryModal
          open={open}
          handleClose={handleCloseModal}
          category={selectedCategory}
          handleSave={handleSaveCategory}
        />
      )}
    </>
  );
};

export default TableData;