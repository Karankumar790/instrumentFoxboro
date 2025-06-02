import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthState, clearError } from './loginSlice';
import OTPModal from './OTPModal';
import PageContainer from '../../components/HOC/PageContainer';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, step } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Handle OTP modal opening based on auth state
  useEffect(() => {
    if (step === 'otp' && !otpModalOpen) {
      setOtpModalOpen(true);
    }
  }, [step, otpModalOpen]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <>
      <PageContainer showheader='true' showfooter='true' className='bg-sky-200 flex flex-col overflow-hidden'>
        <div className='flex justify-center items-center bg-slate-200 flex-grow overflow-hidden'>
          <div className=" max-w-md p-8 bg-gray-100 shadow-lg rounded-lg space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Foxboro Instrument Company</h2>
              <p className="text-black">Employee Login</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  User ID
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
                  className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700 flex justify-center items-end w-25 h-13"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                  />
                  <span className="ml-2">Remember Me</span>
                </label>
                <Link to="/forget" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && <p className="text-red-500 text-center">{error}</p>}
              {message && !otpModalOpen && <p className="text-green-500 text-center">{message}</p>}
            </form>

            <div className="text-center">
              <p className="text-lg text-gray-600">
                Don't have an account?{" "}
                <Link to="/signUp" className="font-medium text-blue-600 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
        <OTPModal
          open={otpModalOpen}
          onClose={() => {
            setOtpModalOpen(false);
            dispatch(resetAuthState());
          }}
          email={formData.email}
        />
      </PageContainer>
    </>
  );
}

export default Login;