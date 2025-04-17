import React from 'react'

function AdminBanner() {
  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Upload 4 Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 1</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 2</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 3</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Image 4</label>
            <input type="file" accept="image/*" className="w-full" />
            <div className="w-32 h-32 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Preview
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminBanner


// import React, { useState } from "react";
// import axios from "axios";

// const AdminBanner = () => {
//   const [images, setImages] = useState([]);
//   const [title, setTitle] = useState("");
//   const [preview, setPreview] = useState([]);
//   const [message, setMessage] = useState("");

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     if (files.length > 10) {
//       return setMessage("You can only upload up to 10 images.");
//     }

//     setImages(files);
//     setPreview(files.map((file) => URL.createObjectURL(file)));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (images.length === 0) {
//       return setMessage("Please select at least one image.");
//     }

//     const formData = new FormData();
//     images.forEach((image) => {
//       formData.append("files", image);
//     });
//     formData.append("title", title);

//     try {
//       const response = await axios.post(`${API_URL}api/v1/admin/banner`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(response.data.message);
//       setImages([]);
//       setPreview([]);
//       setTitle("");
//     } catch (error) {
//       console.error(error);
//       setMessage(error.response?.data?.message || "Upload failed.");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Banner</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter banner title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageChange}
//         />
//         <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//           {preview.map((src, index) => (
//             <img key={index} src={src} alt={`preview-${index}`} width="100" />
//           ))}
//         </div>
//         <button type="submit">Upload</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AdminBanner;