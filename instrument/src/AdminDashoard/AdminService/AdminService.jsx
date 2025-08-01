import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { MdInbox, MdSend, MdDrafts,  MdStorage,  MdDelete } from "react-icons/md";


function SupportTable() {

  const { serviceAdm, loading } = useSelector((state) => state.service);
  const { loadings, error, getPro } = useSelector(
    (state) => state.getProData || {}
  );

  const rows = serviceAdm?.getServiceData || [];
  const [filterType, setFilterType] = useState("");
  const [filterLabel, setFilterLabel] = useState("All Mail");

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteService(id));
  };

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getContactProduct());
  };

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  return (
    <>
    
      {/* Dropdown to select query type */}
      <div className="flex justify-between">
        <p className="text-2xl text-black font-bold">{filterLabel}</p>
        <div className="flex gap-6">
          <button className="flex items-center space-x-1 text-xl text-black font-semibold">
            <MdInbox />
            <span>Inbox</span>
          </button>
          <button className="flex items-center space-x-2 text-xl text-black font-semibold">
            <MdSend />
            <span>Sent</span>
          </button>
          <button className="flex items-center space-x-2 text-xl text-black font-semibold">
            <MdDrafts />
            <span>Drafts</span>
          </button>
          <button className="flex items-center space-x-2 text-xl text-black font-semibold">
            <MdDelete />
            <span>Trace</span>
          </button>
          <button className="flex items-center space-x-2 text-xl text-black font-semibold">
            <MdStorage />
            <span>Database</span>
          </button>
          <FormControl sx={{ minWidth: 300 }} size="small" className="mb-4">
            <InputLabel id="query-type-label">All Mail</InputLabel>
            <Select
              labelId="query-type-label"
              value={filterType}
              label="All Mail"
              onChange={(e) => {
                const selectedValue = e.target.value;

                // Match label manually based on value
                const labelMap = {
                  support: "Contact Us",
                  product: "Product Queries",
                  internship: "Internship",
                  hiring: "Hiring Expert",
                  po: "Po Upload",
                  Service: "Estimate",
                  Become: "Service Partner",
                };

                setFilterType(selectedValue);
                setFilterLabel(labelMap[selectedValue] || "All Mail");
              }}
            >
              <MenuItem value="support">Contact Us</MenuItem>
              <MenuItem value="product">Product Queries</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="hiring">Hiring Expert</MenuItem>
              <MenuItem value="po">Po Upload</MenuItem>
              <MenuItem value="Service">Estimate</MenuItem>
              <MenuItem value="Become">Service Partner</MenuItem>
            </Select>
          </FormControl>
        </div>

      </div>
      {filterType === "support" && (
        <>
          {/* <p className="text-2xl font-bold">Message Box</p> */}
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
          <TableContainer
            component={Paper}
            sx={{ height: "85%" }}
            className="mt-6"
          >
            <Table>
             
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

      {/* Dynamically Render the Table */}
      {renderTable()}
    </>
  );
}

export default SupportTable;
