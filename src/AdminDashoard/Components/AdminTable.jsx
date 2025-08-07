// import React, { useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useDispatch } from "react-redux";
// import { fetchCategories } from "../Category/CategorySlice";


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));



// function AdminTable({ columns = [], rows = [], handleOpenModal, handleDelete }) {
//   const dispatch = useDispatch();
//   const { categories, loading, error } = useSelector((state) => state.category);
//   const safeRows = Array.isArray(rows) ? rows : [];
//   useEffect(() => {
//     const fetchData = async () => {
//       console.log('Fetching categories...');
//       try {
//         const response = await dispatch(fetchCategories()).unwrap();
//         console.log('Categories fetched:', response);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
  
//     fetchData();
//   }, [dispatch]);

//   const handleDelete = async (categoryId) => {
//     try {
//       await dispatch(deleteCategory(categoryId)).unwrap();
//       alert("Category deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       alert("Failed to delete category");
//     }
//   };


  

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             {columns?.map((column) => (
//               <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {safeRows.map((row, index) => (
//             <StyledTableRow key={index}>
//               {columns.map((column) => (
//                 <StyledTableCell key={column.field}>{row[column.field]}</StyledTableCell> // ✅ Fixed
//               ))}
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default AdminTable;


import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AdminTable({ columns = [], rows = [], handleDelete }) {
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {safeRows.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <StyledTableCell key={column.field}>{row[column.field]}</StyledTableCell>
              ))}
              {/* Add a Delete Button */}
              <StyledTableCell>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(row.id)} // Call handleDelete with row ID
                >
                  Delete
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminTable;
