import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [Status, setStatus] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Status !== 0) {
      const timer = setTimeout(() => {
        setStatus(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [Status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Register', formData, {
        withCredentials: true
      });
      setStatus(response.status);
      setStatusMessage("User Registered Successfully");
      // Optionally, you can handle the response data here (e.g., display success message)
    } catch (error) {
      // setStatus(error.response.status);
      setStatusMessage("User already exists");
      // Optionally, you can handle errors here (e.g., display error message to the user)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100 relative">
      <div className="max-w-md w-full mx-auto p-6 rounded-lg bg-white border-2 border-black">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit}>
          <input className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <div className="relative w-full mb-4">
            <input className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className='text-center mb-2'>Already have an account? <Link to="/LoginPage" className='text-orange-500'>Login</Link></p>
          <div className="mb-4 flex justify-center">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              render={({ onClick }) => (
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" onClick={onClick}>Continue with Google</button>
              )}
            />
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">Register</button>
        </form>
      </div>
      <div className={`absolute py-2 px-5 ${Status === 0 ? '-top-12' : 'top-20'} transition-all duration-500 bg-orange-300 rounded-md`}>{statusMessage}</div>
    </div>
  );
};

export default Register;
