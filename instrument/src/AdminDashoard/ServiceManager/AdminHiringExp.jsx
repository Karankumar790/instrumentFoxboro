import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteHiring,
  getHiring,
} from "../../pages/WorkFoxboro/HiringExpert/hiringExpert";

function AdminHiringExp() {
  const dispatch = useDispatch();
  const { initHiring } = useSelector((state) => state.hiring);

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
    dispatch(getHiring());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteHiring(id));
    setTimeout(() => {
      dispatch(getHiring());
    }, 1000);
  };

  return (
    <>

      <TableContainer component={Paper} sx={{ height: "85%" }} className="mt-6">
        <Table>
          <TableBody>
            {initHiring.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.professionalQualification}</TableCell>
                <TableCell>{row.totalExperience}</TableCell>
                <TableCell>{row.youAreExpertIn}</TableCell>
                <TableCell>{row.expectedSalary}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleOpenPdf(row.resume)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row?._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default AdminHiringExp;
