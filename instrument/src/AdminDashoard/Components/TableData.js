 export default function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
 export const rows = [
    createData("Watch", "Titan", "Rolex", "Rado", "FD"),
    createData("Phone", 237, 9.0, 37, 4.3),
    createData("Laptop", 262, 16.0, 24, 6.0),
    createData("Bikes", 305, 3.7, 67, 4.3),
    createData("Cars", 356, 16.0, 49, 3.9),
  ];
  
export  const columns = [
    { field: "name", headerName: "Image" },
    { field: "calories", headerName: "Name" },
    { field: "fat", headerName: "Short Description" },
    { field: "carbs", headerName: "Long Description" },
    { field: "protein", headerName: "Views" },
  ];

   function createDatas(name, last, hash, cabs, nuts) {
    return {name, last, hash, cabs, nuts}
  }

  export const productRows = [
    createDatas("PLC" , 23, 43, 45, 90),
    createDatas("BPLC" , 43, 30, 64, 78),
    createDatas("HPLC" , 89, 73, 95, 34),
    createDatas("TPLC" , 23, 90, 45, 56),
    createDatas("GPLC" , 21, 53, 95, 78),
  ]

  export  const productcolumns = [
    { field: "name", headerName: "Image" },
    { field: "last", headerName: "Product Name" },
    { field: "hash", headerName: "Long Description" },
    { field: "cabs", headerName: "Short Description" },
    { field: "nuts", headerName: "View" },
  ];