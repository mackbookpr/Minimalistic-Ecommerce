import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../authContext';

const LoginPage = () => {
  const [Status, setStatus] = useState(0);
  const { userID, username, setUserID, setUserName } = useAuth();
  const navigate = useNavigate();
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

  }, [])



  useEffect(() => {
    // Check if Status is 401
    if (Status === 401) {
      setStatusMessage("User doesn't exist with the provided email!");
    }

    // Redirect if Status is 200
    if (Status === 200) {
      async function fetchID() {
        try {
          const response = await axios.get('http://localhost:8080', {
            withCredentials: true
          });
          if (response.data.valid && response.data.id) {
            setUserID(response.data.id);
            setUserName(response.data.username);
          } else {
            setUserID(null);
          }
          console.log(response.data.id);
        } catch (error) {
          console.error('Error fetching user ID:', error);
          setUserID(null);
        }
      }
      fetchID();
      navigate("/");
    }
  }, [Status, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/LoginPage', formData, {
        withCredentials: true
      });
      setStatus(response.status);
    } catch (error) {
      // setStatus(error.status);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100 relative">
      <div className="max-w-md w-full mx-auto p-6 rounded-lg bg-white border-2 border-black">
        <h2 className="text-3xl font-bold text-center mb-8">Log In</h2>
        <form onSubmit={handleSubmit}>
          <input className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <div className="relative w-full mb-4">
            <input className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className='text-center mb-2'>Don't have an account? <Link to="/Register" className='text-orange-500'>Register</Link></p>
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
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">Log In</button>
        </form>
      </div>
      <div className={`absolute py-2 px-5 ${(Status === 0) ? '-top-12' : 'top-20'} transition-all duration-500 bg-orange-300 rounded-md`}>{statusMessage}</div>
    </div>
  );
};

export default LoginPage;
