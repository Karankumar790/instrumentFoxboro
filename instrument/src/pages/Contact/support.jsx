import { useState } from "react";
import { submitContactForm } from "./supportSlice";
import { useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

function Support() {
  const dispatch = useDispatch();
  // const error = useSelector((state) => state.contact.error)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Mobile: "",
    Email: "",
    Companyname: "",
    Position: "",
    Country: "",
    State: "",
    Message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(submitContactForm(formData)).unwrap();
      setSnackbar({
        open: true,
        message: result.message || "Query send successfully",
        severity: "success",
      });
      setFormData({
        Firstname: "",
        Lastname: "",
        Mobile: "",
        Email: "",
        Companyname: "",
        Position: "",
        Country: "",
        State: "",
        Message: "",
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message || // RTK Query-style error
        error?.message ||
        error || // generic JS error
        "Failed to send Query"; // fallback
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      className="flex flex-col"
      style={{
        // backgroundImage: `linear-gradient(to bottom right, #e0f2fe, #c7d2fe)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full flex-grow flex  justify-center bg-gray-50 ">
        <div className="flex flex-col items-center  w-4/5 ">
          <div className="w-full sm:w-10/12 lg:w-full  p-4 flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold mb-4 text-center text-blue-950">
              Contact Us
            </h2>
            <p className="text-xl font-semibold text-center text-indigo-950">
              At Foxboro Instrument Company, we are committed to providing
              top-tier automation solutions and industrial instrumentation
              services tailored to your business needs. Whether you require
              cutting-edge process control systems, industrial IoT solutions, or
              expert consultation, our team is here to help.
            </p>
          </div>

          <div className="w-full flex h-full ">
            <div className=" p-6 flex flex-col  w-1/2 m-4 rounded-lg ">
              <h2 className="text-3xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="flex-1 overflow-auto space-y-16">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-6xl"></i>{" "}
                    {/* Address Icon */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl">Address</h3>
                    <p className="text-xl font-semibold">
                      118,Foxboro Instrumnet Company,
                      <br /> Sudharam building, Raj Nagar <br />
                      RDC Ghaziabad, India{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone-alt text-6xl"></i>{" "}
                    {/* Phone Icon */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl">Phone</h3>
                    <p className="text-xl font-semibold">+91 94578893231</p>
                    <p className="text-xl font-semibold">+91 94578893232</p>
                    <p className="text-xl font-semibold">+91 94578893234</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-6xl"></i>{" "}
                    {/* Email Icon */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xl">Email</h3>
                    <p className="text-xl font-semibold">
                      foxboroinstrument@gmail.com
                    </p>
                    <p className="text-xl font-semibold">
                      foxboroinstrument@yahoo.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[600px] lg:w-1/2 flex flex-col m-4 space-y-4 bg-white shadow-lg rounded-xl p-6">
              <p className="text-3xl font-semibold text-black py-2  rounded-md">
                Contact Us
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {/* First Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    name="Firstname"
                    value={formData.Firstname}
                    onChange={handleChange}
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Last Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    name="Lastname"
                    value={formData.Lastname}
                    onChange={handleChange}
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Mobile No. */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="Mobile"
                    value={formData.Mobile}
                    onChange={handleChange}
                    placeholder="Mobile No."
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Email ID */}
                <div className="relative">
                  <input
                    type="email"
                    required
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Company */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="Companyname"
                    value={formData.Companyname}
                    onChange={handleChange}
                    placeholder="Company"
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Position */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="Position"
                    value={formData.Position}
                    onChange={handleChange}
                    placeholder="Position"
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-briefcase absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Country */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-globe absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* State */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    placeholder="State"
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>

                {/* Message */}
                <div className="relative col-span-1 sm:col-span-2">
                  <textarea
                    rows={4}
                    required
                    placeholder="Message"
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                  />
                  <i className="fas fa-comment-alt absolute left-4 top-4 text-gray-500 text-lg"></i>
                </div>

                {/* Submit Button */}
                <div className="col-span-1 sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-lg rounded-lg font-semibold w-40 h-11 "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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

export default Support;
