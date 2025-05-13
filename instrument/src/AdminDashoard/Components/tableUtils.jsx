import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// export const generateRows = (categories = [], handleOpenModal, handleDelete) => (
//   categories.map((category, index) => ({
//     id: index + 1, // Ensuring unique ID for DataGrid
//     image: (
//       <div className="w-32 h-32">
//         <img
//           src={category.categoryImage}
//           alt="Category Image"
//           className="h-full w-full object-cover"
//         />
//       </div>
//     ),
//     name: category.categoryName,
//     description:
//       category.shortDescription ||
//       category.longDescription ||
//       category.description?.split(" ").slice(0, 10).join(" ") + "..." ||
//       "No description available.",
//     actions: (
//       <div style={{ display: "flex", gap: "10px" }}>
//         <Link to={`/admin/categoryProduct/${category._id}`}>
//           <button style={{ background: "none", border: "none", cursor: "pointer" }}>
//             <FontAwesomeIcon icon={faEye} />
//           </button>
//         </Link>

//         <button
//           style={{ background: "none", border: "none", cursor: "pointer" }}
//           onClick={() => handleOpenModal(category)}
//         >
//           <FontAwesomeIcon icon={faPen} />
//         </button>

//         <button
//           style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
//           onClick={(e) => {
//             e.stopPropagation(); // Prevents row click event
//             handleDelete(category._id); // Call the handleDelete function
//           }}
//         >
//           <FontAwesomeIcon icon={faTrash} />
//         </button>
//       </div>
//     ),
//   })));
export const generateRows = (categories = [], handleOpenModal, handleDelete) => (
  categories.map((category, index) => ({
    id: index + 1, // Ensuring unique ID for DataGrid
    image: (
      <div className="w-32 h-32">
        <img
          src={category.categoryImage}
          alt="Category Image"
          className="h-full w-full object-cover"
        />
      </div>
    ),
    name: category.categoryName,
    description:
      category.shortDescription ||
      category.longDescription ||
      category.description?.split(" ").slice(0, 10).join(" ") + "..." ||
      "No description available.",
    actions: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={`/admin/categoryProduct/${category._id}`}>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Link>

        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onClick={() => handleOpenModal(category)} // Open edit modal for this category
        >
          <FontAwesomeIcon icon={faPen} />
        </button>

        <button
          style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevents row click event
            handleDelete(category._id); // Call the handleDelete function with the category ID
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ),
  }))
);

export const generateColumns = () => [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Category"
        width="50"
        height="50"
        style={{ borderRadius: "5px" }}
      />
    ),
  },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "actions", headerName: "Actions", width: 150 },
];

