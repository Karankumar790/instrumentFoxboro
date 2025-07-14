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
  TableHead,
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
      {/* <p className="text-lg font-bold">Hiring Expert</p> */}

      <TableContainer component={Paper} sx={{ height: "85%" }} className="mt-6">
        <Table>
          {/* <TableHead sx={{ backgroundColor: "#1e3a8a" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Email ID
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Mobile No.
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                City
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                State
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Country
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Professional Qualification
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Total Experience
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                You Are ExpertIn
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Expected Salary
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Resume
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead> */}
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
