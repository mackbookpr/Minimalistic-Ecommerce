import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../authContext';

const LoginPage = () => {
  const [status, setStatus] = useState(0);
  const { setUserID, setUserName } = useAuth();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (status === 401 || status === 500) {
      setStatusMessage("Enter correct username or password!!");
      const timer = setTimeout(() => {
        setStatus(0);
      }, 1000);

      return () => clearTimeout(timer);
    }

    else if (status === 200) {
      async function fetchID() {
        try {
          const response = await axios.get('http://localhost:8080/valid', {
            withCredentials: true
          });
          if (response.data.valid && response.data.id) {
            setUserID(response.data.id);
            setUserName(response.data.username);
            navigate("/");
          } else {
            setUserID(null);
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
          setUserID(null);
        }
      }
      fetchID();
    }
  }, [status, navigate, setUserID, setUserName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/LoginPage', formData, {
        withCredentials: true
      });
      setStatus(response.status);
    } catch (error) {
      setStatus(500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100 relative">
      <div className="xl:w-[50vw] mx-4 md:mx-auto p-6 rounded-lg bg-white border-2 border-black">
        <h2 className="text-4xl font-bold text-center mb-8">Log In</h2>
        <form onSubmit={handleSubmit} className='my-8'>
          <input className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full px-4 py-2 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <div className="relative w-full mb-4">
            <input className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className='text-center mb-4 text-xl'>Don't have an account? <Link to="/Register" className='text-orange-500'>Register</Link></p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-xl" type="submit">Log In</button>
        </form>
      </div>
      <div className={`absolute py-2 sm:text-xl md:text-2xl text-[15px] md:px-5 px-1 ${(status === 0) ? '-top-32 bg-white' : 'top-20 bg-orange-300'} transition-all duration-1000 bg-orange-300 rounded-md`}>{statusMessage}</div>
    </div>
  );
};

export default LoginPage;
