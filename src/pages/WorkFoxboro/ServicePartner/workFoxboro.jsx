import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postWork } from './workFoxSlice';
import { Card, Grid2, MenuItem, TextField, Typography, Button, Box, Snackbar, Alert } from '@mui/material';

const personalData = [
    { label: "Company Name", placeholder: "Enter company name", name: "companyName", required: true },
    { label: "City", placeholder: "Enter your city", name: "city", required: true },
    { label: "State", placeholder: "Enter your state", name: "state", required: true },
    { label: "Country", placeholder: "Enter your country", name: "country", required: true },
    { label: "Email Address", placeholder: "Enter your email address", name: "email", required: true },
    { label: "Phone", placeholder: "Enter your mobile number", name: "phone", required: true },
];

const serviceDomain = [
    "Field instruments",
    "Panel instruments",
    "Plc & Scada system",
    "Industrial Networking",
    "Other",
];

function WorkFoxboro() {
    const [formValues, setFormValues] = useState({
        companyName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        serviceDomain: "",
        GSTCertificate: null
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { error, success } = useSelector(state => state.foxboro)

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formValues);
        try {
            const result = await dispatch(postWork(formValues)).unwrap();

            setSnackbar({
                open: true,
                message: result.message || "Estimate generated successfully",
                severity: "success",
            });

            setFormValues({
                companyName: "",
                email: "",
                phone: "",
                city: "",
                state: "",
                country: "",
                serviceDomain: "",
                GSTCertificate: null
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
            <Grid2 container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height:{ lg:'800px', xs:'1000px'} }} className="bg-gray-50" >
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
                            <Typography variant="h5" fontWeight="bold">
                                BECOME SERVICE PARTNER
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
                                            required={field.required}
                                            value={formValues[field.name]}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ mb: 2, backgroundColor: 'white' }}
                                        />
                                    </Grid2>
                                ))}

                                {/* Dropdown Fields - Now matching other fields */}
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Service Domain"
                                        name="serviceDomain"
                                        value={formValues.serviceDomain}
                                        onChange={handleChange}
                                        variant="outlined"
                                        sx={{ mb: 2, backgroundColor: 'white' }}
                                        required
                                    >
                                        {serviceDomain.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid2>

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
                                                    setFormValues({ ...formValues, GSTCertificate: file });
                                                }}
                                            />
                                            <Button variant="outlined" component="span">
                                                Upload GST Certificate
                                            </Button>
                                            {formValues.GSTCertificate && (
                                                <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
                                                    {formValues.GSTCertificate.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </label>
                                </Grid2>
                                <Grid2 item size={{ lg: 12, md:8,sm:10,xs:12  }} sx={{ display: 'flex', justifyContent: 'end'}}>
                                    <button
                                        type="submit"
                                        className='bg-green-400 w-full md:w-[24%] p-3 rounded-md text-lg font-bold'
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

export default WorkFoxboro;