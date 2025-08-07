import React, { useState } from "react";
function ComplianToDirector() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    company: "",
    productName: "",
    modelNumber: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(contactProduct(formData)).unwrap();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      company: "",
      productName: "",
      modelNumber: "",
      message: "",
    });
  };

  return (
    <div className="bg-slate-400 w-full min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center ">
        <div className="bg-white w-full max-w-2xl p-6 space-y-4 border shadow-lg rounded-lg border-gray-400">
          <p className="text-3xl font-semibold text-black py-2  rounded-md ">
            Complain To Director
          </p>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 "
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 "
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                name="Mobile"
                placeholder="Mobile No."
                className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobileNumber: e.target.value,
                  })
                }
              />
              <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            </div>
            <div className="relative">
              <input
                type="email"
                required
                name="Email"
                placeholder="Email ID"
                className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                name="Companyname"
                placeholder="Company"
                className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
              <i className="fas fa-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            </div>
            {/* <div className="relative">
              <input
                type="text"
                required
                name="Product Name"
                placeholder="Product Name"
                className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    productName: e.target.value,
                  })
                }
              />
              <i className="fas fa-box absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                name="Model"
                placeholder="Model"
                className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                value={formData.modelNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    modelNumber: e.target.value,
                  })
                }
              />
              <i className="fas fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            </div> */}
            <div className="relative col-span-1 sm:col-span-2">
              <textarea
                rows={4}
                required
                placeholder="Write  your complain here"
                name="Message"
                className="p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <i className="fas fa-comment-alt absolute left-4 top-4 text-gray-500 text-lg"></i>
            </div>
            <div className="col-span-1 sm:col-span-2 flex justify-end">
              <button
                // disabled={loading}
                type="submit"
                className="bg-blue-500 text-lg rounded-lg font-semibold w-40 h-11 "
              >
                {/* {loading ? "Submitting..." : "Submit"} */}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="pb-0">
      </div>
    </div>
  );
}

export default ComplianToDirector;
