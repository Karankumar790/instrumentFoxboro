import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid2, MenuItem, TextField, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { postHiring } from './hiringExpert';

const personalData = [
    { label: "Name", placeholder: "Enter your name", name: "name", required: true },
    { label: "Email", placeholder: "Enter your email", name: "email", required: true },
    { label: "Mobile", placeholder: "Enter your mobile", name: "phone", required: true },
    { label: "City", placeholder: "Enter your city", name: "city", required: true },
    { label: "State", placeholder: "Enter your state", name: "state", required: true },
    { label: "Country", placeholder: "Enter your country", name: "country", required: true },
    { label: "Total Experience", placeholder: "Enter your total experience", name: "totalExperience", required: true },
    { label: "Expected salary", placeholder: "Enter your expected salary", name: "expectedSalary", required: true },
];

const technicalOptions = [
    "Diploma electronics",
    "Diploma instrumentation",
    "B.tech. Electronics & Communication",
    "B.tech Electrical And Electronics",
    "B.Tech computer science",
    "MBA marketing",
    "Commerce graduate",
    "other"
];
const domainOptions = [
    "Embedded Systems", "Automation", "Web Development", "AI/ML", "Other",
];

function HiringExpert() {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        professionalQualification: "",
        youAreExpertIn: "",
        totalExperience: "",
        expectedSalary: "",
        expertResume: null
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(postHiring(formValues)).unwrap();
            setSnackbar({
                open: true,
                message: result.message || "From Submit Successfully",
                severity: "success"
            })
            setFormValues({
                name: "",
                email: "",
                phone: "",
                city: "",
                state: "",
                country: "",
                professionalQualification: "",
                youAreExpertIn: "",
                totalExperience: "",
                expectedSalary: "",
                expertResume: null
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error || "Failed to generate estimate",
                severity: "error",
            });
        }

    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };




    return (
        <div className="min-h-screen  flex flex-col justify-between overflow-x-hidden overflow-y-hidden bg-gray-50 px-4 sm:px-6 md:px-0">
            <Grid2 container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height:{ lg:'800px', xs:'1300px'}}} className="bg-gray-50" >
                <Grid2 size={{ lg: 6.5, md: 10, sm: 12 }}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        overflow: 'hidden',
                        backgroundColor: "#ECECEC",
                    }}>
                        <Box sx={{
                            color: 'black',
                            p: 2,
                            textAlign: 'center'
                        }}
                            className='bg-green-400'
                        >
                            <Typography variant="h5" fontWeight="bold" >
                                OPPORTUNITIES FOR HIGHLY SKILLED PROFESSIONALS
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
                            <Grid2 container spacing={3}>
                                {/* Personal Data Fields */}
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
                                            sx={{ mb: 2, backgroundColor: 'white' }}
                                            required={field.required}
                                        />
                                    </Grid2>
                                ))}

                                {/* Dropdown Fields - Now matching other fields */}
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Professional Quailfication"
                                        name="professionalQualification"
                                        value={formValues.professionalQualification}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ mb: 2, backgroundColor: 'white' }}
                                        required
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
                                        label="You are experts in"
                                        name="youAreExpertIn"
                                        value={formValues.youAreExpertIn}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ mb: 2, backgroundColor: 'white' }}
                                        required
                                    >
                                        {domainOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid2>



                                {/* Submit Button */}
                                <Grid2 item size={{ lg: 6 }}>
                                    <label>

                                        <Box
                                            sx={{
                                                border: 1,
                                                 borderColor: 'rgba(0, 0, 0, 0.23)',
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                p: 1,
                                                '&:hover': {
                                                    borderColor: 'rgba(0, 0, 0, 0.87)'
                                                }
                                            }}
                                        >
                                            <input
                                                type="file"
                                                fullWidth
                                                style={{ display: 'none' }}
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setFormValues({ ...formValues, expertResume: file });
                                                }}
                                            />
                                            <Button variant="outlined" component="span">
                                                Upload Resume
                                            </Button>
                                            {formValues.expertResume && (
                                                <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
                                                    {formValues.expertResume.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </label>
                                </Grid2>
                                <Grid2 item size={{ lg: 6 ,md:8,sm:10,xs:12  }} sx={{ display: 'flex', justifyContent:{lg:'end'} }}>
                                    <button
                                        type="submit"
                                        className='bg-green-400 w-full md:w-[44%] p-1 rounded-md text-lg font-bold'
                                    >
                                        Submit Application
                                    </button>
                                </Grid2>

                            </Grid2>
                        </Box>
                    </Card>
                </Grid2>
            </Grid2>


            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default HiringExpert;