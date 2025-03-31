import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Grid2,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setSubmitting,
  setSubmitSuccess,
  setSubmitError,
  resetForm,
} from "../pages/supportSlice";

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setField, setSubmitting, setSubmitSuccess, setSubmitError, resetForm } from '../pages/supportSlice';

// import React, { useEffect } from 'react'
// import { useSelector } from "react-redux";
// import {
//   setField,
//   setSubmitting,
//   setSubmitSuccess,
//   setSubmitError,
//   resetForm,
// } from "../pages/supportSlice";
import { useNavigate } from "react-router-dom";

function support() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formState = useSelector((state) => state.support);

  // Update Redux state when an input value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ field: name, value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setSubmitting(true));

    try {
      // Simulate an API call here
      // Replace this with the actual API logic to save form data.
      setTimeout(() => {
        dispatch(setSubmitSuccess(true));
        dispatch(setSubmitting(false));
        dispatch(resetForm()); // Reset form after successful submit
        navigate("/thank-you"); // Navigate to a Thank You page or similar after successful form submission
      }, 2000);
    } catch (error) {
      dispatch(setSubmitError("Error submitting form."));
      dispatch(setSubmitting(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex-grow flex  justify-center bg-indigo-50">
        <div className="flex flex-col items-center  w-4/5 ">
          <div className="w-full sm:w-10/12 lg:w-full  p-4 flex flex-col justify-center items-center">
            <h2 className="text-6xl font-bold mb-4 text-center text-blue-950">
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
            <div className=" p-6 flex flex-col  w-1/2 m-4 rounded-lg bg-blue-100">
              <h2 className="text-4xl font-bold mb-4">Contact Information</h2>

              <div className="flex-1 overflow-auto space-y-16">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-6xl"></i>{" "}
                    {/* Address Icon */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-4xl">Address</h3>
                    <p className="text-2xl font-semibold">
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
                    <h3 className="font-semibold text-4xl">Phone</h3>
                    <p className="text-2xl font-semibold">+91 94578893231</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-6xl"></i>{" "}
                    {/* Email Icon */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-4xl">Email</h3>
                    <p className="text-2xl font-semibold">
                      foxboroinstrument@email.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 flex flex-col m-4 space-y-1 bg-blue-100 pl-2 pr-2">
              <p className="w-full text-3xl font-semibold bg-blue-950 text-white flex justify-center mb-2">
                Contact Us
              </p>
              <form
                className="grid grid-cols-1 sm:grid-cols-2 flex-1 overflow-auto gap-4"
                onSubmit={handleSubmit}
              >
                {/* First Name */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formState.firstName}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-user"></i>
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formState.lastName}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-user"></i>
                  </div>
                </div>

                {/* Mobile No. */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="mobileNo"
                      placeholder="Mobile No."
                      value={formState.mobileNo}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-phone"></i>
                  </div>
                </div>

                {/* Email ID */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email ID"
                      value={formState.email}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-envelope"></i>
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formState.company}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-building"></i>
                  </div>
                </div>

                {/* Position */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="position"
                      placeholder="Position"
                      value={formState.position}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-briefcase"></i>
                  </div>
                </div>

                {/* Country */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formState.country}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-globe"></i>
                  </div>
                </div>

                {/* State */}
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formState.state}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-map-marker-alt"></i>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col col-span-2">
                  <div className="relative">
                    <textarea
                      rows={2}
                      name="message"
                      placeholder="Message"
                      value={formState.message}
                      onChange={handleChange}
                      className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-blue-50"
                    />
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-comment-alt"></i>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-900 w-full text-white font-bold text-2xl rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={formState.isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default support;
