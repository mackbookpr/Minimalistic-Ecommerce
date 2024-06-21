import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SignInWithGoogle from './SignInWithGoogle';

const Register = () => {
  const [status, setStatus] = useState(0);
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
    if (status !== 0) {
      let message = '';
      if (status === 201) {
        message = 'User Registered Successfully';
      } else if (status === 401) {
        message = 'User already exists!!';
      } else {
        message = 'Some error occurred!!';
      }
      setStatusMessage(message);

      const timer = setTimeout(() => {
        setStatus(0);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Register', formData, {
        withCredentials: true
      });
      setStatus(response.status);
    } catch (error) {
      setStatus(error.response ? error.response.status : 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen relative bg-orange-100">
      <div className="xl:w-[50vw] mx-4 md:mx-auto p-6 rounded-lg bg-white border-2 border-black">
        <h2 className="text-4xl font-bold text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit} className='mb-4'>
          <input
            className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <div className="relative w-full mb-4">
            <input
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className='text-center mb-4 text-xl'>
            Already have an account? <Link to="/LoginPage" className='text-orange-500'>Login</Link>
          </p>
          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-xl"
            type="submit"
          >
            Register
          </button>
        </form>
        <SignInWithGoogle />
      </div>
      <div className={`absolute py-2 sm:text-xl md:text-2xl text-[15px] md:px-5 px-1 ${(status === 0) ? '-top-32' : 'top-20'} transition-all duration-1000 bg-orange-300 rounded-md`}>
        {statusMessage}
      </div>
    </div>
  );
};

export default Register;
