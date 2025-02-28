import React, { useState } from 'react'
import DynanmicTable from './Components/DynamicTable'
import { productRows, productcolumns } from "./Components/TableData";
import DynamicModal from './Components/Modal/DynamicModal';




function Peoduct() {

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = (data) => {
    // Save the form data (e.g., make API call or update state)
    setFormData(data);
    console.log(data);  // Example of dynamic data after save
  };

  const fields = [
    { name: 'categoryName', label: 'Category Name' },
    { name: 'shortDesc', label: 'Short Description', multiline: true, rows: 4 },
    { name: 'longDesc', label: 'Long Description', multiline: true, rows: 4 },
    // You can add more dynamic fields here
  ];

  return (
    <div>
      <div>
        <div className='flex justify-between '>
          <p className=' text-2xl font-semibold'>Product </p>
          <button onClick={handleOpen} className='text-xl font-semibold'>Add Item +</button>
        </div>
        <DynanmicTable rows={productRows} columns={productcolumns} />
        <DynamicModal
          open={open}
          handleClose={handleClose}
          title="Add New Category"
          fields={fields}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default Peoduct
