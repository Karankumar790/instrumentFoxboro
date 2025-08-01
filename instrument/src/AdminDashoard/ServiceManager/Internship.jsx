import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  deleteWork,
  getWork,
} from "../../pages/WorkFoxboro/ApplyIntership/applyIntership";

function Internship() {
  const dispatch = useDispatch();
  const { initWork, loading, error } = useSelector((state) => state.intership);

  const [open, setOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleOpenPdf = (url) => {
    setPdfUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPdfUrl("");
  };

  useEffect(() => {
    dispatch(getWork());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteWork(id));
    setTimeout(() => {
      dispatch(getWork());
    }, 1000);
  };
  return (
    <>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper} sx={{ height: "85%" }} className="mt-6">
        <Table>
          <TableBody>
            {initWork.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.technicalQualification}</TableCell>
                <TableCell>{row.internshipDomain}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleOpenPdf(row.resume)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(row?._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PDF Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Resume Preview</DialogTitle>
        <DialogContent dividers>
          <iframe
            src={pdfUrl}
            title="Resume PDF"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Internship;
