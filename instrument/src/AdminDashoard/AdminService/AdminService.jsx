import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, deleteService, getService } from "./AdminServiceSlice";
import { getContactProduct } from "../../pages/SubProduct/subProduct";
import InternshipTable from "../../AdminDashoard/ServiceManager/Internship";
import HiringExpertTable from "../ServiceManager/AdminHiringExp";
import POUploadTable from "../ServiceManager/SeviceEstimate";
import Service from "../ServiceManager/SeviceEstimate";
import Become from "../ServiceManager/ManagerWorkFox/ManagerWorkFOx";

function SupportTable() {
  // const [rows, setRows] = useState({
  //   Firstname: "",
  //   Lastname: "",
  //   Mobile: "",
  //   Email: "",
  //   Companyname: "",
  //   Position: "",
  //   Country: "",
  //   State: "",
  //   Message: "",
  // });

  const { serviceAdm, loading } = useSelector((state) => state.service);
  const { loadings, error, getPro } = useSelector(
    (state) => state.getProData || {}
  );

  const rows = serviceAdm?.getServiceData || [];
  const [filterType, setFilterType] = useState("");

  const renderTable = () => {
    switch (filterType) {
      case "internship":
        return <InternshipTable />;
      case "hiring":
        return <HiringExpertTable />;
      case "po":
        return <POUploadTable />;
      case "Service":
        return <Service />;
      case "Become":
        return <Become />;
      default:
        return null;
    }
  };

  // const rows = serviceAdm?.getServiceData || [];
  // console.log(getPro, "getPro");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteService(id));
  };

  const handleDeleteProduct = async (id) => {
    dispatch(deleteProduct(id));
    await dispatch(getContactProduct());
  };

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  return (
    <>
      {/* <p className="text-2xl font-bold">Message Box</p>
      <TableContainer component={Paper} className="mt-6">
        <Table>
          <TableHead sx={{ backgroundColor: "#1e3a8a" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                First Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Last Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Mobile No.
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Company
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Position
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Country
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                State
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Message
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.Firstname}</TableCell>
                <TableCell>{row.Lastname}</TableCell>
                <TableCell>{row.Mobile}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Companyname}</TableCell>
                <TableCell>{row.Position}</TableCell>
                <TableCell>{row.Country}</TableCell>
                <TableCell>{row.State}</TableCell>
                <TableCell>{row.Message}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(row._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p className="text-2xl font-bold">Product Queries</p>
      <TableContainer component={Paper} className="mt-6">
        <Table>
          <TableHead sx={{ backgroundColor: "#1e3a8a" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Mobile No.
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Company
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Product Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Model
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Message
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getPro?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.mobileNumber}</TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{row?.company}</TableCell>
                <TableCell>{row?.productName}</TableCell>
                <TableCell>{row?.modelNumber}</TableCell>
                <TableCell>{row?.message}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteProduct(row._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <>
        {/* Dropdown to select query type */}
        <div className="flex justify-between">
          <p className="text-2xl text-black font-bold">Mail Box</p>
          <FormControl sx={{ minWidth: 300 }} size="small" className="mb-4">
            <InputLabel id="query-type-label">Query Type</InputLabel>
            <Select
              labelId="query-type-label"
              value={filterType}
              label="Query Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="support">Contact US</MenuItem>
              <MenuItem value="product">Product Queries</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="hiring">Hiring Expert</MenuItem>
              <MenuItem value="po">Po Upload</MenuItem>
              <MenuItem value="Service">Estimate</MenuItem>
              <MenuItem value="Become">Service Partner</MenuItem>
            </Select>
          </FormControl>
        </div>
        {filterType === "support" && (
          <>
            <p className="text-2xl font-bold">Message Box</p>
            <TableContainer
              component={Paper}
              sx={{ height: "85%" }}
              className="mt-6"
            >
              <Table>
                {/* <TableHead sx={{ backgroundColor: "#1e3a8a" }}>
                <TableRow>
                  {[
                    "First Name",
                    "Last Name",
                    "Mobile No.",
                    "Email ID",
                    "Company",
                    "Position",
                    "Country",
                    "State",
                    "Message",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead> */}
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.Firstname}</TableCell>
                      <TableCell>{row.Lastname}</TableCell>
                      <TableCell>{row.Mobile}</TableCell>
                      <TableCell>{row.Email}</TableCell>
                      <TableCell>{row.Companyname}</TableCell>
                      <TableCell>{row.Position}</TableCell>
                      <TableCell>{row.Country}</TableCell>
                      <TableCell>{row.State}</TableCell>
                      <TableCell>{row.Message}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDelete(row._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {filterType === "product" && (
          <>
            <p className="text-2xl font-bold">Product Queries</p>
            <TableContainer
              component={Paper}
              sx={{ height: "85%" }}
              className="mt-6"
            >
              <Table>
                {/* <TableHead sx={{ backgroundColor: "#1e3a8a" }}>
                <TableRow>
                  {[
                    "Name",
                    "Mobile No.",
                    "Email ID",
                    "Company",
                    "Product Name",
                    "Model",
                    "Message",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead> */}
                <TableBody>
                  {getPro?.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.mobileNumber}</TableCell>
                      <TableCell>{row?.email}</TableCell>
                      <TableCell>{row?.company}</TableCell>
                      <TableCell>{row?.productName}</TableCell>
                      <TableCell>{row?.modelNumber}</TableCell>
                      <TableCell>{row?.message}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteProduct(row._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </>
      {/* Dynamically Render the Table */}
      {renderTable()}
    </>
  );
}

export default SupportTable;
