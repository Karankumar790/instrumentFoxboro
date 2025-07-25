import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEstimate } from "./serviceSlice";

function SeviceEstimate({ showPo }) {
  const { quotations, pagination } = useSelector(
    (state) => state.serviceManager
  );
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
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
    dispatch(getEstimate({ page, limit: 8 }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ height: "85%" }} className="mt-6">
        <Table>
          <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle>Po Preview</DialogTitle>
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
          <TableBody>
            {quotations?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quotationNumber}</TableCell>
                <TableCell>{row.mobileNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.serviceMethod}</TableCell>
                <TableCell>{row.serviceNumber}</TableCell>
                <TableCell>{row.problemDescription}</TableCell>
                {
                  showPo &&
                  <TableCell>
                    {row.POImagePdf && (
                      <button
                        onClick={() => handleOpenPdf(row.POImagePdf)}
                        className="text-blue-600 hover:underline"
                      >
                        Po
                      </button>
                    )}
                  </TableCell>
                }

                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-end mt-4">
        <Pagination
          count={pagination?.totalPages || 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
}

export default SeviceEstimate;
