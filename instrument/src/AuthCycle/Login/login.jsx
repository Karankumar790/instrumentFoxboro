import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './loginSlice';
import OTPModal from './OTPModal';

function login() {

    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
        setFormData({
            email: "",
            password: "",
        })
    }

    if (message && !otpModalOpen) {
        setOtpModalOpen(true); // Open OTP modal when login is successful and message is received
    }

    return (
        <>
            <div className="bg-[url('/login.jpg')]  bg-cover ">
                <Header />
                <div className="flex items-center justify-center min-h-screen  ">
                    <div className="w-full max-w-md p-8 bg-gray-100 shadow-lg rounded-lg space-y-6">
                        {/* Company Logo */}


                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800">Foxboro Instrument</h2>
                            <p className="text-gray-600">Sign in to manage your instruments and insights.</p>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-4" onSubmit={handleSubmit} >
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700  flex justify-center items-end w-25 h-13"
                                >
                                    {passwordVisible ? "Hide" : "Show"}
                                </button>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                                    />
                                    <span className="ml-2">Remember Me</span>
                                </label>
                                <Link to="/ForgotPwd" className="text-sm text-blue-600 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                disabled={loading}
                            >
                                {loading ? "Logging in" : "Login"}
                            </button>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-center">{error}</p>}

                            {/* Success Message */}
                            {message && <p className="text-green-500 text-center">{message}</p>}

                        </form>

                        {/* Footer Links */}
                        <div className="text-center">
                            <p className="text-lg text-gray-600">
                                Don’t have an account?{" "}
                                <Link to="/signUp" className="font-medium text-blue-600 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* OTP Modal */}
            <OTPModal open={otpModalOpen} onClose={() => setOtpModalOpen(false)} />
        </>
    )
}

export default login
