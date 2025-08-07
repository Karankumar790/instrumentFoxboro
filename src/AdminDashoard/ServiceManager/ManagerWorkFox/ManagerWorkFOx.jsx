import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  getWorkFox,
  authorizePartner,
  getAuthorize,
  deleteWorkFox,
} from "../../ServiceManager/ManagerWorkFox/ManagerWorkSlice"; // adjust path
import DeleteIcon from "@mui/icons-material/Delete";

function ManagerWorkFOx() {
  const dispatch = useDispatch();

  const { workFox, authWork, loading } = useSelector(
    (state) => state.managerFoxboro
  );

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
    dispatch(getWorkFox());
    dispatch(getAuthorize());
  }, [dispatch]);

  const handleAuthorize = async (id) => {
    const result = await dispatch(authorizePartner(id));
    if (authorizePartner.fulfilled.match(result)) {
      dispatch(getWorkFox());
      dispatch(getAuthorize());
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteWorkFox(id));
    if (deleteWorkFox.fulfilled.match(result)) {
      dispatch(getWorkFox());
      dispatch(getAuthorize());
    }
  };

  return (
    <>
      <div className="mb-80">
        <TableContainer
          component={Paper}
          sx={{ height: "85%" }}
        >
          <Table>
            
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                workFox.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.companyName}</TableCell>
                    <TableCell>{user.phone || "-"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.state}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.authorize ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleOpenPdf(user.GSTCertificate)}
                        className="text-blue-600 hover:underline"
                      >
                        GST Certificate
                      </button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={user.authorize ? "primary" : "primary"}
                        onClick={() => handleAuthorize(user._id)}
                      >
                        {user.authorize ? "Authorize" : " Please Authorize"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
      </div>
      <div>
        <p className="mb-3 text-2xl font-bold">Authorize Service Partner</p>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 400, overflowY: "auto" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#1e3a8a" }}>
              <TableRow>
                {[
                  "Name",
                  "Phone",
                  "Email",
                  "City",
                  "State",
                  "Country",
                  "Authorized",
                  "View",
                  "Action",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                authWork.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.companyName}</TableCell>
                    <TableCell>{user.phone || "-"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.state}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.authorize ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleOpenPdf(user.GSTCertificate)}
                        className="text-blue-600 hover:underline"
                      >
                        GST Certificate
                      </button>
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        className="text-red-700"
                        onClick={() => handleDelete(user?._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ManagerWorkFOx;
