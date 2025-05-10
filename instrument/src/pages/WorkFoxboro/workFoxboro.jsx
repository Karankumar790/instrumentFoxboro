// import React, { useState } from 'react'
// import PageContainer from '../../components/HOC/PageContainer'
// import { useDispatch } from 'react-redux';
// import { postWork } from './workFoxSlice';
// import { Card, Grid2, MenuItem, TextField, Typography, Button, Box } from '@mui/material';

// const personalData = [
//     { label: "Name", placeholder: "Enter your name", name: "name" },
//     { label: "Email", placeholder: "Enter your email", name: "email" },
//     { label: "Mobile", placeholder: "Enter your mobile", name: "mobile" },
//     { label: "City", placeholder: "Enter your city", name: "city" },
//     { label: "State", placeholder: "Enter your state", name: "state" },
//     { label: "Country", placeholder: "Enter your country", name: "country" },
// ];

// const technicalOptions = ["Diploma", "B.Tech", "M.Tech", "Other"];
// const domainOptions = ["Embedded Systems", "Automation", "Web Development", "AI/ML", "Other"];

// function WorkFoxboro() {
//     const [formValues, setFormValues] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         city: "",
//         state: "",
//         country: "",
//         technicalQualification: "",
//         internshipDomain: ""
//     });

//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form submitted:", formValues);
//         dispatch(postWork(formValues));
//         setFormValues({
//             name: "",
//             email: "",
//             mobile: "",
//             city: "",
//             state: "",
//             country: "",
//             technicalQualification: "",
//             internshipDomain: ""
//         });
//     };

//     return (
//         <PageContainer showheader="true" showfooter="true">
//             <Grid2 container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
//                 <Grid2 size={{ lg: 8, md: 10, sm: 12 }}>
//                     <Card sx={{
//                         borderRadius: 3,
//                         boxShadow: 3,
//                         overflow: 'hidden'
//                     }}>
//                         <Box sx={{
//                             bgcolor: 'green',
//                             color: 'white',
//                             p: 2,
//                             textAlign: 'center'

//                         }}>
//                             <Typography variant="h5" fontWeight="bold">
//                                 APPLY FOR INTERNSHIP
//                             </Typography>
//                         </Box>

//                         <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
//                             <Grid2 container spacing={3}>
//                                 {/* Personal Data Fields */}
//                                 {personalData.map((field, index) => (
//                                     <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
//                                         <TextField
//                                             fullWidth
//                                             label={field.label}
//                                             placeholder={field.placeholder}
//                                             name={field.name}
//                                             value={formValues[field.name]}
//                                             onChange={handleChange}
//                                             variant="outlined"
//                                             sx={{ mb: 2 }}
//                                         />
//                                     </Grid2>
//                                 ))}

//                                 {/* Dropdown Fields - Now matching other fields */}
//                                 <Grid2 size={{ xs: 12, sm: 6 }}>
//                                     <TextField
//                                         select
//                                         fullWidth
//                                         label="Technical Qualification"
//                                         name="technicalQualification"
//                                         value={formValues.technicalQualification}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         sx={{ mb: 2 }}
//                                     >
//                                         {technicalOptions.map((option) => (
//                                             <MenuItem key={option} value={option}>
//                                                 {option}
//                                             </MenuItem>
//                                         ))}
//                                     </TextField>
//                                 </Grid2>

//                                 <Grid2 size={{ xs: 12, sm: 6 }}>
//                                     <TextField
//                                         select
//                                         fullWidth
//                                         label="Internship Domain"
//                                         name="internshipDomain"
//                                         value={formValues.internshipDomain}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         sx={{ mb: 2 }}
//                                     >
//                                         {domainOptions.map((option) => (
//                                             <MenuItem key={option} value={option}>
//                                                 {option}
//                                             </MenuItem>
//                                         ))}
//                                     </TextField>
//                                 </Grid2>

//                                 {/* Submit Button */}
//                                 <Grid2 item size={{ lg: 6 }}>
//                                     <label>

//                                         <Box
//                                             sx={{
//                                                 border: 1,
//                                                 borderColor: 'rgba(0, 0, 0, 0.23)',
//                                                 borderRadius: 1,
//                                                 p: 1,
//                                                 '&:hover': {
//                                                     borderColor: 'rgba(0, 0, 0, 0.87)'
//                                                 }
//                                             }}
//                                         >
//                                             <input
//                                                 type="file"
//                                                 fullWidth
//                                                 hidden
//                                                 onChange={(e) => {
//                                                     const file = e.target.files[0];
//                                                     setFormValues({ ...formValues, resume: file });
//                                                 }}
//                                             />
//                                             <Button variant="outlined" component="span">
//                                                 Upload Resume
//                                             </Button>
//                                             {formValues.resume && (
//                                                 <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
//                                                     {formValues.resume.name}
//                                                 </Typography>
//                                             )}
//                                         </Box>
//                                     </label>
//                                 </Grid2>
//                                 <Grid2 item size={{ lg: 6 }} sx={{display:'flex', justifyContent:'end'}}>

//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                         size="large"
//                                         sx={{
//                                             py: 1.5,
//                                             fontSize: '1.1rem',
//                                             fontWeight: 'bold'
//                                         }}
//                                     >
//                                         Submit Application
//                                     </Button>
//                                 </Grid2>

//                             </Grid2>
//                         </Box>
//                     </Card>
//                 </Grid2>
//             </Grid2>
//         </PageContainer>
//     );
// }

// export default WorkFoxboro;

import React, { useState } from "react";
import PageContainer from "../../components/HOC/PageContainer";
import { useDispatch } from "react-redux";
import { postWork } from "./workFoxSlice";
import {
  Card,
  Grid2,
  MenuItem,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";

const personalData = [
  { label: "Name", placeholder: "Enter your name", name: "name" },
  { label: "Email", placeholder: "Enter your email", name: "email" },
  { label: "Mobile", placeholder: "Enter your mobile", name: "mobile" },
  { label: "City", placeholder: "Enter your city", name: "city" },
  { label: "State", placeholder: "Enter your state", name: "state" },
  { label: "Country", placeholder: "Enter your country", name: "country" },
];

const technicalOptions = ["Diploma", "B.Tech", "M.Tech", "Other"];
const domainOptions = [
  "Embedded Systems",
  "Automation",
  "Web Development",
  "AI/ML",
  "Other",
];

function WorkFoxboro() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    country: "",
    technicalQualification: "",
    internshipDomain: "",
    candidateResume: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formValues.candidateResume) {
      alert("Please upload your resume.");
      return;
    }

    // Create FormData and append all fields
    const formDataToSend = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Dispatch FormData to API
    dispatch(postWork(formDataToSend));

    // Reset form
    setFormValues({
      name: "",
      email: "",
      mobile: "",
      city: "",
      state: "",
      country: "",
      technicalQualification: "",
      internshipDomain: "",
      candidateResume: null,
    });
  };

  return (
    <PageContainer showheader="true" showfooter="true">
      <Grid2
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid2 size={{ lg: 8, md: 10, sm: 12 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                bgcolor: "green",
                color: "white",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                APPLY FOR INTERNSHIP
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
              <Grid2 container spacing={3}>
                {personalData.map((field, index) => (
                  <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={field.label}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid2>
                ))}

                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Technical Qualification"
                    name="technicalQualification"
                    value={formValues.technicalQualification}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    {technicalOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Internship Domain"
                    name="internshipDomain"
                    value={formValues.internshipDomain}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    {domainOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                {/* Resume Upload */}
                <Grid2 item size={{ lg: 6 }}>
                  <label>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "rgba(0, 0, 0, 0.23)",
                        borderRadius: 1,
                        p: 1,
                        "&:hover": {
                          borderColor: "rgba(0, 0, 0, 0.87)",
                        },
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormValues({
                            ...formValues,
                            candidateResume: file,
                          });
                        }}
                      />
                      <Button variant="outlined" component="span">
                        Upload Resume
                      </Button>
                      {formValues.candidateResume && (
                        <Typography
                          variant="body2"
                          sx={{ ml: 2, display: "inline" }}
                        >
                          {formValues.candidateResume.name}
                        </Typography>
                      )}
                    </Box>
                  </label>
                </Grid2>

                {/* Submit Button */}
                <Grid2
                  item
                  size={{ lg: 6 }}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Submit Application
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}

export default WorkFoxboro;
