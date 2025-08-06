import React, { useState, useRef } from "react";
import { Card, Grid2, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postEmail, postFileUpload } from "./PoSlice";

function PoGenerator() {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const fileInputRef = useRef(null);

  const { uploadPo, loading, error } = useSelector((state) => state.poUploads);

  const handleSearch = () => {
    if (!inputValue) return;
    dispatch(postEmail(inputValue));
    setInputValue("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedIndex === null) {
      setSnackbar({
        open: true,
        message: "Please select a purchase order",
        severity: "error",
      });
      return;
    }
    if (!selectedFile) {
      setSnackbar({
        open: true,
        message: "Please select a file to upload",
        severity: "error",
      });
      return;
    }

    const selectedPo = uploadPo[selectedIndex];

    const formData = new FormData();
    formData.append("POImagePdf", selectedFile);
    formData.append("quotationId", selectedPo._id); // Backend might expect this as part of the FormData

    try {
      const result = await dispatch(
        postFileUpload({
          quotationId: selectedPo._id,
          formData: formData,
        })
      ).unwrap();

      setSnackbar({
        open: true,
        message: result.message || "File uploaded successfully",
        severity: "success",
      });
      setSelectedIndex(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error || "Failed to upload file",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className=" flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
      <Grid2
        container
        className="flex justify-center h-[800px] items-center bg-gray-50 flex-grow overflow-hidden"
      >
        <Grid2 size={{ lg: 6.5, md: 10, xs: 12 }} className="bg-gray-50">
          <Card
            sx={{
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: "#ECECEC",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              className="border bg-green-400 px-5 h-14 p-3"
            >
              Upload Purchase Order (Self Service)
            </Typography>
            <div className="flex gap-4 p-5 bg-#ECECEC">
              <input
                type="text"
                size="small"
                placeholder="Enter Email or Mobile"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-96 border border-gray-400 rounded-lg p-2"
              />
              <button
                onClick={handleSearch}
                className="w-28 px-4 py-2 text-white font-bold bg-yellow-600 rounded-lg border"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            
            <div className=" bg-white border border-gray-400 rounded-md m-5  h-[35vh] overflow-hidden">
              {uploadPo.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-600 text-lg">
                  No purchase orders found.
                </div>
              ) : (
                uploadPo.map((row, index) => (
                  <div key={row._id} className="w-full overflow-x-auto">
                    <div
                      className={`min-w-[700px] flex justify-between items-center rounded-md gap-4 px-5 py-3 border-b ${selectedIndex === index
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                        } hover:bg-gray-100 transition-all duration-200`}
                    >
                      <input
                        type="radio"
                        name="po selected"
                        checked={selectedIndex === index}
                        onChange={() => setSelectedIndex(index)}
                        className="text-lg accent-yellow-600"
                      />
                      <p className="w-[20%] text-gray-700 font-medium">
                        {row.quotationNumber}
                      </p>
                      <p className="w-[20%] text-gray-700 font-medium">
                        {new Date(row.createdAt).toLocaleDateString()}
                      </p>
                      <p className="w-[100%] text-gray-600 text-sm">
                        {row.problemDescription}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between p-5 bg-#ECECEC">
              <div>
                <input
                  type="file"
                  id="hiddenFileInput"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                <label htmlFor="hiddenFileInput">
                  <span className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer w-36 inline-block text-center">
                    {selectedFile ? selectedFile.name : "Upload File"}
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer w-28"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Card>
        </Grid2>
      </Grid2>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PoGenerator;
